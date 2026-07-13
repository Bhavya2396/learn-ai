"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, Loader2, CheckCircle2, AlertTriangle, X } from "lucide-react";

export interface PhotoAnalysisResult {
  description: string;
  feedback: string;
  score: number | null;
  tags: string[];
}

interface PhotoCaptureProps {
  context: string;
  question: string;
  onResult: (result: PhotoAnalysisResult) => void;
  className?: string;
}

type Phase = "idle" | "preview" | "analyzing" | "done" | "error";

export default function PhotoCapture({ context, question, onResult, className = "" }: PhotoCaptureProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<PhotoAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select an image file.");
      setPhase("error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setPhase("preview");
    };
    reader.readAsDataURL(file);
  }, []);

  const submit = useCallback(async () => {
    if (!preview) return;
    setPhase("analyzing");
    try {
      const base64 = preview.split(",")[1];
      const mimeType = preview.split(";")[0].replace("data:", "");
      const res = await fetch("/api/zoe/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "image", data: base64, mimeType, context, question }),
      });
      if (!res.ok) throw new Error("Analyze failed");
      const data: PhotoAnalysisResult = await res.json();
      setResult(data);
      setPhase("done");
      onResult(data);
    } catch {
      setErrorMsg("Could not analyze the image. Try again.");
      setPhase("error");
    }
  }, [preview, context, question, onResult]);

  const reset = () => { setPhase("idle"); setPreview(null); setResult(null); setErrorMsg(""); };

  return (
    <div className={`rounded-2xl p-4 ${className}`} style={{ background: "var(--z-surface)" }}>
      <p className="text-[13px] font-bold mb-3" style={{ color: "var(--z-ink-2)" }}>{question}</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex gap-2">
            <button
              onClick={() => { if (inputRef.current) { inputRef.current.capture = "environment"; inputRef.current.click(); } }}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold"
              style={{ background: "var(--z-accent-soft)", color: "var(--z-brand-deep)", border: "1.5px dashed var(--z-accent)" }}
            >
              <Camera className="w-4 h-4" /> Take photo
            </button>
            <button
              onClick={() => { if (inputRef.current) { inputRef.current.removeAttribute("capture"); inputRef.current.click(); } }}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold"
              style={{ background: "var(--z-surface-2)", color: "var(--z-ink-2)" }}
            >
              <Upload className="w-4 h-4" /> Upload
            </button>
          </motion.div>
        )}

        {phase === "preview" && preview && (
          <motion.div key="preview" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <div className="relative rounded-xl overflow-hidden mb-3" style={{ aspectRatio: "4/3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={reset}
                className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <button onClick={submit} className="z-btn z-btn-brand w-full !py-2.5 !text-[13px]">
              Analyze this <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {phase === "analyzing" && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-3 py-4">
            <Loader2 className="w-5 h-5 animate-spin" style={{ color: "var(--z-accent)" }} />
            <span className="text-[13px] font-bold" style={{ color: "var(--z-ink-2)" }}>Analyzing your photo…</span>
          </motion.div>
        )}

        {phase === "done" && result && (
          <motion.div key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="space-y-2">
            {preview && (
              <div className="rounded-xl overflow-hidden mb-2" style={{ maxHeight: 120 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Submitted" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--z-accent)" }} />
              <p className="text-[13.5px] font-medium leading-relaxed" style={{ color: "var(--z-ink)" }}>
                {result.feedback}
              </p>
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
              Try another photo
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
