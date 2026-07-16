/**
 * ZOE — lessons repository (server-only, raw SQL).
 *
 * Durable per-user store for generated lesson content (src/lib/zoe/lesson-
 * store.ts is the client side). Content is stored in Postgres keyed by
 * (user_id, step_id) so a user's lessons persist indefinitely — across devices
 * and browser wipes. No TTL, no client storage involved.
 */

import "server-only";
import { pool } from "./client";
import type { LessonContent } from "@/lib/zoe/content-types";

/** Fetch a cached lesson for (user, step), or null if not generated yet. */
export async function getLessonForUser(
  userId: string,
  stepId: string,
): Promise<LessonContent | null> {
  const res = await pool.query(
    `SELECT content FROM lessons WHERE user_id = $1 AND step_id = $2`,
    [userId, stepId],
  );
  return res.rows[0]?.content ?? null;
}

/** Upsert a generated lesson for (user, step). */
export async function storeLessonForUser(
  userId: string,
  stepId: string,
  content: LessonContent,
): Promise<void> {
  const now = Date.now();
  await pool.query(
    `INSERT INTO lessons (user_id, step_id, content, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $4)
     ON CONFLICT (user_id, step_id) DO UPDATE SET
       content = EXCLUDED.content, updated_at = EXCLUDED.updated_at`,
    [userId, stepId, JSON.stringify(content), now],
  );
}

/** Delete a cached lesson for (user, step). */
export async function deleteLessonForUser(userId: string, stepId: string): Promise<void> {
  await pool.query(
    `DELETE FROM lessons WHERE user_id = $1 AND step_id = $2`,
    [userId, stepId],
  );
}
