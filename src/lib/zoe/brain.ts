"use client";

/**
 * The ZOE Brain store — the single source of truth for who the user is and
 * everything ZOE remembers across ALL of their aspirations. Persisted locally
 * (survives refresh); swap the storage adapter for a backend later with no
 * changes here.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { generateId } from "@/lib/utils";
import { localStorageAdapter, ZOE_STORAGE_KEY } from "./storage";
import { getStreakDays } from "./memory";
import { normalizeJourney, type RawJourney } from "./journey";
import type {
  Aspiration, AspirationStatus, BehavioralMetrics, DnaDimension, Journey, LifeArea,
  MemoryEvent, MemoryType, Sentiment, StepStatus, TeachingStyle, TokenEntry,
  ZoeProfile, ZotStream, ZoeIdentity,
} from "./types";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const DEFAULT_TEACHING: TeachingStyle = {
  tone: "warm-direct",
  modalities: ["visual", "interactive", "story"],
  pace: "steady",
  depth: "balanced",
  encouragement: "medium",
  updatedAt: 0,
};

/* ── Action input shapes ─────────────────────────────────────────────────── */
interface LogInput {
  type: MemoryType;
  summary: string;
  aspirationId?: string;
  area?: string;
  stepId?: string;
  sentiment?: Sentiment;
  importance?: number;
  tags?: string[];
  payload?: Record<string, unknown>;
}

export interface DiscoveryInput {
  identity: { name: string; ageGroup: string; locale?: string };
  profile: {
    summary?: string;
    motivations?: string[];
    cognitiveStyle?: import("./types").CognitiveStyle;
    timeAvailability?: string;
    emotionalBaseline?: string;
    strengths?: string[];
    growthEdges?: string[];
    dimensions: { label: string; value: number; note?: string }[];
    teaching?: Partial<TeachingStyle>;
  };
  aspiration: { title: string; area: LifeArea; why?: string };
  journey: Journey;
  transcript?: { id: string; question: string; answer: string }[];
}

interface BrainActions {
  touch: () => void;
  commitDiscovery: (input: DiscoveryInput) => string;
  addAspiration: (a: { title: string; area: LifeArea; why?: string }) => string;
  setJourney: (aspirationId: string, journey: Journey) => void;
  setAspirationSource: (aspirationId: string, source: import("./content-types").AspirationSource) => void;
  setAspirationStatus: (aspirationId: string, status: AspirationStatus) => void;
  setActiveAspiration: (aspirationId: string) => void;
  setStepStatus: (aspirationId: string, stepId: string, status: StepStatus) => void;
  recordStepMetrics: (aspirationId: string, stepId: string, metrics: { timeSpent: number; masteryScore: number | null; masteryBreakdown?: import("./types").MasteryBreakdown; thread?: import("./types").StepThread[] }) => void;
  recordBehavior: (partial: Partial<BehavioralMetrics>) => void;
  updateProfile: (partial: Partial<ZoeProfile>) => void;
  updateDimension: (id: string, value: number, source?: DnaDimension["source"]) => void;
  tuneTeaching: (partial: Partial<TeachingStyle>, reason?: string) => void;
  logEvent: (e: LogInput) => MemoryEvent;
  awardTokens: (stream: ZotStream, amount: number, reason: string) => void;
  forgetEvent: (id: string) => void;
  reset: () => void;
}

interface BrainStore extends BrainActions {
  version: number;
  hydrated: boolean;
  identity: ZoeIdentity | null;
  profile: ZoeProfile | null;
  aspirations: Aspiration[];
  activeAspirationId: string | null;
  events: MemoryEvent[];
  ledger: TokenEntry[];
}

const DEFAULT_BEHAVIORAL: BehavioralMetrics = {
  avgTimeOnTask: null, revisionRate: null, confidenceCalibration: null,
  streakConsistency: null, challengeSeekRate: null, reflectionDepth: null,
  mcqAccuracy: null, updatedAt: 0,
};

