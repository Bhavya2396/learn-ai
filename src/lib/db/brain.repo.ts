/**
 * ZOE — brain repository (server-only, raw SQL).
 *
 * Bridges the browser's ZoeBrainState (src/lib/zoe/types.ts) to Postgres. The
 * whole point is a *smooth migration*: `loadBrain(userId)` returns the exact
 * ZoeBrainState shape the Zustand store already expects, and `saveBrain(userId,
 * state)` persists it. No app behaviour changes — this is just the storage
 * substrate the store can adopt later in place of localStorage.
 *
 * Written with raw, parameterized SQL via the shared pg Pool (per the raw-query
 * preference). `saveBrain` runs in a single transaction so a user's brain is
 * always written atomically.
 */

import "server-only";
import { pool } from "./client";
import type { PoolClient } from "pg";
import type {
  Aspiration, MemoryEvent, TokenEntry, ZoeBrainState, ZoeIdentity, ZoeProfile,
} from "@/lib/zoe/types";

/** Ensure a user row exists; returns nothing. Call before saving a brain. */
export async function ensureUser(userId: string, email?: string): Promise<void> {
  const now = Date.now();
  await pool.query(
    `INSERT INTO users (id, email, created_at, updated_at)
     VALUES ($1, $2, $3, $3)
     ON CONFLICT (id) DO UPDATE SET email = COALESCE(EXCLUDED.email, users.email),
                                    updated_at = EXCLUDED.updated_at`,
    [userId, email ?? null, now],
  );
}

/* ── Load ─────────────────────────────────────────────────────────────────── */

/**
 * Reassemble a full ZoeBrainState for a user. Returns null if the user has no
 * identity row yet (i.e. nothing persisted). The returned object is the same
 * shape the Zustand store persists today.
 */
export async function loadBrain(userId: string): Promise<ZoeBrainState | null> {
  const [identity, profile, aspirations, events, ledger, active] = await Promise.all([
    pool.query(
      `SELECT id, name, age_group, locale, created_at, last_active_at
         FROM zoe_identity WHERE user_id = $1`,
      [userId],
    ),
    pool.query(
      `SELECT summary, motivations, cognitive_style, time_availability,
              emotional_baseline, strengths, growth_edges, dimensions,
              behavioral, teaching, updated_at
         FROM zoe_profile WHERE user_id = $1`,
      [userId],
    ),
    pool.query(
      `SELECT id, title, area, why, status, journey, source, created_at, updated_at
         FROM aspirations WHERE user_id = $1 ORDER BY created_at ASC`,
      [userId],
    ),
    pool.query(
      `SELECT id, ts, type, summary, aspiration_id, area, step_id, sentiment,
              importance, tags, payload
         FROM memory_events WHERE user_id = $1 ORDER BY ts ASC`,
      [userId],
    ),
    pool.query(
      `SELECT id, ts, stream, amount, reason
         FROM token_ledger WHERE user_id = $1 ORDER BY ts ASC`,
      [userId],
    ),
    pool.query(
      `SELECT id FROM aspirations WHERE user_id = $1 AND is_active LIMIT 1`,
      [userId],
    ),
  ]);

  if (identity.rowCount === 0) return null;

  const idr = identity.rows[0];
  const zoeIdentity: ZoeIdentity = {
    id: idr.id,
    name: idr.name,
    ageGroup: idr.age_group,
    locale: idr.locale,
    createdAt: Number(idr.created_at),
    lastActiveAt: Number(idr.last_active_at),
  };

  let zoeProfile: ZoeProfile | null = null;
  if (profile.rowCount && profile.rowCount > 0) {
    const p = profile.rows[0];
    zoeProfile = {
      summary: p.summary,
      motivations: p.motivations,
      cognitiveStyle: p.cognitive_style,
      timeAvailability: p.time_availability ?? undefined,
      emotionalBaseline: p.emotional_baseline ?? undefined,
      strengths: p.strengths,
      growthEdges: p.growth_edges,
      dimensions: p.dimensions,
      behavioral: p.behavioral,
      teaching: p.teaching,
      updatedAt: Number(p.updated_at),
    };
  }

  const asps: Aspiration[] = aspirations.rows.map((a) => ({
    id: a.id,
    title: a.title,
    area: a.area,
    why: a.why ?? undefined,
    createdAt: Number(a.created_at),
    updatedAt: Number(a.updated_at),
    status: a.status,
    journey: a.journey ?? null,
    source: a.source ?? null,
  }));

  const memEvents: MemoryEvent[] = events.rows.map((e) => ({
    id: e.id,
    ts: Number(e.ts),
    type: e.type,
    summary: e.summary,
    aspirationId: e.aspiration_id ?? undefined,
    area: e.area ?? undefined,
    stepId: e.step_id ?? undefined,
    sentiment: e.sentiment ?? undefined,
    importance: e.importance,
    tags: e.tags,
    payload: e.payload ?? undefined,
  }));

  const tokens: TokenEntry[] = ledger.rows.map((t) => ({
    id: t.id,
    ts: Number(t.ts),
    stream: t.stream,
    amount: t.amount,
    reason: t.reason,
  }));

  return {
    version: 2,
    identity: zoeIdentity,
    profile: zoeProfile,
    aspirations: asps,
    activeAspirationId: active.rows[0]?.id ?? null,
    events: memEvents,
    ledger: tokens,
  };
}

