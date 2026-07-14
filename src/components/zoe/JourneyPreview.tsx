"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, BookOpen, FlaskConical, Hammer,
  Target, Flag, Compass, Pencil, Send,
} from "lucide-react";
import type { Journey, JourneyPhase, StepKind } from "@/lib/zoe/types";
import type { ProfileDraft } from "@/lib/zoe/hats-types";

const EASE = [0.22, 1, 0.36, 1] as const;
const SWIPE = {
  initial: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  transition: { duration: 0.32, ease: EASE },
};

const STEP_ICON: Record<StepKind, typeof BookOpen> = {
  concept: BookOpen, practice: FlaskConical, project: Hammer,
  reflection: Compass, challenge: Target, milestone: Flag,
};

const PHASE_COLORS = ["#E0892B", "#C2683A", "#B8862E", "#A8542E", "#8FA86E", "#C99A3B"];

type Card = { kind: "headline" } | { kind: "phase"; index: number } | { kind: "confirm" } | { kind: "tweak" };

export default function JourneyPreview({
  journey, profile, onAccept, onTweak,
}: {
  journey: Journey; profile?: ProfileDraft | null;
  onAccept: () => void; onTweak?: (feedback: string) => void;
}) {
  const cards: Card[] = [
    { kind: "headline" },
    ...journey.phases.map((_, i) => ({ kind: "phase" as const, index: i })),
    { kind: "confirm" },
  ];

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [feedback, setFeedback] = useState("");

  const go = (next: number) => {
    if (next < 0 || next >= cards.length) return;
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  };

  const card = cards[idx];
  const total = cards.length;
  const dims = profile?.dimensions ?? [];

  return (
    <div className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 py-10">
      {/* Progress dots */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {cards.map((_, i) => (
          <span key={i} className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === idx ? 20 : 6,
              background: i === idx ? "var(--z-accent)" : i < idx ? "var(--z-accent-edge)" : "var(--z-line-2)",
            }} />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={dir}>
        {card.kind === "headline" && (
          <motion.div key="headline" custom={dir} variants={SWIPE}
            initial="initial" animate="animate" exit="exit" transition={SWIPE.transition}
            className="w-full max-w-md text-center">
            <h1 className="zoe-display text-[clamp(2.4rem,8vw,3.6rem)] leading-[1.05]" style={{ color: "var(--z-ink)" }}>
              {journey.headline}
            </h1>
            <p className="mt-4 text-[16px] font-medium" style={{ color: "var(--z-ink-2)" }}>
              {journey.summary}
            </p>

            {dims.length > 0 && (
              <div className="mt-8 w-full max-w-xs mx-auto space-y-3">
                {dims.slice(0, 4).map((d, i) => (
                  <div key={d.label} className="flex items-center gap-3">
                    <span className="text-[13px] font-bold w-24 text-right truncate" style={{ color: "var(--z-ink-2)" }}>{d.label}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--z-surface-2)" }}>
                      <motion.div className="h-full rounded-full" style={{ background: "var(--z-accent)" }}
                        initial={{ width: 0 }} animate={{ width: `${d.value}%` }}
                        transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: EASE }} />
                    </div>
                    <span className="z-mono text-[12px] font-bold w-8" style={{ color: "var(--z-brand-deep)" }}>{d.value}</span>
                  </div>
                ))}
              </div>
            )}

            <button onClick={() => go(1)} className="z-btn z-btn-brand mt-10 !py-4 !px-10 !text-[16px]">
              See the path <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {card.kind === "phase" && (
          <PhaseCard key={`phase-${card.index}`} dir={dir}
            phase={journey.phases[card.index]}
            index={card.index}
            color={PHASE_COLORS[card.index % PHASE_COLORS.length]}
            isLast={card.index === journey.phases.length - 1}
            onNext={() => go(idx + 1)}
          />
        )}

        {card.kind === "confirm" && (
          <motion.div key="confirm" custom={dir} variants={SWIPE}
            initial="initial" animate="animate" exit="exit" transition={SWIPE.transition}
            className="w-full max-w-md text-center">
            <h1 className="zoe-display text-[clamp(2rem,7vw,3rem)] leading-[1.1]" style={{ color: "var(--z-ink)" }}>
              Ready?
            </h1>
            <p className="mt-3 text-[15px] font-medium" style={{ color: "var(--z-ink-2)" }}>
              {journey.phases.length} phases · {journey.phases.reduce((s, p) => s + p.steps.length, 0)} steps
            </p>
            <div className="mt-10 flex flex-col gap-3 w-full max-w-xs mx-auto">
              <button onClick={onAccept} className="z-btn z-btn-brand justify-center !py-4 !text-[16px]">
                Start <ArrowRight className="w-4.5 h-4.5" />
              </button>
              {onTweak && (
                <button onClick={() => { setDir(1); setIdx(total); }} className="z-btn z-btn-ghost justify-center !py-3.5">
                  <Pencil className="w-4 h-4" /> Adjust
                </button>
              )}
            </div>
          </motion.div>
        )}

        {card.kind === "tweak" && (
          <motion.div key="tweak" custom={dir} variants={SWIPE}
            initial="initial" animate="animate" exit="exit" transition={SWIPE.transition}
            className="w-full max-w-md text-center">
            <h1 className="zoe-display text-[clamp(1.8rem,6vw,2.6rem)] leading-[1.1]" style={{ color: "var(--z-ink)" }}>
              What would you change?
            </h1>
            <textarea autoFocus value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={3}
              placeholder="More hands-on, faster pace, deeper on X…"
              className="z-center-input !h-auto w-full max-w-xs mx-auto mt-6 resize-none"
              style={{ color: "var(--z-ink)" }} />
            <button onClick={() => { if (feedback.trim()) onTweak?.(feedback.trim()); }} disabled={!feedback.trim()}
              className="z-btn z-btn-brand mt-8 !py-4 !px-10 !text-[16px]">
              Rebuild <Send className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button — subtle, bottom-left */}
      {idx > 0 && idx < total && (
        <button onClick={() => go(idx - 1)}
          className="absolute bottom-8 left-6 inline-flex items-center gap-1 text-[13px] font-bold"
          style={{ color: "var(--z-ink-3)" }}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
      )}
    </div>
  );
}

function PhaseCard({ phase, index, color, isLast, onNext, dir }: {
  phase: JourneyPhase; index: number; color: string; isLast: boolean;
  onNext: () => void; dir: number;
}) {
  return (
    <motion.div custom={dir} variants={SWIPE}
      initial="initial" animate="animate" exit="exit" transition={SWIPE.transition}
      className="w-full max-w-md">
      {/* Phase number + title */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl font-extrabold text-[15px] mb-3"
          style={{ background: `${color}22`, color }}>
          {index + 1}
        </span>
        <h2 className="zoe-display text-[clamp(1.8rem,6vw,2.6rem)] leading-[1.1]" style={{ color: "var(--z-ink)" }}>
          {phase.title}
        </h2>
        <p className="mt-1 text-[13px] font-bold" style={{ color: "var(--z-ink-3)" }}>{phase.timeframe}</p>
      </div>

      {/* Steps list — compact */}
      <div className="space-y-2">
        {phase.steps.map((s, i) => {
          const Icon = STEP_ICON[s.kind] || BookOpen;
          return (
            <motion.div key={s.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, ease: EASE }}
              className="flex items-center gap-3 py-2.5 px-3 rounded-2xl"
              style={{ background: "var(--z-surface)" }}>
              <span className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}18` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[14px] font-bold leading-tight truncate" style={{ color: "var(--z-ink)" }}>{s.title}</span>
              </span>
              <span className="text-[12px] font-semibold flex-shrink-0" style={{ color: "var(--z-ink-3)" }}>{s.minutes}m</span>
            </motion.div>
          );
        })}
      </div>

      <button onClick={onNext} className="z-btn z-btn-brand mt-8 mx-auto !py-3.5 !px-8">
        {isLast ? "Looks good" : "Next phase"} <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