function buildProfile(p: DiscoveryInput["profile"], now: number): ZoeProfile {
  const dimensions: DnaDimension[] = p.dimensions.map((d) => ({
    id: slug(d.label) || generateId(),
    label: d.label,
    value: Math.max(0, Math.min(100, d.value)),
    confidence: 0.3, // initial AI guess — low confidence
    source: "self-report" as const,
    note: d.note,
    history: [{ ts: now, value: d.value }],
    updatedAt: now,
  }));
  return {
    summary: p.summary ?? "",
    motivations: p.motivations ?? [],
    cognitiveStyle: p.cognitiveStyle ?? { abstractVsConcrete: 0, activeVsReflective: 0, sequentialVsGlobal: 0, verbalVsVisual: 0, socialVsSolo: 0 },
    timeAvailability: p.timeAvailability,
    emotionalBaseline: p.emotionalBaseline,
    strengths: p.strengths ?? [],
    growthEdges: p.growthEdges ?? [],
    dimensions,
    behavioral: { ...DEFAULT_BEHAVIORAL, updatedAt: now },
    teaching: { ...DEFAULT_TEACHING, ...(p.teaching ?? {}), updatedAt: now },
    updatedAt: now,
  };
}

/** After a step changes, ensure exactly one step is "active" (the next todo). */
function reflowJourney(journey: Journey): Journey {
  const flat = journey.phases.flatMap((ph) => ph.steps);
  const hasActive = flat.some((s) => s.status === "active");
  let currentStepId = journey.currentStepId;
  if (!hasActive) {
    const nextTodo = flat.find((s) => s.status === "todo");
    if (nextTodo) {
      nextTodo.status = "active";
      currentStepId = nextTodo.id;
    } else {
      currentStepId = null; // all done
    }
  } else {
    currentStepId = flat.find((s) => s.status === "active")?.id ?? currentStepId;
  }
  return { ...journey, currentStepId, updatedAt: Date.now() };
}