/* ── Save ─────────────────────────────────────────────────────────────────── */

/**
 * Persist a full ZoeBrainState for a user, atomically. This is a full replace
 * of the user's brain rows (identity/profile upsert; aspirations/events/ledger
 * reconciled to match `state`). Safe to call as a periodic sync from the store.
 *
 * `embedding` on memory_events is deliberately left untouched (NULL) — no
 * embedding generation exists yet; that's a future additive step.
 */
export async function saveBrain(userId: string, state: ZoeBrainState): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await ensureUserTx(client, userId);
    await saveIdentityTx(client, userId, state.identity);
    await saveProfileTx(client, userId, state.profile);
    await saveAspirationsTx(client, userId, state.aspirations, state.activeAspirationId);
    await saveEventsTx(client, userId, state.events);
    await saveLedgerTx(client, userId, state.ledger);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function ensureUserTx(client: PoolClient, userId: string): Promise<void> {
  const now = Date.now();
  await client.query(
    `INSERT INTO users (id, created_at, updated_at)
     VALUES ($1, $2, $2)
     ON CONFLICT (id) DO UPDATE SET updated_at = EXCLUDED.updated_at`,
    [userId, now],
  );
}

async function saveIdentityTx(
  client: PoolClient,
  userId: string,
  identity: ZoeIdentity | null,
): Promise<void> {
  if (!identity) {
    await client.query(`DELETE FROM zoe_identity WHERE user_id = $1`, [userId]);
    return;
  }
  await client.query(
    `INSERT INTO zoe_identity
       (user_id, id, name, age_group, locale, created_at, last_active_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (user_id) DO UPDATE SET
       id = EXCLUDED.id, name = EXCLUDED.name, age_group = EXCLUDED.age_group,
       locale = EXCLUDED.locale, created_at = EXCLUDED.created_at,
       last_active_at = EXCLUDED.last_active_at`,
    [
      userId, identity.id, identity.name, identity.ageGroup, identity.locale,
      identity.createdAt, identity.lastActiveAt,
    ],
  );
}

