"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus, Check, X, Play, Mic, ChevronRight, User, FileText, Sparkle, Upload } from "lucide-react";
import MobileShell from "./MobileShell";
import LivingBackground from "./LivingBackground";
import ZoeOrb from "./ZoeOrb";
import { ProgressRing, RadarChart, StreakVis, MiniBar, PulseOrb, Waveform, SkillPathVis } from "./ZoeGraphics";
import { AreaIcon, type AreaKey } from "./illustrations";
import JourneyPreview from "./JourneyPreview";
import DiscoverQuestions from "./DiscoverQuestions";
import { useZoeBrain, getBrainSnapshot } from "@/lib/zoe/brain";
import { buildMemoryContext, getStreakDays } from "@/lib/zoe/memory";
import { useAmbience } from "@/lib/zoe/ambience";
import { journeyProgress, normalizeJourney, currentSkillTier, type RawJourney } from "@/lib/zoe/journey";
import { AREA_META, areaMeta, type Aspiration, type Journey, type LifeArea, type ZoeProfile } from "@/lib/zoe/types";
import type { ArchitectResponse, ProfileDraft, QA } from "@/lib/zoe/hats-types";
import type { SourceSection } from "@/lib/zoe/content-types";

const EASE = [0.22, 1, 0.36, 1] as const;
const AREA_ORDER: LifeArea[] = ["career", "entrepreneurship", "craft", "health", "mindset", "money", "sustainability", "knowledge"];