export const useZoeBrain = create<BrainStore>()(
  persist(
    (set, get) => ({
      version: 2,
      hydrated: false,
      identity: null,
      profile: null,
      aspirations: [],
      activeAspirationId: null,
      events: [],
      ledger: [],

      touch: () => {
        const id = get().identity;
        if (!id) return;
        set({ identity: { ...id, lastActiveAt: Date.now() } });
      },

      commitDiscovery: (input) => {
        const now = Date.now();
        const existing = get().identity;
        const identity: ZoeIdentity = existing
          ? { ...existing, name: input.identity.name, ageGroup: input.identity.ageGroup, lastActiveAt: now }
          : {
              id: generateId(), name: input.identity.name, ageGroup: input.identity.ageGroup,
              locale: input.identity.locale || "en", createdAt: now, lastActiveAt: now,
            };

        const profile = buildProfile(input.profile, now);

        const aspiration: Aspiration = {
          id: generateId(),
          title: input.aspiration.title,
          area: input.aspiration.area,
          why: input.aspiration.why,
          createdAt: now,
          updatedAt: now,
          status: "active",
          journey: input.journey,
        };

        const events: MemoryEvent[] = [
          {
            id: generateId(), ts: now, type: "onboarding", importance: 0.95,
            summary: `${identity.name} joined ZOE wanting to become: "${aspiration.title}".`,
            aspirationId: aspiration.id, area: aspiration.area,
            tags: ["onboarding", "aspiration", ...aspiration.title.toLowerCase().split(/\s+/).slice(0, 6)],
          },
          {
            id: generateId(), ts: now, type: "profile_built", importance: 0.8,
            summary: profile.summary || `ZOE built an initial read of how ${identity.name} thinks and learns.`,
            tags: ["profile", ...profile.motivations, ...profile.strengths.flatMap((s) => s.toLowerCase().split(/\s+/).slice(0, 2))],
          },
          {
            id: generateId(), ts: now, type: "journey_generated", importance: 0.85,
            summary: `ZOE designed a path: "${input.journey.headline}".`,
            aspirationId: aspiration.id, area: aspiration.area,
            tags: ["journey", ...input.journey.headline.toLowerCase().split(/\s+/).slice(0, 5)],
          },
          ...(input.transcript ?? []).map((t) => ({
            id: generateId(), ts: now, type: "reflection" as MemoryType, importance: 0.45,
            summary: `On "${t.question}" they said: ${t.answer}`,
            tags: t.answer.toLowerCase().split(/\s+/).filter((w) => w.length > 3).slice(0, 6),
          })),
        ];

        set((s) => ({
          identity, profile,
          aspirations: [...s.aspirations, aspiration],
          activeAspirationId: aspiration.id,
          events: [...s.events, ...events],
        }));
        return aspiration.id;
      },

      addAspiration: (a) => {
        const now = Date.now();
        const aspiration: Aspiration = {
          id: generateId(), title: a.title, area: a.area, why: a.why,
          createdAt: now, updatedAt: now, status: "active", journey: null,
        };
        set((s) => ({
          aspirations: [...s.aspirations, aspiration],
          activeAspirationId: aspiration.id,
          events: [
            ...s.events,
            {
              id: generateId(), ts: now, type: "aspiration_added", importance: 0.85,
              summary: `Added a new aspiration: "${a.title}".`,
              aspirationId: aspiration.id, area: a.area,
              tags: ["aspiration", a.area, ...a.title.toLowerCase().split(/\s+/).slice(0, 5)],
            },
          ],
        }));
        return aspiration.id;
      },

      setJourney: (aspirationId, journey) => {
        set((s) => ({
          aspirations: s.aspirations.map((a) => (a.id === aspirationId ? { ...a, journey, updatedAt: Date.now() } : a)),
          events: [
            ...s.events,
            {
              id: generateId(), ts: Date.now(), type: "journey_generated", importance: 0.8,
              summary: `ZOE mapped the path "${journey.headline}".`,
              aspirationId, tags: ["journey", ...journey.headline.toLowerCase().split(/\s+/).slice(0, 5)],
            },
          ],
        }));
      },

      setAspirationSource: (aspirationId, source) =>
        set((s) => ({
          aspirations: s.aspirations.map((a) => (a.id === aspirationId ? { ...a, source, updatedAt: Date.now() } : a)),
        })),

      setAspirationStatus: (aspirationId, status) =>
        set((s) => ({
          aspirations: s.aspirations.map((a) => (a.id === aspirationId ? { ...a, status, updatedAt: Date.now() } : a)),
        })),

      setActiveAspiration: (aspirationId) => set({ activeAspirationId: aspirationId }),

      setStepStatus: (aspirationId, stepId, status) => {
        set((s) => ({
          aspirations: s.aspirations.map((a) => {
            if (a.id !== aspirationId || !a.journey) return a;
            const phases = a.journey.phases.map((ph) => ({
              ...ph,
              steps: ph.steps.map((st) => (st.id === stepId ? { ...st, status } : st)),
            }));
            return { ...a, journey: reflowJourney({ ...a.journey, phases }), updatedAt: Date.now() };
          }),
        }));
      },

      updateProfile: (partial) => {
        const profile = get().profile;
        if (!profile) return;
        set({ profile: { ...profile, ...partial, updatedAt: Date.now() } });
      },

      recordStepMetrics: (aspirationId, stepId, metrics) => {
        set((s) => ({
          aspirations: s.aspirations.map((a) => {
            if (a.id !== aspirationId || !a.journey) return a;
            const phases = a.journey.phases.map((ph) => ({
              ...ph,
              steps: ph.steps.map((st) => {
                if (st.id !== stepId) return st;
                return {
                  ...st,
                  timeSpent: st.timeSpent + metrics.timeSpent,
                  attempts: st.attempts + 1,
                  masteryScore: metrics.masteryScore ?? st.masteryScore,
                  ...(metrics.masteryBreakdown ? { masteryBreakdown: metrics.masteryBreakdown } : {}),
                  ...(metrics.thread ? { thread: metrics.thread } : {}),
                };
              }),
            }));
            return { ...a, journey: { ...a.journey, phases, updatedAt: Date.now() } };
          }),
        }));
      },

      recordBehavior: (partial) => {
        const profile = get().profile;
        if (!profile) return;
        set({
          profile: {
            ...profile,
            behavioral: { ...profile.behavioral, ...partial, updatedAt: Date.now() },
            updatedAt: Date.now(),
          },
        });
      },

      updateDimension: (id, value, source) => {
        const profile = get().profile;
        if (!profile) return;
        const now = Date.now();
        set({
          profile: {
            ...profile,
            dimensions: profile.dimensions.map((d) => {
              if (d.id !== id) return d;
              const newConfidence = source === "assessed" ? Math.min(1, d.confidence + 0.15) : source === "observed" ? Math.min(1, d.confidence + 0.08) : d.confidence;
              return { ...d, value, confidence: newConfidence, source: source ?? d.source, history: [...d.history.slice(-19), { ts: now, value }], updatedAt: now };
            }),
            updatedAt: now,
          },
        });
      },

      tuneTeaching: (partial, reason) => {
        const profile = get().profile;
        if (!profile) return;
        const teaching = { ...profile.teaching, ...partial, updatedAt: Date.now() };
        set((s) => ({
          profile: { ...profile, teaching, updatedAt: Date.now() },
          events: reason
            ? [...s.events, { id: generateId(), ts: Date.now(), type: "teaching_tuned" as MemoryType, importance: 0.35, summary: reason, tags: ["teaching", teaching.pace, teaching.depth] }]
            : s.events,
        }));
      },

      logEvent: (e) => {
        const ev: MemoryEvent = {
          id: generateId(),
          ts: Date.now(),
          importance: e.importance ?? 0.5,
          tags: e.tags ?? [],
          type: e.type,
          summary: e.summary,
          aspirationId: e.aspirationId,
          area: e.area,
          stepId: e.stepId,
          sentiment: e.sentiment,
          payload: e.payload,
        };
        set((s) => ({ events: [...s.events, ev] }));
        return ev;
      },

      awardTokens: (stream, amount, reason) => {
        const entry: TokenEntry = { id: generateId(), ts: Date.now(), stream, amount, reason };
        set((s) => ({
          ledger: [...s.ledger, entry],
          events: [
            ...s.events,
            { id: generateId(), ts: Date.now(), type: "token_earned", importance: 0.3, summary: `Earned ${amount} ZOT — ${reason}.`, tags: ["zot", stream] },
          ],
        }));
      },

      forgetEvent: (id) => set((s) => ({ events: s.events.filter((e) => e.id !== id) })),

      reset: () => set({ identity: null, profile: null, aspirations: [], activeAspirationId: null, events: [], ledger: [] }),
    }),
    {
      name: ZOE_STORAGE_KEY,
      version: 2,
      storage: createJSONStorage(() => localStorageAdapter),
      partialize: (s) => ({
        version: s.version, identity: s.identity, profile: s.profile,
        aspirations: s.aspirations, activeAspirationId: s.activeAspirationId,
        events: s.events, ledger: s.ledger,
      }),
      migrate: (persisted, fromVersion) => migrateBrain(persisted, fromVersion),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    }
  )
);

