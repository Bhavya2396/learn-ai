-- ============================================================================
-- ZOE — PostgreSQL schema (with pgvector) — ANNOTATED REFERENCE
-- ============================================================================
--
-- NOTE: This file is documentation, not the thing you run. The source of truth
-- is src/lib/db/schema.ts; migrations are generated from it into
-- src/lib/db/migrations/ and applied with `npm run db:migrate`. This annotated
-- copy exists so the design and column intent are readable in one place.
--
-- This mirrors the ZoeBrainState data model that today lives in the browser's
-- localStorage (see src/lib/zoe/types.ts + src/lib/zoe/brain.ts). It is a
-- *migration target*, not a change to current behaviour:
--
--   * IDs stay TEXT — the app generates base-36 string ids (generateId()),
--     not UUIDs. Keeping TEXT means existing local data imports verbatim.
--   * Timestamps stay BIGINT — the app stores epoch-millis `number`s
--     (Date.now()). Storing them as BIGINT avoids any shape change; convert to
--     timestamptz later if desired.
--   * journey / source / profile sub-objects are stored as JSONB — the app
--     always reads/writes them as whole objects, so blob storage is a 1:1 fit.
--
-- pgvector is enabled and memory_events carries a NULLABLE embedding column.
-- Nothing writes embeddings yet (the app has no embedding code). The column +
-- extension exist purely so the planned semantic-memory feature is a smooth,
-- additive migration — not a behavioural change now.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS vector;

-- ── Accounts ────────────────────────────────────────────────────────────────
-- Root of the multi-tenant model. Everything below FKs to users(id).
-- `id` is the Firebase Auth uid (identity comes from Google sign-in). The
-- profile columns mirror the Firebase user profile; last_login_at is stamped
-- each session start.
CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,
  email         TEXT UNIQUE,
  display_name  TEXT,
  photo_url     TEXT,
  provider      TEXT,
  created_at    BIGINT NOT NULL,
  updated_at    BIGINT NOT NULL,
  last_login_at BIGINT
);

-- ── Identity (ZoeIdentity) ──────────────────────────────────────────────────
-- One identity per user. Mirrors ZoeIdentity 1:1.
CREATE TABLE IF NOT EXISTS zoe_identity (
  user_id         TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  id              TEXT NOT NULL,              -- the app's own identity id
  name            TEXT NOT NULL,
  age_group       TEXT NOT NULL,
  locale          TEXT NOT NULL DEFAULT 'en',
  starter         JSONB NOT NULL DEFAULT '{}'::jsonb,  -- StarterFacts (age/role/time), reused per goal
  created_at      BIGINT NOT NULL,
  last_active_at  BIGINT NOT NULL
);

-- ── Profile (ZoeProfile) ────────────────────────────────────────────────────
-- The evolving read of the person. Scalar-ish fields are columns; the nested
-- arrays/objects (dimensions[], behavioral, teaching, cognitiveStyle,
-- motivations[], strengths[], growthEdges[]) are JSONB — always read/written
-- together, never queried field-by-field.
CREATE TABLE IF NOT EXISTS zoe_profile (
  user_id            TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  summary            TEXT NOT NULL DEFAULT '',
  time_availability  TEXT,
  emotional_baseline TEXT,
  motivations        JSONB NOT NULL DEFAULT '[]'::jsonb,
  strengths          JSONB NOT NULL DEFAULT '[]'::jsonb,
  growth_edges       JSONB NOT NULL DEFAULT '[]'::jsonb,
  cognitive_style    JSONB NOT NULL DEFAULT '{}'::jsonb,  -- CognitiveStyle
  dimensions         JSONB NOT NULL DEFAULT '[]'::jsonb,  -- DnaDimension[]
  behavioral         JSONB NOT NULL DEFAULT '{}'::jsonb,  -- BehavioralMetrics
  teaching           JSONB NOT NULL DEFAULT '{}'::jsonb,  -- TeachingStyle
  updated_at         BIGINT NOT NULL
);

