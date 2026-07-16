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
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

/**
 * The pool is created LAZILY on first use. This matters for `next build`, which
 * loads route modules to collect page data — importing this file must not throw
 * just because DATABASE_URL isn't present in the build environment. The error
 * is deferred until a query is actually attempted at runtime.
 *
 * Reuse the pool across hot-reloads in dev so we don't leak connections on
 * every file change. In production a single module instance owns one pool.
 */
const globalForPg = globalThis as unknown as {
  __zoePgPool?: Pool;
  __zoeDb?: NodePgDatabase<typeof schema>;
};

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your environment (see .env.example).",
    );
  }
  const p = new Pool({
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
  if (process.env.NODE_ENV !== "production") globalForPg.__zoePgPool = p;
  return p;
}

function getPool(): Pool {
  return (globalForPg.__zoePgPool ??= createPool());
}

/**
 * The shared pg Pool, resolved lazily. Accessing any property (e.g. `.query`,
 * `.connect`) creates the pool on first touch — so `import { pool }` is safe at
 * build time; only a real query needs DATABASE_URL.
 */
export const pool: Pool = new Proxy({} as Pool, {
  get(_t, prop) {
    const p = getPool();
    const value = (p as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function" ? (value as (...a: unknown[]) => unknown).bind(p) : value;
  },
}) as Pool;

/** Drizzle query builder over the same lazy pool. */
export const db: NodePgDatabase<typeof schema> = new Proxy(
  {} as NodePgDatabase<typeof schema>,
  {
    get(_t, prop) {
      const d = (globalForPg.__zoeDb ??= drizzle(getPool(), { schema }));
      const value = (d as unknown as Record<string | symbol, unknown>)[prop];
      return typeof value === "function" ? (value as (...a: unknown[]) => unknown).bind(d) : value;
    },
  },
) as NodePgDatabase<typeof schema>;

export { schema };
