# ZOE database layer

PostgreSQL + **pgvector** persistence for the ZOE brain. This is a **migration
target** for the state that currently lives in the browser's `localStorage`
(`src/lib/zoe/brain.ts`) — it does not change any current app behaviour.

## Files

| File | Purpose |
| --- | --- |
| `schema.ts` | **Source of truth.** Drizzle schema, typed against the ZOE domain types. Migrations are generated from this. |
| `migrations/` | Versioned SQL migrations (generated). Applied with `npm run db:migrate`. |
| `schema.sql` | Human-readable reference DDL (annotated). Not applied directly — the migrations are. |
| `client.ts` | Shared `pg` Pool + Drizzle `db` (server-only). Raw SQL via `pool`. |
| `brain.repo.ts` | `loadBrain(userId)` / `saveBrain(userId, state)` — raw parameterized SQL. |

## Design notes

- **IDs are `TEXT`**, not UUIDs — the app generates base-36 string ids
  (`generateId()`), so existing local data imports verbatim.
- **Timestamps are `BIGINT`** (epoch millis) — matches `Date.now()` in the app,
  so no shape change on migration.
- **Journeys / sources / profile sub-objects are `JSONB`** — the store always
  reads/writes them as whole objects.
- **`memory_events.embedding` is `vector(768)` and NULLABLE.** Nothing writes it
  yet — the app has no embedding code. It exists so the *planned* semantic-memory
  retrieval is a smooth, additive migration. Enable the HNSW index (commented in
  `schema.sql`) once embeddings are populated.

## Setup

1. Provision a pgvector-capable Postgres. Locally that's just:
   ```bash
   docker compose up -d db
   ```
   (or use Neon / Supabase / RDS).
2. Set `DATABASE_URL` (and `PGSSL` for hosted DBs) — see `.env.example`.
3. Once the db is up, apply migrations (like `prisma migrate deploy`):
   ```bash
   npm run db:migrate
   ```
   The first migration also runs `CREATE EXTENSION vector`, so a fresh database
   is fully provisioned in one command — nothing else to run by hand.

### Changing the schema

Edit `schema.ts`, then generate a new migration and apply it:

```bash
npm run db:generate   # writes a new migrations/NNNN_*.sql from schema.ts
npm run db:migrate    # applies pending migrations
```

`npm run db:push` (schema-sync, no migration files) and `npm run db:studio`
(browser DB UI) are available for quick dev iteration.

## Usage (server-side only)

```ts
import { loadBrain, saveBrain, ensureUser } from "@/lib/db/brain.repo";

await ensureUser(userId, email);
const brain = await loadBrain(userId);   // ZoeBrainState | null
await saveBrain(userId, brainState);     // atomic full-brain upsert
```

For anything Drizzle/raw:

```ts
import { db, pool, schema } from "@/lib/db/client";

// Drizzle query builder
const rows = await db.select().from(schema.aspirations);

// Raw parameterized SQL
const { rows } = await pool.query(
  "SELECT * FROM memory_events WHERE user_id = $1 ORDER BY ts DESC",
  [userId],
);
```
