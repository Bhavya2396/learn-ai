-- pgvector extension: required by memory_events.embedding (vector(768)).
-- Idempotent; kept in the first migration so `db:migrate` fully provisions a
-- fresh database in one command.
CREATE EXTENSION IF NOT EXISTS vector;
--> statement-breakpoint
CREATE TABLE "aspirations" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"area" text NOT NULL,
	"why" text,
	"status" text DEFAULT 'active' NOT NULL,
	"journey" jsonb,
	"source" jsonb,
	"is_active" boolean DEFAULT false NOT NULL,
	"created_at" bigint NOT NULL,
	"updated_at" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_cache" (
	"step_id" text NOT NULL,
	"user_id" text NOT NULL,
	"content" jsonb NOT NULL,
	"created_at" bigint NOT NULL,
	"updated_at" bigint NOT NULL,
	CONSTRAINT "lesson_cache_user_id_step_id_pk" PRIMARY KEY("user_id","step_id")
);
--> statement-breakpoint
CREATE TABLE "memory_events" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"ts" bigint NOT NULL,
	"type" text NOT NULL,
	"summary" text NOT NULL,
	"aspiration_id" text,
	"area" text,
	"step_id" text,
	"sentiment" text,
	"importance" real DEFAULT 0 NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"payload" jsonb,
	"embedding" vector(768)
);
--> statement-breakpoint
CREATE TABLE "token_ledger" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"ts" bigint NOT NULL,
	"stream" text NOT NULL,
	"amount" integer NOT NULL,
	"reason" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text,
	"created_at" bigint NOT NULL,
	"updated_at" bigint NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "zoe_identity" (
	"user_id" text PRIMARY KEY NOT NULL,
	"id" text NOT NULL,
	"name" text NOT NULL,
	"age_group" text NOT NULL,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" bigint NOT NULL,
	"last_active_at" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zoe_profile" (
	"user_id" text PRIMARY KEY NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"time_availability" text,
	"emotional_baseline" text,
	"motivations" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"strengths" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"growth_edges" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cognitive_style" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"dimensions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"behavioral" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"teaching" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"updated_at" bigint NOT NULL
);
--> statement-breakpoint
ALTER TABLE "aspirations" ADD CONSTRAINT "aspirations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_cache" ADD CONSTRAINT "lesson_cache_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memory_events" ADD CONSTRAINT "memory_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "token_ledger" ADD CONSTRAINT "token_ledger_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zoe_identity" ADD CONSTRAINT "zoe_identity_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zoe_profile" ADD CONSTRAINT "zoe_profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "aspirations_user_idx" ON "aspirations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "aspirations_user_status_idx" ON "aspirations" USING btree ("user_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "aspirations_one_active_per_user" ON "aspirations" USING btree ("user_id") WHERE "aspirations"."is_active";--> statement-breakpoint
CREATE INDEX "memory_events_user_ts_idx" ON "memory_events" USING btree ("user_id","ts" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "memory_events_user_type_idx" ON "memory_events" USING btree ("user_id","type");--> statement-breakpoint
CREATE INDEX "token_ledger_user_ts_idx" ON "token_ledger" USING btree ("user_id","ts" DESC NULLS LAST);