function toDraft(p: ZoeProfile): ProfileDraft {
  return {
    summary: p.summary, motivations: p.motivations, cognitiveStyle: p.cognitiveStyle,
    timeAvailability: p.timeAvailability, emotionalBaseline: p.emotionalBaseline,
    strengths: p.strengths, growthEdges: p.growthEdges,
    dimensions: p.dimensions.map((d) => ({ label: d.label, value: d.value, note: d.note })), teaching: p.teaching,
  };
}

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const setBase = useAmbience((s) => s.setBase);
  const pulse = useAmbience((s) => s.pulse);
  const mood = useAmbience((s) => s.mood);

  const identity = useZoeBrain((s) => s.identity);
  const profile = useZoeBrain((s) => s.profile);
  const aspirations = useZoeBrain((s) => s.aspirations);
  const events = useZoeBrain((s) => s.events);
  const ledger = useZoeBrain((s) => s.ledger);
  const addAspiration = useZoeBrain((s) => s.addAspiration);
  const setJourney = useZoeBrain((s) => s.setJourney);
  const setAspirationSource = useZoeBrain((s) => s.setAspirationSource);
  const setActiveAspiration = useZoeBrain((s) => s.setActiveAspiration);

  const streak = useMemo(() => getStreakDays(events), [events]);
  const totalZot = useMemo(() => ledger.reduce((s, e) => s + e.amount, 0), [ledger]);

  const overallProgress = useMemo(() => {
    let done = 0, total = 0;
    for (const a of aspirations) { const p = journeyProgress(a.journey); done += p.done; total += p.total; }
    return total ? Math.round((done / total) * 100) : 0;
  }, [aspirations]);

  const avgMastery = useMemo(() => {
    const all = aspirations.flatMap((a) => a.journey?.phases.flatMap((p) => p.steps) ?? []);
    const scored = all.filter((s) => s.masteryScore !== null);
    return scored.length ? Math.round(scored.reduce((s, st) => s + (st.masteryScore ?? 0), 0) / scored.length) : null;
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

  const [adding, setAdding] = useState(false);
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setMounted(true);
    setBase("calm");
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      if (sp.get("new")) setAdding(true);
      const s = sp.get("seed");
      if (s) setSeed(s);
    }
  }, [setBase]);

  if (!mounted) {
    return (
      <div className="zoe zoe-warm relative min-h-screen flex items-center justify-center">
        <LivingBackground />
        <ZoeOrb size={48} mood={mood} className="relative z-10" />
      </div>
    );
  }

  if (!identity || !profile) {
    return (
      <div className="zoe zoe-warm relative min-h-screen flex flex-col items-center justify-center">
        <LivingBackground />
        <div className="relative z-10 text-center px-6">
          <PulseOrb size={120} className="mx-auto mb-4" />
          <h1 className="mt-4 zoe-display text-[clamp(1.8rem,7vw,2.6rem)]" style={{ color: "var(--z-ink)" }}>Let&apos;s start.</h1>
          <Link href="/start" className="z-btn z-btn-brand mt-6 !px-7 !py-4 !text-[16px]">Begin <ArrowRight className="w-4.5 h-4.5" /></Link>
        </div>
      </div>
    );
  }

  const nextStep = aspirations
    .map((a) => ({ a, step: a.journey?.phases.flatMap((p) => p.steps).find((s) => s.id === a.journey?.currentStepId) }))
    .find((x) => x.step);
  const nextMeta = nextStep ? areaMeta(nextStep.a.area) : null;
  const hourGreeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  })();

  return (
    <MobileShell
      dock={!adding}
      right={
        <Link href="/profile" className="w-9 h-9 rounded-full grid place-items-center flex-shrink-0 zoe-haptic" style={{ background: "var(--z-surface)" }}>
          <User className="w-4 h-4" style={{ color: "var(--z-ink-2)" }} />
        </Link>
      }
    >
      {/* Greeting + overview ring */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: EASE }}
        className="pt-4 pb-1 flex items-center gap-4">
        <ProgressRing pct={overallProgress} size={64} stroke={4} color="var(--z-accent)">
          <span className="z-mono text-[15px] font-extrabold" style={{ color: "var(--z-ink)" }}>{overallProgress}%</span>
        </ProgressRing>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--z-brand-deep)" }}>{hourGreeting}</p>
          <h1 className="zoe-display text-[clamp(1.8rem,6vw,2.4rem)] leading-tight truncate" style={{ color: "var(--z-ink)" }}>{identity.name}</h1>
        </div>
      </motion.div>

      {/* Quick stats row — streak, ZOT, mastery */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04, ease: EASE }}
        className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-2xl p-2.5 flex items-center gap-2" style={{ background: "var(--z-surface)" }}>
          <StreakVis days={streak} size={32} />
          <div>
            <div className="z-mono text-[16px] font-extrabold leading-none" style={{ color: "var(--z-ink)" }}>{streak}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--z-ink-3)" }}>Streak</div>
          </div>
        </div>
        <div className="rounded-2xl p-2.5 text-center" style={{ background: "var(--z-surface)" }}>
          <div className="z-mono text-[16px] font-extrabold" style={{ color: "var(--z-brand-deep)" }}>{totalZot}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--z-ink-3)" }}>ZOT</div>
        </div>
        <div className="rounded-2xl p-2.5 text-center" style={{ background: "var(--z-surface)" }}>
          <div className="z-mono text-[16px] font-extrabold" style={{ color: avgMastery !== null && avgMastery >= 70 ? "var(--z-good)" : "var(--z-ink)" }}>
            {avgMastery !== null ? `${avgMastery}%` : "—"}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--z-ink-3)" }}>Mastery</div>
        </div>
      </motion.div>

      {/* Primary action: continue — vibrant gradient hero */}
      {nextStep?.step && nextMeta && (
        <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, ease: EASE }}
          onClick={() => { setActiveAspiration(nextStep.a.id); router.push(`/journey/${nextStep.a.id}`); }}
          className="zoe-haptic w-full rounded-3xl p-4 text-left flex items-center gap-3.5 mt-4 relative overflow-hidden"
          style={{ background: `linear-gradient(120deg, ${nextMeta.color}, ${nextMeta.color}cc)`, boxShadow: `0 8px 24px -8px ${nextMeta.color}99` }}>
          {/* drifting glow */}
          <motion.span className="absolute rounded-full pointer-events-none" style={{ width: 140, height: 140, background: "rgba(255,255,255,0.18)", top: -40, right: -20 }}
            animate={{ x: [0, -16, 0], y: [0, 12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <span className="w-12 h-12 rounded-2xl grid place-items-center flex-shrink-0 relative z-10"
            style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(6px)" }}>
            <Play className="w-5 h-5" style={{ color: "#fff" }} fill="#fff" />
          </span>
          <span className="flex-1 min-w-0 relative z-10">
            <span className="block text-[11px] font-extrabold uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>
              Continue · {nextStep.a.title}
            </span>
            <span className="block text-[15.5px] font-extrabold leading-tight truncate" style={{ color: "#fff" }}>{nextStep.step.title}</span>
          </span>
          <ArrowRight className="w-5 h-5 flex-shrink-0 relative z-10" style={{ color: "#fff" }} />
        </motion.button>
      )}

      {/* Ask ZOE */}
      <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease: EASE }}
        onClick={() => router.push("/ask")}
        className="zoe-haptic w-full glass rounded-3xl p-3.5 text-left flex items-center gap-3 mt-2.5">
        <ZoeOrb size={32} mood={mood} />
        <span className="flex-1 text-[14px] font-bold" style={{ color: "var(--z-ink-2)" }}>Ask anything</span>
        <span onClick={(e) => { e.stopPropagation(); router.push("/ask?listen=1"); }}
          className="w-8 h-8 rounded-full grid place-items-center flex-shrink-0"
          style={{ background: "var(--z-accent)", color: "var(--z-on-brand)" }}>
          <Mic className="w-3.5 h-3.5" />
        </span>
      </motion.button>

      {/* Goals with visual progress arcs */}
      <div className="mt-6 mb-2 flex items-center justify-between">
        <span className="z-eyebrow">Goals</span>
        <button onClick={() => setAdding(true)} className="zoe-haptic w-7 h-7 rounded-lg grid place-items-center"
          style={{ background: "var(--z-surface-2)", color: "var(--z-ink-3)" }}>
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
      {aspirations.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="rounded-2xl py-8 flex flex-col items-center" style={{ background: "var(--z-surface)" }}>
          <PulseOrb size={64} />
          <p className="mt-3 text-[13.5px] font-semibold" style={{ color: "var(--z-ink-3)" }}>What will you become?</p>
          <button onClick={() => setAdding(true)} className="z-btn z-btn-brand mt-4 !py-2.5 !px-5 !text-[13px]">
            <Plus className="w-3.5 h-3.5" /> Add first goal
          </button>
        </motion.div>
      ) : (
        <div className="space-y-2">
          {aspirations.map((a, i) => (
            <GoalCard key={a.id} a={a} delay={i * 0.04}
              onOpen={() => { setActiveAspiration(a.id); router.push(`/journey/${a.id}`); }} />
          ))}
        </div>
      )}

      {/* Skill progression — novice to pro */}
      {aspirations.filter((a) => a.journey && (a.journey.skillTiers?.length ?? 0) > 0).length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, ease: EASE }}
          className="mt-5">
          <span className="z-eyebrow">Your skill level</span>
          <div className="mt-2 space-y-2">
            {aspirations.filter((a) => a.journey && (a.journey.skillTiers?.length ?? 0) > 0).map((a) => (
              <SkillLevelCard key={a.id} aspiration={a} />
            ))}
          </div>
        </motion.div>
      )}

      {/* AI Brain snapshot — radar + dimensions */}
      {profile.dimensions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, ease: EASE }}
          className="mt-6">
          <Link href="/profile" className="flex items-center justify-between mb-2">
            <span className="z-eyebrow">Your DNA</span>
            <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--z-ink-3)" }} />
          </Link>
          <div className="rounded-2xl p-4" style={{ background: "var(--z-surface)" }}>
            <div className="flex items-center gap-3">
              {cogAxes.length >= 5 && (
                <RadarChart axes={cogAxes} size={110} className="flex-shrink-0" />
              )}
              <div className="flex-1 space-y-2.5 min-w-0">
                {profile.dimensions.slice(0, 4).map((d) => (
                  <div key={d.id}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11.5px] font-bold truncate" style={{ color: "var(--z-ink-2)" }}>{d.label}</span>
                      <span className="z-mono text-[11px] font-bold flex-shrink-0" style={{ color: "var(--z-brand-deep)" }}>{Math.round(d.value)}</span>
                    </div>
                    <MiniBar value={d.value} color="var(--z-accent)" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Behavioral signals — visual */}
      <BehavioralSnap profile={profile} mastery={avgMastery} />

      <AnimatePresence>
        {adding && (
          <AddGoal
            profile={toDraft(profile)}
            seedTitle={seed}
            onResearch={() => pulse("thinking", 6000)}
            onClose={() => setAdding(false)}
            onCreate={(title, area, why, journey, sections) => {
              const id = addAspiration({ title, area, why });
              setJourney(id, journey);
              // Document-sourced goals carry their sections so lessons stay faithful.
              if (sections?.length) setAspirationSource(id, { title, sections });
              setAdding(false);
              pulse("success", 2600);
              router.push(`/journey/${id}`);
            }}
          />
        )}
      </AnimatePresence>
    </MobileShell>
  );
}