/* ── v1 → v2 migration ───────────────────────────────────────────────────── */
const KIND_FROM_LEGACY: Record<string, string> = { lesson: "concept", sim: "practice", project: "project", assessment: "challenge" };

function migrateBrain(persisted: unknown, fromVersion: number): Partial<BrainStore> {
  if (!persisted || typeof persisted !== "object") return {};
  const s = persisted as Record<string, unknown>;
  if (fromVersion >= 2) return s as Partial<BrainStore>;

  // v1 shape: { identity, dna, plan, events, ledger }
  const now = Date.now();
  const dna = s.dna as
    | { aspiration?: string; domains?: string[]; goals?: string[]; motivations?: string[]; learningStyles?: string[]; timeAvailability?: string; emotionalBaseline?: string; dimensions?: DnaDimension[] }
    | null;
  const plan = s.plan as
    | { headline?: string; summary?: string; reasoning?: string[]; path?: { phase: string; timeframe: string; why: string; modules: { title: string; type: string; minutes: number }[] }[]; firstStep?: { title: string } }
    | null;

  const profile: ZoeProfile | null = dna
    ? {
        summary: "",
        motivations: dna.motivations ?? [],
        cognitiveStyle: { abstractVsConcrete: 0, activeVsReflective: 0, sequentialVsGlobal: 0, verbalVsVisual: 0, socialVsSolo: 0 },
        timeAvailability: dna.timeAvailability,
        emotionalBaseline: dna.emotionalBaseline,
        strengths: [],
        growthEdges: [],
        dimensions: (dna.dimensions ?? []).map((d) => ({ ...d, confidence: 0.2, source: "self-report" as const, history: [{ ts: now, value: d.value }] })),
        behavioral: { ...DEFAULT_BEHAVIORAL, updatedAt: now },
        teaching: { ...DEFAULT_TEACHING, updatedAt: now },
        updatedAt: now,
      }
    : null;

  const aspirations: Aspiration[] = [];
  let activeAspirationId: string | null = null;
  if (dna?.aspiration || plan) {
    const raw: RawJourney = {
      headline: plan?.headline ?? `Become ${dna?.aspiration ?? "your best self"}`,
      summary: plan?.summary ?? "",
      rationale: plan?.reasoning ?? [],
      phases: (plan?.path ?? []).map((ph) => ({
        title: ph.phase,
        timeframe: ph.timeframe,
        why: ph.why,
        steps: ph.modules.map((m) => ({ title: m.title, summary: "", kind: KIND_FROM_LEGACY[m.type] ?? "concept", minutes: m.minutes })),
      })),
    };
    const journey = normalizeJourney(raw);
    const asp: Aspiration = {
      id: generateId(), title: dna?.aspiration ?? plan?.headline ?? "My aspiration",
      area: "knowledge", createdAt: now, updatedAt: now, status: "active", journey,
    };
    aspirations.push(asp);
    activeAspirationId = asp.id;
  }

  return {
    version: 2,
    identity: (s.identity as ZoeIdentity) ?? null,
    profile,
    aspirations,
    activeAspirationId,
    events: (s.events as MemoryEvent[]) ?? [],
    ledger: (s.ledger as TokenEntry[]) ?? [],
  };
}

/* ── Reactive selectors (hooks) ───────────────────────────────────────────── */
export const useHasProfile = () => useZoeBrain((s) => !!s.identity && !!s.profile);
export const useStreak = () => useZoeBrain((s) => getStreakDays(s.events));
export const useTotalZot = () => useZoeBrain((s) => s.ledger.reduce((sum, e) => sum + e.amount, 0));
export const useAspirations = () => useZoeBrain((s) => s.aspirations);
export const useActiveAspiration = () =>
  useZoeBrain((s) => s.aspirations.find((a) => a.id === s.activeAspirationId) ?? s.aspirations[0] ?? null);

/** Non-reactive snapshot (e.g. to attach memory context to an API call). */
export const getBrainSnapshot = () => {
  const s = useZoeBrain.getState();
  return {
    version: s.version, identity: s.identity, profile: s.profile,
    aspirations: s.aspirations, activeAspirationId: s.activeAspirationId,
    events: s.events, ledger: s.ledger,
  };
};
