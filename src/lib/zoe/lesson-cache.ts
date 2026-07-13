/**
 * Lesson content store — two-layer persistence.
 *
 * Layer 1: In-memory LRU map (fast, current session, up to MEM_MAX entries)
 * Layer 2: IndexedDB   (persistent across refreshes, up to IDB_MAX entries)
 *
 * Lessons can be 50-500 KB each (base64 images, interactive code), so
 * localStorage is unsuitable. IndexedDB handles gigabytes per origin.
 *
 * Public API (all async so callers don't care which layer answers):
 *   getLesson(stepId)          → LessonContent | null
 *   storeLesson(stepId, data)  → void (fire-and-forget is fine)
 *   invalidateLesson(stepId)   → void
 *
 * Legacy sync shim (memory-only, kept for any callers not yet updated):
 *   getCachedLesson(stepId)    → LessonContent | null
 *   cacheLesson(stepId, data)  → void
 */

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

/* ── IndexedDB layer ─────────────────────────────────────────────────────── */

const DB_NAME = "zoe-lessons";
const DB_VERSION = 1;
const OS_NAME = "lessons";
const IDB_MAX = 60;

interface IdbRecord {
  id: string;
  ts: number;
  lesson: LessonContent;
}

let _db: IDBDatabase | null = null;
let _opening: Promise<IDBDatabase | null> | null = null;
let _failed = false;

function openDb(): Promise<IDBDatabase | null> {
  if (_failed || typeof window === "undefined" || !("indexedDB" in window)) {
    return Promise.resolve(null);
  }
  if (_db) return Promise.resolve(_db);
  if (_opening) return _opening;

  _opening = new Promise<IDBDatabase | null>((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION);

      req.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(OS_NAME)) {
          const os = db.createObjectStore(OS_NAME, { keyPath: "id" });
          os.createIndex("ts", "ts"); // for LRU eviction
        }
      };

      req.onsuccess = () => {
        _db = req.result;
        _db.onerror = () => { _db = null; _failed = true; };
        resolve(_db);
      };

      req.onerror = () => { _failed = true; _opening = null; resolve(null); };
      req.onblocked = () => { _failed = true; _opening = null; resolve(null); };
    } catch {
      _failed = true;
      _opening = null;
      resolve(null);
    }
  });

  return _opening;
}

async function idbGet(stepId: string): Promise<LessonContent | null> {
  const db = await openDb();
  if (!db) return null;
  return new Promise<LessonContent | null>((resolve) => {
    try {
      const tx = db.transaction(OS_NAME, "readonly");
      const req = tx.objectStore(OS_NAME).get(stepId);
      req.onsuccess = () => resolve((req.result as IdbRecord | undefined)?.lesson ?? null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function idbSet(stepId: string, lesson: LessonContent): Promise<void> {
  const db = await openDb();
  if (!db) return;

  // Count entries and evict oldest if over limit
  const count = await new Promise<number>((resolve) => {
    try {
      const tx = db.transaction(OS_NAME, "readonly");
      const req = tx.objectStore(OS_NAME).count();
      req.onsuccess = () => resolve(req.result as number);
      req.onerror = () => resolve(0);
    } catch { resolve(0); }
  });

  if (count >= IDB_MAX) {
    // Delete the single oldest entry by ts index
    await new Promise<void>((resolve) => {
      try {
        const tx = db.transaction(OS_NAME, "readwrite");
        const cursor = tx.objectStore(OS_NAME).index("ts").openCursor();
        cursor.onsuccess = (e) => {
          const c = (e.target as IDBRequest<IDBCursorWithValue | null>).result;
          if (c) { c.delete(); }
          resolve();
        };
        cursor.onerror = () => resolve();
      } catch { resolve(); }
    });
  }

  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(OS_NAME, "readwrite");
      const record: IdbRecord = { id: stepId, ts: Date.now(), lesson };
      const req = tx.objectStore(OS_NAME).put(record);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve(); // best-effort
    } catch { resolve(); }
  });
}

async function idbDel(stepId: string): Promise<void> {
  const db = await openDb();
  if (!db) return;
  return new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(OS_NAME, "readwrite");
      tx.objectStore(OS_NAME).delete(stepId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch { resolve(); }
  });
}

/* ── Public async API ────────────────────────────────────────────────────── */

/**
 * Get a generated lesson. Checks memory first (instant), then IndexedDB
 * (milliseconds). Returns null if not stored yet — caller should generate.
 */
export async function getLesson(stepId: string): Promise<LessonContent | null> {
  const mem = memGet(stepId);
  if (mem) return mem;

  const persisted = await idbGet(stepId);
  if (persisted) {
    // Warm the memory layer for subsequent same-session reads
    memSet(stepId, persisted);
    return persisted;
  }
  return null;
}

/**
 * Store a generated lesson in both layers. Fire-and-forget is fine — the
 * IDB write is async but the memory write is instant, so the lesson is
 * immediately available for same-session reads.
 */
export async function storeLesson(stepId: string, lesson: LessonContent): Promise<void> {
  memSet(stepId, lesson);
  await idbSet(stepId, lesson); // persist — survives session end
}

/**
 * Remove a lesson from both layers (e.g. after the content engine is updated
 * and old content should be refreshed).
 */
export async function invalidateLesson(stepId: string): Promise<void> {
  memDel(stepId);
  await idbDel(stepId);
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