-- ── Aspirations + Journeys (Aspiration) ─────────────────────────────────────
-- Scalar fields are columns for filtering/ordering; the whole journey (phases,
-- steps, mastery, threads, skillTiers, mermaid) and the document `source`
-- dossier are JSONB, matching how the store mutates them (as one object).
CREATE TABLE IF NOT EXISTS aspirations (
  id          TEXT PRIMARY KEY,               -- the app's aspiration id
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  area        TEXT NOT NULL,                  -- LifeArea
  why         TEXT,
  status      TEXT NOT NULL DEFAULT 'active', -- AspirationStatus
  journey     JSONB,                          -- Journey | null
  source      JSONB,                          -- AspirationSource | null
  is_active   BOOLEAN NOT NULL DEFAULT FALSE, -- mirrors activeAspirationId
  created_at  BIGINT NOT NULL,
  updated_at  BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS aspirations_user_idx        ON aspirations (user_id);
CREATE INDEX IF NOT EXISTS aspirations_user_status_idx ON aspirations (user_id, status);
-- exactly one active aspiration per user (matches activeAspirationId semantics)
CREATE UNIQUE INDEX IF NOT EXISTS aspirations_one_active_per_user
  ON aspirations (user_id) WHERE is_active;

-- ── Episodic memory (MemoryEvent) ───────────────────────────────────────────
-- The memory log. `embedding` is NULLABLE and unused today — reserved for the
-- planned semantic retrieval over `summary`. 768 dims suits Gemini
-- text-embedding-004 / gemini-embedding output; change the width when the
-- embedding model is chosen.
CREATE TABLE IF NOT EXISTS memory_events (
  id             TEXT PRIMARY KEY,            -- the app's event id
  user_id        TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ts             BIGINT NOT NULL,
  type           TEXT NOT NULL,               -- MemoryType
  summary        TEXT NOT NULL,
  aspiration_id  TEXT,                        -- soft ref (event may outlive aspiration)
  area           TEXT,
  step_id        TEXT,
  sentiment      TEXT,                        -- Sentiment | null
  importance     REAL NOT NULL DEFAULT 0,     -- 0..1 retrieval weight
  tags           JSONB NOT NULL DEFAULT '[]'::jsonb,
  payload        JSONB,
  embedding      vector(768)                  -- NULL for now; future semantic search
);
CREATE INDEX IF NOT EXISTS memory_events_user_ts_idx ON memory_events (user_id, ts DESC);
CREATE INDEX IF NOT EXISTS memory_events_user_type_idx ON memory_events (user_id, type);
-- ANN index — harmless while embeddings are NULL; ready when they're populated.
-- HNSW on cosine distance. Uncomment/tune once vectors exist.
-- CREATE INDEX IF NOT EXISTS memory_events_embedding_idx
--   ON memory_events USING hnsw (embedding vector_cosine_ops);

-- ── ZOT ledger (TokenEntry) ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS token_ledger (
  id       TEXT PRIMARY KEY,                  -- the app's token entry id
  user_id  TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ts       BIGINT NOT NULL,
  stream   TEXT NOT NULL,                     -- ZotStream
  amount   INTEGER NOT NULL,
  reason   TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS token_ledger_user_ts_idx ON token_ledger (user_id, ts DESC);

-- ── Lesson cache (LessonContent) ────────────────────────────────────────────
-- Mirrors the browser IndexedDB lesson cache (src/lib/zoe/lesson-cache.ts):
-- generated lesson content keyed by step id. Optional to use server-side, but
-- included so the whole persistence story can move to PG. Scoped per user so a
-- user's generated content is theirs.
CREATE TABLE IF NOT EXISTS lessons (
  step_id     TEXT NOT NULL,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content     JSONB NOT NULL,                 -- LessonContent
  created_at  BIGINT NOT NULL,
  updated_at  BIGINT NOT NULL,
  PRIMARY KEY (user_id, step_id)
);
