"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, Check, Send, Zap, Upload, FileText, Sparkle,
  GraduationCap, Briefcase, Palette, Rocket, Heart, Compass,
  Flame, Wind, Sparkles, Clock, Timer, Infinity, Shuffle,
  Eye, Wrench, BookOpen, MessageCircle, type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Flame, Wind, Sparkles, Heart, Clock, Timer, Infinity, Shuffle,
  Eye, Wrench, BookOpen, MessageCircle,
};

function PillIcon({ name }: { name?: string }) {
  if (!name) return null;
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className="w-3.5 h-3.5 flex-shrink-0" />;
}
import LivingBackground from "./LivingBackground";
import ZoeOrb from "./ZoeOrb";
import { SparkBurst } from "./ZoeGraphics";
import { AreaIcon, type AreaKey } from "./illustrations";
import JourneyPreview from "./JourneyPreview";
import DiscoverQuestions from "./DiscoverQuestions";
import { useZoeBrain, getBrainSnapshot } from "@/lib/zoe/brain";
import { buildMemoryContext, getStreakDays, daysSince } from "@/lib/zoe/memory";
import { useAmbience } from "@/lib/zoe/ambience";
import { normalizeJourney, type RawJourney } from "@/lib/zoe/journey";
import { AREA_META, type Journey, type LifeArea, type ZoeProfile } from "@/lib/zoe/types";
import type { SourceSection } from "@/lib/zoe/content-types";
import type {
  DynamicQuestion, QA, ProfileDraft, ProfilerNextResponse,
  ProfilerSynthesizeResponse, ArchitectResponse,
} from "@/lib/zoe/hats-types";

const EASE = [0.22, 1, 0.36, 1] as const;
const FADE = { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.97 }, transition: { duration: 0.4, ease: EASE } };
const AGE_GROUPS = ["Under 18", "18–24", "25–34", "35–49", "50+"];

const ROLES: { label: string; icon: React.ReactNode }[] = [
  { label: "Student", icon: <GraduationCap className="w-5 h-5" /> },
  { label: "Working professional", icon: <Briefcase className="w-5 h-5" /> },
  { label: "Creator / maker", icon: <Palette className="w-5 h-5" /> },
  { label: "Entrepreneur", icon: <Rocket className="w-5 h-5" /> },
  { label: "Parent / caregiver", icon: <Heart className="w-5 h-5" /> },
  { label: "Lifelong learner", icon: <Compass className="w-5 h-5" /> },
];

const AREA_ORDER: LifeArea[] = ["career", "entrepreneurship", "craft", "health", "mindset", "money", "sustainability", "knowledge"];

type Basics = { name: string; ageGroup: string; role: string; area: LifeArea | ""; aspiration: string };
type Phase = "boot" | "welcomeBack" | "intro" | "name" | "age" | "role" | "area" | "aspiration" | "discover" | "adaptive" | "pdf" | "researching" | "preview" | "ready" | "failed";
type Mode = "new" | "evolve";
type Route = "guided" | "pdf";

const SCRIPT: Phase[] = ["intro", "name", "age", "role", "area", "aspiration"];

// No profiler in onboarding now — the Architect works from the discovery Q&A
// alone, so we hand it an empty profile draft (just satisfies the type).
const EMPTY_PROFILE: ProfileDraft = { summary: "", motivations: [], strengths: [], growthEdges: [], dimensions: [] };

const RESEARCH_STEPS = [
  "Reading your answers…",
  "Finding your starting point…",
  "Shaping the path…",
  "Picking your first step…",
];

const DOC_RESEARCH_STEPS = [
  "Reading your document…",
  "Mapping its exact structure…",
  "Following its order, no detours…",
  "Laying out your path…",
];

const DOC_AREA: LifeArea = "knowledge";
const docProfileSummary = (title: string) => `Learning directly from "${title}" — following it end to end, exactly as written.`;

function zoeProfileToDraft(p: ZoeProfile): ProfileDraft {
  return {
    summary: p.summary, motivations: p.motivations, cognitiveStyle: p.cognitiveStyle,
    timeAvailability: p.timeAvailability, emotionalBaseline: p.emotionalBaseline,
    strengths: p.strengths, growthEdges: p.growthEdges,
    dimensions: p.dimensions.map((d) => ({ label: d.label, value: d.value, note: d.note })),
    teaching: p.teaching,
  };
}

