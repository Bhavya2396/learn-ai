/**
 * ZOE Brain — core data model.
 *
 * ZOE is a "becoming" engine, not a course catalogue. The substrate is:
 *   - one ZoeIdentity (who you are)
 *   - one evolving ZoeProfile (how your mind works — shared across everything)
 *   - many Aspirations (who you want to become), each with its own Journey
 *   - an episodic memory log + a ZOT ledger
 *
 * Everything is plain serialisable data so it can live in localStorage today and
 * migrate to Postgres + pgvector later with no shape change.
 */

export interface ZoeIdentity {
  id: string;
  name: string;
  ageGroup: string;
  locale: string; // BCP-47-ish: "en", "hi", ...
  createdAt: number;
  lastActiveAt: number;
}

/**
 * A psychometric dimension. `source` distinguishes AI-inferred guesses from
 * behaviorally measured scores so the Optimizer trusts measured data more.
 */
export interface DnaDimension {
  id: string;
  label: string;
  value: number; // 0..100
  confidence: number; // 0..1 — how confident ZOE is in this score
  source: "self-report" | "observed" | "assessed"; // how we got the number
  note?: string;
  history: { ts: number; value: number }[]; // trend over time
  updatedAt: number;
}

/**
 * Behavioral metrics ZOE silently observes to calibrate its understanding.
 * These are real signals — not self-reported.
 */
export interface BehavioralMetrics {
  avgTimeOnTask: number | null; // seconds, per step — measures engagement
  revisionRate: number | null;  // 0..1 — how often they change answers
  confidenceCalibration: number | null; // correlation between predicted & actual scores
  streakConsistency: number | null; // 0..1 — regularity of engagement
  challengeSeekRate: number | null; // 0..1 — do they pick harder options when offered?
  reflectionDepth: number | null; // avg word count in open reflections
  mcqAccuracy: number | null; // 0..1 — objective comprehension signal
  updatedAt: number;
}

/**
 * How ZOE currently teaches/guides THIS person. Owned by the Mentor hat and
 * continuously re-tuned by the Optimizer hat. Cross-aspiration.
 */
export interface TeachingStyle {
  tone: string; // e.g. "warm-direct", "playful", "calm-coach"
  modalities: string[]; // e.g. ["visual", "interactive", "story", "audio"]
  pace: "gentle" | "steady" | "intense";
  depth: "concise" | "balanced" | "deep";
  encouragement: "light" | "medium" | "high";
  updatedAt: number;
}

/**
 * The evolving understanding ZOE has of a PERSON (not a single goal).
 * This is what the Profiler hat builds and keeps refining.
 */
export interface ZoeProfile {
  summary: string;
  motivations: string[];
  cognitiveStyle: CognitiveStyle;
  timeAvailability?: string;
  emotionalBaseline?: string;
  strengths: string[];
  growthEdges: string[];
  dimensions: DnaDimension[];
  behavioral: BehavioralMetrics;
  teaching: TeachingStyle;
  updatedAt: number;
}

/**
 * Replaces the debunked "learning styles" with actual cognitive processing
 * preferences, based on Dual Coding + Cognitive Load theory.
 */
export interface CognitiveStyle {
  abstractVsConcrete: number;  // -1 (pure abstract/theory) to +1 (concrete/example)
  activeVsReflective: number;  // -1 (think first) to +1 (try first)
  sequentialVsGlobal: number;  // -1 (step-by-step) to +1 (big picture then detail)
  verbalVsVisual: number;      // -1 (text/words) to +1 (diagrams/images)
  socialVsSolo: number;        // -1 (solo) to +1 (social/discussion)
}

/* ── Aspirations & Journeys ──────────────────────────────────────────────── */

export type AspirationStatus = "active" | "paused" | "achieved";

/** Broad life area an aspiration belongs to (purely for grouping / colour). */
export type LifeArea =
  | "career"
  | "entrepreneurship"
  | "health"
  | "mindset"
  | "money"
  | "craft"
  | "sustainability"
  | "knowledge"
  | "other";

export type StepKind = "concept" | "practice" | "project" | "reflection" | "challenge" | "milestone";
export type StepStatus = "todo" | "active" | "done";

/** Multi-signal mastery breakdown for a step. */
export interface MasteryBreakdown {
  comprehension: number | null;  // 0..100 — did they understand? (MCQ, predict)
  application: number | null;    // 0..100 — can they use it? (build, code)
  depth: number | null;          // 0..100 — how deep did they explore? (follow-ups, sub-topics)
  confidence: number | null;     // 0..100 — calibration accuracy
  retention: number | null;      // 0..100 — remembers over time (set on re-visit)
}

