/**
 * Memory engine — retrieval, derivation, and prompt-grounding.
 *
 * Client-side and embedding-free for now: relevance = importance + recency +
 * keyword overlap. The `buildMemoryContext` output is what we inject into ZOE's
 * system prompt so the companion can genuinely reference your past.
 */

import type { Aspiration, MemoryEvent, ZoeBrainState, ZoeProfile } from "./types";
import { journeyProgress } from "./journey";

const STOP = new Set([
  "the", "a", "an", "to", "of", "and", "or", "is", "are", "was", "were", "i", "you", "my",
  "your", "we", "it", "in", "on", "for", "with", "about", "that", "this", "want", "like",
]);

export function tokenize(text: string): string[] {
  return (text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

const DAY = 86_400_000;

/** Higher = more relevant to `query` right now. */
export function scoreMemory(event: MemoryEvent, queryTokens: string[], now: number): number {
  const ageDays = Math.max(0, (now - event.ts) / DAY);
  const recency = Math.exp(-ageDays / 21); // ~3-week half-life feel
  const overlap = queryTokens.length
    ? event.tags.filter((t) => queryTokens.includes(t)).length / queryTokens.length
    : 0;
  return event.importance * 0.4 + recency * 0.3 + overlap * 0.3;
}

export function retrieveMemories(events: MemoryEvent[], query: string, limit = 6): MemoryEvent[] {
  const now = Date.now();
  const q = tokenize(query);
  return [...events]
    .map((e) => ({ e, s: scoreMemory(e, q, now) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.e);
}

/** Consecutive days (including today) with at least one event. */
export function getStreakDays(events: MemoryEvent[], now = Date.now()): number {
  if (events.length === 0) return 0;
  const days = new Set(events.map((e) => Math.floor(e.ts / DAY)));
  let streak = 0;
  let cursor = Math.floor(now / DAY);
  // allow today to be empty but yesterday active (grace), else count from today
  if (!days.has(cursor)) cursor -= 1;
  while (days.has(cursor)) {
    streak += 1;
    cursor -= 1;
  }
  return streak;
}

export function daysSince(ts: number, now = Date.now()): number {
  return Math.floor((now - ts) / DAY);
}

function cogLine(cs: import("./types").CognitiveStyle): string {
  const axes: string[] = [];
  if (Math.abs(cs.abstractVsConcrete) > 0.2) axes.push(cs.abstractVsConcrete > 0 ? "concrete-first" : "theory-first");
  if (Math.abs(cs.activeVsReflective) > 0.2) axes.push(cs.activeVsReflective > 0 ? "try-first" : "think-first");
  if (Math.abs(cs.sequentialVsGlobal) > 0.2) axes.push(cs.sequentialVsGlobal > 0 ? "big-picture" : "step-by-step");
  if (Math.abs(cs.verbalVsVisual) > 0.2) axes.push(cs.verbalVsVisual > 0 ? "visual-learner" : "text-learner");
  if (Math.abs(cs.socialVsSolo) > 0.2) axes.push(cs.socialVsSolo > 0 ? "social" : "solo");
  return axes.length ? `Cognitive style: ${axes.join(", ")}` : "";
}

function behavioralLine(b: import("./types").BehavioralMetrics): string {
  const parts: string[] = [];
  if (b.mcqAccuracy !== null) parts.push(`MCQ accuracy: ${Math.round(b.mcqAccuracy * 100)}%`);
  if (b.confidenceCalibration !== null) parts.push(`confidence calibration: ${b.confidenceCalibration > 0.5 ? "good" : b.confidenceCalibration > 0.2 ? "mixed" : "overconfident"}`);
  if (b.avgTimeOnTask !== null) parts.push(`avg time on task: ${Math.round(b.avgTimeOnTask)}s`);
  if (b.streakConsistency !== null) parts.push(`streak consistency: ${Math.round(b.streakConsistency * 100)}%`);
  if (b.reflectionDepth !== null) parts.push(`reflection depth: ${Math.round(b.reflectionDepth)} words avg`);
  return parts.length ? `Behavioral signals: ${parts.join(", ")}` : "";
}

function profileLine(profile: ZoeProfile | null): string {
  if (!profile) return "";
  const measured = [...profile.dimensions].filter((d) => d.confidence > 0.4).sort((a, b) => b.value - a.value).slice(0, 4);
  const parts: string[] = [];
  if (profile.summary) parts.push(profile.summary);
  const cog = cogLine(profile.cognitiveStyle);
  if (cog) parts.push(cog);
  if (profile.timeAvailability) parts.push(`Time: ${profile.timeAvailability}`);
  if (profile.emotionalBaseline) parts.push(`Emotional baseline: ${profile.emotionalBaseline}`);
  if (profile.strengths.length) parts.push(`Strengths: ${profile.strengths.join(", ")}`);
  if (profile.growthEdges.length) parts.push(`Growth edges: ${profile.growthEdges.join(", ")}`);
  if (measured.length) parts.push(`Measured dimensions: ${measured.map((d) => `${d.label} (${Math.round(d.value)}, confidence ${Math.round(d.confidence * 100)}%)`).join(", ")}`);
  const beh = behavioralLine(profile.behavioral);
  if (beh) parts.push(beh);
  const t = profile.teaching;
  parts.push(`Current teaching style: ${t.tone}, ${t.pace} pace, ${t.depth} depth, modalities ${t.modalities.join("/")}.`);
  return parts.join("\n");
}

function aspirationsLine(aspirations: Aspiration[]): string {
  if (!aspirations.length) return "";
  const lines = ["Aspirations they're pursuing:"];
  for (const a of aspirations) {
    const p = journeyProgress(a.journey);
    const current = a.journey?.phases.flatMap((ph) => ph.steps).find((s) => s.id === a.journey?.currentStepId);
    lines.push(
      `- "${a.title}" (${a.status}${a.journey ? `, ${p.pct}% done` : ", no path yet"})` +
      (current ? ` — next step: ${current.title}` : "")
    );
  }
  return lines.join("\n");
}

/**
 * Build a compact, high-signal block to inject into ZOE's system prompt so it
 * speaks with continuity and references real history.
 */
export function buildMemoryContext(state: ZoeBrainState, query = "", limit = 6): string {
  if (!state.identity && !state.profile && state.events.length === 0) return "";
  const lines: string[] = ["## What you remember about this person"];
  if (state.identity) {
    const last = daysSince(state.identity.lastActiveAt);
    lines.push(`Name: ${state.identity.name} · Age group: ${state.identity.ageGroup} · ${last <= 0 ? "active today" : `last seen ${last} day(s) ago`}`);
  }
  const prof = profileLine(state.profile);
  if (prof) lines.push(prof);
  const asp = aspirationsLine(state.aspirations);
  if (asp) lines.push(asp);

  const relevant = retrieveMemories(state.events, query, limit);
  const voiceEvents = state.events.filter((e) => e.type === "user_voice").slice(-3);
  const behavioralEvents = state.events.filter((e) => e.type === "behavioral_signal").slice(-2);

  if (relevant.length) {
    lines.push("\nRelevant moments (most relevant first):");
    for (const m of relevant) {
      const ago = daysSince(m.ts);
      const when = ago <= 0 ? "today" : ago === 1 ? "yesterday" : `${ago}d ago`;
      const mood = m.sentiment === "struggle" ? " [found this hard]" : m.sentiment === "positive" ? " [went well]" : "";
      lines.push(`- (${when}) ${m.summary}${mood}`);
    }
  }

  if (voiceEvents.length) {
    lines.push("\nIn their own words (verbatim):");
    for (const v of voiceEvents) lines.push(`- "${v.summary}"`);
  }

  if (behavioralEvents.length) {
    lines.push("\nRecent behavioral shifts:");
    for (const b of behavioralEvents) lines.push(`- ${b.summary}`);
  }

  lines.push(
    "\nUse this naturally and warmly — reference the past when it helps, never robotically. Never make them feel judged. Emphasise growth."
  );
  return lines.join("\n");
}
