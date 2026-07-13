"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Brain, Activity, Zap, Target } from "lucide-react";
import MobileShell from "./MobileShell";
import LivingBackground from "./LivingBackground";
import ZoeOrb from "./ZoeOrb";
import { ProgressRing, RadarChart, StreakVis, MiniBar, PulseOrb } from "./ZoeGraphics";
import { useZoeBrain } from "@/lib/zoe/brain";
import { getStreakDays } from "@/lib/zoe/memory";
import { journeyProgress } from "@/lib/zoe/journey";
import type { BehavioralMetrics, CognitiveStyle, DnaDimension, ZotStream } from "@/lib/zoe/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const STREAM_LABEL: Record<ZotStream, string> = { learn: "Learn", teach: "Teach", impact: "Impact", skill: "Skill", innovate: "Innovate" };
const STREAM_COLOR: Record<ZotStream, string> = { learn: "#F0A91E", teach: "#7C5CFF", impact: "#3FB984", skill: "#2E9BFF", innovate: "#FF6B5B" };

export default function ProfileView() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const identity = useZoeBrain((s) => s.identity);
  const profile = useZoeBrain((s) => s.profile);
  const aspirations = useZoeBrain((s) => s.aspirations);
  const events = useZoeBrain((s) => s.events);
  const ledger = useZoeBrain((s) => s.ledger);

  const streak = useMemo(() => getStreakDays(events), [events]);
  const totalZot = useMemo(() => ledger.reduce((s, e) => s + e.amount, 0), [ledger]);

  const streamTotals = useMemo(() => {
    const m: Record<string, number> = {};
    for (const e of ledger) m[e.stream] = (m[e.stream] || 0) + e.amount;
    return m;
  }, [ledger]);

  const overallMastery = useMemo(() => {
    const all = aspirations.flatMap((a) => a.journey?.phases.flatMap((p) => p.steps) ?? []);
    const scored = all.filter((s) => s.masteryScore !== null);
    if (!scored.length) return null;
    return Math.round(scored.reduce((s, st) => s + (st.masteryScore ?? 0), 0) / scored.length);
  }, [aspirations]);

  const overallProgress = useMemo(() => {
    let done = 0, total = 0;
    for (const a of aspirations) {
      const p = journeyProgress(a.journey);
      done += p.done; total += p.total;
    }
    return total ? Math.round((done / total) * 100) : 0;
  }, [aspirations]);

  const cogAxes = useMemo(() => {
    if (!profile) return [];
    const cs = profile.cognitiveStyle;
    return [
      { label: "Abstract", value: (1 - cs.abstractVsConcrete) / 2 },
      { label: "Active", value: (1 + cs.activeVsReflective) / 2 },
      { label: "Global", value: (1 + cs.sequentialVsGlobal) / 2 },
      { label: "Visual", value: (1 + cs.verbalVsVisual) / 2 },
      { label: "Social", value: (1 + cs.socialVsSolo) / 2 },
    ];
  }, [profile]);

  if (!mounted || !identity || !profile) {
    return (
      <div className="zoe zoe-warm relative min-h-screen flex items-center justify-center">
        <LivingBackground />
        <ZoeOrb size={48} className="relative z-10" />
      </div>
    );
  }

  return (
    <MobileShell right={<span className="z-mono text-[13px] font-bold" style={{ color: "var(--z-ink-3)" }}>{identity.ageGroup}</span>}>
      <Link href="/home" className="inline-flex items-center gap-1.5 text-[13px] font-bold mb-3" style={{ color: "var(--z-ink-3)" }}>
        <ArrowLeft className="w-4 h-4" /> Home
      </Link>

      {/* Hero — name + progress ring */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: EASE }}
        className="flex items-center gap-4">
        <ProgressRing pct={overallProgress} size={72} stroke={4}>
          <span className="z-mono text-[17px] font-extrabold" style={{ color: "var(--z-ink)" }}>{overallProgress}%</span>
        </ProgressRing>
        <div className="flex-1 min-w-0">
          <h1 className="zoe-display text-[clamp(2rem,7vw,2.8rem)] leading-tight" style={{ color: "var(--z-ink)" }}>{identity.name}</h1>
          {profile.summary && (
            <p className="mt-1 text-[13.5px] font-medium leading-relaxed" style={{ color: "var(--z-ink-2)" }}>{profile.summary}</p>
          )}
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="rounded-2xl p-2.5 flex flex-col items-center gap-1" style={{ background: "var(--z-surface)" }}>
          <StreakVis days={streak} size={32} />
          <div className="z-mono text-[15px] font-extrabold" style={{ color: "var(--z-ink)" }}>{streak}d</div>
          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--z-ink-3)" }}>Streak</div>
        </div>
        <div className="rounded-2xl p-2.5 flex flex-col items-center gap-1" style={{ background: "var(--z-surface)" }}>
          <ProgressRing pct={Math.min(totalZot, 100)} size={32} stroke={2.5} color="var(--z-brand-deep)">
            <Target className="w-3 h-3" style={{ color: "var(--z-brand-deep)" }} />
          </ProgressRing>
          <div className="z-mono text-[15px] font-extrabold" style={{ color: "var(--z-ink)" }}>{totalZot}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--z-ink-3)" }}>ZOT</div>
        </div>
        <div className="rounded-2xl p-2.5 flex flex-col items-center gap-1" style={{ background: "var(--z-surface)" }}>
          <ProgressRing pct={overallProgress} size={32} stroke={2.5} color="var(--z-good)">
            <Activity className="w-3 h-3" style={{ color: "var(--z-good)" }} />
          </ProgressRing>
          <div className="z-mono text-[15px] font-extrabold" style={{ color: "var(--z-ink)" }}>{overallProgress}%</div>
          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--z-ink-3)" }}>Progress</div>
        </div>
      </div>

      {/* Cognitive style — radar chart */}
      {cogAxes.length >= 5 && (
        <Section title="How you think" icon={Brain} delay={0.05}>
          <div className="flex flex-col items-center">
            <RadarChart axes={cogAxes} size={180} />
          </div>
          <CognitiveSliders cs={profile.cognitiveStyle} />
        </Section>
      )}

      {/* Dimensions */}
      {profile.dimensions.length > 0 && (
        <Section title="Your dimensions" icon={Activity} delay={0.1}>
          <div className="space-y-3">
            {profile.dimensions.map((d, i) => (
              <DimensionRow key={d.id} dim={d} delay={i * 0.03} />
            ))}
          </div>
        </Section>
      )}

      {/* Behavioral signals */}
      <Section title="Behavioral signals" icon={TrendingUp} delay={0.15}>
        <BehavioralView beh={profile.behavioral} mastery={overallMastery} />
      </Section>

      {/* Strengths & growth edges */}
      {(profile.strengths.length > 0 || profile.growthEdges.length > 0) && (
        <Section title="Strengths & edges" icon={Zap} delay={0.2}>
          {profile.strengths.length > 0 && (
            <div className="mb-3">
              <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "var(--z-good)" }}>Strengths</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {profile.strengths.map((s) => (
                  <span key={s} className="z-chip" style={{ background: "var(--z-good-soft)", color: "var(--z-good)" }}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {profile.growthEdges.length > 0 && (
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "var(--z-accent-edge)" }}>Growth edges</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {profile.growthEdges.map((s) => (
                  <span key={s} className="z-chip" style={{ background: "var(--z-accent-soft)", color: "var(--z-brand-deep)" }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </Section>
      )}

      {/* ZOT breakdown */}
      {totalZot > 0 && (
        <Section title="ZOT breakdown" icon={Target} delay={0.25}>
          <div className="space-y-2.5">
            {(Object.entries(streamTotals) as [ZotStream, number][]).map(([stream, amount]) => {
              const maxStream = Math.max(...Object.values(streamTotals), 1);
              return (
                <div key={stream}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-bold" style={{ color: "var(--z-ink)" }}>{STREAM_LABEL[stream] ?? stream}</span>
                    <span className="z-mono text-[12px] font-bold" style={{ color: STREAM_COLOR[stream] ?? "var(--z-ink-2)" }}>{amount}</span>
                  </div>
                  <MiniBar value={amount} max={maxStream} color={STREAM_COLOR[stream] ?? "var(--z-accent)"} />
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Teaching style */}
      <Section title="How ZOE teaches you" icon={Brain} delay={0.3}>
        <div className="grid grid-cols-2 gap-2">
          <Mini label="Tone" value={profile.teaching.tone} />
          <Mini label="Pace" value={profile.teaching.pace} />
          <Mini label="Depth" value={profile.teaching.depth} />
          <Mini label="Encouragement" value={profile.teaching.encouragement} />
        </div>
        {profile.teaching.modalities.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {profile.teaching.modalities.map((m) => (
              <span key={m} className="z-chip" style={{ background: "var(--z-surface-2)", color: "var(--z-ink-2)" }}>{m}</span>
            ))}
          </div>
        )}
      </Section>

      <div className="h-8" />
    </MobileShell>
  );
}

function Section({ title, icon: Icon, delay, children }: { title: string; icon: typeof Brain; delay: number; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ease: EASE }} className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4" style={{ color: "var(--z-brand-deep)" }} />
        <span className="text-[13px] font-extrabold uppercase tracking-wider" style={{ color: "var(--z-ink-3)" }}>{title}</span>
      </div>
      <div className="rounded-2xl p-4" style={{ background: "var(--z-surface)" }}>
        {children}
      </div>
    </motion.div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center py-1.5">
      <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--z-ink-3)" }}>{label}</div>
      <div className="text-[14px] font-bold capitalize" style={{ color: "var(--z-ink)" }}>{value}</div>
    </div>
  );
}

function CognitiveSliders({ cs }: { cs: CognitiveStyle }) {
  const axes: { left: string; right: string; value: number }[] = [
    { left: "Abstract", right: "Concrete", value: cs.abstractVsConcrete },
    { left: "Reflect first", right: "Try first", value: cs.activeVsReflective },
    { left: "Step-by-step", right: "Big picture", value: cs.sequentialVsGlobal },
    { left: "Text", right: "Visual", value: cs.verbalVsVisual },
    { left: "Solo", right: "Social", value: cs.socialVsSolo },
  ];

  return (
    <div className="mt-4 space-y-2.5">
      {axes.map((a) => {
        const pct = ((a.value + 1) / 2) * 100;
        return (
          <div key={a.left}>
            <div className="flex justify-between text-[10.5px] font-bold mb-0.5" style={{ color: "var(--z-ink-3)" }}>
              <span>{a.left}</span>
              <span>{a.right}</span>
            </div>
            <div className="relative h-1.5 rounded-full" style={{ background: "var(--z-surface-2)" }}>
              <motion.div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                style={{ background: "var(--z-accent)", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
                initial={{ left: "50%" }} animate={{ left: `${pct}%` }}
                transition={{ duration: 0.6, ease: EASE }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DimensionRow({ dim, delay }: { dim: DnaDimension; delay: number }) {
  const trend = dim.history.length >= 2 ? dim.history[dim.history.length - 1].value - dim.history[dim.history.length - 2].value : 0;
  const TrendIcon = trend > 2 ? TrendingUp : trend < -2 ? TrendingDown : Minus;
  const trendColor = trend > 2 ? "var(--z-good)" : trend < -2 ? "#e05555" : "var(--z-ink-3)";

  return (
    <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay, ease: EASE }}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[13.5px] font-bold" style={{ color: "var(--z-ink)" }}>{dim.label}</span>
        <div className="flex items-center gap-1.5">
          <TrendIcon className="w-3.5 h-3.5" style={{ color: trendColor }} />
          <span className="z-mono text-[13px] font-bold" style={{ color: "var(--z-brand-deep)" }}>{Math.round(dim.value)}</span>
        </div>
      </div>
      <MiniBar value={dim.value} />
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10.5px] font-semibold" style={{ color: "var(--z-ink-3)" }}>
          {dim.source === "assessed" ? "Tested" : dim.source === "observed" ? "Observed" : "Self-reported"}
          {" · "}confidence {Math.round(dim.confidence * 100)}%
        </span>
      </div>
    </motion.div>
  );
}

function BehavioralView({ beh, mastery }: { beh: BehavioralMetrics; mastery: number | null }) {
  const signals: { label: string; value: number | null; display: string; color: string }[] = [
    { label: "MCQ accuracy", value: beh.mcqAccuracy !== null ? beh.mcqAccuracy * 100 : null, display: beh.mcqAccuracy !== null ? `${Math.round(beh.mcqAccuracy * 100)}%` : "", color: "var(--z-good)" },
    { label: "Confidence", value: beh.confidenceCalibration !== null ? beh.confidenceCalibration * 100 : null, display: beh.confidenceCalibration !== null ? (beh.confidenceCalibration > 0.5 ? "Good" : "Mixed") : "", color: "#7C5CFF" },
    { label: "Consistency", value: beh.streakConsistency !== null ? beh.streakConsistency * 100 : null, display: beh.streakConsistency !== null ? `${Math.round(beh.streakConsistency * 100)}%` : "", color: "var(--z-accent)" },
    { label: "Mastery", value: mastery, display: mastery !== null ? `${mastery}%` : "", color: "var(--z-brand-deep)" },
  ];

  const active = signals.filter((s) => s.value !== null);

  if (!active.length) {
    return (
      <div className="flex flex-col items-center py-4">
        <PulseOrb size={48} />
        <p className="mt-2 text-[12.5px] font-medium" style={{ color: "var(--z-ink-3)" }}>Complete a few steps to see your data.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {active.map((s) => (
        <div key={s.label} className="flex items-center gap-2.5">
          <ProgressRing pct={s.value ?? 0} size={36} stroke={2.5} color={s.color}>
            <span className="text-[8px] font-extrabold" style={{ color: s.color }}>
              {typeof s.value === "number" ? Math.round(s.value) : ""}
            </span>
          </ProgressRing>
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-wider" style={{ color: "var(--z-ink-3)" }}>{s.label}</div>
            <div className="text-[14px] font-extrabold" style={{ color: "var(--z-ink)" }}>{s.display}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
