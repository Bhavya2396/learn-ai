"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check,
  RotateCcw, Sliders, ChevronUp, Mic, Camera, PenLine, Sparkles, Target,
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
} from "lucide-react";
import IframeCanvas, {
  sendAction, sendExperiment, sendReset, sendBeat, sendPause, sendResume,
} from "./IframeCanvas";
import AudioRecorder from "./AudioRecorder";
import PhotoCapture from "./PhotoCapture";
import SketchPad from "./SketchPad";
import ZoeOrb from "./ZoeOrb";
import { ProgressRing } from "./ZoeGraphics";
import { createNarrator, estimateSpeechMs, type Narrator } from "@/lib/zoe/speech";
import type {
  LessonContent, LessonSection, MediaAsset, ExperimentControl, LessonExercise,
} from "@/lib/zoe/content-types";

const EASE = [0.22, 1, 0.36, 1] as const;
// How long before the top bar auto-hides (ms)
const HEADER_HIDE_MS = 3500;
// Pixels reserved at the bottom of every iframe for the floating UI panel
// Must be >= max height of the bottom panel (eval chip + narration + transport)
const IFRAME_SAFE_BOTTOM = 208;
// A little air after each spoken beat before the next begins.
const BEAT_GAP_MS = 220;

/* ═══════════════════════════════════════════════════════════════════════
   LessonPlayer — full-screen canvas with safe-zone injection so the
   AI-generated content never hides behind the floating UI overlay.
   Top bar auto-hides; tap anywhere on the visual to toggle it back.
   ═══════════════════════════════════════════════════════════════════════ */

interface LessonPlayerProps {
  lesson: LessonContent;
  stepTitle: string;
  onBack: () => void;
  onComplete: (mastery: { comprehension: number | null; application: number | null }) => void;
}