export default function OnboardingFlow() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("boot");
  const [mode, setMode] = useState<Mode>("new");
  const [basics, setBasics] = useState<Basics>({ name: "", ageGroup: "", role: "", area: "", aspiration: "" });
  const [transcript, setTranscript] = useState<QA[]>([]);
  const [adaptiveQ, setAdaptiveQ] = useState<DynamicQuestion | null>(null);
  const [adaptiveInsight, setAdaptiveInsight] = useState("");
  const [loadingQ, setLoadingQ] = useState(false);
  const [profileDraft, setProfileDraft] = useState<ProfileDraft | null>(null);
  const [journey, setJourneyState] = useState<Journey | null>(null);
  const [researchIdx, setResearchIdx] = useState(0);
  const [researchSteps, setResearchSteps] = useState<string[]>(RESEARCH_STEPS);
  const [route, setRoute] = useState<Route>("guided");
  const [docMeta, setDocMeta] = useState<{ title: string; area: LifeArea; hasIndex: boolean; outline: string; sections: SourceSection[] } | null>(null);
  const [pdfError, setPdfError] = useState("");
  const pdfFileRef = useRef<{ data: string; mimeType: string; fileName: string } | null>(null);

  const commitDiscovery = useZoeBrain((s) => s.commitDiscovery);
  const setJourneyBrain = useZoeBrain((s) => s.setJourney);
  const addAspirationBrain = useZoeBrain((s) => s.addAspiration);
  const setActiveAspiration = useZoeBrain((s) => s.setActiveAspiration);
  const setAspirationSource = useZoeBrain((s) => s.setAspirationSource);
  const awardTokens = useZoeBrain((s) => s.awardTokens);
  const brainIdentity = useZoeBrain((s) => s.identity);
  const activeAspiration = useZoeBrain((s) => s.aspirations.find((a) => a.id === s.activeAspirationId) ?? s.aspirations[0] ?? null);
  const brainEvents = useZoeBrain((s) => s.events);
  const resetBrain = useZoeBrain((s) => s.reset);
  const setBase = useAmbience((s) => s.setBase);
  const pulse = useAmbience((s) => s.pulse);

  const alive = useRef(true);
  const started = useRef(false);
  const researchTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startFresh = () => {
    resetBrain();
    setMode("new"); setRoute("guided");
    setBasics({ name: "", ageGroup: "", role: "", area: "", aspiration: "" });
    setTranscript([]); setProfileDraft(null); setJourneyState(null);
    setAdaptiveQ(null); setAdaptiveInsight(""); setLoadingQ(false);
    setDocMeta(null); setPdfError(""); pdfFileRef.current = null;
    setResearchSteps(RESEARCH_STEPS);
    setPhase("intro");
  };

  /* ── Profiler: adaptive questioning ─────────────────────── */
  const seedTranscript = (b: Basics): QA[] => {
    const seed: QA[] = [];
    if (b.role) seed.push({ id: "role", question: "What best describes you right now?", answer: b.role });
    if (b.area) seed.push({ id: "area", question: "Which part of life are you focused on?", answer: AREA_META[b.area as LifeArea].label });
    return seed;
  };

  const fetchNextAdaptive = async (tx: QA[], b: Basics) => {
    setLoadingQ(true); setAdaptiveQ(null);
    try {
      const res = await fetch("/api/zoe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hat: "profiler", mode: "next", aspiration: b.aspiration, transcript: tx,
          basics: { name: b.name, ageGroup: b.ageGroup },
          memoryContext: buildMemoryContext(getBrainSnapshot(), b.aspiration),
        }),
      });
      const data: ProfilerNextResponse = await res.json();
      if (!alive.current) return;
      if (data.done || !data.question) { startDiscovery(tx, b); return; }
      if (data.insight) setAdaptiveInsight(data.insight);
      setAdaptiveQ(data.question);
    } catch {
      if (alive.current) startDiscovery(tx, b);
    } finally {
      if (alive.current) setLoadingQ(false);
    }
  };

  const answerAdaptive = (answer: string) => {
    if (!adaptiveQ) return;
    const qa: QA = { id: adaptiveQ.id, question: adaptiveQ.prompt, answer };
    const tx = [...transcript, qa];
    setTranscript(tx);
    setAdaptiveQ(null); setAdaptiveInsight("");
    pulse("thinking", 1200);
    if (tx.length >= 8) startDiscovery(tx, basics);
    else fetchNextAdaptive(tx, basics);
  };

  /* ── Architect (+ Profiler synthesize) ──────────────────── */
  const beginResearchAnim = () => {
    setPhase("researching"); setResearchIdx(0);
    if (researchTimer.current) clearInterval(researchTimer.current);
    researchTimer.current = setInterval(() => setResearchIdx((i) => Math.min(i + 1, RESEARCH_STEPS.length - 1)), 800);
  };
  const settle = (startTs: number, fn: () => void) => {
    const minDwell = RESEARCH_STEPS.length * 800;
    setTimeout(() => { if (researchTimer.current) clearInterval(researchTimer.current); if (alive.current) fn(); }, Math.max(0, minDwell - (Date.now() - startTs)));
  };

  const architectJourney = async (b: Basics, profile: ProfileDraft, tx: QA[], tweak?: string): Promise<Journey> => {
    const res = await fetch("/api/zoe", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hat: "architect", aspiration: { title: b.aspiration, area: b.area || "other" },
        profile, transcript: tx, tweak,
        memoryContext: buildMemoryContext(getBrainSnapshot(), `${b.aspiration} ${tweak || ""}`),
      }),
    });
    const data: ArchitectResponse = await res.json();
    return normalizeJourney((data.journey ?? {}) as RawJourney);
  };

  // Onboarding new-goal build: discovery answers → Architect directly (no profiler).
  // Mirrors the "add a goal" flow: the discover Q&A is the transcript.
  const buildFromDiscovery = async (tx: QA[]) => {
    setResearchSteps(RESEARCH_STEPS);
    beginResearchAnim();
    const ts = Date.now();
    try {
      setTranscript(tx);
      const j = await architectJourney(basics, EMPTY_PROFILE, tx);
      settle(ts, () => { setJourneyState(j); setPhase("preview"); });
    } catch {
      if (researchTimer.current) clearInterval(researchTimer.current);
      setPhase("failed");
    }
  };

  const startDiscovery = async (tx: QA[], b: Basics) => {
    setResearchSteps(RESEARCH_STEPS);
    beginResearchAnim();
    const ts = Date.now();
    try {
      const synth = await fetch("/api/zoe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hat: "profiler", mode: "synthesize", aspiration: b.aspiration, transcript: tx,
          basics: { name: b.name, ageGroup: b.ageGroup },
          memoryContext: buildMemoryContext(getBrainSnapshot(), b.aspiration),
        }),
      });
      const { profile }: ProfilerSynthesizeResponse = await synth.json();
      setProfileDraft(profile);
      const j = await architectJourney(b, profile, tx);
      settle(ts, () => { setJourneyState(j); setPhase("preview"); });
    } catch {
      if (researchTimer.current) clearInterval(researchTimer.current);
      setPhase("failed");
    }
  };

  const reArchitect = async (b: Basics, profile: ProfileDraft, tx: QA[], tweak?: string) => {
    setResearchSteps(RESEARCH_STEPS);
    beginResearchAnim();
    const ts = Date.now();
    try {
      const j = await architectJourney(b, profile, tx, tweak);
      settle(ts, () => { setJourneyState(j); setPhase("preview"); });
    } catch {
      if (researchTimer.current) clearInterval(researchTimer.current);
      setPhase("failed");
    }
  };

  /* ── Document route: build a path that follows the file exactly ─────────── */
  const startFromDocument = async (fileData: string, mimeType: string, fileName: string) => {
    pdfFileRef.current = { data: fileData, mimeType, fileName };
    setPdfError("");
    setResearchSteps(DOC_RESEARCH_STEPS);
    beginResearchAnim();
    const ts = Date.now();
    try {
      const res = await fetch("/api/zoe/document", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileData, mimeType, fileName, area: DOC_AREA }),
      });
      if (!res.ok) throw new Error("document failed");
      const data = await res.json();
      const j = normalizeJourney((data.journey ?? {}) as RawJourney);
      const meta = {
        title: (data.title as string) || fileName.replace(/\.[^.]+$/, "") || "Your document",
        area: ((data.area as LifeArea) || DOC_AREA),
        hasIndex: !!data.hasIndex,
        outline: (data.outline as string) || "",
        sections: Array.isArray(data.sections) ? (data.sections as SourceSection[]) : [],
      };
      settle(ts, () => {
        setDocMeta(meta);
        setProfileDraft({ summary: docProfileSummary(meta.title), motivations: [], strengths: [], growthEdges: [], dimensions: [] });
        setJourneyState(j);
        setPhase("preview");
      });
    } catch {
      if (researchTimer.current) clearInterval(researchTimer.current);
      setPhase("failed");
    }
  };

  const reArchitectDocument = async (tweak?: string) => {
    if (!docMeta) return;
    setResearchSteps(DOC_RESEARCH_STEPS);
    beginResearchAnim();
    const ts = Date.now();
    try {
      const res = await fetch("/api/zoe/document", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ outline: docMeta.outline, title: docMeta.title, hasIndex: docMeta.hasIndex, area: docMeta.area, tweak }),
      });
      if (!res.ok) throw new Error("document failed");
      const data = await res.json();
      const j = normalizeJourney((data.journey ?? {}) as RawJourney);
      settle(ts, () => { setJourneyState(j); setPhase("preview"); });
    } catch {
      if (researchTimer.current) clearInterval(researchTimer.current);
      setPhase("failed");
    }
  };

  const onTweak = (feedback: string) => {
    if (route === "pdf") { reArchitectDocument(feedback); return; }
    // No profiler in the new flow → re-architect from the discovery transcript.
    reArchitect(basics, profileDraft ?? EMPTY_PROFILE, transcript, feedback);
  };

  const evolve = () => {
    const snap = getBrainSnapshot();
    if (!snap.identity || !snap.profile || !activeAspiration) return;
    const b: Basics = { name: snap.identity.name, ageGroup: snap.identity.ageGroup, role: "", area: activeAspiration.area, aspiration: activeAspiration.title };
    const draft = zoeProfileToDraft(snap.profile);
    setMode("evolve"); setBasics(b); setProfileDraft(draft); setTranscript([]);
    reArchitect(b, draft, []);
  };

  const acceptDocument = () => {
    if (!journey || !docMeta) return;
    const snap = getBrainSnapshot();
    const source = docMeta.sections.length ? { title: docMeta.title, sections: docMeta.sections } : null;
    if (snap.identity && snap.profile) {
      // Returning learner — add the document path as a new aspiration.
      const id = addAspirationBrain({ title: docMeta.title, area: docMeta.area, why: `Master "${docMeta.title}", end to end.` });
      setJourneyBrain(id, journey);
      if (source) setAspirationSource(id, source);
      setActiveAspiration(id);
      awardTokens("learn", 15, "Built a path from your material");
      setPhase("ready"); return;
    }
    // New learner — commit identity + a light document-based profile + journey.
    const id = commitDiscovery({
      identity: { name: basics.name || "Learner", ageGroup: basics.ageGroup || "" },
      profile: { summary: docProfileSummary(docMeta.title), dimensions: [] },
      aspiration: { title: docMeta.title, area: docMeta.area, why: `Master "${docMeta.title}", end to end.` },
      journey, transcript: [],
    });
    if (source) setAspirationSource(id, source);
    awardTokens("learn", 25, "Created your first path from material");
    setPhase("ready");
  };

  const accept = () => {
    if (!journey) return;
    if (route === "pdf") { acceptDocument(); return; }
    if (mode === "evolve" && activeAspiration) {
      setJourneyBrain(activeAspiration.id, journey);
      awardTokens("learn", 10, "Evolved your journey with ZOE");
      setPhase("ready"); return;
    }
    const p = profileDraft;
    commitDiscovery({
      identity: { name: basics.name, ageGroup: basics.ageGroup },
      profile: {
        summary: p?.summary, motivations: p?.motivations, cognitiveStyle: p?.cognitiveStyle,
        timeAvailability: p?.timeAvailability, emotionalBaseline: p?.emotionalBaseline,
        strengths: p?.strengths, growthEdges: p?.growthEdges,
        dimensions: p?.dimensions ?? [], teaching: p?.teaching,
      },
      aspiration: { title: basics.aspiration, area: (basics.area || "other") as LifeArea, why: basics.aspiration },
      journey, transcript,
    });
    awardTokens("learn", 25, "Completed your ZOE discovery");
    setPhase("ready");
  };

  /* ── Lifecycle ──────────────────────────────────────────── */
  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; if (researchTimer.current) clearInterval(researchTimer.current); };
  }, []);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const snap = getBrainSnapshot();
    if (snap.identity && snap.profile) { setPhase("welcomeBack"); setBase("calm"); }
    else { setPhase("intro"); setBase("listening"); }
  }, [setBase]);

  useEffect(() => {
    if (phase === "researching") setBase("thinking");
    else if (phase === "preview" || phase === "ready") setBase("success");
    else if (phase === "welcomeBack") setBase("calm");
    else setBase("listening");
  }, [phase, setBase]);

  /* ═══ RENDER — every phase is ONE full-screen moment ════ */
  return (
    <div className="zoe zoe-warm relative min-h-full">
      <LivingBackground />

      <AnimatePresence mode="wait">

        {/* ── Boot ───────────────────────────────────────── */}
        {phase === "boot" && (
          <Screen key="boot"><ZoeOrb size={72} className="relative z-10" /></Screen>
        )}

        {/* ── Intro — two ways in ────────────────────────── */}
        {phase === "intro" && (
          <Screen key="intro">
            <ZoeOrb size={184} className="mb-2" />
            <h1 className="zoe-display text-[clamp(2.6rem,9vw,4rem)] leading-[1.05] text-center" style={{ color: "var(--z-ink)" }}>
              Become<br />anything.
            </h1>
            <p className="mt-4 text-[15px] text-center font-medium" style={{ color: "var(--z-ink-2)" }}>
              Start with a conversation — or your own material.
            </p>
            <div className="mt-9 w-full max-w-sm flex flex-col gap-3">
              <EntryCard
                icon={<Sparkle className="w-5 h-5" />}
                title="Guide me"
                sub="ZOE gets to know you, then builds your path."
                onClick={() => { setRoute("guided"); setPhase("name"); }}
                primary
              />
              <EntryCard
                icon={<FileText className="w-5 h-5" />}
                title="Start from a document"
                sub="Upload a PDF — your path follows it exactly."
                onClick={() => { setRoute("pdf"); setPhase("name"); }}
              />
            </div>
          </Screen>
        )}

        {/* ── Name ───────────────────────────────────────── */}
        {phase === "name" && (
          <Screen key="name">
            <NameScreen onNext={(name) => { setBasics((b) => ({ ...b, name })); pulse("success", 800); setPhase(route === "pdf" ? "pdf" : "age"); }} />
          </Screen>
        )}

        {/* ── Document upload (PDF route) ─────────────────── */}
        {phase === "pdf" && (
          <Screen key="pdf">
            <PdfScreen
              name={basics.name}
              error={pdfError}
              onError={setPdfError}
              onFile={(data, mime, fileName) => startFromDocument(data, mime, fileName)}
              onBack={() => setPhase("intro")}
            />
          </Screen>
        )}

        {/* ── Age ────────────────────────────────────────── */}
        {phase === "age" && (
          <Screen key="age">
            <BigQuestion question={`Nice to meet you, ${basics.name}.`} sub="How old are you?" />
            <Pills options={AGE_GROUPS.map((a) => ({ label: a }))} onPick={(v) => { setBasics((b) => ({ ...b, ageGroup: v })); pulse("success", 800); setPhase("role"); }} />
          </Screen>
        )}

        {/* ── Role ───────────────────────────────────────── */}
        {phase === "role" && (
          <Screen key="role">
            <BigQuestion question="What describes you?" />
            <Pills options={ROLES.map((r) => ({ label: r.label, icon: r.icon }))} onPick={(v) => { setBasics((b) => ({ ...b, role: v })); pulse("success", 800); setPhase("area"); }} />
          </Screen>
        )}

        {/* ── Area ───────────────────────────────────────── */}
        {phase === "area" && (
          <Screen key="area">
            <BigQuestion question="Where do you want to grow?" />
            <Pills
              options={AREA_ORDER.map((a) => ({ label: AREA_META[a].label, value: a, icon: <AreaIcon area={a as AreaKey} size={20} /> }))}
              onPick={(v, raw) => { setBasics((b) => ({ ...b, area: (raw as LifeArea) || "other" })); pulse("success", 800); setPhase("aspiration"); }}
            />
          </Screen>
        )}

        {/* ── Aspiration ─────────────────────────────────── */}
        {phase === "aspiration" && (
          <Screen key="aspiration">
            <AspirationScreen onNext={(aspiration) => {
              const b = { ...basics, aspiration };
              setBasics(b); setPhase("discover");
            }} />
          </Screen>
        )}

        {/* ── Goal discovery (adaptive MCQ tree) — same component as "add a goal" ── */}
        {phase === "discover" && (
          <Screen key="discover">
            <DiscoverQuestions
              title={basics.aspiration}
              area={basics.area || "other"}
              memoryContext={buildMemoryContext(getBrainSnapshot(), basics.aspiration)}
              onComplete={(answers) => buildFromDiscovery([...seedTranscript(basics), ...answers])}
              onSkip={() => buildFromDiscovery(seedTranscript(basics))}
            />
          </Screen>
        )}

        {/* ── Researching ────────────────────────────────── */}
        {phase === "researching" && (
          <Screen key="researching">
            <ZoeOrb size={160} className="mb-4" />
            <h2 className="zoe-display text-[clamp(1.8rem,6vw,2.6rem)] text-center" style={{ color: "var(--z-ink)" }}>One moment</h2>
            <div className="mt-8 max-w-xs mx-auto space-y-2 text-left">
              {researchSteps.map((s, i) => {
                const done = i < researchIdx, active = i === researchIdx;
                return (
                  <motion.div key={s} animate={{ opacity: i <= researchIdx ? 1 : 0.3 }} className="flex items-center gap-3 py-1.5">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: done ? "var(--z-accent)" : active ? "var(--z-accent-soft)" : "var(--z-surface-2)" }}>
                      {done ? <Check className="w-3 h-3" style={{ color: "var(--z-on-brand)" }} /> : active ? <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--z-accent-edge)" }} /> : null}
                    </span>
                    <span className="text-[14px] font-semibold" style={{ color: i <= researchIdx ? "var(--z-ink)" : "var(--z-ink-3)" }}>{s}</span>
                  </motion.div>
                );
              })}
            </div>
          </Screen>
        )}

        {/* ── Generation failed ──────────────────────────── */}
        {phase === "failed" && (
          <Screen key="failed">
            <div className="text-center max-w-xs mx-auto">
              <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "var(--z-surface-2)" }}>
                <Zap className="w-7 h-7" style={{ color: "var(--z-accent)" }} />
              </div>
              <h2 className="zoe-display text-[clamp(1.6rem,6vw,2.4rem)] mb-3" style={{ color: "var(--z-ink)" }}>
                Hmm, something slipped.
              </h2>
              <p className="text-[14px] font-medium mb-8" style={{ color: "var(--z-ink-2)" }}>
                ZOE couldn't build your path right now. This usually means the connection timed out — let's try again.
              </p>
              <button
                onClick={() => {
                  if (route === "pdf") {
                    if (docMeta) reArchitectDocument();
                    else if (pdfFileRef.current) startFromDocument(pdfFileRef.current.data, pdfFileRef.current.mimeType, pdfFileRef.current.fileName);
                    else setPhase("pdf");
                  } else if (profileDraft) {
                    reArchitect(basics, profileDraft, transcript);
                  } else {
                    buildFromDiscovery(transcript);
                  }
                }}
                className="z-btn z-btn-brand !py-4 !px-10 !text-[16px] w-full"
              >
                Try again
              </button>
              <button
                onClick={() => setPhase(route === "pdf" ? "pdf" : "aspiration")}
                className="mt-3 text-[13px] font-bold w-full py-2"
                style={{ color: "var(--z-ink-3)" }}
              >
                Start over
              </button>
            </div>
          </Screen>
        )}

        {/* ── Preview ────────────────────────────────────── */}
        {phase === "preview" && journey && (
          <motion.div key="preview" {...FADE} className="relative z-10 w-full">
            <JourneyPreview journey={journey} profile={profileDraft} onAccept={accept} onTweak={onTweak} />
          </motion.div>
        )}

        {/* ── Ready ──────────────────────────────────────── */}
        {phase === "ready" && (
          <Screen key="ready">
            <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 160, damping: 14 }}>
              <SparkBurst size={140} className="mx-auto" />
            </motion.div>
            <h1 className="mt-6 zoe-display text-[clamp(2.2rem,7vw,3.2rem)] text-center" style={{ color: "var(--z-ink)" }}>
              All set.
            </h1>
            <button onClick={() => router.push("/home")} className="z-btn z-btn-brand mt-8 !py-4 !px-12 !text-[16px]">
              Let&apos;s go <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </Screen>
        )}

        {/* ── Welcome back ───────────────────────────────── */}
        {phase === "welcomeBack" && brainIdentity && (
          <Screen key="welcomeBack">
            <WelcomeBack
              name={brainIdentity.name}
              aspiration={activeAspiration?.title || ""}
              journeyHeadline={activeAspiration?.journey?.headline}
              streak={getStreakDays(brainEvents)}
              lastSeenDays={daysSince(brainIdentity.lastActiveAt)}
              onContinue={() => router.push("/home")}
              onEvolve={evolve}
              onFresh={startFresh}
              onDocument={() => { setRoute("pdf"); setDocMeta(null); setPdfError(""); pdfFileRef.current = null; setPhase("pdf"); }}
            />
          </Screen>
        )}

      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   BUILDING BLOCKS — each one is big, centered, minimal
   ════════════════════════════════════════════════════════════ */