/* ── Goal card with visual progress ring ───────────────── */
function GoalCard({ a, delay, onOpen }: { a: Aspiration; delay: number; onOpen: () => void }) {
  const meta = areaMeta(a.area);
  const prog = journeyProgress(a.journey);
  const stepsDone = a.journey?.phases.flatMap((p) => p.steps).filter((s) => s.status === "done").length ?? 0;
  const stepsTotal = a.journey?.phases.flatMap((p) => p.steps).length ?? 0;

  return (
    <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, ease: EASE }}
      onClick={onOpen}
      className="zoe-haptic w-full rounded-2xl p-3 flex items-center gap-3 text-left"
      style={{ background: "var(--z-surface)" }}>
      <ProgressRing pct={prog.pct} size={44} stroke={3} color={meta.color}>
        <AreaIcon area={a.area as AreaKey} size={18} color={meta.color} />
      </ProgressRing>
      <div className="flex-1 min-w-0">
        <span className="block text-[14px] font-bold leading-tight truncate" style={{ color: "var(--z-ink)" }}>{a.title}</span>
        <span className="block text-[11.5px] font-semibold mt-0.5" style={{ color: "var(--z-ink-3)" }}>
          {stepsDone}/{stepsTotal} steps · {prog.pct}%
        </span>
      </div>
      <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--z-line-2)" }} />
    </motion.button>
  );
}