export default function LessonPlayer({ lesson, stepTitle, onBack, onComplete }: LessonPlayerProps) {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [phase, setPhase] = useState(0);          // current beat index
  const [playing, setPlaying] = useState(false);  // beats are auto-advancing
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false); // all beats spoken
  const [speaking, setSpeaking] = useState(false);  // audio actually playing (orb pulse)
  const [hookOpen, setHookOpen] = useState(true);   // section-opening question card
  const [muted, setMuted] = useState(false);

  const [showExercise, setShowExercise] = useState(false);
  const [exerciseAnswer, setExerciseAnswer] = useState<number | null>(null);
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const headerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const narratorRef = useRef<Narrator | null>(null);
  const runRef = useRef(0);                         // guards async beat loops
  const beatsRef = useRef<{ text: string; action?: string; mediaRef?: string }[]>([]);
  const [activeMediaRef, setActiveMediaRef] = useState<string | undefined>(undefined);

  const section = lesson.sections[sectionIdx];
  const totalSections = lesson.sections.length;
  const narration = useMemo(() => section?.narration ?? [], [section]);
  const totalBeats = narration.length;
  const currentNarration = narration[phase];

  const mediaMap = useMemo(() => {
    const map = new Map<string, MediaAsset>();
    for (const m of lesson.media) map.set(m.id, m);
    return map;
  }, [lesson.media]);

  const currentMedia = activeMediaRef ? mediaMap.get(activeMediaRef) : null;
  const sectionMedia = section?.mediaRefs?.map((id) => mediaMap.get(id)).filter(Boolean) as MediaAsset[] | undefined;

  const hasInteractive = !!section?.interactiveCode;
  const hasExperiments = (section?.experimentControls?.length ?? 0) > 0;
  const evaluation = section?.evaluation;

  const [evalState, setEvalState] = useState<{
    status: "idle" | "grading" | "done";
    feedback?: string;
    score?: number | null;
    label?: string;
  }>({ status: "idle" });

  /* ── narrator lifecycle ── */
  useEffect(() => {
    const n = createNarrator();
    narratorRef.current = n;
    return () => { n.destroy(); };
  }, []);

  /* ── the beat engine: speak each beat while the visual reveals in sync ── */
  const runBeats = useCallback((from: number) => {
    const beats = beatsRef.current;
    const rid = ++runRef.current;
    const narrator = narratorRef.current;
    narrator?.cancel();
    setPaused(false);
    setFinished(false);
    setPlaying(true);

    const alive = () => rid === runRef.current;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    let b = Math.max(0, from);
    const step = async () => {
      if (!alive()) return;
      if (b >= beats.length) {
        setPlaying(false);
        setSpeaking(false);
        setFinished(true);
        return;
      }
      setPhase(b);
      const beat = beats[b];
      if (beat.mediaRef) setActiveMediaRef(beat.mediaRef);
      // Legacy support: if a beat names an action, fire it too.
      if (beat.action) sendAction(iframeRef.current, beat.action);
      sendBeat(iframeRef.current, b, estimateSpeechMs(beat.text) + 300);
      await narrator?.speak(beat.text, { onStart: () => { if (alive()) setSpeaking(true); } });
      if (!alive()) return;
      setSpeaking(false);
      await sleep(BEAT_GAP_MS);
      if (!alive()) return;
      b += 1;
      step();
    };
    step();
  }, []);

  const stopBeats = useCallback(() => {
    runRef.current += 1;
    narratorRef.current?.cancel();
    setSpeaking(false);
    setPlaying(false);
  }, []);

  /* ── entering a section: reset, show its hook, prime the visual ── */
  useEffect(() => {
    beatsRef.current = (section?.narration ?? []).map((n) => ({ text: n.text, action: n.action, mediaRef: n.mediaRef }));
    runRef.current += 1;                 // cancel any in-flight loop
    narratorRef.current?.cancel();
    setPhase(0);
    setPlaying(false);
    setPaused(false);
    setFinished(false);
    setSpeaking(false);
    setControlsOpen(false);
    setEvalState({ status: "idle" });
    setHookOpen(true);
    setActiveMediaRef(section?.narration?.find((n) => n.mediaRef)?.mediaRef ?? section?.mediaRefs?.[0]);
    sendReset(iframeRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIdx]);

  const beginSection = useCallback(() => {
    setHookOpen(false);
    // small delay lets the hook card fade before the voice starts
    setTimeout(() => runBeats(0), 180);
  }, [runBeats]);

  /* ── transport controls ── */
  const togglePlay = useCallback(() => {
    if (finished) { runBeats(0); return; }
    if (!playing) { runBeats(phase); return; }
    if (paused) {
      setPaused(false);
      narratorRef.current?.resume();
      sendResume(iframeRef.current);
    } else {
      setPaused(true);
      narratorRef.current?.pause();
      sendPause(iframeRef.current);
    }
  }, [finished, playing, paused, phase, runBeats]);

  const nextBeat = useCallback(() => {
    if (phase >= totalBeats - 1) { setFinished(true); stopBeats(); return; }
    runBeats(phase + 1);
  }, [phase, totalBeats, runBeats, stopBeats]);

  const prevBeat = useCallback(() => {
    runBeats(Math.max(0, phase - 1));
  }, [phase, runBeats]);

  const toggleMute = useCallback(() => {
    const next = !muted;
    setMuted(next);
    narratorRef.current?.setMuted(next);
    // Re-speak the current beat with the new setting if mid-play.
    if (playing && !finished) runBeats(phase);
  }, [muted, playing, finished, phase, runBeats]);

  /* ── auto-hide header ── */
  const armHeaderTimer = useCallback(() => {
    if (headerTimerRef.current) clearTimeout(headerTimerRef.current);
    headerTimerRef.current = setTimeout(() => setShowHeader(false), HEADER_HIDE_MS);
  }, []);
  const revealHeader = useCallback(() => {
    setShowHeader(true);
    armHeaderTimer();
  }, [armHeaderTimer]);
  useEffect(() => {
    setShowHeader(true);
    armHeaderTimer();
    return () => { if (headerTimerRef.current) clearTimeout(headerTimerRef.current); };
  }, [sectionIdx, armHeaderTimer]);

  /* ── evaluation handler ── */
  const handleSubmission = useCallback(async (data: { payload: unknown; label?: string }) => {
    if (!evaluation) return;
    setEvalState({ status: "grading", label: data.label });
    try {
      const res = await fetch("/api/zoe/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "performance",
          context: `${stepTitle} — ${section?.title}`,
          question: evaluation.challenge,
          successCriteria: evaluation.successCriteria,
          submission: data.payload,
          submissionLabel: data.label,
        }),
      });
      if (!res.ok) throw new Error("grade failed");
      const result = await res.json();
      setEvalState({ status: "done", feedback: result.feedback, score: result.score, label: data.label });
    } catch {
      setEvalState({ status: "done", feedback: "Nice try! Keep practicing.", score: 60, label: data.label });
    }
  }, [evaluation, stepTitle, section?.title]);

  const goSection = useCallback((next: number) => {
    if (next < 0) return;
    stopBeats();
    if (next >= totalSections) { setShowExercise(true); return; }
    setSectionIdx(next);
  }, [totalSections, stopBeats]);

  const handleExperiment = useCallback((ctrl: ExperimentControl, value: unknown) => {
    sendExperiment(iframeRef.current, ctrl.id, value);
  }, []);

  const handleExerciseSubmit = () => {
    setExerciseSubmitted(true);
    const correct = lesson.exercise.correctIndex !== undefined
      ? exerciseAnswer === lesson.exercise.correctIndex
      : false;
    onComplete({ comprehension: correct ? 90 : 40, application: null });
  };

  if (showExercise) {
    return (
      <ExerciseView
        exercise={lesson.exercise}
        answer={exerciseAnswer}
        submitted={exerciseSubmitted}
        onSelect={setExerciseAnswer}
        onSubmit={handleExerciseSubmit}
        onBack={() => setShowExercise(false)}
        summary={lesson.summary}
        stepTitle={stepTitle}
      />
    );
  }

  const isLastSection = sectionIdx >= totalSections - 1;

  return (
    <div
      // Full-bleed: escape the app's 520px mobile column so the visual fills the
      // whole screen edge-to-edge (with small margins) on any device. `fixed`
      // breaks out of the centered parent; insets give the small breathing margin.
      className="fixed z-[100] overflow-hidden rounded-[26px]"
      style={{
        top: 16, bottom: 16,
        left: "max(16px, env(safe-area-inset-left))",
        right: "max(16px, env(safe-area-inset-right))",
        maxWidth: 1400, marginInline: "auto",
        background: "#0f0d0a",
      }}
    >
      {/* Persistent back button — always visible (the auto-hiding header's back
          button disappears, so this guarantees a way out of the full-bleed player). */}
      <button
        onClick={(e) => { e.stopPropagation(); onBack(); }}
        aria-label="Back to journey"
        className="zoe-haptic absolute top-3 left-3 z-[60] w-9 h-9 rounded-full grid place-items-center flex-shrink-0"
        style={{ background: "rgba(20,16,12,0.6)", backdropFilter: "blur(12px)", color: "#FAF5EB", border: "1px solid rgba(255,255,255,0.14)" }}
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      {/* ════ VISUAL LAYER — absolute inset-0, fills the full box ════ */}
      <div className="absolute inset-0" onClick={revealHeader}>
        <AnimatePresence mode="wait">
          {hasInteractive ? (
            <motion.div
              key={`iframe-${sectionIdx}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <IframeCanvas
                code={section.interactiveCode!}
                iframeRef={iframeRef}
                safeBottom={IFRAME_SAFE_BOTTOM}
                onSubmission={handleSubmission}
                fallbackText={`Interactive visual for: ${section.title}`}
              />
            </motion.div>
          ) : currentMedia?.type === "image" && currentMedia.dataUrl ? (
            <motion.div
              key={`img-${currentMedia.id}`}
              initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentMedia.dataUrl} alt={currentMedia.prompt} className="w-full h-full object-cover" />
            </motion.div>
          ) : currentMedia?.type === "video" && currentMedia.videoUri ? (
            <motion.div
              key={`vid-${currentMedia.id}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <video src={currentMedia.videoUri} autoPlay loop playsInline muted className="w-full h-full object-cover" />
            </motion.div>
          ) : sectionMedia?.[0]?.type === "image" && sectionMedia[0].dataUrl ? (
            <motion.div
              key={`smedia-${sectionMedia[0].id}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sectionMedia[0].dataUrl} alt={sectionMedia[0].prompt} className="w-full h-full object-cover" />
            </motion.div>
          ) : (
            <ConceptBackdrop key={`backdrop-${sectionIdx}`} title={section?.title ?? ""} hook={section?.hookQuestion} />
          )}
        </AnimatePresence>
      </div>

      {/* ════ HOOK CARD — the question that opens each section ════ */}
      <AnimatePresence>
        {hookOpen && (
          <motion.div
            key={`hook-${sectionIdx}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center px-7 text-center"
            style={{ background: "rgba(10,8,6,0.72)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 15, delay: 0.05 }}
              className="max-w-sm"
            >
              <div className="mx-auto mb-5">
                <ZoeOrb size={54} sparks />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.15em]" style={{ color: "var(--z-accent)" }}>
                {section?.title}
              </span>
              <h2 className="mt-3 zoe-display text-[clamp(1.4rem,5.5vw,2rem)] leading-tight" style={{ color: "#FAF5EB" }}>
                {section?.hookQuestion || `Let's explore ${section?.title ?? "this"}.`}
              </h2>
              <button
                onClick={(e) => { e.stopPropagation(); beginSection(); }}
                className="z-btn z-btn-brand mt-7 !py-3 !px-8"
              >
                <Play className="w-4 h-4" /> Show me
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top scrim */}
      <AnimatePresence>
        {showHeader && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="absolute top-0 inset-x-0 h-20 pointer-events-none z-20"
            style={{ background: "linear-gradient(to bottom, rgba(15,13,10,0.8), transparent)" }}
          />
        )}
      </AnimatePresence>

      {/* ════ TOP BAR ════ */}
      <AnimatePresence>
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute top-0 inset-x-0 z-30 px-3 pt-3 pb-2 flex items-center gap-2"
          >
            {/* Spacer where the persistent back button sits, so the progress bar clears it. */}
            <div className="w-9 h-9 flex-shrink-0" aria-hidden />

            <div className="flex-1 flex gap-1.5">
              {lesson.sections.map((s, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); goSection(i); }}
                  title={s.title}
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(250,245,235,0.18)" }}
                >
                  <span
                    className="block h-full rounded-full transition-all duration-500"
                    style={{
                      width: i < sectionIdx ? "100%" : i === sectionIdx
                        ? `${((phase + 1) / Math.max(totalBeats, 1)) * 100}%`
                        : "0%",
                      background: i <= sectionIdx ? "var(--z-accent)" : "transparent",
                    }}
                  />
                </button>
              ))}
            </div>

            <span
              className="text-[11px] font-extrabold px-2.5 py-1 rounded-full flex-shrink-0"
              style={{ background: "rgba(20,16,12,0.55)", backdropFilter: "blur(12px)", color: "#FAF5EB" }}
            >
              {sectionIdx + 1}/{totalSections}
            </span>

            {hasExperiments && (
              <button
                onClick={(e) => { e.stopPropagation(); setControlsOpen((o) => !o); }}
                className="zoe-haptic w-9 h-9 rounded-full grid place-items-center flex-shrink-0"
                style={{
                  background: controlsOpen ? "var(--z-accent)" : "rgba(20,16,12,0.55)",
                  backdropFilter: "blur(12px)",
                  color: controlsOpen ? "var(--z-on-brand)" : "#FAF5EB",
                }}
              >
                <Sliders className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experiment panel */}
      <AnimatePresence>
        {controlsOpen && hasExperiments && (
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute top-14 right-3 z-30 w-[min(260px,72%)] rounded-2xl p-4 space-y-3"
            style={{ background: "rgba(18,14,10,0.94)", backdropFilter: "blur(16px)", border: "1px solid rgba(250,245,235,0.1)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: "var(--z-accent)" }}>
                Experiment
              </span>
              <button onClick={() => setControlsOpen(false)}>
                <ChevronUp className="w-4 h-4" style={{ color: "#FAF5EB60" }} />
              </button>
            </div>
            {section.experimentControls.map((ctrl) => (
              <ControlWidget key={ctrl.id} ctrl={ctrl} onChange={(v) => handleExperiment(ctrl, v)} dark />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom scrim */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none z-20"
        style={{ height: "45%", background: "linear-gradient(to top, rgba(12,10,8,0.9) 0%, rgba(12,10,8,0.55) 45%, transparent 100%)" }}
      />

      {/* ════ BOTTOM PANEL — narration + transport ════ */}
      <div className="absolute bottom-0 inset-x-0 z-30 px-3 pb-3 pt-1 space-y-1.5">
        {/* Eval chip */}
        <AnimatePresence>
          {evaluation && (
            <motion.div
              initial={{ opacity: 0, y: 8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: 8, height: 0 }}
              transition={{ duration: 0.2, ease: EASE }} className="overflow-hidden"
            >
              <div className="rounded-2xl px-3 py-2.5" style={{ background: "rgba(20,16,12,0.72)", backdropFilter: "blur(18px)", border: "1px solid rgba(246,200,99,0.22)" }}>
                <div className="flex items-start gap-2">
                  <Target className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "var(--z-accent)" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold leading-snug" style={{ color: "#FAF5EB" }}>{evaluation.challenge}</p>
                    <AnimatePresence mode="wait">
                      {evalState.status === "grading" && (
                        <motion.p key="g" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="text-[11px] font-semibold mt-1 flex items-center gap-1.5" style={{ color: "var(--z-accent)" }}>
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--z-accent)" }} />
                          {evalState.label ? `${evalState.label} — evaluating…` : "Evaluating…"}
                        </motion.p>
                      )}
                      {evalState.status === "done" && (
                        <motion.div key="d" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
                          <p className="text-[11.5px] font-medium mt-1 leading-relaxed" style={{ color: "rgba(250,245,235,0.9)" }}>{evalState.feedback}</p>
                          {evalState.score != null && (
                            <div className="flex items-center gap-2 mt-1.5">
                              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(250,245,235,0.18)" }}>
                                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${evalState.score}%`, background: "var(--z-accent)" }} />
                              </div>
                              <span className="text-[11px] font-extrabold" style={{ color: "var(--z-accent)" }}>{evalState.score}%</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Narration + transport bubble */}
        <div
          className="rounded-[22px] px-3.5 py-3"
          style={{ background: "rgba(14,11,8,0.86)", backdropFilter: "blur(22px)", border: "1px solid rgba(250,245,235,0.07)" }}
        >
          <div className="flex items-start gap-2.5">
            <div className="flex-shrink-0 mt-0.5 relative">
              <ZoeOrb size={24} sparks={speaking} />
              {speaking && (
                <motion.span
                  className="absolute -inset-1 rounded-full pointer-events-none"
                  style={{ border: "1.5px solid var(--z-accent)" }}
                  animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`narr-${sectionIdx}-${phase}`}
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: EASE }}
                  className="text-[14px] font-medium leading-relaxed"
                  style={{ color: "#FAF5EB" }}
                >
                  {currentNarration?.text ?? section?.hookQuestion ?? "Explore the visual above."}
                </motion.p>
              </AnimatePresence>
            </div>
            {/* Mute */}
            <button
              onClick={toggleMute}
              className="zoe-haptic w-8 h-8 rounded-full grid place-items-center flex-shrink-0"
              style={{ background: "rgba(250,245,235,0.08)", color: muted ? "#FAF5EB70" : "var(--z-accent)" }}
              title={muted ? "Unmute narration" : "Mute narration"}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Transport row */}
          <div className="flex items-center justify-between mt-3">
            {/* Beat dots */}
            <div className="flex gap-1 items-center min-w-0 overflow-hidden">
              {narration.map((_, i) => (
                <span
                  key={i}
                  className="h-1 rounded-full transition-all duration-200 flex-shrink-0"
                  style={{
                    width: i === phase ? 16 : 4,
                    background: i === phase ? "var(--z-accent)" : i < phase ? "var(--z-accent-edge)" : "rgba(250,245,235,0.2)",
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={prevBeat}
                disabled={phase === 0 && !finished}
                className="zoe-haptic w-8 h-8 rounded-full grid place-items-center disabled:opacity-30"
                style={{ background: "rgba(250,245,235,0.08)", color: "#FAF5EB" }}
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={togglePlay}
                className="zoe-haptic w-10 h-10 rounded-full grid place-items-center"
                style={{ background: "var(--z-accent)", color: "var(--z-on-brand)" }}
                title={finished ? "Replay" : playing && !paused ? "Pause" : "Play"}
              >
                {finished ? <RotateCcw className="w-4 h-4" /> : (playing && !paused) ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              {!finished ? (
                <button
                  onClick={nextBeat}
                  className="zoe-haptic w-8 h-8 rounded-full grid place-items-center"
                  style={{ background: "rgba(250,245,235,0.08)", color: "#FAF5EB" }}
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => goSection(sectionIdx + 1)}
                  className="z-btn z-btn-brand !py-1.5 !px-4 !text-[13px]"
                >
                  {isLastSection ? "Exercise" : "Continue"} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Concept backdrop ──────────────────────────────────────────────────── */

function ConceptBackdrop({ title, hook }: { title: string; hook?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(120% 120% at 50% 20%, #2a1f12 0%, #16100a 55%, #0f0d0a 100%)" }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{ width: 280, height: 280, background: "radial-gradient(circle, rgba(246,200,99,0.22), transparent 70%)", top: "5%", left: "-12%" }}
        animate={{ x: [0, 36, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ width: 200, height: 200, background: "radial-gradient(circle, rgba(197,135,110,0.18), transparent 70%)", bottom: "10%", right: "-8%" }}
        animate={{ x: [0, -28, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 14 }}
          className="mx-auto mb-4 w-12 h-12 rounded-2xl grid place-items-center"
          style={{ background: "rgba(246,200,99,0.14)", border: "1px solid rgba(246,200,99,0.28)" }}
        >
          <Sparkles className="w-5 h-5" style={{ color: "var(--z-accent)" }} />
        </motion.div>
        <h2
          className="zoe-display text-[clamp(1.5rem,5vw,2.2rem)] leading-tight"
          style={{ color: "#FAF5EB" }}
        >
          {title}
        </h2>
        {hook && (
          <p className="mt-2 text-[13px] font-semibold italic" style={{ color: "rgba(246,200,99,0.8)" }}>
            {hook}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ── Experiment control widget ─────────────────────────────────────────── */

function ControlWidget({ ctrl, onChange, dark = false }: { ctrl: ExperimentControl; onChange: (v: unknown) => void; dark?: boolean }) {
  const [value, setValue] = useState(ctrl.defaultValue);
  const labelColor = dark ? "rgba(250,245,235,0.88)" : "var(--z-ink-2)";
  const valColor = dark ? "var(--z-accent)" : "var(--z-brand-deep)";

  if (ctrl.type === "slider") {
    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[12px] font-bold" style={{ color: labelColor }}>{ctrl.label}</span>
          <span className="text-[12px] font-mono font-bold" style={{ color: valColor }}>{String(value)}</span>
        </div>
        <input type="range" min={ctrl.min ?? 0} max={ctrl.max ?? 100} step={ctrl.step ?? 1} value={Number(value)}
          onChange={(e) => { const v = Number(e.target.value); setValue(v); onChange(v); }}
          className="w-full accent-[var(--z-accent)]" />
      </div>
    );
  }

  if (ctrl.type === "toggle") {
    const isOn = Boolean(value);
    return (
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold" style={{ color: labelColor }}>{ctrl.label}</span>
        <button onClick={() => { const v = !isOn; setValue(v); onChange(v); }}
          className="w-10 h-5 rounded-full relative transition-colors duration-200"
          style={{ background: isOn ? "var(--z-accent)" : "var(--z-line-2)" }}>
          <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200"
            style={{ transform: isOn ? "translateX(20px)" : "translateX(2px)" }} />
        </button>
      </div>
    );
  }

  if (ctrl.type === "select" && ctrl.options) {
    return (
      <div>
        <span className="text-[12px] font-bold block mb-1" style={{ color: labelColor }}>{ctrl.label}</span>
        <div className="flex flex-wrap gap-1.5">
          {ctrl.options.map((opt) => (
            <button key={opt} onClick={() => { setValue(opt); onChange(opt); }}
              className="z-chip !py-1 !px-2.5 !text-[11px]"
              style={{ background: value === opt ? "var(--z-accent)" : "var(--z-surface-2)", color: value === opt ? "var(--z-on-brand)" : "var(--z-ink-2)" }}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

/* ── Exercise view ─────────────────────────────────────────────────────── */

type MultimodalTab = "none" | "voice" | "photo" | "sketch";

function ExerciseView({
  exercise, answer, submitted, onSelect, onSubmit, onBack, summary, stepTitle,
}: {
  exercise: LessonExercise; answer: number | null; submitted: boolean;
  onSelect: (i: number) => void; onSubmit: () => void; onBack: () => void;
  summary: string; stepTitle: string;
}) {
  const correct = exercise.correctIndex !== undefined && answer === exercise.correctIndex;
  const [mmTab, setMmTab] = useState<MultimodalTab>("none");
  const [mmScore, setMmScore] = useState<number | null>(null);
  const context = `${stepTitle} — ${summary}`;
  const mmQuestion = exercise.prompt;

  return (
    <div className="flex flex-col min-h-[70svh] justify-center">
      <button onClick={onBack} className="flex items-center gap-1 text-[13px] font-bold mb-6" style={{ color: "var(--z-ink-3)" }}>
        <ArrowLeft className="w-4 h-4" /> Back to lesson
      </button>

      {!submitted ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="z-chip mb-3 inline-flex" style={{ background: "var(--z-accent-soft)", color: "var(--z-brand-deep)" }}>
            Check your understanding
          </span>
          <h2 className="text-[20px] font-extrabold leading-tight mb-5" style={{ color: "var(--z-ink)" }}>
            {exercise.prompt}
          </h2>

          {exercise.options && (
            <div className="space-y-2 mb-6">
              {exercise.options.map((opt, i) => (
                <button key={i} onClick={() => onSelect(i)}
                  className="w-full text-left rounded-2xl p-4 text-[14.5px] font-semibold transition-all duration-150"
                  style={{ background: answer === i ? "var(--z-accent-soft)" : "var(--z-surface)", borderWidth: 2, borderColor: answer === i ? "var(--z-accent)" : "transparent", color: "var(--z-ink)" }}>
                  <span className="text-[12px] font-bold mr-2" style={{ color: "var(--z-brand-deep)" }}>{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {exercise.hints?.length ? (
            <p className="text-[12px] font-medium mb-4" style={{ color: "var(--z-ink-3)" }}>Hint: {exercise.hints[0]}</p>
          ) : null}

          <button onClick={onSubmit} disabled={answer === null} className="z-btn z-btn-brand w-full !py-3.5 mb-4"
            style={{ opacity: answer === null ? 0.4 : 1 }}>
            <Check className="w-4 h-4" /> Submit
          </button>

          <div className="mt-2">
            <p className="text-[11px] font-extrabold uppercase tracking-wider mb-2" style={{ color: "var(--z-ink-3)" }}>Or show it your way</p>
            <div className="flex gap-2 mb-3">
              {(["voice", "photo", "sketch"] as MultimodalTab[]).map((tab) => {
                const icons = { voice: Mic, photo: Camera, sketch: PenLine };
                const labels = { voice: "Explain", photo: "Show", sketch: "Draw" };
                const Icon = icons[tab as keyof typeof icons];
                const active = mmTab === tab;
                return (
                  <button key={tab} onClick={() => setMmTab(active ? "none" : tab)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-[12px] font-bold transition-all"
                    style={{ background: active ? "var(--z-accent-soft)" : "var(--z-surface)", color: active ? "var(--z-brand-deep)" : "var(--z-ink-3)", border: `1.5px solid ${active ? "var(--z-accent)" : "transparent"}` }}>
                    <Icon className="w-3.5 h-3.5" />
                    {labels[tab as keyof typeof labels]}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {mmTab === "voice" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <AudioRecorder context={context} question={mmQuestion} onResult={(r) => setMmScore(r.score)} className="mb-2" />
                </motion.div>
              )}
              {mmTab === "photo" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <PhotoCapture context={context} question={mmQuestion} onResult={(r) => setMmScore(r.score)} className="mb-2" />
                </motion.div>
              )}
              {mmTab === "sketch" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <SketchPad context={context} question={mmQuestion} onResult={(r) => setMmScore(r.score)} className="mb-2" />
                </motion.div>
              )}
            </AnimatePresence>

            {mmScore !== null && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "var(--z-accent-soft)" }}>
                <span className="text-[12px] font-bold" style={{ color: "var(--z-brand-deep)" }}>Multimodal score: {mmScore}%</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: correct ? "var(--z-accent)" : "var(--z-surface-2)" }}>
            {correct
              ? <Check className="w-8 h-8" style={{ color: "var(--z-on-brand)" }} />
              : <RotateCcw className="w-8 h-8" style={{ color: "var(--z-ink-2)" }} />
            }
          </div>
          <h2 className="text-[22px] font-extrabold mb-2" style={{ color: "var(--z-ink)" }}>
            {correct ? "Nailed it." : "Not quite."}
          </h2>
          <p className="text-[14px] font-medium leading-relaxed mb-6 max-w-sm mx-auto" style={{ color: "var(--z-ink-2)" }}>
            {exercise.explanation}
          </p>
          {summary && (
            <p className="text-[13px] font-semibold mb-6 max-w-sm mx-auto" style={{ color: "var(--z-ink-3)" }}>
              {summary}
            </p>
          )}
          <ProgressRing pct={correct ? 90 : 40} size={56} stroke={3.5}>
            <span className="text-[12px] font-extrabold" style={{ color: "var(--z-brand-deep)" }}>{correct ? 90 : 40}%</span>
          </ProgressRing>
        </motion.div>
      )}
    </div>
  );
}