/** Full-screen centered wrapper — the question IS the screen. */
function Screen({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...FADE}
      className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center px-7 py-14 text-center">
      {children}
    </motion.div>
  );
}

/** The one big display question + optional sub line. */
function BigQuestion({ question, sub }: { question: string; sub?: string }) {
  return (
    <>
      <h1 className="zoe-display text-[clamp(2rem,7vw,3.2rem)] leading-[1.1] mb-2" style={{ color: "var(--z-ink)" }}>{question}</h1>
      {sub && <p className="text-[15px] font-medium mb-1" style={{ color: "var(--z-ink-2)" }}>{sub}</p>}
    </>
  );
}

/** Floating dashed-border pills for selection. */
function Pills({
  options, onPick,
}: {
  options: { label: string; value?: string; icon?: React.ReactNode; iconName?: string }[];
  onPick: (label: string, raw: string) => void;
}) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-sm">
      {options.map((o, i) => (
        <motion.button
          key={o.label}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, ease: EASE }}
          onClick={() => onPick(o.label, o.value ?? o.label)}
          className="z-pill"
        >
          {o.icon && <span className="opacity-80">{o.icon}</span>}
          {o.iconName && <PillIcon name={o.iconName} />}
          {o.label}
        </motion.button>
      ))}
    </div>
  );
}

