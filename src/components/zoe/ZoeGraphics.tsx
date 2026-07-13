"use client";

import { motion } from "framer-motion";

const E = [0.22, 1, 0.36, 1] as const;

/** Animated arc/ring progress — the primary visual stat element. */
export function ProgressRing({
  pct, size = 64, stroke = 5, color = "var(--z-accent)", bg = "var(--z-line-2)", children, className = "",
}: { pct: number; size?: number; stroke?: number; color?: string; bg?: string; children?: React.ReactNode; className?: string }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(pct, 100) / 100);
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: E }} />
      </svg>
      {children}
    </div>
  );
}

/** Mini horizontal bar with label — used in stat grids. */
export function MiniBar({ value, max = 100, color = "var(--z-accent)", bg = "var(--z-line-2)", className = "" }: {
  value: number; max?: number; color?: string; bg?: string; className?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className={`h-1.5 rounded-full overflow-hidden ${className}`} style={{ background: bg }}>
      <motion.div className="h-full rounded-full" style={{ background: color }}
        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
        transition={{ duration: 0.7, ease: E }} />
    </div>
  );
}

/** A 5-axis radar/spider chart for cognitive style. */
export function RadarChart({
  axes, size = 160, color = "var(--z-accent)", className = "",
}: { axes: { label: string; value: number }[]; size?: number; color?: string; className?: string }) {
  const cx = size / 2, cy = size / 2, rMax = size * 0.38;
  const n = axes.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const gridLevels = [0.33, 0.66, 1];
  const points = axes.map((a, i) => {
    const r = rMax * Math.max(a.value, 0.08);
    return { x: cx + Math.cos(angle(i)) * r, y: cy + Math.sin(angle(i)) * r };
  });
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <svg width={size} height={size} className={className} viewBox={`0 0 ${size} ${size}`}>
      {gridLevels.map((lvl) => (
        <polygon key={lvl} fill="none" stroke="var(--z-line-2)" strokeWidth={0.7}
          points={Array.from({ length: n }, (_, i) => {
            const r = rMax * lvl;
            return `${cx + Math.cos(angle(i)) * r},${cy + Math.sin(angle(i)) * r}`;
          }).join(" ")} />
      ))}
      {axes.map((_, i) => (
        <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(angle(i)) * rMax} y2={cy + Math.sin(angle(i)) * rMax}
          stroke="var(--z-line-2)" strokeWidth={0.5} />
      ))}
      <motion.path d={pathD} fill={`${typeof color === "string" && color.startsWith("#") ? color : "#E9A23B"}22`}
        stroke={color} strokeWidth={1.5} strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: E }}
        style={{ transformOrigin: `${cx}px ${cy}px` }} />
      {points.map((p, i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r={3} fill={color}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: i * 0.06, duration: 0.3, ease: E }} />
      ))}
      {axes.map((a, i) => {
        const labelR = rMax + 14;
        const lx = cx + Math.cos(angle(i)) * labelR;
        const ly = cy + Math.sin(angle(i)) * labelR;
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="central"
            fill="var(--z-ink-3)" fontSize={9} fontWeight={700}>
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}

/** Streak flame visualization — animated dots for consecutive days. */
export function StreakVis({ days, max = 7, size = 48 }: { days: number; max?: number; size?: number }) {
  const count = Math.min(days, max);
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <motion.path
        d="M24 6C24 6 32 16 32 26C32 30.4 28.4 34 24 34C19.6 34 16 30.4 16 26C16 16 24 6 24 6Z"
        fill="none" stroke="var(--z-accent)" strokeWidth={1.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: E }}
      />
      <motion.path
        d="M24 18C24 18 28 23 28 27C28 29.2 26.2 31 24 31C21.8 31 20 29.2 20 27C20 23 24 18 24 18Z"
        fill="var(--z-accent)" fillOpacity={0.3}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4, ease: E }}
        style={{ transformOrigin: "24px 24px" }}
      />
      {Array.from({ length: max }, (_, i) => (
        <motion.circle key={i} cx={8 + i * (32 / (max - 1))} cy={42} r={2}
          fill={i < count ? "var(--z-accent)" : "var(--z-line-2)"}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.1 + i * 0.04, duration: 0.2, ease: E }} />
      ))}
    </svg>
  );
}

