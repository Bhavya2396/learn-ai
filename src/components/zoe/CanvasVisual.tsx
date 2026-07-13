"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

/**
 * Renders AI-generated canvas animation code in an isolated, sandboxed way.
 * The code receives (ctx, w, h, t) where t is frame count and should draw
 * one frame. The component manages the animation loop, play/pause, and reset.
 */
export default function CanvasVisual({ code, title }: { code: string; title?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [playing, setPlaying] = useState(true);
  const drawRef = useRef<((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void) | null>(null);

  useEffect(() => {
    if (!code) return;
    try {
      // eslint-disable-next-line no-new-func
      drawRef.current = new Function("ctx", "w", "h", "t", code) as typeof drawRef.current;
    } catch {
      drawRef.current = null;
    }
  }, [code]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tick = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = rect?.width ?? canvas.width;
      const h = rect?.height ?? canvas.height;
      try {
        drawRef.current?.(ctx, w, h, frameRef.current);
      } catch {
        /* swallow draw errors silently */
      }
      frameRef.current++;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const reset = () => {
    frameRef.current = 0;
    setPlaying(true);
  };

  return (
    <div className="rounded-3xl overflow-hidden" style={{ background: "var(--z-surface)" }}>
      {title && (
        <div className="flex items-center gap-1.5 px-5 pt-4 text-[12px] font-extrabold uppercase tracking-wider" style={{ color: "var(--z-brand-deep)" }}>
          {title}
        </div>
      )}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="flex items-center justify-center gap-3 px-4 py-3">
        <button onClick={() => setPlaying(!playing)} className="w-8 h-8 rounded-full grid place-items-center zoe-haptic"
          style={{ background: "var(--z-surface-2)", color: "var(--z-ink-2)" }}>
          {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button onClick={reset} className="w-8 h-8 rounded-full grid place-items-center zoe-haptic"
          style={{ background: "var(--z-surface-2)", color: "var(--z-ink-2)" }}>
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
