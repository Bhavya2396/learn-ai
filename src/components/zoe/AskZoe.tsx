"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Search, X, ArrowUp, Volume2, VolumeX, Plus } from "lucide-react";
import LivingBackground from "./LivingBackground";
import ZoeOrb from "./ZoeOrb";
import AskDock from "./AskDock";
import { useZoeBrain, getBrainSnapshot } from "@/lib/zoe/brain";
import { buildMemoryContext } from "@/lib/zoe/memory";
import { useAmbience } from "@/lib/zoe/ambience";
import type { CompanionAnswer, CompanionResponse } from "@/lib/zoe/hats-types";

const EASE = [0.22, 1, 0.36, 1] as const;

const plain = (s?: string) =>
  (s ?? "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/__(.*?)__/g, "$1").replace(/^[-*]\s+/, "").trim();

type Turn = { id: string; q: string; a: CompanionAnswer | null };

interface SpeechRecLike {
  lang: string; interimResults: boolean; continuous: boolean;
  start: () => void; stop: () => void; abort: () => void;
  onresult: ((e: unknown) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

export default function AskZoe({ autoListen = false }: { autoListen?: boolean }) {
  const router = useRouter();
  const profile = useZoeBrain((s) => s.profile);
  const aspirations = useZoeBrain((s) => s.aspirations);

  const setMood = useAmbience((s) => s.setMood);

  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [phase, setPhase] = useState<"idle" | "listening" | "thinking" | "answered">("idle");
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const recRef = useRef<SpeechRecLike | null>(null);
  const voiceSupported = useRef(false);

  const aspTitles = useMemo(() => aspirations.map((a) => a.title), [aspirations]);

  const suggestions = useMemo(() => {
    const base = ["What should I work on today?"];
    aspTitles.slice(0, 2).forEach((t) => base.push(`Next step for ${t.toLowerCase()}`));
    base.push("I'm stuck");
    return base.slice(0, 4);
  }, [aspTitles]);

  const speak = useCallback((text: string) => {
    if (muted || typeof window === "undefined" || !("speechSynthesis" in window) || !text) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.02; u.pitch = 1.0;
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    } catch { setSpeaking(false); }
  }, [muted]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const ask = useCallback(async (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    stopSpeaking();
    setInput("");
    const id = `${Date.now()}`;
    const prior = turns;
    setTurns((t) => [...t, { id, q, a: null }]);
    setPhase("thinking");
    setMood("thinking");
    try {
      const res = await fetch("/api/zoe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hat: "companion", question: q, profileSummary: profile?.summary,
          aspirations: aspTitles,
          thread: prior.filter((t) => t.a).map((t) => ({ q: t.q, a: t.a!.answer })),
          memoryContext: buildMemoryContext(getBrainSnapshot(), q),
        }),
      });
      const data: CompanionResponse = await res.json();
      setTurns((t) => t.map((x) => (x.id === id ? { ...x, a: data.answer } : x)));
      setPhase("answered");
      setMood("success");
      speak(plain(`${data.answer.title}. ${data.answer.answer}`));
      setTimeout(() => setMood("calm"), 1800);
    } catch {
      setTurns((t) => t.map((x) => (x.id === id ? { ...x, a: {
        title: "Something went wrong",
        answer: "Couldn't get a response. Try again.",
        followups: ["Try again"],
      } } : x)));
      setPhase("answered"); setMood("calm");
    }
  }, [turns, profile, aspTitles, setMood, speak, stopSpeaking]);

  /* Voice */
  const startListening = useCallback(() => {
    if (!recRef.current) return;
    try { setInput(""); setPhase("listening"); setMood("listening"); recRef.current.start(); } catch {}
  }, [setMood]);

  const stopListening = useCallback(() => {
    try { recRef.current?.stop(); } catch {}
    if (phase === "listening") { setPhase((p) => (p === "listening" ? "idle" : p)); setMood("calm"); }
  }, [phase, setMood]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as { SpeechRecognition?: new () => SpeechRecLike; webkitSpeechRecognition?: new () => SpeechRecLike };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    voiceSupported.current = true;
    const rec = new Ctor();
    rec.lang = "en-US"; rec.interimResults = true; rec.continuous = false;
    let finalText = "";
    rec.onresult = (e: unknown) => {
      const ev = e as { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> };
      let interim = ""; finalText = "";
      for (let i = 0; i < ev.results.length; i++) {
        const r = ev.results[i]; const text = r[0].transcript;
        if (r.isFinal) finalText += text; else interim += text;
      }
      setInput(finalText || interim);
    };
    rec.onend = () => { setPhase((p) => (p === "listening" ? "idle" : p)); const t = finalText.trim(); if (t) ask(t); };
    rec.onerror = () => setPhase((p) => (p === "listening" ? "idle" : p));
    recRef.current = rec;
    return () => { try { rec.abort(); } catch {} };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (autoListen) startListening(); }, [autoListen, startListening]);
  useEffect(() => () => stopSpeaking(), [stopSpeaking]);

  const runAction = (a: CompanionAnswer) => {
    if (a.action?.kind === "add_aspiration") {
      router.push(`/home?new=1${a.action.payload ? `&seed=${encodeURIComponent(a.action.payload)}` : ""}`);
    } else if (a.action?.kind === "open_journey") {
      router.push("/home");
    }
  };

  const latest = turns[turns.length - 1];
  const dockStatus =
    phase === "listening" ? (input ? `"${input}"` : "Listening…")
      : phase === "thinking" ? "Thinking…"
      : speaking ? "Speaking…"
      : "Ask anything…";
  const dockMood = phase === "listening" ? "listening" : phase === "thinking" ? "thinking" : speaking ? "success" : undefined;

  return (
    <div className="zoe zoe-warm relative min-h-screen">
      <LivingBackground />

      <div className="zoe-app">
        {/* Top bar */}
        <header className="zoe-topbar">
          <button onClick={() => router.push("/home")} className="ask-dock-icon zoe-haptic" aria-label="Back">
            <ArrowLeft className="w-[18px] h-[18px]" />
          </button>
          <div className="flex-1" />
          <button onClick={() => { setMuted((m) => !m); stopSpeaking(); }} className="ask-dock-icon zoe-haptic" aria-label={muted ? "Unmute" : "Mute"}>
            {muted ? <VolumeX className="w-[18px] h-[18px]" /> : <Volume2 className="w-[18px] h-[18px]" />}
          </button>
        </header>

        {/* Search bar */}
        <div className="pt-1 pb-3">
          <form onSubmit={(e) => { e.preventDefault(); ask(input); }}
            className="glass flex items-center gap-2 rounded-full px-4 py-2.5">
            <Search className="w-4.5 h-4.5 flex-shrink-0" style={{ color: "var(--z-ink-3)" }} />
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…" enterKeyHint="go"
              className="flex-1 bg-transparent outline-none text-[16px] font-medium" style={{ color: "var(--z-ink)" }} />
            {input && (
              <button type="button" onClick={() => setInput("")} className="zoe-haptic" style={{ color: "var(--z-ink-3)" }}>
                <X className="w-4.5 h-4.5" />
              </button>
            )}
            <button type="submit" disabled={!input.trim()} aria-label="Ask"
              className="w-8 h-8 rounded-full grid place-items-center flex-shrink-0 disabled:opacity-30 zoe-haptic"
              style={{ background: "var(--z-accent)", color: "var(--z-on-brand)" }}>
              <ArrowUp className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>

        <AnimatePresence mode="wait">
          {/* Idle — just suggestions, no illustration dump */}
          {turns.length === 0 && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-center pt-8">
              <div className="space-y-2">
                {suggestions.map((s, i) => (
                  <motion.button key={s} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, ease: EASE }}
                    onClick={() => ask(s)}
                    className="zoe-haptic w-full rounded-2xl px-4 py-3.5 text-left text-[15px] font-semibold"
                    style={{ background: "var(--z-surface)", color: "var(--z-ink)" }}>
                    {s}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Active — show only the latest answer, full focus */}
          {latest && (
            <motion.div key={latest.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ ease: EASE }} className="pt-2">

              {/* The question */}
              <p className="text-[13px] font-bold mb-3" style={{ color: "var(--z-ink-3)" }}>{latest.q}</p>

              {/* Loading */}
              {!latest.a && (
                <div className="py-12 flex justify-center">
                  <div className="flex gap-1.5">
                    <span className="z-typing-dot" /><span className="z-typing-dot" style={{ animationDelay: "0.15s" }} /><span className="z-typing-dot" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              )}

              {/* Answer — clean, focused */}
              {latest.a && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ ease: EASE }}>
                  <h2 className="zoe-display text-[clamp(1.6rem,5vw,2.2rem)] leading-tight" style={{ color: "var(--z-ink)" }}>
                    {plain(latest.a.title)}
                  </h2>
                  <p className="mt-3 text-[16px] leading-relaxed font-medium" style={{ color: "var(--z-ink-2)" }}>
                    {plain(latest.a.answer)}
                  </p>

                  {/* Action */}
                  {latest.a.action && latest.a.action.kind !== "none" && (
                    <button onClick={() => runAction(latest.a!)} className="z-btn z-btn-brand mt-5 !py-3">
                      <Plus className="w-4 h-4" /> {latest.a.action.label || "Make this a goal"}
                    </button>
                  )}

                  {/* Follow-ups — just text buttons */}
                  {latest.a.followups && latest.a.followups.length > 0 && (
                    <div className="mt-6 space-y-2">
                      {latest.a.followups.map((f) => (
                        <button key={f} onClick={() => ask(f)}
                          className="zoe-haptic w-full rounded-2xl px-4 py-3 text-left text-[14.5px] font-semibold"
                          style={{ background: "var(--z-surface)", color: "var(--z-ink)", border: "1px solid var(--z-line)" }}>
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AskDock
        status={dockStatus}
        active={phase === "listening" || phase === "thinking" || speaking}
        micActive={phase === "listening"}
        mood={dockMood}
        onOrb={() => inputRef.current?.focus()}
        onType={() => inputRef.current?.focus()}
        onMic={() => {
          if (!voiceSupported.current) { inputRef.current?.focus(); return; }
          if (phase === "listening") stopListening(); else startListening();
        }}
      />
    </div>
  );
}