/** Pulsing orb used for loading/empty states instead of external illustrations. */
export function PulseOrb({ size = 80, color = "var(--z-accent)", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
      <motion.circle cx={40} cy={40} r={24} fill="none" stroke={color} strokeWidth={1.5} strokeOpacity={0.2}
        animate={{ r: [24, 30, 24] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx={40} cy={40} r={16} fill="none" stroke={color} strokeWidth={1} strokeOpacity={0.15}
        animate={{ r: [16, 22, 16] }} transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut" }} />
      <circle cx={40} cy={40} r={8} fill={color} fillOpacity={0.25} />
      <circle cx={40} cy={40} r={4} fill={color} fillOpacity={0.6} />
    </svg>
  );
}

/** Sparkle burst — used for success/celebration states. */
export function SparkBurst({ size = 120, className = "" }: { size?: number; className?: string }) {
  const sparks = [
    { angle: 0, len: 20, delay: 0 }, { angle: 45, len: 16, delay: 0.05 },
    { angle: 90, len: 22, delay: 0.02 }, { angle: 135, len: 14, delay: 0.07 },
    { angle: 180, len: 20, delay: 0.03 }, { angle: 225, len: 18, delay: 0.06 },
    { angle: 270, len: 22, delay: 0.01 }, { angle: 315, len: 15, delay: 0.04 },
  ];
  const cx = size / 2, cy = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      <motion.circle cx={cx} cy={cy} r={12} fill="var(--z-accent)" fillOpacity={0.3}
        initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.5, ease: E }} style={{ transformOrigin: `${cx}px ${cy}px` }} />
      <motion.circle cx={cx} cy={cy} r={6} fill="var(--z-accent)"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.15, duration: 0.3, ease: E }} style={{ transformOrigin: `${cx}px ${cy}px` }} />
      {sparks.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * 18, y1 = cy + Math.sin(rad) * 18;
        const x2 = cx + Math.cos(rad) * (18 + s.len), y2 = cy + Math.sin(rad) * (18 + s.len);
        return (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--z-accent)" strokeWidth={2} strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0.3] }}
            transition={{ delay: s.delay + 0.2, duration: 0.4, ease: E }} />
        );
      })}
    </svg>
  );
}

/** Vertical skill path — shows progression tiers with animated connectors. */
export function SkillPathVis({
  tiers, currentIndex, className = "",
}: { tiers: { title: string; done: boolean }[]; currentIndex: number; className?: string }) {
  const dotR = 8;
  const gapY = 44;
  const dotX = 16;
  const textX = dotX + dotR + 12;
  const vbW = 260;
  const h = (tiers.length - 1) * gapY + dotR * 2 + 16;

  return (
    <svg width="100%" viewBox={`0 0 ${vbW} ${h}`} className={className} preserveAspectRatio="xMinYMid meet">
      {tiers.map((t, i) => {
        const y = dotR + 8 + i * gapY;
        const active = i === currentIndex;
        const done = i < currentIndex || t.done;
        const fill = done ? "var(--z-accent)" : active ? "var(--z-accent)" : "var(--z-line-2)";
        const textColor = active ? "var(--z-ink)" : done ? "var(--z-ink-2)" : "var(--z-ink-3)";

        return (
          <g key={i}>
            {i > 0 && (
              <motion.line x1={dotX} y1={y - gapY + dotR + 2} x2={dotX} y2={y - dotR - 2}
                stroke={i <= currentIndex ? "var(--z-accent)" : "var(--z-line-2)"}
                strokeWidth={2} strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: E }} />
            )}
            {active && (
              <motion.circle cx={dotX} cy={y} r={dotR + 7} fill="var(--z-accent)" fillOpacity={0.15}
                animate={{ r: [dotR + 7, dotR + 13, dotR + 7] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
            )}
            <motion.circle cx={dotX} cy={y} r={dotR}
              fill={fill} fillOpacity={done || active ? 1 : 0.35}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.3, ease: E }}
              style={{ transformOrigin: `${dotX}px ${y}px` }} />
            {done && (
              <motion.path d={`M${dotX - 3.5} ${y + 0.5} L${dotX - 0.5} ${y + 3.5} L${dotX + 4} ${y - 3}`}
                fill="none" stroke="var(--z-on-brand)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.08 + 0.18, duration: 0.22, ease: E }} />
            )}
            <text x={textX} y={y} dominantBaseline="central" textAnchor="start"
              fill={textColor} fontSize={active ? 13 : 12} fontWeight={active ? 800 : done ? 700 : 500}>
              {t.title}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Waveform — animated sound/activity wave for "Ask" or loading contexts. */
export function Waveform({ bars = 5, size = 40, color = "var(--z-accent)", className = "" }: {
  bars?: number; size?: number; color?: string; className?: string;
}) {
  const barW = size / (bars * 2);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      {Array.from({ length: bars }, (_, i) => {
        const x = barW + i * (size / bars);
        const baseH = size * 0.2;
        return (
          <motion.rect key={i} x={x - barW / 2} rx={barW / 2} width={barW} fill={color}
            animate={{ height: [baseH, size * 0.7, baseH], y: [size / 2 - baseH / 2, size * 0.15, size / 2 - baseH / 2] }}
            transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
          />
        );
      })}
    </svg>
  );
}
