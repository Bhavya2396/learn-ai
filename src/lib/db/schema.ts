/**
 * ZOE — Drizzle schema.
 *
 * A typed mirror of src/lib/db/schema.sql. The JSONB columns are typed against
 * the existing ZOE domain types (src/lib/zoe/types.ts + content-types.ts) so
 * reads/writes stay type-safe end to end. This is the migration target for the
 * data that lives in localStorage today — see schema.sql for the design notes.
 */

import {
  pgTable, text, bigint, boolean, jsonb, real, integer, index, uniqueIndex, primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { vector } from "drizzle-orm/pg-core";
import type {
  BehavioralMetrics, CognitiveStyle, DnaDimension, Journey, StarterFacts, TeachingStyle,
} from "@/lib/zoe/types";
import type { AspirationSource, LessonContent } from "@/lib/zoe/content-types";

/* ── Accounts ─────────────────────────────────────────────────────────────── */
// `id` is the Firebase Auth uid. Profile fields (display_name/photo_url/
// provider) come from the Google sign-in; last_login_at is stamped each session.
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  displayName: text("display_name"),
  photoUrl: text("photo_url"),
  provider: text("provider"),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
  updatedAt: bigint("updated_at", { mode: "number" }).notNull(),
  lastLoginAt: bigint("last_login_at", { mode: "number" }),
});

/* ── Identity (ZoeIdentity) ───────────────────────────────────────────────── */
export const zoeIdentity = pgTable("zoe_identity", {
  userId: text("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  id: text("id").notNull(),
  name: text("name").notNull(),
  ageGroup: text("age_group").notNull(),
  locale: text("locale").notNull().default("en"),
  // Starter facts (age/role/time) captured once, reused by the Architect on
  // every goal. Stored as a whole object (read/written together).
  starter: jsonb("starter").$type<StarterFacts>().notNull().default(sql`'{}'::jsonb`),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
  lastActiveAt: bigint("last_active_at", { mode: "number" }).notNull(),
});

/* ── Profile (ZoeProfile) ─────────────────────────────────────────────────── */
export const zoeProfile = pgTable("zoe_profile", {
  userId: text("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  summary: text("summary").notNull().default(""),
  timeAvailability: text("time_availability"),
  emotionalBaseline: text("emotional_baseline"),
  motivations: jsonb("motivations").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  strengths: jsonb("strengths").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  growthEdges: jsonb("growth_edges").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  cognitiveStyle: jsonb("cognitive_style").$type<CognitiveStyle>().notNull().default(sql`'{}'::jsonb`),
  dimensions: jsonb("dimensions").$type<DnaDimension[]>().notNull().default(sql`'[]'::jsonb`),
  behavioral: jsonb("behavioral").$type<BehavioralMetrics>().notNull().default(sql`'{}'::jsonb`),
  teaching: jsonb("teaching").$type<TeachingStyle>().notNull().default(sql`'{}'::jsonb`),
  updatedAt: bigint("updated_at", { mode: "number" }).notNull(),
});

/* ── Aspirations + Journeys (Aspiration) ──────────────────────────────────── */
export const aspirations = pgTable(
  "aspirations",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    area: text("area").notNull(),
    why: text("why"),
    status: text("status").notNull().default("active"),
    journey: jsonb("journey").$type<Journey | null>(),
    source: jsonb("source").$type<AspirationSource | null>(),
    isActive: boolean("is_active").notNull().default(false),
    createdAt: bigint("created_at", { mode: "number" }).notNull(),
    updatedAt: bigint("updated_at", { mode: "number" }).notNull(),
  },
  (t) => [
    index("aspirations_user_idx").on(t.userId),
    index("aspirations_user_status_idx").on(t.userId, t.status),
    uniqueIndex("aspirations_one_active_per_user").on(t.userId).where(sql`${t.isActive}`),
  ],
);

/* ── Episodic memory (MemoryEvent) ────────────────────────────────────────── */
export const memoryEvents = pgTable(
  "memory_events",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    ts: bigint("ts", { mode: "number" }).notNull(),
    type: text("type").notNull(),
    summary: text("summary").notNull(),
    aspirationId: text("aspiration_id"),
    area: text("area"),
    stepId: text("step_id"),
    sentiment: text("sentiment"),
    importance: real("importance").notNull().default(0),
    tags: jsonb("tags").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
    payload: jsonb("payload").$type<Record<string, unknown> | null>(),
    // NULL for now — no embedding code exists yet. Reserved for future
    // semantic retrieval over `summary`. 768 = Gemini embedding width.
    embedding: vector("embedding", { dimensions: 768 }),
  },
  (t) => [
    index("memory_events_user_ts_idx").on(t.userId, t.ts.desc()),
    index("memory_events_user_type_idx").on(t.userId, t.type),
  ],
);

/* ── ZOT ledger (TokenEntry) ──────────────────────────────────────────────── */
export const tokenLedger = pgTable(
  "token_ledger",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    ts: bigint("ts", { mode: "number" }).notNull(),
    stream: text("stream").notNull(),
    amount: integer("amount").notNull(),
    reason: text("reason").notNull(),
  },
  (t) => [index("token_ledger_user_ts_idx").on(t.userId, t.ts.desc())],
);

/* ── Lessons — durable per-user generated lesson content (LessonContent) ───── */
export const lessons = pgTable(
  "lessons",
  {
    stepId: text("step_id").notNull(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    content: jsonb("content").$type<LessonContent>().notNull(),
    createdAt: bigint("created_at", { mode: "number" }).notNull(),
    updatedAt: bigint("updated_at", { mode: "number" }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.stepId] })],
);

/* ── Inferred row types ───────────────────────────────────────────────────── */
export type UserRow = typeof users.$inferSelect;
export type IdentityRow = typeof zoeIdentity.$inferSelect;
export type ProfileRow = typeof zoeProfile.$inferSelect;
export type AspirationRow = typeof aspirations.$inferSelect;
export type MemoryEventRow = typeof memoryEvents.$inferSelect;
export type TokenEntryRow = typeof tokenLedger.$inferSelect;
export type LessonRow = typeof lessons.$inferSelect;
