/**
 * Contracts for ZOE's four "hats" — the specialised intelligences that, together
 * with the Brain, make ZOE one coherent companion rather than a chatbot.
 *
 *   Profiler  — understands WHO you are (adaptive questioning -> a profile)
 *   Architect — designs the PATH for one aspiration (journey + mermaid map)
 *   Mentor    — DELIVERS a step, tuned to how you learn (multimodal content)
 *   Optimizer — keeps everything improving (re-tunes profile / teaching / path)
 *
 * No server-only imports here, so client components can share these types.
 */

import type { RawJourney } from "./journey";
import type { TeachingStyle } from "./types";

export type Hat = "profiler" | "architect" | "mentor" | "optimizer" | "companion";

/* ── Shared question shapes (used by the Profiler) ───────────────────────── */
export type QuestionType = "single" | "multi" | "scale" | "text";

export interface DynamicQuestion {
  id: string;
  prompt: string;
  rationale?: string;
  type: QuestionType;
  options?: { label: string; icon?: string }[];
  scale?: { min: number; max: number; minLabel: string; maxLabel: string };
  placeholder?: string;
}

export interface QA {
  id: string;
  question: string;
  answer: string;
}

/** A draft profile the Profiler synthesises; maps onto DiscoveryInput.profile. */
export interface ProfileDraft {
  summary: string;
  motivations: string[];
  cognitiveStyle?: import("./types").CognitiveStyle;
  timeAvailability?: string;
  emotionalBaseline?: string;
  strengths: string[];
  growthEdges: string[];
  dimensions: { label: string; value: number; note?: string }[];
  teaching?: Partial<TeachingStyle>;
}

/* ── Profiler ────────────────────────────────────────────────────────────── */
export interface ProfilerNextRequest {
  hat: "profiler";
  mode: "next";
  aspiration: string;
  transcript: QA[];
  basics?: { name?: string; ageGroup?: string };
  memoryContext?: string;
}
export interface ProfilerSynthesizeRequest {
  hat: "profiler";
  mode: "synthesize";
  aspiration: string;
  transcript: QA[];
  basics?: { name?: string; ageGroup?: string };
  memoryContext?: string;
}
export interface ProfilerNextResponse {
  done: boolean;
  insight?: string;
  progress?: number;
  question?: DynamicQuestion;
}
export interface ProfilerSynthesizeResponse {
  profile: ProfileDraft;
}

/* ── Architect ───────────────────────────────────────────────────────────── */
export interface ArchitectRequest {
  hat: "architect";
  aspiration: { title: string; area: string; why?: string };
  profile?: Partial<ProfileDraft>;
  transcript?: QA[];
  tweak?: string;
  memoryContext?: string;
}
export interface ArchitectResponse {
  journey: RawJourney;
}

/**
 * Document-first path: instead of profiling a person, the Architect follows an
 * uploaded document's structure EXACTLY (no deviation). If the document has an
 * index/TOC we follow it; otherwise we follow the document itself, front to back.
 */
export interface DocumentArchitectRequest {
  title: string;
  /** Faithful nested markdown outline of the document (from extractDocument). */
  outline: string;
  hasIndex?: boolean;
  area?: string;
  /** Optional refinement instruction when the learner tweaks the preview. */
  tweak?: string;
}

/* ── Mentor ──────────────────────────────────────────────────────────────── */
export type ContentBlockKind = "text" | "insight" | "example" | "analogy" | "steps" | "visual" | "quote" | "code" | "diagram" | "canvas";

export interface ContentBlock {
  kind: ContentBlockKind;
  title?: string;
  body: string;
  items?: string[];
  language?: string;   // for "code" blocks — e.g. "python", "javascript"
  mermaid?: string;    // for "diagram" blocks — a mermaid definition to render
  svg?: string;        // for "visual" blocks — inline SVG markup
  canvasCode?: string; // for "canvas" blocks — self-contained JS that draws to a canvas (ctx, w, h, t)
}

export interface MentorInteraction {
  type: "mcq" | "reflect" | "predict" | "build" | "confidence";
  prompt: string;
  options?: string[];
  answerIndex?: number;
  explanation?: string;
  /** For "confidence" type: ask them to predict their score before answering. */
  confidencePrompt?: string;
}

export interface MentorRequest {
  hat: "mentor";
  aspiration: { title: string; area: string };
  step: { title: string; summary: string; kind: string; minutes: number };
  teaching?: Partial<TeachingStyle>;
  profileSummary?: string;
  userMessage?: string; // when the learner asks something mid-step
  memoryContext?: string;
}
export interface MentorResponse {
  intro: string;
  blocks: ContentBlock[];
  visualHint?: string; // a description ZOE could render as a diagram/animation
  interaction?: MentorInteraction;
  encouragement?: string;
}

/* ── Optimizer ───────────────────────────────────────────────────────────── */
export interface OptimizerRequest {
  hat: "optimizer";
  profileSummary?: string;
  teaching?: Partial<TeachingStyle>;
  recentEvents: { type: string; summary: string; sentiment?: string; ageDays: number }[];
  behavioral?: import("./types").BehavioralMetrics;
  stepMetrics?: { stepId: string; title: string; mastery: number | null; attempts: number; timeSpent: number; expected: number }[];
  memoryContext?: string;
}
export interface OptimizerResponse {
  rationale: string[];
  dimensionDeltas: { label: string; value: number; note?: string; source?: "observed" | "assessed" }[];
  teaching?: Partial<TeachingStyle>;
  journeyNote?: string;
  /** Structural changes the Optimizer proposes to the active journey. */
  journeyMutations?: JourneyMutation[];
}

export type JourneyMutation =
  | { action: "skip_step"; stepId: string; reason: string }
  | { action: "insert_step"; afterStepId: string; step: { title: string; summary: string; kind: string; minutes: number; difficulty: number }; reason: string }
  | { action: "repeat_step"; stepId: string; reason: string }
  | { action: "reorder"; stepIds: string[]; reason: string };

/* ── Companion (Ask ZOE) ─────────────────────────────────────────────────────
 * The conversational front door: ask ZOE anything by voice or text and get a
 * rich, growth-framed answer card — grounded in who you are and what you're
 * becoming. Mirrors a search/answer feed, but it's your companion answering.
 */
export interface CompanionRequest {
  hat: "companion";
  question: string;
  profileSummary?: string;
  aspirations?: string[];                 // current aspiration titles
  thread?: { q: string; a: string }[];    // prior turns, for follow-ups
  memoryContext?: string;
}

export interface CompanionRelated {
  title: string;
  snippet: string;
}

export interface CompanionAnswer {
  title: string;                          // short headline for the answer
  category?: string;                      // e.g. "Guidance", "Skill", "Mindset"
  chips?: string[];                       // category facets shown as a scroll row
  answer: string;                         // 2-4 warm sentences (the spoken answer)
  blocks?: { title?: string; body: string; items?: string[] }[];
  related?: CompanionRelated[];           // related entities / next things
  followups?: string[];                   // suggested follow-up questions
  action?: {                              // a thing ZOE can do for you
    kind: "add_aspiration" | "open_journey" | "none";
    label?: string;
    payload?: string;                     // e.g. aspiration title to seed
  };
}

export interface CompanionResponse {
  answer: CompanionAnswer;
}
