"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Eraser, Trash2, Send, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

export interface SketchAnalysisResult {
  description: string;
  feedback: string;
  score: number | null;
  tags: string[];
}

interface SketchPadProps {
  context: string;
  question: string;
  onResult: (result: SketchAnalysisResult) => void;
  className?: string;
}

type Tool = "pen" | "eraser";
type Phase = "draw" | "analyzing" | "done" | "error";

export default function SketchPad({ context, question, onResult, className = "" }: SketchPadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>("pen");
  const [phase, setPhase] = useState<Phase>("draw");
  const [result, setResult] = useState<SketchAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasDrawn, setHasDrawn] = useState(false);
  const drawing = useRef(false);
  const lastPt = useRef<{ x: number; y: number } | null>(null);

  const getCanvas = () => canvasRef.current;
  const getCtx = () => canvasRef.current?.getContext("2d") ?? null;

  // Setup canvas
  useEffect(() => {
    const canvas = getCanvas();
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = getCtx();
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#1a1510";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPoint = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const beginStroke = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = getCanvas();
    if (!canvas) return;
    drawing.current = true;
    lastPt.current = getPoint(e, canvas);
    setHasDrawn(true);
  }, []);

  const continueStroke = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current) return;
    const canvas = getCanvas();
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    const pt = getPoint(e, canvas);
    if (!lastPt.current) { lastPt.current = pt; return; }
    ctx.beginPath();
    ctx.moveTo(lastPt.current.x, lastPt.current.y);
    ctx.lineTo(pt.x, pt.y);
    if (tool === "pen") {
      ctx.strokeStyle = "#F6C863";
      ctx.lineWidth = 2.5;
      ctx.globalCompositeOperation = "source-over";
    } else {
      ctx.strokeStyle = "#1a1510";
      ctx.lineWidth = 18;
      ctx.globalCompositeOperation = "source-over";
    }
    ctx.stroke();
    lastPt.current = pt;
  }, [tool]);

  const endStroke = useCallback(() => {
    drawing.current = false;
    lastPt.current = null;
  }, []);

  const clear = useCallback(() => {
    const canvas = getCanvas();
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "#1a1510";
    ctx.fillRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);
  }, []);

  const submit = useCallback(async () => {
    const canvas = getCanvas();
    if (!canvas) return;
    setPhase("analyzing");
    try {
      const dataUrl = canvas.toDataURL("image/png");
      const base64 = dataUrl.split(",")[1];
      const res = await fetch("/api/zoe/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "sketch", data: base64, mimeType: "image/png", context, question }),
      });
      if (!res.ok) throw new Error("Analyze failed");
      const data: SketchAnalysisResult = await res.json();
      setResult(data);
      setPhase("done");
      onResult(data);
    } catch {
      setErrorMsg("Could not analyze the sketch. Try again.");
      setPhase("error");
    }
  }, [context, question, onResult]);

  const reset = () => { setPhase("draw"); setResult(null); setErrorMsg(""); clear(); };

  if (phase === "analyzing") {
    return (
      <div className={`rounded-2xl p-4 ${className}`} style={{ background: "var(--z-surface)" }}>
        <div className="flex items-center justify-center gap-3 py-6">
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: "var(--z-accent)" }} />
          <span className="text-[13px] font-bold" style={{ color: "var(--z-ink-2)" }}>Reading your sketch…</span>
        </div>
      </div>
    );
  }

  if (phase === "done" && result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-4 space-y-2 ${className}`}
        style={{ background: "var(--z-surface)" }}
      >
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--z-accent)" }} />
          <p className="text-[13.5px] font-medium leading-relaxed" style={{ color: "var(--z-ink)" }}>
            {result.feedback}
          </p>
        </div>
        {result.score !== null && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--z-line-2)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${result.score}%`, background: "var(--z-accent)" }} />
            </div>
            <span className="text-[11px] font-extrabold" style={{ color: "var(--z-brand-deep)" }}>{result.score}%</span>
          </div>
        )}
        <button onClick={reset} className="text-[11px] font-bold" style={{ color: "var(--z-ink-3)" }}>
          Try again
        </button>
      </motion.div>
    );
  }

  if (phase === "error") {
    return (
      <div className={`rounded-2xl p-4 ${className}`} style={{ background: "var(--z-surface)" }}>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" style={{ color: "var(--z-accent)" }} />
          <p className="text-[12px] font-semibold" style={{ color: "var(--z-ink-2)" }}>{errorMsg}</p>
          <button onClick={reset} className="ml-auto text-[11px] font-bold" style={{ color: "var(--z-brand-deep)" }}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl overflow-hidden ${className}`} style={{ background: "var(--z-surface)" }}>
      <div className="px-4 pt-3 pb-2">
        <p className="text-[13px] font-bold" style={{ color: "var(--z-ink-2)" }}>{question}</p>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full cursor-crosshair touch-none"
        style={{ height: 200, background: "#1a1510", display: "block" }}
        onMouseDown={beginStroke}
        onMouseMove={continueStroke}
        onMouseUp={endStroke}
        onMouseLeave={endStroke}
        onTouchStart={(e) => { e.preventDefault(); beginStroke(e); }}
        onTouchMove={(e) => { e.preventDefault(); continueStroke(e); }}
        onTouchEnd={endStroke}
      />

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2.5" style={{ borderTop: "1px solid var(--z-line-2)" }}>
        <button
          onClick={() => setTool("pen")}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: tool === "pen" ? "var(--z-accent-soft)" : "transparent", color: tool === "pen" ? "var(--z-brand-deep)" : "var(--z-ink-3)" }}
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setTool("eraser")}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: tool === "eraser" ? "var(--z-accent-soft)" : "transparent", color: tool === "eraser" ? "var(--z-brand-deep)" : "var(--z-ink-3)" }}
        >
          <Eraser className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={clear}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ color: "var(--z-ink-3)" }}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        <div className="flex-1" />
        <button
          onClick={submit}
          disabled={!hasDrawn}
          className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-bold transition-all"
          style={{
            background: hasDrawn ? "var(--z-accent)" : "var(--z-surface-2)",
            color: hasDrawn ? "var(--z-on-brand)" : "var(--z-ink-3)",
          }}
        >
          <Send className="w-3 h-3" /> Submit sketch
        </button>
      </div>
    </div>
  );
}
