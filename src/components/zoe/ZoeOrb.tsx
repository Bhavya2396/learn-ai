"use client";

/**
 * ZOE's living orb — a dynamic 3D sphere that breathes, blinks, drifts, and
 * morphs its expression to reflect the app's emotional state.
 *
 * Anatomy:
 *   • 3-layer gradient sphere  (light source → gold → dark edge)
 *   • Specular highlight       (white hot-spot, upper-left)
 *   • Rim light                (warm bounce from below)
 *   • Edge occlusion           (darkens the sphere's perimeter for depth)
 *   • Ambient glow             (coloured bloom, mood-reactive, breathes)
 *   • Face: brows + eyes + smile that morph per mood
 *   • Random blink + slow iris orbit = feels genuinely alive
 *   • Cheek flush on success, bouncing dots on thinking
 *   • Floating sparkles when sparks=true
 */

import { useEffect, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOOD, type Mood } from "@/lib/zoe/ambience";

/* ── Expression tables (all M…Q… paths share the same command count → clean morph) ── */

const SMILE: Record<Mood, string> = {
  idle:      "M 15   27.5 Q 24 32.5 33   27.5",
  calm:      "M 15   27   Q 24 32   33   27",
  thinking:  "M 15   27.5 Q 24 30   33   27.5",
  listening: "M 15   27   Q 24 32   33   27",
  success:   "M 13   26   Q 24 35   35   26",
  struggle:  "M 15   28   Q 24 25.5 33   28",
};

const BROW_L: Record<Mood, string> = {
  idle:      "M 13.5 17.2 Q 17 16.4 20.5 17.2",
  calm:      "M 13.5 17   Q 17 16.2 20.5 17",
  thinking:  "M 13.5 15.8 Q 17 14.8 20.5 15.8",
  listening: "M 13.5 16.5 Q 17 15.5 20.5 16.5",
  success:   "M 13.5 17.5 Q 17 16.8 20.5 17.5",
  struggle:  "M 13.5 16   Q 17 17.2 20.5 16",
};

const BROW_R: Record<Mood, string> = {
  idle:      "M 27.5 17.2 Q 31 16.4 34.5 17.2",
  calm:      "M 27.5 17   Q 31 16.2 34.5 17",
  thinking:  "M 27.5 15.8 Q 31 14.8 34.5 15.8",
  listening: "M 27.5 16.5 Q 31 15.5 34.5 16.5",
  success:   "M 27.5 17.5 Q 31 16.8 34.5 17.5",
  struggle:  "M 27.5 16   Q 31 17.2 34.5 16",
};

const BREATH_DUR: Record<Mood, number> = {
  idle: 3.2, calm: 3.8, thinking: 1.9, listening: 2.6, success: 2.4, struggle: 2.0,
};

const SPARKS = [
  { x: -13, y: -16, delay: 0,    r: 0.9  },
  { x:  13, y: -18, delay: 0.35, r: 1.0  },
  { x: -17, y:  -5, delay: 0.65, r: 0.75 },
  { x:  17, y:  -7, delay: 0.18, r: 0.85 },
  { x:   0, y: -20, delay: 0.48, r: 1.1  },
  { x:  -8, y: -19, delay: 0.88, r: 0.7  },
];

/* ─────────────────────────────────────────────────────────────────────────── */