/** A follow-up exchange within a step's conversational thread. */
export interface StepThread {
  id: string;
  userMessage: string;
  aiResponse: string;
  ts: number;
}

export interface JourneyStep {
  id: string;
  title: string;
  summary: string;
  kind: StepKind;
  minutes: number;
  status: StepStatus;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prerequisites: string[];     // step IDs that must be "done" first
  masteryScore: number | null; // 0..100 — composite score from breakdown
  masteryBreakdown: MasteryBreakdown;
  attempts: number;            // how many times they've engaged with this step
  timeSpent: number;           // total seconds spent on this step
  thread: StepThread[];        // conversational follow-ups within this step
  canSkip: boolean;            // Optimizer can flag steps as skippable if mastery is proven
}

/** Skill-level tier in the user's field. Generated by the Architect hat. */
export interface SkillTier {
  level: number;  // 0-based index
  title: string;  // field-specific, e.g. "Rhythm Player", "Lead Guitarist"
  description: string;
  phaseIds: string[]; // journey phase IDs that belong to this tier
}

export interface JourneyPhase {
  id: string;
  title: string;
  timeframe: string; // e.g. "Weeks 1–2"
  why: string; // why this phase exists, in ZOE's voice
  steps: JourneyStep[];
}

/** The Architect hat's output for ONE aspiration. */
export interface Journey {
  headline: string;
  summary: string;
  startingPoint: string; // where you stand right now, for this aspiration
  destination: string; // who you'll be at the end
  rationale: string[]; // the Architect's "thinking" steps
  phases: JourneyPhase[];
  skillTiers: SkillTier[]; // field-specific progression tiers (novice → pro)
  mermaid: string; // a mermaid flowchart definition of the path
  currentStepId: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface Aspiration {
  id: string;
  title: string; // "Become a financial analyst", "Learn fingerstyle guitar"
  area: LifeArea;
  why?: string; // why this matters to them
  createdAt: number;
  updatedAt: number;
  status: AspirationStatus;
  journey: Journey | null;
  /** For document-sourced aspirations: the faithful per-section content + figures. */
  source?: import("./content-types").AspirationSource | null;
}

/* ── Memory & tokens ─────────────────────────────────────────────────────── */

export type MemoryType =
  | "onboarding"
  | "profile_built"
  | "aspiration_added"
  | "journey_generated"
  | "journey_tweaked"
  | "journey_restructured" // Optimizer changed the path
  | "step_started"
  | "step_completed"
  | "step_skipped"         // Optimizer skipped based on proven mastery
  | "step_repeated"        // user re-attempted a step
  | "struggled"
  | "mastered"             // hit 90+ mastery on a step
  | "reflection"
  | "user_voice"           // raw user words preserved verbatim
  | "behavioral_signal"    // observed metric change
  | "confidence_check"     // predicted vs actual result
  | "teaching_tuned"
  | "token_earned"
  | "returned";

export type Sentiment = "positive" | "neutral" | "struggle";

export interface MemoryEvent {
  id: string;
  ts: number;
  type: MemoryType;
  summary: string; // written ABOUT the user, in a voice ZOE can read back
  aspirationId?: string;
  area?: string;
  stepId?: string;
  sentiment?: Sentiment;
  importance: number; // 0..1 — retrieval weighting
  tags: string[];
  payload?: Record<string, unknown>;
}

export type ZotStream = "learn" | "teach" | "impact" | "skill" | "innovate";

export interface TokenEntry {
  id: string;
  ts: number;
  stream: ZotStream;
  amount: number;
  reason: string;
}

export interface ZoeBrainState {
  version: number;
  identity: ZoeIdentity | null;
  profile: ZoeProfile | null;
  aspirations: Aspiration[];
  activeAspirationId: string | null;
  events: MemoryEvent[];
  ledger: TokenEntry[];
}

/* ── Area metadata (UI) ──────────────────────────────────────────────────── */
export const AREA_META: Record<LifeArea, { label: string; color: string }> = {
  career: { label: "Career", color: "#2E9BFF" },
  entrepreneurship: { label: "Entrepreneurship", color: "#FF6B5B" },
  health: { label: "Health & wellbeing", color: "#5BB98C" },
  mindset: { label: "Mindset & growth", color: "#7C5CFF" },
  money: { label: "Money & finance", color: "#15C2A5" },
  craft: { label: "Craft & creativity", color: "#F5A524" },
  sustainability: { label: "Sustainability", color: "#3FB984" },
  knowledge: { label: "Knowledge & skill", color: "#E0892B" },
  other: { label: "Personal", color: "#9A8C7A" },
};

export function areaMeta(area?: string) {
  return AREA_META[(area as LifeArea)] ?? AREA_META.other;
}
