/**
 * Pure helpers for turning the Architect hat's raw output into a well-formed
 * Journey (stable ids, statuses, a current step, and a mermaid map). Shared by
 * the API route, the client, and the v1→v2 migration so there's one source of
 * truth for journey shape.
 */

import type { Journey, JourneyPhase, JourneyStep, MasteryBreakdown, SkillTier, StepKind } from "./types";

let _seq = 0;
const rid = (p: string) => `${p}-${Date.now().toString(36)}-${(_seq++).toString(36)}`;

const KIND_SET: StepKind[] = ["concept", "practice", "project", "reflection", "challenge", "milestone"];
function coerceKind(k: unknown): StepKind {
  return KIND_SET.includes(k as StepKind) ? (k as StepKind) : "concept";
}

const mmSafe = (s: string) => (s || "").replace(/["\n]/g, " ").replace(/[<>]/g, "").trim().slice(0, 42);

/** Build a top-to-bottom mermaid flowchart from phases → steps. */
export function buildMermaid(headline: string, phases: JourneyPhase[]): string {
  const lines: string[] = ["flowchart TD"];
  lines.push(`  start([${mmSafe(headline) || "Your journey"}])`);
  let prevPhaseAnchor = "start";
  phases.forEach((ph, pi) => {
    const phId = `p${pi}`;
    lines.push(`  ${phId}{{${mmSafe(ph.title)}}}`);
    lines.push(`  ${prevPhaseAnchor} --> ${phId}`);
    let prev = phId;
    ph.steps.forEach((st, si) => {
      const sId = `p${pi}s${si}`;
      lines.push(`  ${sId}["${mmSafe(st.title)}"]`);
      lines.push(`  ${prev} --> ${sId}`);
      prev = sId;
    });
    prevPhaseAnchor = prev;
  });
  lines.push(`  ${prevPhaseAnchor} --> done([You've become it])`);
  return lines.join("\n");
}

interface RawStep { title?: string; summary?: string; kind?: string; minutes?: number; difficulty?: number; prerequisites?: string[] }
interface RawPhase { title?: string; timeframe?: string; why?: string; steps?: RawStep[] }
interface RawSkillTier { title?: string; description?: string; phaseIndices?: number[] }
export interface RawJourney {
  headline?: string;
  summary?: string;
  startingPoint?: string;
  destination?: string;
  rationale?: string[];
  phases?: RawPhase[];
  skillTiers?: RawSkillTier[];
  mermaid?: string;
}

/** Normalise raw Architect JSON into a fully-formed Journey. */
export function normalizeJourney(raw: RawJourney): Journey {
  const now = Date.now();
  const phases: JourneyPhase[] = (raw.phases ?? []).map((ph) => ({
    id: rid("ph"),
    title: ph.title ?? "Phase",
    timeframe: ph.timeframe ?? "",
    why: ph.why ?? "",
    steps: (ph.steps ?? []).map((st) => ({
      id: rid("st"),
      title: st.title ?? "Step",
      summary: st.summary ?? "",
      kind: coerceKind(st.kind),
      minutes: typeof st.minutes === "number" ? st.minutes : 15,
      status: "todo" as const,
      difficulty: (typeof st.difficulty === "number" && st.difficulty >= 1 && st.difficulty <= 5 ? st.difficulty : 2) as 1 | 2 | 3 | 4 | 5,
      prerequisites: Array.isArray(st.prerequisites) ? st.prerequisites : [],
      masteryScore: null,
      masteryBreakdown: { comprehension: null, application: null, depth: null, confidence: null, retention: null } as MasteryBreakdown,
      attempts: 0,
      timeSpent: 0,
      thread: [],
      canSkip: false,
    })),
  }));

  // First step becomes active.
  const firstStep: JourneyStep | undefined = phases[0]?.steps[0];
  if (firstStep) firstStep.status = "active";

  const headline = raw.headline ?? "Your journey";

  const skillTiers: SkillTier[] = Array.isArray(raw.skillTiers) && raw.skillTiers.length
    ? raw.skillTiers.map((t, i) => ({
        level: i,
        title: t.title ?? `Level ${i + 1}`,
        description: t.description ?? "",
        phaseIds: (t.phaseIndices ?? [i]).map((pi) => phases[pi]?.id).filter(Boolean) as string[],
      }))
    : phases.map((ph, i) => ({
        level: i,
        title: ph.title,
        description: ph.why,
        phaseIds: [ph.id],
      }));

  return {
    headline,
    summary: raw.summary ?? "",
    startingPoint: raw.startingPoint ?? "",
    destination: raw.destination ?? "",
    rationale: Array.isArray(raw.rationale) ? raw.rationale : [],
    phases,
    skillTiers,
    mermaid: raw.mermaid && raw.mermaid.includes("flowchart") ? raw.mermaid : buildMermaid(headline, phases),
    currentStepId: firstStep?.id ?? null,
    createdAt: now,
    updatedAt: now,
  };
}

/** All steps, flattened, in order — handy for "next step" logic. */
export function flatSteps(journey: Journey): { phaseIdx: number; step: JourneyStep }[] {
  const out: { phaseIdx: number; step: JourneyStep }[] = [];
  journey.phases.forEach((ph, pi) => ph.steps.forEach((s) => out.push({ phaseIdx: pi, step: s })));
  return out;
}

export function journeyProgress(journey: Journey | null): { done: number; total: number; pct: number } {
  if (!journey) return { done: 0, total: 0, pct: 0 };
  const all = flatSteps(journey);
  const done = all.filter((x) => x.step.status === "done").length;
  const total = all.length || 1;
  return { done, total, pct: Math.round((done / total) * 100) };
}

/**
 * Compute a composite mastery score from the multi-signal breakdown.
 * Weights: comprehension 30%, application 25%, depth 20%, confidence 15%, retention 10%.
 * Null signals are excluded and weights redistributed.
 */
export function computeMastery(b: MasteryBreakdown): number | null {
  const weights: { key: keyof MasteryBreakdown; w: number }[] = [
    { key: "comprehension", w: 0.30 },
    { key: "application", w: 0.25 },
    { key: "depth", w: 0.20 },
    { key: "confidence", w: 0.15 },
    { key: "retention", w: 0.10 },
  ];
  let sum = 0, totalW = 0;
  for (const { key, w } of weights) {
    if (b[key] !== null) { sum += b[key]! * w; totalW += w; }
  }
  return totalW > 0 ? Math.round(sum / totalW) : null;
}

/** Determine which skill tier a user is currently in based on phase completion. */
export function currentSkillTier(journey: Journey): { current: SkillTier; index: number; progress: number } | null {
  if (!journey.skillTiers.length) return null;
  for (let i = journey.skillTiers.length - 1; i >= 0; i--) {
    const tier = journey.skillTiers[i];
    const tierPhases = journey.phases.filter((p) => tier.phaseIds.includes(p.id));
    const tierSteps = tierPhases.flatMap((p) => p.steps);
    const done = tierSteps.filter((s) => s.status === "done").length;
    if (done > 0 || i === 0) {
      const total = tierSteps.length || 1;
      return { current: tier, index: i, progress: Math.round((done / total) * 100) };
    }
  }
  return { current: journey.skillTiers[0], index: 0, progress: 0 };
}
