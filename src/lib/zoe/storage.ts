/**
 * Persistence boundary for the ZOE Brain.
 *
 * Today this is localStorage. The `ZoeStorage` shape matches Zustand's
 * StateStorage so the day we move to a backend we only implement one adapter
 * (e.g. `createApiStorage()` that calls Supabase) and swap it in `brain.ts` —
 * no store or UI changes required.
 */

export interface ZoeStorage {
  getItem: (name: string) => string | null | Promise<string | null>;
  setItem: (name: string, value: string) => void | Promise<void>;
  removeItem: (name: string) => void | Promise<void>;
}

const memoryFallback = new Map<string, string>();

/** SSR-safe, fault-tolerant localStorage adapter. */
export const localStorageAdapter: ZoeStorage = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(name);
    } catch {
      return memoryFallback.get(name) ?? null;
    }
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(name, value);
    } catch {
      memoryFallback.set(name, value);
    }
  },
  removeItem: (name) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(name);
    } catch {
      memoryFallback.delete(name);
    }
  },
};

export const ZOE_STORAGE_KEY = "zoe-brain-v1";

/**
 * Future: a backend-backed adapter. Kept here as the single, documented swap
 * point so the migration is mechanical.
 *
 *   export function createApiStorage(client): ZoeStorage { ... }
 */
