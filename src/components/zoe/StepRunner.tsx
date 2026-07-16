"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Sparkles, Lightbulb, Quote, ListOrdered, Eye, Wrench,
  Check, Send, PartyPopper, Code2, GitBranch, MessageCircle, RefreshCw, Layers,
} from "lucide-react";
import { useZoeBrain, getBrainSnapshot } from "@/lib/zoe/brain";
import { buildMemoryContext } from "@/lib/zoe/memory";
import { useAmbience } from "@/lib/zoe/ambience";
import { computeMastery } from "@/lib/zoe/journey";
import CanvasVisual from "./CanvasVisual";
import LessonPlayer from "./LessonPlayer";
import { ProgressRing } from "./ZoeGraphics";
import type { ContentBlock, MentorResponse, OptimizerResponse, JourneyMutation } from "@/lib/zoe/hats-types";
import type { JourneyStep, MasteryBreakdown, StepThread, ZotStream } from "@/lib/zoe/types";
import type { LessonContent, LessonSource, SourceSection, AspirationSource } from "@/lib/zoe/content-types";
import { flatSteps } from "@/lib/zoe/journey";
import { getCachedLesson, getLesson, storeLesson, invalidateLesson } from "@/lib/zoe/lesson-store";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Document grounding: match a step to its source section ────────────────
 * Lets a document-sourced lesson teach EXACTLY the matching part of the PDF
 * (and reproduce its figures) instead of the model inventing/stretching.
 */