/** Name input — big centered. */
function NameScreen({ onNext }: { onNext: (v: string) => void }) {
  const [name, setName] = useState("");
  return (
    <>
      <h1 className="zoe-display text-[clamp(2rem,7vw,3.2rem)] leading-[1.1] mb-8" style={{ color: "var(--z-ink)" }}>
        What should<br />I call you?
      </h1>
      <input
        autoFocus value={name} onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) onNext(name.trim()); }}
        placeholder="Your name"
        className="z-center-input"
        style={{ color: "var(--z-ink)" }}
      />
      <button onClick={() => name.trim() && onNext(name.trim())} disabled={!name.trim()} className="z-btn z-btn-brand mt-8 !py-4 !px-12 !text-[16px]">
        Continue <ArrowRight className="w-4 h-4" />
      </button>
    </>
  );
}

/** Aspiration input — big centered textarea. */
function AspirationScreen({ onNext }: { onNext: (v: string) => void }) {
  const [text, setText] = useState("");
  return (
    <>
      <h1 className="zoe-display text-[clamp(2rem,7vw,3.2rem)] leading-[1.1] mb-2" style={{ color: "var(--z-ink)" }}>
        Who do you want<br />to become?
      </h1>
      <p className="text-[14px] font-medium mb-6" style={{ color: "var(--z-ink-3)" }}>In your own words.</p>
      <textarea
        autoFocus value={text} onChange={(e) => setText(e.target.value)} rows={2}
        placeholder="e.g. a confident speaker · a founder · a guitarist…"
        className="z-center-input !h-auto resize-none"
        style={{ color: "var(--z-ink)" }}
      />
      <button onClick={() => text.trim() && onNext(text.trim())} disabled={!text.trim()} className="z-btn z-btn-brand mt-8 !py-4 !px-12 !text-[16px]">
        Continue <ArrowRight className="w-4 h-4" />
      </button>
    </>
  );
}

