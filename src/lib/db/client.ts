/**
 * ZOE — database client (server-only).
 *
 * A single shared node-postgres Pool wrapped by Drizzle. `db` gives you the
 * typed query builder; `pool` is exposed for raw parameterized SQL (e.g.
 * `pool.query('SELECT ... WHERE id = $1', [id])`) and for pgvector work that
 * Drizzle doesn't cover yet.
 *
 * NEVER import this from a client component — it must stay server-side. The
 * `import "server-only"` guard turns any accidental client import into a build
 * error.
 */

import "server-only";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to your environment (see .env.example).",
  );
}

/**
 * Reuse the pool across hot-reloads in dev so we don't leak connections on
 * every file change. In production a single module instance owns one pool.
 */
const globalForPg = globalThis as unknown as { __zoePgPool?: Pool };

export const pool =
  globalForPg.__zoePgPool ??
  new Pool({
    connectionString,
    max: Number(process.env.PGPOOL_MAX ?? 10),
    // Enable TLS for hosted Postgres (Neon/Supabase/RDS) unless explicitly off.
    ssl:
      process.env.PGSSL === "disable"
        ? false
        : process.env.PGSSL === "require"
          ? { rejectUnauthorized: false }
          : undefined,
  });

if (process.env.NODE_ENV !== "production") globalForPg.__zoePgPool = pool;

export const db = drizzle(pool, { schema });

export { schema };
