"use client";

/**
 * App-wide persistence health. Any server write that fails (brain save, lesson
 * save) flips this to "error" so the UI can tell the user their work isn't
 * saving — instead of silently pretending it worked. No auto-retry: we surface
 * "something went wrong, try again later" and let the next real change re-attempt.
 */

import { create } from "zustand";

export type SyncState = "idle" | "saving" | "error";

interface SyncStatusStore {
  state: SyncState;
  /** Human message shown to the user when state === "error". */
  message: string;
  setSaving: () => void;
  setSaved: () => void;
  setError: (message?: string) => void;
}

const DEFAULT_ERROR = "Something went wrong saving your progress. Please try again later.";

export const useSyncStatus = create<SyncStatusStore>((set) => ({
  state: "idle",
  message: "",
  setSaving: () => set((s) => (s.state === "error" ? s : { state: "saving", message: "" })),
  setSaved: () => set((s) => (s.state === "error" ? s : { state: "idle", message: "" })),
  setError: (message = DEFAULT_ERROR) => set({ state: "error", message }),
}));

/* Non-reactive helpers for use outside React (sync modules, fetch wrappers). */
export const syncStatus = {
  saving: () => useSyncStatus.getState().setSaving(),
  saved: () => useSyncStatus.getState().setSaved(),
  error: (message?: string) => useSyncStatus.getState().setError(message),
  clear: () => useSyncStatus.setState({ state: "idle", message: "" }),
};
