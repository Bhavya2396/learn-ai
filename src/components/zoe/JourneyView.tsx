"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Map as MapIcon, ListTree, Play, Flag, Lock,
  BookOpen, FlaskConical, Hammer, Compass, Target,
} from "lucide-react";
import MobileShell from "./MobileShell";
import LivingBackground from "./LivingBackground";
import ZoeOrb from "./ZoeOrb";
import { ProgressRing, PulseOrb } from "./ZoeGraphics";
import { AreaIcon, type AreaKey } from "./illustrations";
import MermaidMap from "./MermaidMap";
import StepRunner from "./StepRunner";
import { useZoeBrain } from "@/lib/zoe/brain";
import { journeyProgress } from "@/lib/zoe/journey";
import { areaMeta, type Journey, type JourneyStep, type StepKind } from "@/lib/zoe/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEP_ICON: Record<StepKind, typeof BookOpen> = {
  concept: BookOpen, practice: FlaskConical, project: Hammer, reflection: Compass, challenge: Target, milestone: Flag,
};

export default function JourneyView({ id }: { id: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const aspiration = useZoeBrain((s) => s.aspirations.find((a) => a.id === id));
  const setActiveAspiration = useZoeBrain((s) => s.setActiveAspiration);
  const [tab, setTab] = useState<"index" | "map">("index");
  const [openStepId, setOpenStepId] = useState<string | null>(null);

  useEffect(() => { if (aspiration) setActiveAspiration(aspiration.id); }, [aspiration, setActiveAspiration]);

  const meta = areaMeta(aspiration?.area);
  const journey = aspiration?.journey ?? null;
  const prog = useMemo(() => journeyProgress(journey), [journey]);
  const flat = useMemo(() => journey?.phases.flatMap((p) => p.steps) ?? [], [journey]);
  const current = flat.find((s) => s.id === journey?.currentStepId) ?? flat.find((s) => s.status !== "done");
  const openStep = flat.find((s) => s.id === openStepId) ?? null;

  if (!mounted) {
    return <div className="zoe zoe-warm relative min-h-screen flex items-center justify-center"><LivingBackground /><ZoeOrb size={64} className="relative z-10" /></div>;
  }

  if (!aspiration || !journey) {
    return (
      <div className="zoe zoe-warm relative min-h-screen flex items-center justify-center">
        <LivingBackground />
        <div className="relative z-10 text-center px-6">
          <PulseOrb size={100} className="mx-auto mb-2" />
          <h1 className="mt-5 zoe-display text-[1.8rem]" style={{ color: "var(--z-ink)" }}>This journey isn&apos;t here.</h1>
          <Link href="/home" className="z-btn z-btn-brand mt-6 !px-6 !py-3.5">Back home <ArrowRight className="w-4.5 h-4.5" /></Link>
        </div>
      </div>
    );
  }

  return (
    <MobileShell right={
      <span className="z-chip flex items-center gap-1.5" style={{ background: `${meta.color}22`, color: meta.color }}>
        <AreaIcon area={aspiration.area as AreaKey} size={14} color={meta.color} />
        {meta.label}
      </span>
    }>
      <Link href="/home" className="inline-flex items-center gap-1.5 text-[13.5px] font-bold mb-2" style={{ color: "var(--z-ink-2)" }}>
        <ArrowLeft className="w-4 h-4" /> Home
      </Link>
      <main className="relative z-10">
        {openStep ? (
          <StepRunner
            aspirationId={aspiration.id}
            aspirationTitle={aspiration.title}
            area={aspiration.area}
            step={openStep}
            onBack={() => setOpenStepId(null)}
            onComplete={() => setOpenStepId(null)}
          />
        ) : (
          <>
            {/* Hero */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
              <div className="flex items-center gap-4">
                <ProgressRing pct={prog.pct} size={64} stroke={4} color={meta.color}>
                  <AreaIcon area={aspiration.area as AreaKey} size={22} color={meta.color} />
                </ProgressRing>
                <div className="flex-1 min-w-0">
                  <h1 className="zoe-display text-[clamp(1.7rem,5vw,2.6rem)] leading-tight" style={{ color: "var(--z-ink)" }}>{journey.headline}</h1>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed font-medium" style={{ color: "var(--z-ink-2)" }}>{journey.summary}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full overflow-hidden max-w-xs" style={{ background: "var(--z-line-2)" }}>
                  <motion.div className="h-full rounded-full" style={{ background: meta.color }} initial={{ width: 0 }} animate={{ width: `${prog.pct}%` }} transition={{ duration: 0.8, ease: EASE }} />
                </div>
                <span className="z-mono text-[13px] font-bold" style={{ color: "var(--z-ink-2)" }}>{prog.done}/{prog.total} · {prog.pct}%</span>
              </div>
              {current && (
                <button onClick={() => setOpenStepId(current.id)} className="z-btn z-btn-brand mt-6 !px-6 !py-3.5 !text-[15px]">
                  <Play className="w-4.5 h-4.5" /> {prog.done === 0 ? "Begin" : "Continue"}: {current.title}
                </button>
              )}
            </motion.div>

            {/* Tabs */}
            <div className="mt-9 inline-flex gap-1 p-1 rounded-2xl glass-soft">
              <TabBtn on={tab === "index"} onClick={() => setTab("index")} icon={ListTree} label="Path" />
              <TabBtn on={tab === "map"} onClick={() => setTab("map")} icon={MapIcon} label="Map" />
            </div>

            {tab === "index" ? (
              <JourneyTrail journey={journey} color={meta.color} currentId={current?.id ?? null} onOpen={(sid) => setOpenStepId(sid)} />
            ) : (
              <div className="mt-6 glass rounded-3xl p-5">
                <MermaidMap definition={journey.mermaid} />
              </div>
            )}
          </>
        )}
      </main>
    </MobileShell>
  );
}

function TabBtn({ on, onClick, icon: Icon, label }: { on: boolean; onClick: () => void; icon: typeof MapIcon; label: string }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[14px] font-bold transition-all"
      style={on ? { background: "var(--z-accent)", color: "var(--z-on-brand)" } : { color: "var(--z-ink-2)" }}>
      <Icon className="w-4 h-4" /> {label}
    </button>
  );
}

function DifficultyDots({ level, color }: { level: number; color: string }) {
  return (
    <span className="inline-flex gap-0.5 items-center" title={`Difficulty ${level}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i < level ? color : "var(--z-line-2)" }} />
      ))}
    </span>
  );
}

/* ── Journey trail — an exciting winding path of step nodes ──────────────── */

function JourneyTrail({ journey, color, currentId, onOpen }: {
  journey: Journey; color: string; currentId: string | null; onOpen: (stepId: string) => void;
}) {
  return (
    <div className="mt-6 space-y-7">
      {journey.phases.map((phase, pi) => {
        const done = phase.steps.filter((s) => s.status === "done").length;
        const total = phase.steps.length;
        const pct = total ? Math.round((done / total) * 100) : 0;
        return (
          <motion.div key={phase.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: pi * 0.05, ease: EASE }}>
            {/* Phase banner */}
            <div className="relative overflow-hidden rounded-2xl p-3.5 mb-1"
              style={{ background: `linear-gradient(110deg, ${color}1f, ${color}08)`, border: `1px solid ${color}22` }}>
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-[15px] flex-shrink-0"
                  style={{ background: color, color: "#fff", boxShadow: `0 3px 0 ${color}88` }}>{pi + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-[15.5px] leading-tight truncate" style={{ color: "var(--z-ink)" }}>{phase.title}</div>
                  <div className="text-[11.5px] font-bold" style={{ color: "var(--z-ink-3)" }}>{phase.timeframe} · {done}/{total} done</div>
                </div>
                {pct === 100 && <Check className="w-5 h-5 flex-shrink-0" style={{ color: "var(--z-good)" }} />}
              </div>
              <div className="mt-2.5 h-1.5 rounded-full overflow-hidden" style={{ background: `${color}22` }}>
                <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease: EASE }} />
              </div>
            </div>

            {/* Trail of nodes */}
            <div className="relative">
              {phase.steps.map((s, i) => {
                const prev = phase.steps[i - 1];
                const locked = s.status === "todo" && !!prev && prev.status !== "done" && s.id !== currentId;
                return (
                  <TrailNode key={s.id} step={s} color={color}
                    isActive={s.id === currentId} isLast={i === phase.steps.length - 1}
                    locked={locked} index={i} onOpen={() => onOpen(s.id)} />
                );
              })}
            </div>
          </motion.div>
        );
      })}

      {/* Destination flag */}
      <div className="flex items-center gap-3 pl-[14px]">
        <span className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--z-accent-soft)", border: "2px dashed var(--z-accent)" }}>
          <Flag className="w-5 h-5" style={{ color: "var(--z-brand-deep)" }} />
        </span>
        <div>
          <div className="font-extrabold text-[14px]" style={{ color: "var(--z-ink)" }}>{journey.destination || "You, transformed"}</div>
          <div className="text-[11.5px] font-bold" style={{ color: "var(--z-ink-3)" }}>The destination</div>
        </div>
      </div>
    </div>
  );
}

function TrailNode({ step, color, isActive, isLast, locked, index, onOpen }: {
  step: JourneyStep; color: string; isActive: boolean; isLast: boolean; locked: boolean; index: number; onOpen: () => void;
}) {
  const Icon = STEP_ICON[step.kind] || BookOpen;
  const done = step.status === "done";
  // gentle zigzag: nudge the card alternately for a winding feel
  const nudge = index % 2 === 0 ? 0 : 10;

  return (
    <div className="relative flex items-stretch gap-3" style={{ minHeight: 76 }}>
      {/* Rail + node */}
      <div className="relative flex flex-col items-center" style={{ width: 44 }}>
        {/* connecting line to next node */}
        {!isLast && (
          <span className="absolute left-1/2 -translate-x-1/2" style={{
            top: 44, bottom: -8, width: 3,
            background: done ? `linear-gradient(${color}, ${color}55)` : "var(--z-line-2)",
            borderRadius: 2,
          }} />
        )}
        {/* node */}
        <button onClick={onOpen} className="zoe-haptic relative z-10 rounded-full grid place-items-center flex-shrink-0 transition-transform"
          style={{
            width: isActive ? 50 : 44, height: isActive ? 50 : 44,
            background: done ? color : isActive ? color : "var(--z-surface)",
            border: isActive ? `3px solid ${color}` : done ? "none" : `2px solid var(--z-line-2)`,
            boxShadow: isActive ? `0 0 0 5px ${color}33, 0 4px 0 ${color}aa` : done ? `0 3px 0 ${color}aa` : "none",
            color: done || isActive ? "#fff" : "var(--z-ink-3)",
          }}>
          {done ? <Check className="w-5 h-5" /> : locked ? <Lock className="w-4 h-4" /> : <Icon className="w-5 h-5" />}
          {isActive && (
            <motion.span className="absolute inset-0 rounded-full" style={{ border: `2px solid ${color}` }}
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }} />
          )}
        </button>
      </div>

      {/* Card */}
      <button onClick={onOpen} className="zoe-haptic flex-1 text-left rounded-2xl p-3 mb-2 min-w-0 transition-all"
        style={{
          marginLeft: nudge,
          background: isActive ? `${color}12` : "var(--z-surface)",
          border: isActive ? `1.5px solid ${color}55` : "1.5px solid transparent",
          opacity: done ? 0.78 : locked ? 0.6 : 1,
        }}>
        <div className="flex items-center gap-2">
          <span className="font-bold text-[14px] leading-tight flex-1 min-w-0 truncate"
            style={{ color: "var(--z-ink)", textDecoration: done ? "line-through" : "none" }}>{step.title}</span>
          {isActive && <span className="z-chip flex-shrink-0 !py-0.5 !px-2 !text-[10px]" style={{ background: color, color: "#fff" }}>Now</span>}
          {done && step.masteryScore !== null && (
            <span className="z-mono text-[12px] font-extrabold flex-shrink-0" style={{ color: step.masteryScore >= 80 ? "var(--z-good)" : "var(--z-accent-edge)" }}>{step.masteryScore}%</span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold" style={{ color: "var(--z-ink-3)" }}>
          <span className="capitalize">{step.kind}</span><span>·</span>
          <span>{step.minutes} min</span><span>·</span>
          <DifficultyDots level={step.difficulty} color={color} />
        </div>
        {isActive && (
          <div className="mt-2 inline-flex items-center gap-1 text-[12px] font-extrabold" style={{ color: "var(--z-brand-deep)" }}>
            <Play className="w-3 h-3" /> Continue
          </div>
        )}
      </button>
    </div>
  );
}