export default function ZoeOrb({
  size = 96,
  mood = "idle",
  sparks = false,
  className = "",
}: {
  size?: number;
  mood?: Mood;
  sparks?: boolean;
  className?: string;
}) {
  const rawId = useId();
  // Strip all non-alphanumeric chars — SVG IDs must not contain colons
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "x");

  const [blinking, setBlinking] = useState(false);
  const m = mood ?? "idle";
  const palette = MOOD[m];
  const breathDur = BREATH_DUR[m];

  /* Randomised blink ─────────────────────────────────────────────────────── */
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      t1 = setTimeout(() => {
        setBlinking(true);
        t2 = setTimeout(() => { setBlinking(false); scheduleBlink(); }, 220);
      }, 3200 + Math.random() * 4800);
    };
    t1 = setTimeout(scheduleBlink, 1800 + Math.random() * 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <svg
      width={size} height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden role="img"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Main sphere — lit from upper-left */}
        <radialGradient id={`sg${uid}`} cx="36%" cy="27%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#FFF6D0" />
          <stop offset="22%"  stopColor={palette.orb[0]} />
          <stop offset="68%"  stopColor={palette.orb[1]} />
          <stop offset="100%" stopColor="#4A2000" />
        </radialGradient>

        {/* Specular highlight */}
        <radialGradient id={`sp${uid}`} cx="31%" cy="21%" r="42%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.62" />
          <stop offset="55%"  stopColor="white" stopOpacity="0.07" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Rim light — warm bounce from below */}
        <radialGradient id={`rl${uid}`} cx="50%" cy="96%" r="55%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#FFE888" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFE888" stopOpacity="0" />
        </radialGradient>

        {/* Edge occlusion — deepens the perimeter */}
        <radialGradient id={`ao${uid}`} cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
          <stop offset="62%"  stopColor="transparent" />
          <stop offset="100%" stopColor="#2E1200" stopOpacity="0.45" />
        </radialGradient>

        {/* Soft glow bloom */}
        <filter id={`gf${uid}`} x="-65%" y="-65%" width="230%" height="230%">
          <feGaussianBlur stdDeviation="6.5" />
        </filter>
      </defs>

      {/* ── Drop shadow ──────────────────────────────────────────────────── */}
      <ellipse cx="24" cy="46.5" rx="12.5" ry="2.2" fill="rgba(25,10,0,0.22)" />

      {/* ── Mood glow (breathes in sync with sphere) ─────────────────────── */}
      <motion.circle
        cx="24" cy="23" r="20"
        fill={palette.glow}
        filter={`url(#gf${uid})`}
        animate={{ opacity: [0.48, 0.78, 0.48], r: [20, 22.5, 20] }}
        transition={{ duration: breathDur, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Orb body — everything inside breathes together ───────────────── */}
      <motion.g
        style={{ transformOrigin: "24px 23px" }}
        animate={{ scale: [1, 1.022, 1], y: [0, -0.55, 0] }}
        transition={{ duration: breathDur, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Sphere layers */}
        <circle cx="24" cy="23" r="20" fill={`url(#sg${uid})`} />
        <circle cx="24" cy="23" r="20" fill={`url(#sp${uid})`} />
        <circle cx="24" cy="23" r="20" fill={`url(#rl${uid})`} />
        <circle cx="24" cy="23" r="20" fill={`url(#ao${uid})`} />

        {/* ── Eyebrows (morph per mood) ─────────────────── */}
        <motion.path
          initial={false}
          animate={{ d: BROW_L[m] }}
          fill="none" stroke="#1E0E00" strokeWidth="1.7" strokeLinecap="round"
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          initial={false}
          animate={{ d: BROW_R[m] }}
          fill="none" stroke="#1E0E00" strokeWidth="1.7" strokeLinecap="round"
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* ── Eye sockets (soft brightened area behind the iris) ─── */}
        <ellipse cx="17" cy="21" rx="3.5" ry="3.1" fill="rgba(255,255,255,0.13)" />
        <ellipse cx="31" cy="21" rx="3.5" ry="3.1" fill="rgba(255,255,255,0.13)" />

        {/* ── Iris + blink group ─────────────────────────── */}
        {/*
          scaleY → blink (squishes irises to near-zero height)
          inner motion.g → slow orbital drift, each eye slightly offset
        */}
        <motion.g
          style={{ transformOrigin: "24px 21px" }}
          animate={{ scaleY: blinking ? 0.07 : 1 }}
          transition={{ duration: 0.17, ease: "easeInOut" }}
        >
          {/* Left iris */}
          <motion.g
            animate={{ x: [0,  0.9, 0, -0.9, 0], y: [0, -0.4, 0.45, -0.2, 0] }}
            transition={{ duration: 7.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="17" cy="21" r="2.7" fill="#180E00" />
            <circle cx="15.85" cy="19.85" r="1.05" fill="white" opacity="0.75" />
            <circle cx="18.3"  cy="21.6"  r="0.55" fill="white" opacity="0.30" />
          </motion.g>

          {/* Right iris — different rhythm so eyes feel independent */}
          <motion.g
            animate={{ x: [0, -0.8, 0, 0.8, 0], y: [0, 0.35, -0.45, 0.2, 0] }}
            transition={{ duration: 8.3, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}
          >
            <circle cx="31" cy="21" r="2.7" fill="#180E00" />
            <circle cx="29.85" cy="19.85" r="1.05" fill="white" opacity="0.75" />
            <circle cx="32.3"  cy="21.6"  r="0.55" fill="white" opacity="0.30" />
          </motion.g>
        </motion.g>

        {/* ── Smile (morphs per mood) ───────────────────── */}
        <motion.path
          initial={false}
          animate={{ d: SMILE[m] }}
          fill="none" stroke="#180E00" strokeWidth="2.35" strokeLinecap="round"
          transition={{ duration: 0.55, ease: "easeInOut" }}
        />

        {/* ── Success cheek flush ───────────────────────── */}
        <motion.g
          animate={{ opacity: m === "success" ? 0.42 : 0 }}
          transition={{ duration: 0.55 }}
        >
          <ellipse cx="11"   cy="27.5" rx="4.2" ry="2.1" fill="#FF8870" />
          <ellipse cx="37"   cy="27.5" rx="4.2" ry="2.1" fill="#FF8870" />
        </motion.g>

        {/* ── Thinking dots (forehead, bounce staggered) ─── */}
        <motion.g
          animate={{ opacity: m === "thinking" ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={29.5 + i * 2.9} cy="13.5" r="1.15"
              fill="#2A1400"
              animate={{ y: [0, -2.4, 0] }}
              transition={{ duration: 0.72, delay: i * 0.21, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.g>
      </motion.g>

      {/* ── Sparkles ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {sparks && SPARKS.map((s, i) => (
          <motion.circle
            key={i}
            cx={24 + s.x} cy={24 + s.y} r={s.r}
            fill={palette.glow}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -8, -17] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.85, delay: s.delay, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </svg>
  );
}