/* ── Skill level progression card ───────────────────────── */
function SkillLevelCard({ aspiration }: { aspiration: Aspiration }) {
  const journey = aspiration.journey;
  if (!journey?.skillTiers?.length) return null;

  const tier = currentSkillTier(journey);
  if (!tier) return null;

  const tiers = journey.skillTiers.map((t, i) => ({
    title: t.title,
    done: i < tier.index || (i === tier.index && tier.progress === 100),
  }));

  const meta = areaMeta(aspiration.area);

  return (
    <div className="rounded-2xl p-4" style={{ background: "var(--z-surface)" }}>
      <div className="flex items-center gap-2.5 mb-3">
        <AreaIcon area={aspiration.area as AreaKey} size={18} color={meta.color} />
        <div className="flex-1 min-w-0">
          <span className="block text-[13px] font-extrabold leading-tight truncate" style={{ color: "var(--z-ink)" }}>{aspiration.title}</span>
          <span className="block text-[11px] font-bold mt-0.5" style={{ color: meta.color }}>{tier.current.title}</span>
        </div>
        <ProgressRing pct={tier.progress} size={36} stroke={2.5} color={meta.color}>
          <span className="text-[8px] font-extrabold" style={{ color: meta.color }}>{tier.progress}%</span>
        </ProgressRing>
      </div>
      <SkillPathVis tiers={tiers} currentIndex={tier.index} />
      {tier.current.description && (
        <p className="mt-2 text-[11.5px] font-medium leading-snug" style={{ color: "var(--z-ink-3)" }}>{tier.current.description}</p>
      )}
    </div>
  );
}

