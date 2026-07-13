"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useAmbience, MOOD } from "@/lib/zoe/ambience";

/**
 * Living background — layered liquid motion. Five warm blobs drift, scale, and
 * merge through a gooey SVG filter, creating a lava-lamp/aurora feel. Colours
 * ease to the current ambience mood — the canvas visibly responds to every
 * interaction. A subtle noise/grain texture and bright top wash keep it premium.
 */
export default function LivingBackground() {
  const mood = useAmbience((s) => s.mood);
  const reduce = useReducedMotion();
  const pal = MOOD[mood] ?? MOOD.calm;

  const blob = (
    color: string,
    style: React.CSSProperties,
    drift: { x: number[]; y: number[] },
    scale: number[],
    dur: number,
  ) => (
    <motion.div
      className="absolute rounded-full will-change-transform"
      style={style}
      initial={false}
      animate={
        reduce
          ? { backgroundColor: color }
          : {
              x: drift.x.map((v) => `${v}%`),
              y: drift.y.map((v) => `${v}%`),
              scale,
              backgroundColor: color,
            }
      }
      transition={{
        x: { duration: dur, repeat: Infinity, ease: "easeInOut" },
        y: { duration: dur * 1.18, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: dur * 0.9, repeat: Infinity, ease: "easeInOut" },
        backgroundColor: { duration: 1.4, ease: "easeInOut" },
      }}
    />
  );

  return (
    <div className="living living-grain" aria-hidden>
      {/* Primary blob layer — hugged to corners, leaving the content centre clear */}
      <div className="absolute inset-0" style={{ filter: "url(#z-goo)", opacity: 0.38 }}>
        {blob(pal.blobs[0], { top: "-24%", left: "-16%", width: "60vmax", height: "60vmax" }, { x: [0, 10, -5, 0], y: [0, 7, 12, 0] }, [1, 1.07, 0.96, 1], 22)}
        {blob(pal.blobs[1], { top: "18%", right: "-22%", width: "52vmax", height: "52vmax" }, { x: [0, -12, 6, 0], y: [0, 10, -7, 0] }, [1, 0.94, 1.05, 1], 28)}
        {blob(pal.blobs[2], { bottom: "-26%", left: "10%", width: "56vmax", height: "56vmax" }, { x: [0, 8, -10, 0], y: [0, -10, 6, 0] }, [1, 1.04, 0.94, 1], 25)}
      </div>

      {/* Secondary accent — very faint, just adds hue variation in the mid-zone */}
      <div className="absolute inset-0" style={{ filter: "url(#z-goo)", opacity: 0.14 }}>
        {blob(pal.blobs[1], { top: "45%", left: "55%", width: "28vmax", height: "28vmax" }, { x: [0, -16, 9, 5, 0], y: [0, 11, -14, 4, 0] }, [0.9, 1.12, 0.86, 1.08, 0.9], 16)}
        {blob(pal.blobs[0], { top: "8%", left: "28%", width: "22vmax", height: "22vmax" }, { x: [0, 13, -7, 0], y: [0, -9, 12, 0] }, [1, 1.18, 0.9, 1], 19)}
      </div>

      {/* Warm vignette wash — keeps the content column readable without a harsh white hit */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 50% -8%, rgba(255,250,242,0.62), transparent 52%)" }}
      />

      {/* Soft centre clear-zone — gently lifts the middle where cards live */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(55% 50% at 50% 50%, rgba(255,252,246,0.28), transparent 100%)" }}
      />

      {/* Warm footer glow — anchors the screen */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(90% 50% at 50% 115%, rgba(230,185,70,0.09), transparent 50%)" }}
      />

      {/* Softer goo — higher blur + gentler matrix so blob edges don't look sharp */}
      <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
        <defs>
          <filter id="z-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="52" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -6" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