async function saveProfileTx(
  client: PoolClient,
  userId: string,
  profile: ZoeProfile | null,
): Promise<void> {
  if (!profile) {
    await client.query(`DELETE FROM zoe_profile WHERE user_id = $1`, [userId]);
    return;
  }
  await client.query(
    `INSERT INTO zoe_profile
       (user_id, summary, time_availability, emotional_baseline, motivations,
        strengths, growth_edges, cognitive_style, dimensions, behavioral,
        teaching, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     ON CONFLICT (user_id) DO UPDATE SET
       summary = EXCLUDED.summary,
       time_availability = EXCLUDED.time_availability,
       emotional_baseline = EXCLUDED.emotional_baseline,
       motivations = EXCLUDED.motivations, strengths = EXCLUDED.strengths,
       growth_edges = EXCLUDED.growth_edges,
       cognitive_style = EXCLUDED.cognitive_style,
       dimensions = EXCLUDED.dimensions, behavioral = EXCLUDED.behavioral,
       teaching = EXCLUDED.teaching, updated_at = EXCLUDED.updated_at`,
    [
      userId, profile.summary, profile.timeAvailability ?? null,
      profile.emotionalBaseline ?? null,
      JSON.stringify(profile.motivations), JSON.stringify(profile.strengths),
      JSON.stringify(profile.growthEdges), JSON.stringify(profile.cognitiveStyle),
      JSON.stringify(profile.dimensions), JSON.stringify(profile.behavioral),
      JSON.stringify(profile.teaching), profile.updatedAt,
    ],
  );
}

async function saveAspirationsTx(
  client: PoolClient,
  userId: string,
  aspirations: Aspiration[],
  activeAspirationId: string | null,
): Promise<void> {
  // Upsert every aspiration, then delete any that are no longer present.
  for (const a of aspirations) {
    await client.query(
      `INSERT INTO aspirations
         (id, user_id, title, area, why, status, journey, source, is_active,
          created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (id) DO UPDATE SET
         title = EXCLUDED.title, area = EXCLUDED.area, why = EXCLUDED.why,
         status = EXCLUDED.status, journey = EXCLUDED.journey,
         source = EXCLUDED.source, is_active = EXCLUDED.is_active,
         updated_at = EXCLUDED.updated_at`,
      [
        a.id, userId, a.title, a.area, a.why ?? null, a.status,
        a.journey ? JSON.stringify(a.journey) : null,
        a.source ? JSON.stringify(a.source) : null,
        a.id === activeAspirationId, a.createdAt, a.updatedAt,
      ],
    );
  }
  const keepIds = aspirations.map((a) => a.id);
  await client.query(
    `DELETE FROM aspirations WHERE user_id = $1 AND NOT (id = ANY($2::text[]))`,
    [userId, keepIds],
  );
}

async function saveEventsTx(
  client: PoolClient,
  userId: string,
  events: MemoryEvent[],
): Promise<void> {
  for (const e of events) {
    // embedding intentionally omitted — stays NULL (no embedding pipeline yet).
    await client.query(
      `INSERT INTO memory_events
         (id, user_id, ts, type, summary, aspiration_id, area, step_id,
          sentiment, importance, tags, payload)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (id) DO UPDATE SET
         type = EXCLUDED.type, summary = EXCLUDED.summary,
         aspiration_id = EXCLUDED.aspiration_id, area = EXCLUDED.area,
         step_id = EXCLUDED.step_id, sentiment = EXCLUDED.sentiment,
         importance = EXCLUDED.importance, tags = EXCLUDED.tags,
         payload = EXCLUDED.payload`,
      [
        e.id, userId, e.ts, e.type, e.summary, e.aspirationId ?? null,
        e.area ?? null, e.stepId ?? null, e.sentiment ?? null, e.importance,
        JSON.stringify(e.tags), e.payload ? JSON.stringify(e.payload) : null,
      ],
    );
  }
  const keepIds = events.map((e) => e.id);
  await client.query(
    `DELETE FROM memory_events WHERE user_id = $1 AND NOT (id = ANY($2::text[]))`,
    [userId, keepIds],
  );
}

async function saveLedgerTx(
  client: PoolClient,
  userId: string,
  ledger: TokenEntry[],
): Promise<void> {
  for (const t of ledger) {
    await client.query(
      `INSERT INTO token_ledger (id, user_id, ts, stream, amount, reason)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO UPDATE SET
         stream = EXCLUDED.stream, amount = EXCLUDED.amount, reason = EXCLUDED.reason`,
      [t.id, userId, t.ts, t.stream, t.amount, t.reason],
    );
  }
  const keepIds = ledger.map((t) => t.id);
  await client.query(
    `DELETE FROM token_ledger WHERE user_id = $1 AND NOT (id = ANY($2::text[]))`,
    [userId, keepIds],
  );
}
