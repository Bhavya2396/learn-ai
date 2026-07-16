"use client";

/**
 * Brain ↔ server sync. The brain store (brain.ts) holds NO browser persistence;
 * this module is the bridge to Postgres:
 *
 *   • hydrateBrainFromServer()  — GET /api/brain, load into the store (on sign-in)
 *   • startBrainAutosync()      — subscribe to store changes and debounce-POST
 *                                 the whole brain back to /api/brain
 *   • clearBrain()              — reset the store to empty (on sign-out)
 *
 * The autosync is a whole-brain snapshot (matches the atomic saveBrain repo).
 * Last-write-wins per device — fine for a single-user-per-account app.
 */

import { authedFetch } from "@/lib/auth/authed-fetch";
import { getBrainSnapshot, useZoeBrain } from "./brain";
import { syncStatus } from "./sync-status";
import type { ZoeBrainState } from "./types";

const SYNC_DEBOUNCE_MS = 1500;

let unsubscribe: (() => void) | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
/** Guards against the initial hydrate write echoing straight back to the server. */
let syncEnabled = false;

/** Load the signed-in user's brain from Postgres into the store. */
export async function hydrateBrainFromServer(): Promise<void> {
  syncEnabled = false;
  try {
    const res = await authedFetch("/api/brain");
    if (res.ok) {
      const { brain } = (await res.json()) as { brain: ZoeBrainState | null };
      useZoeBrain.getState().hydrate(brain);
      syncStatus.saved();
    } else if (res.status === 401) {
      // Signed out — not an error state; just nothing to load.
      useZoeBrain.getState().hydrate(null);
    } else {
      // 5xx — the DB is unreachable/misconfigured. Surface it: we can't load,
      // and any later save would fail too. Hydrate empty so the UI can render
      // the error banner rather than hanging.
      useZoeBrain.getState().hydrate(null);
      syncStatus.error("Couldn't load your data. Please try again later.");
    }
  } catch {
    useZoeBrain.getState().hydrate(null);
    syncStatus.error("Couldn't load your data. Please try again later.");
  } finally {
    // Allow subsequent user-driven changes to sync.
    syncEnabled = true;
  }
}

async function flush(): Promise<void> {
  const snapshot = getBrainSnapshot();
  syncStatus.saving();
  try {
    const res = await authedFetch("/api/brain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(snapshot),
    });
    // A non-2xx (e.g. 500 from a missing table, 401 signed-out) is a real
    // failure — do NOT pretend it saved.
    if (res.ok) syncStatus.saved();
    else syncStatus.error();
  } catch {
    syncStatus.error();
  }
}

function scheduleFlush(): void {
  if (!syncEnabled) return;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    void flush();
  }, SYNC_DEBOUNCE_MS);
}

/**
 * Begin pushing store changes to the server (debounced). Idempotent — safe to
 * call once after hydrate. Returns a stop function.
 */
export function startBrainAutosync(): () => void {
  if (unsubscribe) return stopBrainAutosync;
  unsubscribe = useZoeBrain.subscribe((state, prev) => {
    // Ignore pure `hydrated` flips (no data change).
    if (
      state.identity === prev.identity &&
      state.profile === prev.profile &&
      state.aspirations === prev.aspirations &&
      state.activeAspirationId === prev.activeAspirationId &&
      state.events === prev.events &&
      state.ledger === prev.ledger
    ) {
      return;
    }
    scheduleFlush();
  });
  return stopBrainAutosync;
}

export function stopBrainAutosync(): void {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
}

/** Flush any pending change immediately (e.g. before sign-out / unload). */
export async function flushBrainNow(): Promise<void> {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  if (syncEnabled) await flush();
}

/** Reset the store to empty and stop syncing (on sign-out). */
export function clearBrain(): void {
  syncEnabled = false;
  stopBrainAutosync();
  useZoeBrain.getState().reset();
  syncStatus.clear();
}