/* ── Behavioral snapshot — mini visual cards ───────────── */
function BehavioralSnap({ profile, mastery }: { profile: ZoeProfile; mastery: number | null }) {
  const beh = profile.behavioral;
  const signals: { label: string; value: number | null; display: string; color: string }[] = [];

  if (beh.mcqAccuracy !== null) signals.push({ label: "Accuracy", value: beh.mcqAccuracy * 100, display: `${Math.round(beh.mcqAccuracy * 100)}%`, color: "var(--z-good)" });
  if (beh.streakConsistency !== null) signals.push({ label: "Consistency", value: beh.streakConsistency * 100, display: `${Math.round(beh.streakConsistency * 100)}%`, color: "var(--z-accent)" });
  if (mastery !== null) signals.push({ label: "Mastery", value: mastery, display: `${mastery}%`, color: "var(--z-brand-deep)" });
  if (beh.confidenceCalibration !== null) signals.push({ label: "Calibration", value: beh.confidenceCalibration * 100, display: beh.confidenceCalibration > 0.5 ? "Good" : "Mixed", color: "#7C5CFF" });

  if (!signals.length) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, ease: EASE }}
      className="mt-5">
      <Link href="/profile" className="flex items-center justify-between mb-2">
        <span className="z-eyebrow">Signals</span>
        <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--z-ink-3)" }} />
      </Link>
      <div className="grid grid-cols-2 gap-2">
        {signals.slice(0, 4).map((s) => (
          <div key={s.label} className="rounded-2xl p-3 flex items-center gap-2.5" style={{ background: "var(--z-surface)" }}>
            <ProgressRing pct={s.value ?? 0} size={36} stroke={2.5} color={s.color}>
              <span className="text-[8px] font-extrabold" style={{ color: s.color }}>{s.display}</span>
            </ProgressRing>
            <span className="text-[11.5px] font-bold" style={{ color: "var(--z-ink-2)" }}>{s.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Add goal — full-screen overlay ────────────────────── */
type AddPhase = "choose" | "input" | "discover" | "pdf" | "loading" | "preview";
const LOADING_STEPS = ["Shaping the path…", "Picking your first step…"];
const DOC_LOADING_STEPS = ["Reading your document…", "Mapping the topics…", "Building your path…"];
const DOC_AREA: LifeArea = "knowledge";

function AddGoal({
  profile, onClose, onCreate, onResearch, seedTitle = "",
}: {
  profile: ProfileDraft; onClose: () => void;
  onCreate: (title: string, area: LifeArea, why: string | undefined, journey: Journey, sections?: SourceSection[]) => void;
  onResearch?: () => void; seedTitle?: string;
}) {
  // If the dashboard seeded a title (e.g. from Ask), skip the chooser into scratch.
  const [phase, setPhase] = useState<AddPhase>(seedTitle ? "input" : "choose");
  const [title, setTitle] = useState(seedTitle);
  const [area, setArea] = useState<LifeArea>("craft");
  const [journey, setJourney] = useState<Journey | null>(null);
  const [sections, setSections] = useState<SourceSection[]>([]);
  const [ridx, setRidx] = useState(0);
  const [loadingSteps, setLoadingSteps] = useState<string[]>(LOADING_STEPS);
  const [pdfError, setPdfError] = useState("");
  // After title/area, show the adaptive discovery questions (own component).
  const startDiscover = () => { setPhase("discover"); };

  const build = async (transcript: QA[] = []) => {
    setLoadingSteps(LOADING_STEPS); setPhase("loading"); setRidx(0); onResearch?.();
    const timer = setInterval(() => setRidx((i) => Math.min(i + 1, LOADING_STEPS.length - 1)), 750);
    const started = Date.now();
    try {
      const res = await fetch("/api/zoe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hat: "architect", aspiration: { title, area }, profile,
          transcript: transcript.length ? transcript : undefined,
          // Person-level starter facts (age/role/time) — reused on every goal.
          starter: getBrainSnapshot().identity?.starter,
          memoryContext: buildMemoryContext(getBrainSnapshot(), title),
        }),
      });
      const data: ArchitectResponse = await res.json();
      const j = normalizeJourney((data.journey ?? {}) as RawJourney);
      const minDwell = LOADING_STEPS.length * 750;
      setTimeout(() => { clearInterval(timer); setSections([]); setJourney(j); setPhase("preview"); }, Math.max(0, minDwell - (Date.now() - started)));
    } catch {
      clearInterval(timer); setPhase("input");
    }
  };

  // PDF path: OCR + topic extraction + journey (built server-side from topics).
  const docBuild = async (base64: string, mimeType: string, fileName: string) => {
    setLoadingSteps(DOC_LOADING_STEPS); setPhase("loading"); setRidx(0); onResearch?.();
    const timer = setInterval(() => setRidx((i) => Math.min(i + 1, DOC_LOADING_STEPS.length - 1)), 1500);
    try {
      const res = await fetch("/api/zoe/document", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileData: base64, mimeType, fileName, area: DOC_AREA }),
      });
      if (!res.ok) throw new Error("document failed");
      const data = await res.json();
      const j = normalizeJourney((data.journey ?? {}) as RawJourney);
      const docTitle = (data.title as string) || fileName.replace(/\.[^.]+$/, "") || "Your document";
      clearInterval(timer);
      setTitle(docTitle);
      setArea((data.area as LifeArea) || DOC_AREA);
      setSections(Array.isArray(data.sections) ? (data.sections as SourceSection[]) : []);
      setJourney(j);
      setPhase("preview");
    } catch {
      clearInterval(timer);
      setPdfError("Couldn't read that document. Please try another.");
      setPhase("pdf");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto" style={{ background: "var(--z-canvas)" }}>
      <div className="relative min-h-full">
        <button onClick={onClose} className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full glass-soft flex items-center justify-center zoe-haptic" style={{ color: "var(--z-ink-2)" }}>
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          {phase === "choose" && (
            <motion.div key="choose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="min-h-[100svh] flex flex-col items-center justify-center px-7 text-center">
              <h1 className="zoe-display text-[clamp(1.9rem,6.5vw,2.9rem)] leading-[1.1]" style={{ color: "var(--z-ink)" }}>
                Create a new goal
              </h1>
              <p className="mt-4 text-[15px] font-medium max-w-xs" style={{ color: "var(--z-ink-2)" }}>
                Describe what you want to become — or bring your own material.
              </p>
              <div className="mt-9 w-full max-w-sm flex flex-col gap-3">
                <ChooserCard
                  icon={<Sparkle className="w-5 h-5" />}
                  title="Create a journey"
                  sub="Tell ZOE your goal and it builds the path."
                  onClick={() => { setPdfError(""); setPhase("input"); }}
                  primary
                />
                <ChooserCard
                  icon={<FileText className="w-5 h-5" />}
                  title="Upload a document"
                  sub="A PDF, text, or Word file — your path follows it exactly."
                  onClick={() => { setPdfError(""); setPhase("pdf"); }}
                />
              </div>
            </motion.div>
          )}

          {phase === "input" && (
            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="min-h-[100svh] flex flex-col items-center justify-center px-7 text-center">
              <h1 className="zoe-display text-[clamp(2rem,7vw,3rem)] leading-[1.1]" style={{ color: "var(--z-ink)" }}>
                What do you want<br />to become?
              </h1>
              <textarea autoFocus value={title} onChange={(e) => setTitle(e.target.value)} rows={2}
                placeholder="a confident speaker, a guitarist, financially free…"
                className="z-center-input !h-auto max-w-xs mx-auto mt-6 resize-none"
                style={{ color: "var(--z-ink)" }} />

              <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-sm">
                {AREA_ORDER.map((k) => {
                  const m = AREA_META[k]; const on = area === k;
                  return (
                    <button key={k} onClick={() => setArea(k)} className="z-pill"
                      data-on={on}
                      style={on ? { borderColor: m.color, background: `${m.color}18`, color: m.color } : {}}>
                      <AreaIcon area={k as AreaKey} size={14} color={on ? m.color : "var(--z-ink-3)"} /> {m.label}
                    </button>
                  );
                })}
              </div>

              <button onClick={startDiscover} disabled={!title.trim()} className="z-btn z-btn-brand mt-8 !py-4 !px-10 !text-[16px]">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {phase === "discover" && (
            <DiscoverQuestions key="discover" title={title} area={area}
              memoryContext={buildMemoryContext(getBrainSnapshot(), title)}
              onComplete={(answers) => build(answers)}
              onSkip={() => build([])} />
          )}

          {phase === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="min-h-[100svh] flex flex-col items-center justify-center px-7 text-center">
              <Waveform bars={5} size={56} className="mb-4" />
              <ZoeOrb size={48} className="mb-5" />
              <h2 className="zoe-display text-[clamp(1.6rem,5vw,2.2rem)]" style={{ color: "var(--z-ink)" }}>One moment</h2>
              <div className="mt-5 space-y-2 text-left max-w-xs">
                {loadingSteps.map((s, i) => (
                  <div key={s} className="flex items-center gap-3" style={{ opacity: i <= ridx ? 1 : 0.3 }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: i < ridx ? "var(--z-accent)" : i === ridx ? "var(--z-accent-soft)" : "var(--z-surface-2)" }}>
                      {i < ridx ? <Check className="w-3 h-3" style={{ color: "var(--z-on-brand)" }} /> : i === ridx ? <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--z-accent-edge)" }} /> : null}
                    </span>
                    <span className="text-[14px] font-semibold" style={{ color: i <= ridx ? "var(--z-ink)" : "var(--z-ink-3)" }}>{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "pdf" && (
            <motion.div key="pdf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="min-h-[100svh] flex flex-col items-center justify-center px-7 text-center">
              <PdfPicker error={pdfError} onError={setPdfError} onFile={docBuild} />
              <button onClick={() => { setPdfError(""); setPhase("choose"); }}
                className="mt-6 text-[13.5px] font-bold" style={{ color: "var(--z-ink-3)" }}>
                ← Back
              </button>
            </motion.div>
          )}

          {phase === "preview" && journey && (
            <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <JourneyPreview journey={journey} profile={profile}
                onAccept={() => onCreate(title.trim(), area, undefined, journey, sections)}
                onTweak={sections.length ? undefined : () => build()} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Chooser card (PDF vs scratch) ─────────────────────── */
function ChooserCard({
  icon, title, sub, onClick, primary,
}: { icon: React.ReactNode; title: string; sub: string; onClick: () => void; primary?: boolean }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: EASE }}
      onClick={onClick}
      className="w-full text-left rounded-3xl px-5 py-4 flex items-center gap-4 transition-transform duration-150 active:translate-y-0.5"
      style={primary
        ? { background: "var(--z-accent)", color: "var(--z-on-brand)", boxShadow: "0 4px 0 var(--z-accent-edge)" }
        : { background: "var(--z-surface)", color: "var(--z-ink)", border: "1.5px solid var(--z-line-2)", boxShadow: "0 3px 0 var(--z-line-2)" }}
    >
      <span className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: primary ? "rgba(255,255,255,0.20)" : "var(--z-surface-2)" }}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] font-extrabold leading-tight">{title}</span>
        <span className="block text-[12.5px] font-medium mt-0.5 leading-snug" style={{ opacity: primary ? 0.88 : 0.72 }}>{sub}</span>
      </span>
      <ArrowRight className="w-4.5 h-4.5 flex-shrink-0 opacity-70" />
    </motion.button>
  );
}

/* ── PDF picker — reads a file to base64, hands it up ───── */
function PdfPicker({
  error, onError, onFile,
}: {
  error?: string;
  onError: (msg: string) => void;
  onFile: (base64: string, mimeType: string, fileName: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [picked, setPicked] = useState("");

  const accept = ".pdf,.txt,.md,.markdown,.doc,.docx,application/pdf,text/plain";

  const handle = (file?: File | null) => {
    if (!file) return;
    const okType = file.type === "application/pdf"
      || file.type.startsWith("text/")
      || /\.(pdf|txt|md|markdown|docx?)$/i.test(file.name);
    if (!okType) { onError("That format isn't supported yet. Try a PDF, text, or Word file."); return; }
    if (file.size > 25 * 1024 * 1024) { onError("That file is over 25 MB — try a lighter document."); return; }
    onError(""); setPicked(file.name);
    const reader = new FileReader();
    reader.onerror = () => onError("Couldn't read that file. Please try again.");
    reader.onload = (e) => {
      const result = (e.target?.result as string) || "";
      const base64 = result.split(",")[1] || "";
      const mimeType = result.split(";")[0].replace("data:", "") || file.type || "application/pdf";
      if (!base64) { onError("That file looked empty. Please try another."); return; }
      onFile(base64, mimeType, file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <h1 className="zoe-display text-[clamp(1.9rem,6.5vw,2.9rem)] leading-[1.1] mb-2 text-center" style={{ color: "var(--z-ink)" }}>
        Bring your<br />own material
      </h1>
      <p className="text-[14px] font-medium mb-7 max-w-xs text-center" style={{ color: "var(--z-ink-2)" }}>
        Upload a document and ZOE builds a path that follows it exactly — its own order, nothing invented.
      </p>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handle(e.dataTransfer.files?.[0]); }}
        className="w-full rounded-3xl px-6 py-9 flex flex-col items-center gap-3 transition-colors"
        style={{ background: "var(--z-surface)", border: `2px dashed ${dragOver ? "var(--z-accent)" : "var(--z-line-2)"}` }}
      >
        <span className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "var(--z-surface-2)" }}>
          {picked ? <FileText className="w-6 h-6" style={{ color: "var(--z-accent-edge)" }} /> : <Upload className="w-6 h-6" style={{ color: "var(--z-accent-edge)" }} />}
        </span>
        <span className="text-[15px] font-bold" style={{ color: "var(--z-ink)" }}>{picked || "Tap to choose a file"}</span>
        <span className="text-[12.5px] font-medium" style={{ color: "var(--z-ink-3)" }}>PDF, text, or Word · up to 25 MB</span>
      </button>
      <input ref={inputRef} type="file" accept={accept} className="hidden"
        onChange={(e) => handle(e.target.files?.[0])} />

      {error && <p className="mt-4 text-[13px] font-semibold" style={{ color: "var(--z-bad, #d9534f)" }}>{error}</p>}
    </div>
  );
}
