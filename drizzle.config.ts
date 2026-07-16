import { defineConfig } from "drizzle-kit";

// Load .env when present (local dev). In the production container the env comes
// from the runtime (compose) and dotenv isn't installed — so this is optional.
try { require("dotenv/config"); } catch { /* no dotenv in prod image */ }

/**
 * Drizzle Kit config — used for generating/pushing migrations from
 * src/lib/db/schema.ts. Requires DATABASE_URL in the environment.
 *
 *   npx drizzle-kit generate   # create SQL migrations from the schema
 *   npx drizzle-kit push       # push the schema straight to the DB (dev)
 *
 * Note: pgvector's `CREATE EXTENSION vector` and the HNSW index live in
 * src/lib/db/schema.sql — run that once against the DB before first use, since
 * drizzle-kit does not manage the extension itself.
 */
export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