/** Big tappable entry choice on the intro screen. */
function EntryCard({
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

/** Document upload — the PDF route entry. Reads the file and hands up base64. */
function PdfScreen({
  name, error, onError, onFile, onBack,
}: {
  name: string;
  error?: string;
  onError: (msg: string) => void;
  onFile: (base64: string, mimeType: string, fileName: string) => void;
  onBack: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [picked, setPicked] = useState<string>("");

  const accept = ".pdf,.txt,.md,.markdown,.doc,.docx,application/pdf,text/plain";

  const handle = (file?: File | null) => {
    if (!file) return;
    const okType = file.type === "application/pdf"
      || file.type.startsWith("text/")
      || /\.(pdf|txt|md|markdown|docx?)$/i.test(file.name);
    if (!okType) { onError("That format isn't supported yet. Try a PDF, text, or Word file."); return; }
    if (file.size > 25 * 1024 * 1024) { onError("That file is over 25 MB — try a lighter document."); return; }
    onError("");
    setPicked(file.name);
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
    <>
      <h1 className="zoe-display text-[clamp(1.9rem,6.5vw,3rem)] leading-[1.1] mb-2" style={{ color: "var(--z-ink)" }}>
        {name ? `${name}, bring` : "Bring"} your<br />own material.
      </h1>
      <p className="text-[14px] font-medium mb-7 max-w-xs" style={{ color: "var(--z-ink-2)" }}>
        Upload a document and I&apos;ll build a path that follows it exactly — its own order, nothing invented.
      </p>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handle(e.dataTransfer.files?.[0]); }}
        className="w-full max-w-sm rounded-3xl px-6 py-9 flex flex-col items-center gap-3 transition-colors"
        style={{
          background: "var(--z-surface)",
          border: `2px dashed ${dragOver ? "var(--z-accent)" : "var(--z-line-2)"}`,
        }}
      >
        <span className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "var(--z-surface-2)" }}>
          {picked ? <FileText className="w-6 h-6" style={{ color: "var(--z-accent-edge)" }} /> : <Upload className="w-6 h-6" style={{ color: "var(--z-accent-edge)" }} />}
        </span>
        <span className="text-[15px] font-bold" style={{ color: "var(--z-ink)" }}>
          {picked || "Tap to choose a file"}
        </span>
        <span className="text-[12.5px] font-medium" style={{ color: "var(--z-ink-3)" }}>
          PDF, text, or Word · up to 25 MB
        </span>
      </button>

      <input
        ref={inputRef} type="file" accept={accept} className="hidden"
        onChange={(e) => handle(e.target.files?.[0])}
      />

      {error && (
        <p className="mt-4 text-[13px] font-semibold max-w-xs" style={{ color: "var(--z-brand-deep)" }}>{error}</p>
      )}

      <button onClick={onBack} className="mt-6 text-[13px] font-bold py-2" style={{ color: "var(--z-ink-3)" }}>
        Back
      </button>
    </>
  );
}

