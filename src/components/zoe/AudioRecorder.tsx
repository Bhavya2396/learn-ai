"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

export interface AudioAnalysisResult {
  transcript: string;
  feedback: string;
  score: number | null;
  tags: string[];
}

interface AudioRecorderProps {
  context: string;       // what concept this is evaluating
  question: string;      // the prompt shown to the user
  onResult: (result: AudioAnalysisResult) => void;
  className?: string;
}

type Phase = "idle" | "recording" | "analyzing" | "done" | "error";

export default function AudioRecorder({ context, question, onResult, className = "" }: AudioRecorderProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState<AudioAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: getSupportedMimeType() });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        await analyze(blob, recorder.mimeType);
      };
      recorder.start(250);
      mediaRef.current = recorder;
      setPhase("recording");
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch (e) {
      setErrorMsg("Microphone access denied.");
      setPhase("error");
    }
  }, [context, question]);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRef.current?.stop();
    setPhase("analyzing");
  }, []);

  const analyze = async (blob: Blob, mimeType: string) => {
    try {
      const base64 = await blobToBase64(blob);
      const res = await fetch("/api/zoe/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "audio", data: base64, mimeType, context, question }),
      });
      if (!res.ok) throw new Error("Analyze failed");
      const data: AudioAnalysisResult = await res.json();
      setResult(data);
      setPhase("done");
      onResult(data);
    } catch {
      setErrorMsg("Could not analyze recording. Try again.");
      setPhase("error");
    }
  };

  const reset = () => { setPhase("idle"); setResult(null); setErrorMsg(""); setSeconds(0); };

  return (
    <div className={`rounded-2xl p-4 ${className}`} style={{ background: "var(--z-surface)" }}>
      <p className="text-[13px] font-bold mb-3" style={{ color: "var(--z-ink-2)" }}>{question}</p>

      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button
              onClick={start}
              className="flex items-center gap-2 w-full justify-center rounded-xl py-3 text-[14px] font-bold transition-all"
              style={{ background: "var(--z-accent-soft)", color: "var(--z-brand-deep)", border: "1.5px dashed var(--z-accent)" }}
            >
              <Mic className="w-5 h-5" />
              Record your answer
            </button>
          </motion.div>
        )}

        {phase === "recording" && (
          <motion.div key="recording" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(229, 62, 62, 0.15)" }}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: "#e53e3e" }} />
            </motion.div>
            <div className="flex-1">
              <div className="text-[13px] font-bold" style={{ color: "var(--z-ink)" }}>
                Recording… {formatTime(seconds)}
              </div>
              <div className="text-[11px] font-semibold mt-0.5" style={{ color: "var(--z-ink-3)" }}>
                Speak clearly — tap stop when done
              </div>
            </div>
            <button
              onClick={stop}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#e53e3e" }}
            >
              <Square className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        )}

        {phase === "analyzing" && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-3 py-4">
            <Loader2 className="w-5 h-5 animate-spin" style={{ color: "var(--z-accent)" }} />
            <span className="text-[13px] font-bold" style={{ color: "var(--z-ink-2)" }}>Analyzing your response…</span>
          </motion.div>
        )}

        {phase === "done" && result && (
          <motion.div key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--z-accent)" }} />
              <div>
                {result.transcript && (
                  <p className="text-[12px] font-semibold italic mb-1" style={{ color: "var(--z-ink-3)" }}>
                    "{result.transcript}"
                  </p>
                )}
                <p className="text-[13.5px] font-medium leading-relaxed" style={{ color: "var(--z-ink)" }}>
                  {result.feedback}
                </p>
              </div>
            </div>
            {result.score !== null && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--z-line-2)" }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${result.score}%`, background: "var(--z-accent)" }} />
                </div>
                <span className="text-[11px] font-extrabold" style={{ color: "var(--z-brand-deep)" }}>{result.score}%</span>
              </div>
            )}
            <button onClick={reset} className="text-[11px] font-bold mt-1" style={{ color: "var(--z-ink-3)" }}>
              Re-record
            </button>
          </motion.div>
        )}

        {phase === "error" && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: "var(--z-accent)" }} />
            <p className="text-[12px] font-semibold" style={{ color: "var(--z-ink-2)" }}>{errorMsg}</p>
            <button onClick={reset} className="ml-auto text-[11px] font-bold" style={{ color: "var(--z-brand-deep)" }}>Retry</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function getSupportedMimeType(): string {
  const types = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp4"];
  return types.find((t) => MediaRecorder.isTypeSupported(t)) ?? "";
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]); // strip data URL prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
