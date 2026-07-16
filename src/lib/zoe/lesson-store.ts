"use client";

/**
 * Lesson store — durable, per-user persistence of generated lesson content.
 *
 * Generated lessons belong to the user and are kept permanently — there is NO
 * TTL and no eviction. A stored lesson lives until it is explicitly
 * invalidated (or the user is deleted). Two layers:
 *
 * Layer 1: In-memory LRU map — a fast per-session read cache only (up to
 *          MEM_MAX entries). Purely an optimization; it is NOT the store of
 *          record and is wiped on refresh.
 * Layer 2: Postgres, per signed-in user, via /api/lessons — the store of
 *          record. Survives refresh and follows the user across devices.
 *          NOTHING is persisted in the browser (no IndexedDB / localStorage).
 *
 * Public API (all async so callers don't care which layer answers):
 *   getLesson(stepId)          → LessonContent | null
 *   storeLesson(stepId, data)  → void (persists to Postgres immediately)
 *   invalidateLesson(stepId)   → void (deletes the stored lesson)
 *
 * Legacy sync shim (memory-only, kept for any callers not yet updated):
 *   getCachedLesson(stepId)    → LessonContent | null
 *   cacheLesson(stepId, data)  → void
 */

import { authedFetch } from "@/lib/auth/authed-fetch";
import { syncStatus } from "./sync-status";
import type { LessonContent } from "./content-types";

/* ── Memory layer ────────────────────────────────────────────────────────── */

const MEM_MAX = 12;
const memStore = new Map<string, LessonContent>();
const memOrder: string[] = []; // LRU: oldest at index 0

function memGet(stepId: string): LessonContent | null {
  const entry = memStore.get(stepId);
  if (!entry) return null;
  // Promote to most-recent
  const i = memOrder.indexOf(stepId);
  if (i !== -1) memOrder.splice(i, 1);
  memOrder.push(stepId);
  return entry;
}

function memSet(stepId: string, lesson: LessonContent): void {
  if (memStore.has(stepId)) {
    const i = memOrder.indexOf(stepId);
    if (i !== -1) memOrder.splice(i, 1);
  } else if (memStore.size >= MEM_MAX) {
    const oldest = memOrder.shift();
    if (oldest) memStore.delete(oldest);
  }
  memStore.set(stepId, lesson);
  memOrder.push(stepId);
}

function memDel(stepId: string): void {
  memStore.delete(stepId);
  const i = memOrder.indexOf(stepId);
  if (i !== -1) memOrder.splice(i, 1);
}

/* ── Server layer (Postgres via API, per user) ───────────────────────────── */

async function serverGet(stepId: string): Promise<LessonContent | null> {
  try {
    const res = await authedFetch(`/api/lessons?stepId=${encodeURIComponent(stepId)}`);
    if (!res.ok) return null;
    const { lesson } = (await res.json()) as { lesson: LessonContent | null };
    return lesson ?? null;
  } catch {
    return null;
  }
}

async function serverSet(stepId: string, lesson: LessonContent): Promise<void> {
  try {
    const res = await authedFetch("/api/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stepId, content: lesson }),
    });
    // A failed lesson save means generated content isn't persisted — surface it.
    if (!res.ok) syncStatus.error();
  } catch {
    syncStatus.error();
  }
}

async function serverDel(stepId: string): Promise<void> {
  try {
    await authedFetch(`/api/lessons?stepId=${encodeURIComponent(stepId)}`, {
      method: "DELETE",
    });
  } catch {
    /* best-effort */
  }
}

/* ── Public async API ────────────────────────────────────────────────────── */

/**
 * Get a generated lesson. Checks memory first (instant), then the server
 * (Postgres). Returns null if not stored yet — caller should generate.
 */
export async function getLesson(stepId: string): Promise<LessonContent | null> {
  const mem = memGet(stepId);
  if (mem) return mem;

  const persisted = await serverGet(stepId);
  if (persisted) {
    // Warm the memory layer for subsequent same-session reads
    memSet(stepId, persisted);
    return persisted;
  }
  return null;
}

/**
 * Store a generated lesson in both layers. The memory write is instant, so the
 * lesson is immediately available for same-session reads; the server write
 * persists it per user.
 */
export async function storeLesson(stepId: string, lesson: LessonContent): Promise<void> {
  memSet(stepId, lesson);
  await serverSet(stepId, lesson);
}

/**
 * Remove a lesson from both layers (e.g. after the content engine is updated
 * and old content should be refreshed).
 */
export async function invalidateLesson(stepId: string): Promise<void> {
  memDel(stepId);
  await serverDel(stepId);
}

/* ── Legacy sync shim — memory-only, for backward compatibility ──────────── */

/** @deprecated Use async getLesson() instead. Memory-only — not persistent. */
export function getCachedLesson(stepId: string): LessonContent | null {
  return memGet(stepId);
}

/** @deprecated Use async storeLesson() instead. Memory-only — not persistent. */
export function cacheLesson(stepId: string, lesson: LessonContent): void {
  memSet(stepId, lesson);
}

/** @deprecated Use async invalidateLesson() instead. */
export function invalidateCachedLesson(stepId: string): void {
  memDel(stepId);
}