/** Adaptive AI question — rendered as a full-screen moment. */
function AdaptiveScreen({ question, insight, onAnswer }: { question: DynamicQuestion; insight: string; onAnswer: (v: string) => void }) {
  const [multi, setMulti] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [scaleVal, setScaleVal] = useState<number | null>(null);

  return (
    <>
      {insight && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[14px] font-semibold mb-4" style={{ color: "var(--z-good)" }}>
          {insight}
        </motion.p>
      )}

      <h1 className="zoe-display text-[clamp(1.8rem,6vw,2.8rem)] leading-[1.12] mb-2" style={{ color: "var(--z-ink)" }}>
        {question.prompt}
      </h1>

      {/* Single choice → pills */}
      {question.type === "single" && question.options && (
        <div className="mt-6 flex flex-wrap justify-center gap-3 max-w-sm">
          {question.options.map((o, i) => (
            <motion.button key={o.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, ease: EASE }}
              onClick={() => onAnswer(o.label)} className="z-pill">
              <PillIcon name={o.icon} />
              {o.label}
            </motion.button>
          ))}
        </div>
      )}

      {/* Multi choice → pills + send */}
      {question.type === "multi" && question.options && (
        <div className="mt-6 max-w-sm">
          <div className="flex flex-wrap justify-center gap-3">
            {question.options.map((o) => {
              const on = multi.includes(o.label);
              return (
                <button key={o.label} data-on={on} onClick={() => setMulti((s) => on ? s.filter((x) => x !== o.label) : [...s, o.label])}
                  className="z-pill" aria-pressed={on}>
                  <PillIcon name={o.icon} />
                  {o.label}
                  {on && <Check className="w-3.5 h-3.5" strokeWidth={3} style={{ color: "var(--z-brand-deep)" }} />}
                </button>
              );
            })}
          </div>
          <button disabled={multi.length === 0} onClick={() => onAnswer(multi.join(", "))} className="z-btn z-btn-brand mx-auto mt-6 !py-3.5 !px-10">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Scale → big number buttons */}
      {question.type === "scale" && question.scale && (
        <div className="mt-8 w-full max-w-xs mx-auto">
          <div className="flex items-center gap-2">
            {Array.from({ length: question.scale.max - question.scale.min + 1 }).map((_, i) => {
              const v = question.scale!.min + i;
              const on = scaleVal === v;
              return (
                <button key={v} onClick={() => { setScaleVal(v); onAnswer(`${v} (${question.scale!.minLabel} → ${question.scale!.maxLabel})`); }}
                  className="z-scale-btn flex-1"
                  style={on ? { background: "var(--z-accent)", borderColor: "var(--z-accent)", color: "var(--z-on-brand)", boxShadow: "0 3px 0 var(--z-accent-edge)" } : {}}>
                  {v}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-[12px] font-semibold" style={{ color: "var(--z-ink-3)" }}>
            <span>{question.scale.minLabel}</span><span>{question.scale.maxLabel}</span>
          </div>
        </div>
      )}

      {/* Text → centered input */}
      {question.type === "text" && (
        <div className="mt-6 w-full max-w-xs mx-auto">
          <textarea autoFocus value={text} onChange={(e) => setText(e.target.value)} rows={2}
            placeholder={question.placeholder || "Type your answer…"}
            className="z-center-input !h-auto w-full resize-none"
            style={{ color: "var(--z-ink)" }} />
          <button disabled={!text.trim()} onClick={() => onAnswer(text.trim())} className="z-btn z-btn-brand mx-auto mt-5 !py-3.5 !px-10">
            Continue <Send className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}

/** Three bouncing dots — loading state, centered. */
function ThinkingDots() {
  return (
    <div className="flex items-center gap-2" aria-label="Loading">
      <div className="flex gap-1.5">
        <span className="z-typing-dot" /><span className="z-typing-dot" style={{ animationDelay: "0.15s" }} /><span className="z-typing-dot" style={{ animationDelay: "0.3s" }} />
      </div>
    </div>
  );
}

/** Welcome back — full screen. */
function WelcomeBack({
  name, aspiration, journeyHeadline, streak, lastSeenDays, onContinue, onEvolve, onFresh, onDocument,
}: {
  name: string; aspiration: string; journeyHeadline?: string; streak: number; lastSeenDays: number;
  onContinue: () => void; onEvolve: () => void; onFresh: () => void; onDocument: () => void;
}) {
  const when = lastSeenDays <= 0 ? "earlier today" : lastSeenDays === 1 ? "yesterday" : `${lastSeenDays} days ago`;
  return (
    <>
      <ZoeOrb size={56} className="mb-5" />
      <h1 className="zoe-display text-[clamp(2.2rem,7vw,3.2rem)] leading-[1.05] text-center" style={{ color: "var(--z-ink)" }}>
        Welcome back,<br />{name}.
      </h1>
      <p className="mt-4 text-[15px] text-center font-medium max-w-xs" style={{ color: "var(--z-ink-2)" }}>
        {aspiration ? <>You&apos;re becoming <strong style={{ color: "var(--z-ink)" }}>{aspiration}</strong>. We last spoke {when}.</> : <>We last spoke {when}.</>}
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2.5">
        {streak > 0 && <span className="z-chip" style={{ background: "var(--z-accent-soft)", color: "var(--z-brand-deep)" }}>{streak}-day streak</span>}
        {journeyHeadline && <span className="z-chip" style={{ background: "var(--z-surface-2)", color: "var(--z-ink)" }}>{journeyHeadline}</span>}
      </div>
      <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
        <button onClick={onContinue} className="z-btn z-btn-brand justify-center !py-4 !text-[16px]">Continue <ArrowRight className="w-4.5 h-4.5" /></button>
        <button onClick={onEvolve} className="z-btn z-btn-ghost justify-center !py-4 !text-[16px]">Reshape my path</button>
        <button onClick={onDocument} className="z-btn z-btn-ghost justify-center !py-4 !text-[16px]"><FileText className="w-4.5 h-4.5" /> Learn from a document</button>
      </div>
      <button onClick={onFresh} className="mt-5 text-[13px] font-semibold" style={{ color: "var(--z-ink-3)" }}>Start over</button>
    </>
  );
}