function normalizeTitle(s: string): string {
  return s.toLowerCase()
    .replace(/^[\s\d.)(–—-]+/, "")     // strip leading numbering like "4.3 " / "2) "
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function tokenSet(s: string): Set<string> {
  return new Set(normalizeTitle(s).split(" ").filter((w) => w.length > 2));
}
function matchSection(step: JourneyStep, sections: SourceSection[]): SourceSection | null {
  const stepNorm = normalizeTitle(step.title);
  const stepTokens = tokenSet(`${step.title} ${step.summary || ""}`);
  let best: { sec: SourceSection; score: number } | null = null;
  for (const sec of sections) {
    const secNorm = normalizeTitle(sec.heading);
    let score = 0;
    if (secNorm && stepNorm && secNorm === stepNorm) score = 1;
    else if (secNorm && stepNorm && (stepNorm.includes(secNorm) || secNorm.includes(stepNorm))) score = 0.85;
    else {
      const secTokens = tokenSet(sec.heading);
      let overlap = 0;
      secTokens.forEach((t) => { if (stepTokens.has(t)) overlap++; });
      score = overlap / Math.max(1, Math.min(secTokens.size, stepTokens.size));
    }
    if (sec.path && step.title.includes(sec.path)) score = Math.max(score, 0.9);
    if (!best || score > best.score) best = { sec, score };
  }
  return best && best.score >= 0.34 ? best.sec : null;
}
function buildLessonSource(step: JourneyStep, source?: AspirationSource | null): LessonSource | undefined {
  if (!source?.sections?.length) return undefined;
  const sec = matchSection(step, source.sections);
  if (!sec) return undefined;
  const excerpt = `${sec.heading}${sec.path ? ` (${sec.path})` : ""}\n\n${sec.content}`.slice(0, 3000);
  return { excerpt, figures: sec.figures?.length ? sec.figures : undefined, faithful: true };
}

export default function StepRunner({
  aspirationId, aspirationTitle, area, step, onBack, onComplete,
}: {
  aspirationId: string; aspirationTitle: string; area: string;
  step: JourneyStep; onBack: () => void; onComplete: () => void;
}) {
  const [content, setContent] = useState<MentorResponse | null>(null);
  // Initialise from synchronous memory cache so returning to a step is instant
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(() => getCachedLesson(step.id));
  const [loading, setLoading] = useState(() => getCachedLesson(step.id) === null);
  const [loadStage, setLoadStage] = useState<string>("planning");
  const [loadMsg, setLoadMsg] = useState("Thinking about the best way to teach this...");
  const [completed, setCompleted] = useState(false);
  // Bumped by "Regenerate" to force a fresh lesson (bypasses + clears the cache).
  const [regenNonce, setRegenNonce] = useState(0);
  const startedLogged = useRef(false);
  const stepStartTime = useRef(Date.now());

  const regenerate = useCallback(async () => {
    await invalidateLesson(step.id);   // delete the stored lesson (memory + Postgres)
    setLessonContent(null);
    setContent(null);
    setCompleted(false);
    setLoading(true);
    setLoadStage("planning");
    setLoadMsg("Regenerating this lesson from scratch...");
    setRegenNonce((n) => n + 1);        // re-runs the load effect (force mode)
  }, [step.id]);

  const [mastery, setMastery] = useState<MasteryBreakdown>(
    step.masteryBreakdown ?? { comprehension: null, application: null, depth: null, confidence: null, retention: null }
  );
  const [thread, setThread] = useState<StepThread[]>(step.thread ?? []);

  const profile = useZoeBrain((s) => s.profile);
  const setStepStatus = useZoeBrain((s) => s.setStepStatus);
  const recordStepMetrics = useZoeBrain((s) => s.recordStepMetrics);
  const recordBehavior = useZoeBrain((s) => s.recordBehavior);
  const logEvent = useZoeBrain((s) => s.logEvent);
  const awardTokens = useZoeBrain((s) => s.awardTokens);
  const updateDimension = useZoeBrain((s) => s.updateDimension);
  const tuneTeaching = useZoeBrain((s) => s.tuneTeaching);
  const setMood = useAmbience((s) => s.setMood);
  const pulse = useAmbience((s) => s.pulse);

  useEffect(() => { setMood(loading ? "thinking" : "calm"); }, [loading, setMood]);

  useEffect(() => {
    let cancelled = false;
    stepStartTime.current = Date.now();
    if (!startedLogged.current) {
      startedLogged.current = true;
      logEvent({ type: "step_started", summary: `Started "${step.title}" toward becoming ${aspirationTitle}.`, aspirationId, area, stepId: step.id, importance: 0.4, tags: ["step", step.kind] });
    }
    // On a forced regenerate (regenNonce > 0) we skip every cache and generate fresh.
    const forceRegen = regenNonce > 0;

    (async () => {
      // Memory cache already populated via lazy initial state — nothing to do
      if (!forceRegen && getCachedLesson(step.id)) { setLoading(false); return; }

      setLoading(true);
      setLoadStage("planning");
      setLoadMsg(forceRegen ? "Regenerating this lesson from scratch..." : "Thinking about the best way to teach this...");

      // Check IDB for a lesson that survived a page refresh (skipped when forcing)
      if (!forceRegen) {
        const cached = await getLesson(step.id);
        if (cached) {
          if (!cancelled) { setLessonContent(cached); setLoading(false); }
          return;
        }
      }

      const snapForSource = getBrainSnapshot();
      const memCtx = buildMemoryContext(snapForSource, `${aspirationTitle} ${step.title}`);
      const lessonSource = buildLessonSource(step, snapForSource.aspirations.find((a) => a.id === aspirationId)?.source);

      // Try streaming content engine
      let engineSucceeded = false;
      try {
        const engineRes = await fetch("/api/zoe/content", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            step: { id: step.id, title: step.title, summary: step.summary, kind: step.kind, minutes: step.minutes, difficulty: step.difficulty ?? 2 },
            aspiration: { title: aspirationTitle, area },
            profileSummary: profile?.summary,
            teachingStyle: profile?.teaching,
            memoryContext: memCtx,
            source: lessonSource,
          }),
        });
        if (engineRes.ok && engineRes.body) {
          const reader = engineRes.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.trim()) continue;
              try {
                const msg = JSON.parse(line);
                if (cancelled) continue;

                if (msg.stage === "planning") {
                  setLoadStage("planning");
                  setLoadMsg(msg.message || "Designing your lesson...");
                } else if (msg.stage === "planned") {
                  setLoadStage("planned");
                  setLoadMsg(`Found ${msg.sections} concepts to explore`);
                } else if (msg.stage === "media") {
                  setLoadStage("media");
                  setLoadMsg(msg.message || "Generating visuals...");
                } else if (msg.stage === "media_done") {
                  setLoadStage("media_done");
                  setLoadMsg(`${msg.ready} visual${msg.ready !== 1 ? "s" : ""} ready`);
                } else if (msg.stage === "generating") {
                  setLoadStage("generating");
                  setLoadMsg(msg.message || "Building your interactive experience...");
                } else if (msg.stage === "verifying") {
                  setLoadStage("verifying");
                  setLoadMsg(msg.message || "Checking everything renders correctly...");
                } else if (msg.stage === "verified") {
                  setLoadStage("verified");
                  setLoadMsg(msg.message || "Everything's in place");
                } else if (msg.stage === "done" && msg.lesson) {
                  const lesson = msg.lesson as LessonContent;
                  if (lesson.sections?.length) {
                    setLessonContent(lesson);
                    void storeLesson(step.id, lesson); // persist across sessions
                    engineSucceeded = true;
                  }
                } else if (msg.stage === "error") {
                  // Engine failed — fall through to mentor
                }
              } catch { /* skip malformed line */ }
            }
          }
        }
      } catch { /* fall through to mentor */ }

      if (cancelled) return;

      if (engineSucceeded) {
        setLoading(false);
        return;
      }

      // Fallback: legacy mentor hat
      setLoadStage("fallback");
      setLoadMsg("Preparing your step...");
      try {
        const res = await fetch("/api/zoe", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hat: "mentor",
            aspiration: { title: aspirationTitle, area },
            step: { title: step.title, summary: step.summary, kind: step.kind, minutes: step.minutes },
            teaching: profile?.teaching,
            profileSummary: profile?.summary,
            memoryContext: memCtx,
          }),
        });
        const data: MentorResponse = await res.json();
        if (!cancelled) setContent(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step.id, regenNonce]);

  const runOptimizer = useCallback(async (sentiment: "positive" | "struggle") => {
    try {
      const snap = getBrainSnapshot();
      const recentEvents = snap.events.slice(-10).map((e) => ({
        type: e.type, summary: e.summary, sentiment: e.sentiment,
        ageDays: Math.floor((Date.now() - e.ts) / 86_400_000),
      }));
      const aspiration = snap.aspirations.find((a) => a.id === aspirationId);
      const stepMetrics = aspiration?.journey
        ? flatSteps(aspiration.journey).slice(0, 20).map(({ step: s }) => ({
            stepId: s.id, title: s.title, mastery: s.masteryScore,
            attempts: s.attempts, timeSpent: s.timeSpent, expected: s.minutes,
          }))
        : undefined;
      const res = await fetch("/api/zoe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hat: "optimizer", profileSummary: snap.profile?.summary,
          teaching: snap.profile?.teaching, recentEvents,
          behavioral: snap.profile?.behavioral, stepMetrics,
          memoryContext: buildMemoryContext(snap, aspirationTitle),
        }),
      });
      const data: OptimizerResponse = await res.json();
      const dims = snap.profile?.dimensions ?? [];
      data.dimensionDeltas?.forEach((d) => {
        const match = dims.find((x) => x.label.toLowerCase() === d.label.toLowerCase());
        if (match) updateDimension(match.id, Math.max(0, Math.min(100, d.value)), d.source);
      });
      if (data.teaching && Object.keys(data.teaching).length) {
        tuneTeaching(data.teaching, data.journeyNote || `ZOE tuned after "${step.title}".`);
      }
      if (data.journeyMutations?.length) applyMutations(data.journeyMutations);
      void sentiment;
    } catch { /* best-effort */ }
  }, [aspirationId, aspirationTitle, step.title, updateDimension, tuneTeaching]);

  const applyMutations = (mutations: JourneyMutation[]) => {
    for (const m of mutations) {
      if (m.action === "skip_step") {
        setStepStatus(aspirationId, m.stepId, "done");
        logEvent({ type: "step_skipped", summary: `Optimizer skipped "${m.stepId}": ${m.reason}`, aspirationId, area, importance: 0.5, tags: ["optimizer", "skip"] });
      }
    }
  };

  const complete = (sentiment: "positive" | "struggle" = "positive", note?: string, masteryOverride?: MasteryBreakdown) => {
    const elapsed = Math.round((Date.now() - stepStartTime.current) / 1000);
    const finalMastery = masteryOverride ?? mastery;

    const depthScore = Math.min(100, thread.length * 25);
    finalMastery.depth = depthScore > 0 ? depthScore : finalMastery.depth;

    const composite = computeMastery(finalMastery);

    setStepStatus(aspirationId, step.id, "done");
    recordStepMetrics(aspirationId, step.id, { timeSpent: elapsed, masteryScore: composite, masteryBreakdown: finalMastery, thread });

    logEvent({
      type: sentiment === "struggle" ? "struggled" : "step_completed",
      summary: note || `Completed "${step.title}" toward becoming ${aspirationTitle}. Mastery: ${composite ?? "?"}%`,
      aspirationId, area, stepId: step.id, sentiment, importance: 0.7, tags: ["step", "completed", step.kind],
    });

    if (note && note.length > 10) {
      logEvent({ type: "user_voice", summary: note, aspirationId, area, importance: 0.6, tags: ["reflection", step.kind] });
    }

    const expectedSec = step.minutes * 60;
    const timeRatio = elapsed / expectedSec;
    if (profile?.behavioral) {
      const prev = profile.behavioral;
      const newAvg = prev.avgTimeOnTask !== null ? (prev.avgTimeOnTask * 0.7 + elapsed * 0.3) : elapsed;
      recordBehavior({ avgTimeOnTask: newAvg });
      if (timeRatio > 2 && sentiment === "struggle") {
        logEvent({ type: "behavioral_signal", summary: `Spent ${Math.round(timeRatio)}x expected time on "${step.title}" and struggled`, aspirationId, area, importance: 0.8, tags: ["slow", "struggle"] });
      }
    }

    const stream: ZotStream = area === "career" ? "skill" : area === "entrepreneurship" ? "innovate" : "learn";
    const bonus = thread.length > 0 ? Math.min(thread.length * 5, 20) : 0;
    awardTokens(stream, 15 + bonus, `Completed "${step.title}"${bonus ? ` (+${bonus} depth bonus)` : ""}`);
    runOptimizer(sentiment);
    pulse(sentiment === "struggle" ? "struggle" : "success", 3200);
    setCompleted(true);
  };

  const handleLessonComplete = useCallback((scores: { comprehension: number | null; application: number | null }) => {
    const updated: MasteryBreakdown = {
      ...mastery,
      comprehension: scores.comprehension ?? mastery.comprehension,
      application: scores.application ?? mastery.application,
    };
    setMastery(updated);
    complete("positive", undefined, updated);
  }, [mastery, complete]);

  const compositeScore = computeMastery(mastery);

  if (completed) {
    return (
      <div className="py-16 text-center">
        <motion.div initial={{ scale: 0.6, rotate: -8 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="mx-auto w-20 h-20 rounded-[24px] flex items-center justify-center" style={{ background: "var(--z-accent)", boxShadow: "0 5px 0 var(--z-accent-edge)" }}>
          <PartyPopper className="w-9 h-9" style={{ color: "var(--z-on-brand)" }} />
        </motion.div>
        <h2 className="mt-5 zoe-display text-[clamp(1.6rem,4vw,2.4rem)]" style={{ color: "var(--z-ink)" }}>Done. +{15 + Math.min(thread.length * 5, 20)} ZOT</h2>
        {compositeScore !== null && (
          <div className="mt-3 flex justify-center">
            <ProgressRing pct={compositeScore} size={56} stroke={3.5}>
              <span className="z-mono text-[14px] font-extrabold" style={{ color: "var(--z-ink)" }}>{compositeScore}%</span>
            </ProgressRing>
          </div>
        )}
        {thread.length > 0 && (
          <p className="mt-2 text-[13px] font-semibold" style={{ color: "var(--z-ink-3)" }}>
            {thread.length} deep-dive{thread.length !== 1 ? "s" : ""} explored
          </p>
        )}
        <button onClick={onComplete} className="z-btn z-btn-brand mt-6 !px-7 !py-3.5">Continue <ArrowRight className="w-4.5 h-4.5" /></button>
      </div>
    );
  }

  // Content Engine path: rich multimodal lesson
  if (lessonContent && !loading && !completed) {
    return (
      <>
        <LessonPlayer
          lesson={lessonContent}
          stepTitle={step.title}
          onBack={onBack}
          onComplete={handleLessonComplete}
        />
        {/* Dev-only tool: hidden in production. Set NEXT_PUBLIC_SHOW_REGENERATE=true to force-show. */}
        {(process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_REGENERATE === "true") && (
          <button
            onClick={regenerate}
            title="Regenerate this lesson (clears its cache and rebuilds)"
            className="fixed bottom-4 right-4 z-[200] inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-bold shadow-lg backdrop-blur"
            style={{ background: "var(--z-surface-2, rgba(0,0,0,0.55))", color: "var(--z-ink-1, #fff)", border: "1px solid var(--z-line, rgba(255,255,255,0.15))" }}
          >
            <RefreshCw className="w-3.5 h-3.5" /> Regenerate
          </button>
        )}
      </>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-[13.5px] font-bold mb-5" style={{ color: "var(--z-ink-3)" }}>
        <ArrowLeft className="w-4 h-4" /> Back to journey
      </button>
      {loading || (!content && !lessonContent) ? (
        <ContentLoadingScreen stage={loadStage} message={loadMsg} stepTitle={step.title} />
      ) : content ? (
        <Delivered
          content={content} step={step} onComplete={complete}
          logEvent={logEvent} aspirationId={aspirationId} aspirationTitle={aspirationTitle}
          area={area} recordBehavior={recordBehavior} profile={profile}
          mastery={mastery} setMastery={setMastery}
          thread={thread} setThread={setThread}
        />
      ) : (
        <ContentLoadingScreen stage={loadStage} message={loadMsg} stepTitle={step.title} />
      )}
    </div>
  );
}

const STAGE_ORDER = ["planning", "planned", "media", "media_done", "generating", "verifying", "verified", "done", "fallback"];

function ContentLoadingScreen({ stage, message, stepTitle }: { stage: string; message: string; stepTitle: string }) {
  const stageIndex = STAGE_ORDER.indexOf(stage);
  const pct = stage === "fallback" ? 80 : Math.min(96, Math.round(((stageIndex + 1) / STAGE_ORDER.length) * 100));

  const stages = [
    { key: "planning", label: "Planning lesson" },
    { key: "media", label: "Generating visuals" },
    { key: "generating", label: "Building experience" },
    { key: "verifying", label: "Verifying" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60svh] text-center px-4">
      {/* Animated orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 rounded-full mb-6 flex items-center justify-center"
        style={{
          background: "radial-gradient(circle, rgba(245,165,36,0.3) 0%, rgba(245,165,36,0.05) 70%)",
          boxShadow: "0 0 40px rgba(245,165,36,0.15)",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-t-transparent"
          style={{ borderColor: "var(--z-accent)", borderTopColor: "transparent" }}
        />
      </motion.div>

      {/* Step title */}
      <h2 className="text-[18px] font-extrabold mb-2 max-w-xs" style={{ color: "var(--z-ink)" }}>
        {stepTitle}
      </h2>

      {/* Current stage message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="text-[14px] font-semibold mb-6"
          style={{ color: "var(--z-ink-3)" }}
        >
          {message}
        </motion.p>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-48 h-1.5 rounded-full overflow-hidden mb-4" style={{ background: "var(--z-line-2)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--z-accent)" }}
          initial={{ width: "5%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Stage indicators */}
      <div className="flex gap-4">
        {stages.map((s) => {
          const si = STAGE_ORDER.indexOf(s.key);
          const active = stageIndex >= si;
          const current = stage === s.key || (s.key === "planning" && (stage === "planned"));
          return (
            <div key={s.key} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: current ? "var(--z-accent)" : active ? "var(--z-brand-deep)" : "var(--z-line-2)",
                  boxShadow: current ? "0 0 8px rgba(245,165,36,0.4)" : "none",
                }}
              />
              <span className="text-[11px] font-bold" style={{ color: active ? "var(--z-ink-2)" : "var(--z-ink-3)" }}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */

const SWIPE = {
  initial: (d: number) => ({ x: d > 0 ? "80%" : "-80%", opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? "-80%" : "80%", opacity: 0 }),
  transition: { duration: 0.28, ease: EASE },
};

const QUICK_ACTIONS = [
  { label: "Explain differently", icon: RefreshCw, prompt: "Can you explain this concept in a completely different way?" },
  { label: "Go deeper", icon: Layers, prompt: "I want to go deeper into this. Explain the underlying details." },
  { label: "Give an example", icon: Lightbulb, prompt: "Give me a real-world example of this concept." },
];

function Delivered({ content, step, onComplete, logEvent, aspirationId, aspirationTitle, area, recordBehavior, profile, mastery, setMastery, thread, setThread }: {
  content: MentorResponse; step: JourneyStep;
  onComplete: (s?: "positive" | "struggle", note?: string, mastery?: MasteryBreakdown) => void;
  logEvent: (e: any) => void;
  aspirationId: string; aspirationTitle: string; area: string;
  recordBehavior: (p: Record<string, unknown>) => void; profile: any;
  mastery: MasteryBreakdown; setMastery: (m: MasteryBreakdown) => void;
  thread: StepThread[]; setThread: (t: StepThread[]) => void;
}) {
  type Card = { kind: "intro" } | { kind: "block"; index: number } | { kind: "interact" } | { kind: "chat" };
  const cards: Card[] = [
    { kind: "intro" },
    ...content.blocks.map((_, i) => ({ kind: "block" as const, index: i })),
    ...(content.interaction ? [{ kind: "interact" as const }] : []),
    { kind: "chat" },
  ];

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const card = cards[idx] ?? cards[0];
  const total = cards.length;

  const go = (next: number) => {
    if (next < 0 || next >= total) return;
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  };

  return (
    <div className="min-h-[70svh] flex flex-col">
      <div className="flex gap-1.5 justify-center mb-6">
        {cards.map((_, i) => (
          <span key={i} className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === idx ? 18 : 5,
              background: i === idx ? "var(--z-accent)" : i < idx ? "var(--z-accent-edge)" : "var(--z-line-2)",
            }} />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait" custom={dir}>
          {card.kind === "intro" && (
            <motion.div key="intro" custom={dir} variants={SWIPE}
              initial="initial" animate="animate" exit="exit" transition={SWIPE.transition}
              className="w-full text-center px-2">
              <span className="z-chip mb-3 capitalize inline-flex" style={{ background: "var(--z-accent-soft)", color: "var(--z-brand-deep)" }}>
                {step.kind} · {step.minutes} min
              </span>
              <h1 className="zoe-display text-[clamp(2rem,7vw,3rem)] leading-[1.08]" style={{ color: "var(--z-ink)" }}>
                {step.title}
              </h1>
              {content.intro && (
                <p className="mt-4 text-[16px] leading-relaxed font-medium max-w-sm mx-auto" style={{ color: "var(--z-ink-2)" }}>
                  {content.intro}
                </p>
              )}
              <button onClick={() => go(1)} className="z-btn z-btn-brand mt-8 !py-3.5 !px-8">
                {total > 2 ? "Begin" : "Continue"} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {card.kind === "block" && (
            <motion.div key={`block-${card.index}`} custom={dir} variants={SWIPE}
              initial="initial" animate="animate" exit="exit" transition={SWIPE.transition}
              className="w-full max-w-md px-2">
              <Block b={content.blocks[card.index]} />
              <button onClick={() => go(idx + 1)} className="z-btn z-btn-brand mt-8 mx-auto !py-3.5 !px-8">
                {idx === total - 3 && content.interaction ? "Answer" : idx === total - 2 ? "Explore" : "Next"} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {card.kind === "interact" && (
            <motion.div key="interact" custom={dir} variants={SWIPE}
              initial="initial" animate="animate" exit="exit" transition={SWIPE.transition}
              className="w-full max-w-md px-2">
              <Interaction content={content} onDone={(m) => { setMastery(m); go(idx + 1); }}
                logEvent={logEvent} aspirationId={aspirationId} area={area}
                stepKind={step.kind} recordBehavior={recordBehavior} profile={profile}
                mastery={mastery} />
            </motion.div>
          )}

          {card.kind === "chat" && (
            <motion.div key="chat" custom={dir} variants={SWIPE}
              initial="initial" animate="animate" exit="exit" transition={SWIPE.transition}
              className="w-full max-w-md px-2">
              <ConversationPane
                step={step} aspirationTitle={aspirationTitle} area={area}
                profile={profile} thread={thread} setThread={setThread}
                mastery={mastery} setMastery={setMastery}
                onComplete={onComplete} logEvent={logEvent} aspirationId={aspirationId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {idx > 0 && (
        <button onClick={() => go(idx - 1)}
          className="mt-4 text-center text-[13px] font-bold"
          style={{ color: "var(--z-ink-3)" }}>
          <ArrowLeft className="w-3.5 h-3.5 inline mr-1" />Back
        </button>
      )}
    </div>
  );
}

/* ── Conversation pane — the deep-dive chat within a concept ─────────── */
function ConversationPane({ step, aspirationTitle, area, profile, thread, setThread, mastery, setMastery, onComplete, logEvent, aspirationId }: {
  step: JourneyStep; aspirationTitle: string; area: string; profile: any;
  thread: StepThread[]; setThread: (t: StepThread[]) => void;
  mastery: MasteryBreakdown; setMastery: (m: MasteryBreakdown) => void;
  onComplete: (s?: "positive" | "struggle", note?: string, mastery?: MasteryBreakdown) => void;
  logEvent: (e: any) => void; aspirationId: string;
}) {
  const [input, setInput] = useState("");
  const [asking, setAsking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const compositeScore = computeMastery(mastery);

  const ask = async (question: string) => {
    if (!question.trim() || asking) return;
    setAsking(true);
    try {
      const res = await fetch("/api/zoe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hat: "mentor",
          aspiration: { title: aspirationTitle, area },
          step: { title: step.title, summary: step.summary, kind: step.kind, minutes: step.minutes },
          teaching: profile?.teaching,
          profileSummary: profile?.summary,
          userMessage: question,
          memoryContext: buildMemoryContext(getBrainSnapshot(), `${aspirationTitle} ${step.title}`),
        }),
      });
      const data: MentorResponse = await res.json();
      const reply = data.intro + (data.blocks?.length ? "\n\n" + data.blocks.map((b) => b.body).join("\n\n") : "");
      const entry: StepThread = { id: `t-${Date.now()}`, userMessage: question, aiResponse: reply, ts: Date.now() };
      const updated = [...thread, entry];
      setThread(updated);
      setInput("");

      const depthScore = Math.min(100, updated.length * 25);
      setMastery({ ...mastery, depth: depthScore });

      logEvent({ type: "user_voice", summary: `Deep-dive on "${step.title}": "${question}"`, aspirationId, area, stepId: step.id, importance: 0.5, tags: ["depth", "follow-up"] });
    } finally {
      setAsking(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [thread.length]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[18px] font-extrabold" style={{ color: "var(--z-ink)" }}>Explore deeper</h2>
          <p className="text-[12.5px] font-semibold" style={{ color: "var(--z-ink-3)" }}>
            Ask anything about this concept
          </p>
        </div>
        {compositeScore !== null && (
          <ProgressRing pct={compositeScore} size={40} stroke={2.5}>
            <span className="text-[9px] font-extrabold" style={{ color: "var(--z-brand-deep)" }}>{compositeScore}</span>
          </ProgressRing>
        )}
      </div>

      {/* Quick action chips */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {QUICK_ACTIONS.map((a) => (
          <button key={a.label} onClick={() => ask(a.prompt)} disabled={asking}
            className="z-chip zoe-haptic flex items-center gap-1 !py-1.5 !px-2.5"
            style={{ background: "var(--z-surface)", color: "var(--z-ink-2)" }}>
            <a.icon className="w-3 h-3" /> {a.label}
          </button>
        ))}
      </div>

      {/* Thread */}
      {thread.length > 0 && (
        <div ref={scrollRef} className="max-h-[40vh] overflow-y-auto space-y-3 mb-3 rounded-2xl p-3" style={{ background: "var(--z-surface)" }}>
          {thread.map((t) => (
            <div key={t.id}>
              <div className="flex justify-end mb-1.5">
                <span className="rounded-2xl rounded-br-md px-3.5 py-2 text-[13.5px] font-semibold max-w-[80%]"
                  style={{ background: "var(--z-accent)", color: "var(--z-on-brand)" }}>
                  {t.userMessage}
                </span>
              </div>
              <div className="flex justify-start">
                <span className="rounded-2xl rounded-bl-md px-3.5 py-2 text-[13.5px] font-medium max-w-[90%] leading-relaxed"
                  style={{ background: "var(--z-surface-2)", color: "var(--z-ink)" }}>
                  {t.aiResponse}
                </span>
              </div>
            </div>
          ))}
          {asking && (
            <div className="flex justify-start">
              <span className="rounded-2xl px-3.5 py-2 flex items-center gap-2" style={{ background: "var(--z-surface-2)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--z-accent)" }} />
                <span className="text-[13px] font-semibold" style={{ color: "var(--z-ink-3)" }}>Thinking…</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 items-end">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={1}
          placeholder="Ask a question about this concept…"
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(input); } }}
          className="flex-1 glass-soft rounded-2xl px-3.5 py-2.5 text-[14px] font-medium resize-none outline-none"
          style={{ color: "var(--z-ink)" }} />
        <button onClick={() => ask(input)} disabled={!input.trim() || asking}
          className="w-10 h-10 rounded-xl grid place-items-center flex-shrink-0 zoe-haptic"
          style={{ background: input.trim() ? "var(--z-accent)" : "var(--z-surface-2)", color: input.trim() ? "var(--z-on-brand)" : "var(--z-ink-3)" }}>
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Complete button */}
      <button onClick={() => onComplete("positive", undefined, mastery)} className="z-btn z-btn-brand mt-5 !py-3.5 w-full">
        <Check className="w-4 h-4" /> Complete step
      </button>
    </div>
  );
}

const BLOCK_ICON: Record<string, typeof Lightbulb | null> = {
  insight: Lightbulb, quote: Quote, steps: ListOrdered, visual: Eye,
  example: Wrench, analogy: Sparkles, text: null, code: Code2, diagram: GitBranch,
  canvas: Eye,
};

function Block({ b }: { b: ContentBlock }) {
  const Icon = BLOCK_ICON[b.kind] ?? null;
  if (b.kind === "text") return <p className="text-[15.5px] leading-relaxed font-medium" style={{ color: "var(--z-ink)" }}>{b.body}</p>;
  if (b.kind === "quote") return (
    <blockquote className="glass-soft rounded-2xl p-5" style={{ background: "var(--z-accent-soft)" }}>
      <p className="text-[16px] font-semibold italic leading-relaxed" style={{ color: "var(--z-ink)" }}>{b.body}</p>
    </blockquote>
  );
  if (b.kind === "code" && b.body) return (
    <div className="glass rounded-3xl overflow-hidden">
      <div className="flex items-center gap-1.5 px-5 pt-4 text-[12px] font-extrabold uppercase tracking-wider" style={{ color: "var(--z-brand-deep)" }}>
        <Code2 className="w-3.5 h-3.5" /> {b.language || "code"}
      </div>
      <pre className="p-5 overflow-x-auto text-[13.5px] leading-relaxed font-mono" style={{ color: "var(--z-ink)" }}><code>{b.body}</code></pre>
    </div>
  );
  if (b.kind === "diagram" && b.mermaid) return <MermaidBlock definition={b.mermaid} title={b.title} />;
  if (b.kind === "visual" && b.svg) return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wider mb-3" style={{ color: "var(--z-brand-deep)" }}>
        <Eye className="w-3.5 h-3.5" /> {b.title || "Visual"}
      </div>
      <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: b.svg }} />
    </div>
  );
  if (b.kind === "canvas" && b.canvasCode) return <CanvasVisual code={b.canvasCode} title={b.title || "Interactive"} />;
  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wider mb-2" style={{ color: "var(--z-brand-deep)" }}>
        {Icon && <Icon className="w-3.5 h-3.5" />} {b.title || b.kind}
      </div>
      <p className="text-[14.5px] font-medium leading-relaxed" style={{ color: "var(--z-ink-2)" }}>{b.body}</p>
      {b.items && b.items.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {b.items.map((it, i) => (
            <li key={i} className="flex items-start gap-2 text-[14px] font-medium" style={{ color: "var(--z-ink)" }}>
              <span className="z-mono text-[12px] font-bold mt-0.5" style={{ color: "var(--z-brand-deep)" }}>{i + 1}.</span> {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MermaidBlock({ definition, title }: { definition: string; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, theme: "base", themeVariables: { primaryColor: "#d4a853", primaryTextColor: "#2a2214", lineColor: "#c4b599", secondaryColor: "#f5f0e8" } });
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        const { svg: rendered } = await mermaid.render(id, definition);
        if (!cancelled) setSvg(rendered);
      } catch { if (!cancelled) setError(true); }
    })();
    return () => { cancelled = true; };
  }, [definition]);
  if (error) return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wider mb-2" style={{ color: "var(--z-brand-deep)" }}>
        <GitBranch className="w-3.5 h-3.5" /> {title || "Diagram"}
      </div>
      <pre className="text-[13px] font-mono whitespace-pre-wrap" style={{ color: "var(--z-ink-2)" }}>{definition}</pre>
    </div>
  );
  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wider mb-3" style={{ color: "var(--z-brand-deep)" }}>
        <GitBranch className="w-3.5 h-3.5" /> {title || "Diagram"}
      </div>
      {svg ? <div ref={ref} className="flex justify-center overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} /> : <div className="h-32 animate-pulse rounded-2xl" style={{ background: "var(--z-surface-2)" }} />}
    </div>
  );
}

function Interaction({ content, onDone, logEvent, aspirationId, area, stepKind, recordBehavior, profile, mastery }: {
  content: MentorResponse;
  onDone: (m: MasteryBreakdown) => void;
  logEvent: any; aspirationId: string; area: string; stepKind: string;
  recordBehavior: (p: Record<string, unknown>) => void; profile: any;
  mastery: MasteryBreakdown;
}) {
  const it = content.interaction;
  const [picked, setPicked] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [confidenceRating, setConfidenceRating] = useState<number | null>(null);
  const [confidencePhase, setConfidencePhase] = useState<"ask" | "done">("ask");

  if (!it) return <button onClick={() => onDone(mastery)} className="z-btn z-btn-brand mt-7 !py-3.5">Continue <ArrowRight className="w-4.5 h-4.5" /></button>;

  if (it.type === "confidence" && it.options?.length) {
    if (confidencePhase === "ask") {
      return (
        <div className="mt-7 glass rounded-3xl p-5">
          <div className="font-bold text-[15.5px] mb-1" style={{ color: "var(--z-ink)" }}>{it.confidencePrompt || "How confident are you?"}</div>
          <p className="text-[13.5px] font-medium mb-4" style={{ color: "var(--z-ink-3)" }}>Rate your confidence, then answer.</p>
          <div className="flex gap-2 justify-center mb-5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setConfidenceRating(n)}
                className="w-12 h-12 rounded-2xl font-bold text-[16px] transition-all"
                style={{ background: confidenceRating === n ? "var(--z-accent)" : "var(--z-surface)", color: confidenceRating === n ? "var(--z-on-brand)" : "var(--z-ink)", border: `2px solid ${confidenceRating === n ? "var(--z-accent-edge)" : "var(--z-line-2)"}` }}>
                {n}
              </button>
            ))}
          </div>
          {confidenceRating !== null && <button onClick={() => setConfidencePhase("done")} className="z-btn z-btn-brand !py-3">Now answer <ArrowRight className="w-4 h-4" /></button>}
        </div>
      );
    }
    const answered = picked !== null;
    const correct = answered && picked === it.answerIndex;
    return (
      <div className="mt-7 glass rounded-3xl p-5">
        <div className="font-bold text-[15.5px] mb-3" style={{ color: "var(--z-ink)" }}>{it.prompt}</div>
        <div className="grid gap-2.5">
          {it.options.map((o, i) => {
            const isPick = picked === i; const isAnswer = it.answerIndex === i;
            const bg = !answered ? undefined : isAnswer ? "var(--z-good-soft)" : isPick ? "var(--z-accent-soft)" : undefined;
            const bc = !answered ? "var(--z-line-2)" : isAnswer ? "var(--z-good)" : isPick ? "var(--z-accent-edge)" : "var(--z-line-2)";
            return (
              <button key={i} disabled={answered} onClick={() => {
                setPicked(i);
                const wasCorrect = i === it.answerIndex;
                const wasConfident = (confidenceRating ?? 3) >= 4;
                if (wasConfident && !wasCorrect) logEvent({ type: "confidence_check", summary: `Overconfident on MCQ (rated ${confidenceRating}/5, got wrong)`, aspirationId, area, importance: 0.7, tags: ["calibration", "overconfident"] });
                else if (!wasConfident && wasCorrect) logEvent({ type: "confidence_check", summary: `Underconfident on MCQ (rated ${confidenceRating}/5, got right)`, aspirationId, area, importance: 0.5, tags: ["calibration", "underconfident"] });
                if (profile?.behavioral) {
                  const prev = profile.behavioral;
                  const acc = prev.mcqAccuracy !== null ? prev.mcqAccuracy * 0.8 + (wasCorrect ? 0.2 : 0) : wasCorrect ? 1 : 0;
                  const calDelta = wasConfident === wasCorrect ? 0.05 : -0.05;
                  const cal = prev.confidenceCalibration !== null ? Math.max(0, Math.min(1, prev.confidenceCalibration + calDelta)) : wasConfident === wasCorrect ? 0.6 : 0.4;
                  recordBehavior({ mcqAccuracy: acc, confidenceCalibration: cal });
                }
              }}
                className="glass-soft text-left p-3.5 rounded-2xl font-semibold text-[14.5px] transition-all disabled:cursor-default"
                style={{ background: bg, borderColor: bc, color: "var(--z-ink)" }}>{o}</button>
            );
          })}
        </div>
        {answered && it.explanation && <p className="mt-3 text-[14px] font-medium" style={{ color: "var(--z-ink-2)" }}>{it.explanation}</p>}
        {answered && (
          <button onClick={() => {
            const confScore = confidenceRating !== null ? ((confidenceRating >= 4) === correct ? 90 : 30) : null;
            onDone({ ...mastery, comprehension: correct ? 90 : 40, confidence: confScore });
          }} className="z-btn z-btn-brand mt-4 !py-3.5">
            {correct ? "Nailed it" : "Got it"} — explore deeper <ArrowRight className="w-4.5 h-4.5" />
          </button>
        )}
      </div>
    );
  }

  if (it.type === "mcq" && it.options?.length) {
    const answered = picked !== null;
    const correct = answered && picked === it.answerIndex;
    return (
      <div className="mt-7 glass rounded-3xl p-5">
        <div className="font-bold text-[15.5px] mb-3" style={{ color: "var(--z-ink)" }}>{it.prompt}</div>
        <div className="grid gap-2.5">
          {it.options.map((o, i) => {
            const isPick = picked === i; const isAnswer = it.answerIndex === i;
            const bg = !answered ? undefined : isAnswer ? "var(--z-good-soft)" : isPick ? "var(--z-accent-soft)" : undefined;
            const bc = !answered ? "var(--z-line-2)" : isAnswer ? "var(--z-good)" : isPick ? "var(--z-accent-edge)" : "var(--z-line-2)";
            return (
              <button key={i} disabled={answered} onClick={() => {
                setPicked(i);
                if (profile?.behavioral) {
                  const wasCorrect = i === it.answerIndex;
                  const prev = profile.behavioral;
                  const acc = prev.mcqAccuracy !== null ? prev.mcqAccuracy * 0.8 + (wasCorrect ? 0.2 : 0) : wasCorrect ? 1 : 0;
                  recordBehavior({ mcqAccuracy: acc });
                }
              }}
                className="glass-soft text-left p-3.5 rounded-2xl font-semibold text-[14.5px] transition-all disabled:cursor-default"
                style={{ background: bg, borderColor: bc, color: "var(--z-ink)" }}>{o}</button>
            );
          })}
        </div>
        {answered && it.explanation && <p className="mt-3 text-[14px] font-medium" style={{ color: "var(--z-ink-2)" }}>{it.explanation}</p>}
        {answered && (
          <button onClick={() => onDone({ ...mastery, comprehension: correct ? 90 : 40 })} className="z-btn z-btn-brand mt-4 !py-3.5">
            {correct ? "Nailed it" : "Got it"} — explore deeper <ArrowRight className="w-4.5 h-4.5" />
          </button>
        )}
      </div>
    );
  }

  if (it.type === "build" || it.type === "predict") {
    return (
      <div className="mt-7 glass rounded-3xl p-5">
        <div className="font-bold text-[15.5px] mb-3" style={{ color: "var(--z-ink)" }}>{it.prompt}</div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3}
          placeholder={it.type === "build" ? "Describe what you built…" : "Your prediction…"}
          className="w-full glass-soft rounded-2xl p-3.5 text-[15px] font-medium resize-none outline-none" style={{ color: "var(--z-ink)" }} />
        <button onClick={() => {
          const words = text.trim().split(/\s+/).length;
          const appScore = text.trim().length > 20 ? Math.min(90, 50 + words * 2) : 40;
          if (text.trim() && profile?.behavioral) {
            const prev = profile.behavioral;
            const newDepth = prev.reflectionDepth !== null ? prev.reflectionDepth * 0.7 + words * 0.3 : words;
            recordBehavior({ reflectionDepth: newDepth });
          }
          onDone({ ...mastery, application: appScore });
        }} className="z-btn z-btn-brand mt-3 !py-3.5">Submit — explore deeper <Send className="w-4 h-4" /></button>
      </div>
    );
  }

  return (
    <div className="mt-7 glass rounded-3xl p-5">
      <div className="font-bold text-[15.5px] mb-3" style={{ color: "var(--z-ink)" }}>{it.prompt}</div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3}
        placeholder="Your answer…" className="w-full glass-soft rounded-2xl p-3.5 text-[15px] font-medium resize-none outline-none" style={{ color: "var(--z-ink)" }} />
      <button onClick={() => {
        const words = text.trim().split(/\s+/).length;
        if (text.trim() && profile?.behavioral) {
          const prev = profile.behavioral;
          const newDepth = prev.reflectionDepth !== null ? prev.reflectionDepth * 0.7 + words * 0.3 : words;
          recordBehavior({ reflectionDepth: newDepth });
        }
        onDone({ ...mastery, comprehension: text.trim().length > 20 ? 70 : 50 });
      }} className="z-btn z-btn-brand mt-3 !py-3.5">Submit — explore deeper <Send className="w-4 h-4" /></button>
    </div>
  );
}
