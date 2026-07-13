"use client";

/**
 * ZOE ONE — Brilliant-style geometric illustration set.
 * Vibrant, dimensional, lightly animated SVG art. All self-contained (no assets).
 */

type IllProps = { className?: string; size?: number };

const C = {
  amber: "#F5A524",
  gold: "#E0892B",
  coral: "#FF6B5B",
  violet: "#7C5CFF",
  indigo: "#5468FF",
  sky: "#2E9BFF",
  teal: "#15C2A5",
  sage: "#5BB98C",
  pink: "#FF5DA2",
  lime: "#A8E05F",
  ink: "#1B1714",
};

/* ── The ZOE companion mark — an organic, living gradient bloom ───────────── */
export function ZoeMark({ className, size = 40 }: IllProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <radialGradient id="zm-core" cx="38%" cy="34%" r="75%">
          <stop offset="0%" stopColor="#FFE08A" />
          <stop offset="42%" stopColor={C.amber} />
          <stop offset="100%" stopColor={C.coral} />
        </radialGradient>
        <linearGradient id="zm-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.violet} />
          <stop offset="100%" stopColor={C.sky} />
        </linearGradient>
      </defs>
      <g className="z-spin-slow">
        <path
          d="M24 3.5c3 6 9 9 15 9-6 3-9 9-9 15 0 0-3-9-9-12 6 0 0 0 3-12z"
          fill="url(#zm-ring)"
          opacity="0.35"
          transform="rotate(0 24 24)"
        />
      </g>
      <circle cx="24" cy="24" r="13" fill="url(#zm-core)" className="z-breathe" />
      <circle cx="19.5" cy="20" r="3.2" fill="#fff" opacity="0.85" />
    </svg>
  );
}

/* ── Flat geometric area icons (Brilliant "PIX"-style line work) ──────────────
   Thick rounded strokes, two flat colors, sits inside the .z-opt-ico tile. */
export type AreaKey =
  | "career" | "entrepreneurship" | "health" | "mindset"
  | "money" | "craft" | "sustainability" | "knowledge" | "other";

export function AreaIcon({ area, size = 26, color }: { area: AreaKey; size?: number; color?: string }) {
  const stroke = color ?? AREA_COLOR[area] ?? C.gold;
  const common = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke, strokeWidth: 2.1,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (area) {
    case "career":
      return (
        <svg {...common}>
          <rect x="3" y="7.5" width="18" height="12" rx="2.5" />
          <path d="M8.5 7.5V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v1.5" />
          <path d="M3 12.5h18" />
        </svg>
      );
    case "entrepreneurship":
      return (
        <svg {...common}>
          <path d="M12 3l5 15-5-3-5 3 5-15z" />
          <circle cx="12" cy="9.5" r="1.6" fill={stroke} stroke="none" />
        </svg>
      );
    case "health":
      return (
        <svg {...common}>
          <path d="M12 21v-9" />
          <path d="M12 12 6 9l2.4 6z" fill={stroke} fillOpacity="0.18" />
          <path d="M12 12l6-3-2.4 6z" fill={stroke} fillOpacity="0.18" />
        </svg>
      );
    case "mindset":
      return (
        <svg {...common}>
          <circle cx="12" cy="9.5" r="6" />
          <path d="M9.5 18h5M10.5 20.5h3M12 6.5v3" />
        </svg>
      );
    case "money":
      return (
        <svg {...common}>
          <path d="M12 3.5 20 11l-8 9.5L4 11z" />
          <path d="M4 11h16" />
        </svg>
      );
    case "craft":
      return (
        <svg {...common}>
          <path d="M4 20 12 5l8 15z" />
          <circle cx="12" cy="14.5" r="1.7" fill={stroke} stroke="none" />
        </svg>
      );
    case "sustainability":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.2" />
          <path d="M3.8 12h16.4M12 3.8c2.8 3 2.8 13.4 0 16.4M12 3.8c-2.8 3-2.8 13.4 0 16.4" />
        </svg>
      );
    case "knowledge":
      return (
        <svg {...common}>
          <path d="M12 6.5C9.5 4.8 6.5 4.8 4.5 5.6V18c2-.8 5-.8 7.5.9" />
          <path d="M12 6.5c2.5-1.7 5.5-1.7 7.5-.9V18c-2-.8-5-.8-7.5.9" />
          <path d="M12 6.5v12.4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 3l1.9 6.1H20l-5 3.7 1.9 6.2L12 15.3 6.1 19l1.9-6.2-5-3.7h6.1z" fill={stroke} fillOpacity="0.16" />
        </svg>
      );
  }
}

const AREA_COLOR: Record<AreaKey, string> = {
  career: C.sky, entrepreneurship: C.coral, health: C.sage, mindset: C.violet,
  money: C.teal, craft: C.amber, sustainability: "#3FB984", knowledge: C.gold, other: "#9A8C7A",
};

/* ── Orbit — knowledge revolving around a core (Education / Discovery) ─────── */
export function OrbitArt({ className, size = 260 }: IllProps) {
  return (
    <svg viewBox="0 0 320 320" width={size} height={size} className={className} aria-hidden>
      <defs>
        <radialGradient id="ob-sun" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FFE08A" />
          <stop offset="55%" stopColor={C.amber} />
          <stop offset="100%" stopColor={C.gold} />
        </radialGradient>
        <linearGradient id="ob-p1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.violet} /><stop offset="100%" stopColor={C.indigo} />
        </linearGradient>
        <linearGradient id="ob-p2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.teal} /><stop offset="100%" stopColor={C.sky} />
        </linearGradient>
      </defs>
      <g fill="none" stroke="rgba(160,150,138,0.45)" strokeWidth="1.5">
        <ellipse cx="160" cy="160" rx="120" ry="120" />
        <ellipse cx="160" cy="160" rx="86" ry="86" />
        <ellipse cx="160" cy="160" rx="52" ry="52" />
      </g>
      <g className="z-spin-slow" style={{ transformOrigin: "160px 160px" }}>
        <circle cx="280" cy="160" r="13" fill="url(#ob-p1)" />
        <circle cx="160" cy="40" r="9" fill={C.coral} />
      </g>
      <g className="z-spin-rev" style={{ transformOrigin: "160px 160px" }}>
        <circle cx="74" cy="160" r="10" fill="url(#ob-p2)" />
        <circle cx="212" cy="108" r="6" fill={C.pink} />
      </g>
      <circle cx="160" cy="160" r="30" fill="url(#ob-sun)" className="z-breathe" />
      <circle cx="151" cy="151" r="7" fill="#fff" opacity="0.8" />
    </svg>
  );
}

/* ── Prism — a spark of insight splitting into a spectrum (Understanding) ──── */
export function PrismArt({ className, size = 260 }: IllProps) {
  return (
    <svg viewBox="0 0 320 280" width={size} height={size * 0.875} className={className} aria-hidden>
      <defs>
        <linearGradient id="pr-tri" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor={C.violet} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <line x1="20" y1="120" x2="120" y2="140" stroke="#FFE08A" strokeWidth="5" strokeLinecap="round" />
      {[C.coral, C.amber, C.lime, C.teal, C.sky, C.violet].map((col, i) => (
        <line
          key={col}
          x1="170" y1="150"
          x2="312" y2={92 + i * 24}
          stroke={col} strokeWidth="5" strokeLinecap="round"
          opacity="0.92"
        />
      ))}
      <polygon points="120,80 200,200 80,200" fill="url(#pr-tri)" stroke={C.violet} strokeWidth="2" className="z-float-sm" />
    </svg>
  );
}

/* ── Growth — geometric ascending blocks (Progress / Mastery) ─────────────── */
export function GrowthArt({ className, size = 260 }: IllProps) {
  const bars = [
    { x: 30, h: 60, c: C.sage },
    { x: 92, h: 110, c: C.teal },
    { x: 154, h: 165, c: C.amber },
    { x: 216, h: 230, c: C.coral },
  ];
  return (
    <svg viewBox="0 0 300 300" width={size} height={size} className={className} aria-hidden>
      <defs>
        <linearGradient id="gr-up" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={C.violet} /><stop offset="100%" stopColor={C.pink} />
        </linearGradient>
      </defs>
      {bars.map((b, i) => (
        <g key={b.x} style={{ transformOrigin: `${b.x + 27}px 270px` }} className="z-float-sm">
          <rect x={b.x} y={270 - b.h} width="54" height={b.h} rx="14" fill={b.c} opacity="0.92"
                style={{ animationDelay: `${i * 0.3}s` }} />
          <rect x={b.x} y={270 - b.h} width="54" height="14" rx="7" fill="#fff" opacity="0.25" />
        </g>
      ))}
      <path d="M40 210 L110 150 L172 120 L246 55" fill="none" stroke="url(#gr-up)" strokeWidth="6"
            strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="246" cy="55" r="11" fill="url(#gr-up)" className="z-breathe" />
    </svg>
  );
}

/* ── Neural — connected nodes (AI memory / knowledge graph) ───────────────── */
export function NeuralArt({ className, size = 260 }: IllProps) {
  const nodes = [
    { x: 60, y: 70, r: 13, c: C.violet },
    { x: 170, y: 40, r: 9, c: C.sky },
    { x: 250, y: 100, r: 14, c: C.teal },
    { x: 120, y: 150, r: 18, c: C.amber },
    { x: 220, y: 200, r: 10, c: C.coral },
    { x: 70, y: 220, r: 12, c: C.pink },
    { x: 175, y: 250, r: 8, c: C.lime },
  ];
  const edges = [[0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6], [1, 2], [0, 5]];
  return (
    <svg viewBox="0 0 300 300" width={size} height={size} className={className} aria-hidden>
      <g stroke="rgba(160,150,138,0.5)" strokeWidth="1.5">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <g key={i} className="z-breathe" style={{ transformOrigin: `${n.x}px ${n.y}px`, animationDelay: `${i * 0.25}s` }}>
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} />
          <circle cx={n.x - n.r * 0.3} cy={n.y - n.r * 0.3} r={n.r * 0.28} fill="#fff" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

/* ── Iso stack — isometric cubes (Problem solving / Simulation) ───────────── */
export function IsoArt({ className, size = 260 }: IllProps) {
  const cube = (cx: number, cy: number, s: number, top: string, left: string, right: string, key: string) => (
    <g key={key} className="z-float-sm" style={{ transformOrigin: `${cx}px ${cy}px` }}>
      <polygon points={`${cx},${cy - s} ${cx + s},${cy - s / 2} ${cx},${cy} ${cx - s},${cy - s / 2}`} fill={top} />
      <polygon points={`${cx - s},${cy - s / 2} ${cx},${cy} ${cx},${cy + s} ${cx - s},${cy + s / 2}`} fill={left} />
      <polygon points={`${cx + s},${cy - s / 2} ${cx},${cy} ${cx},${cy + s} ${cx + s},${cy + s / 2}`} fill={right} />
    </g>
  );
  return (
    <svg viewBox="0 0 300 300" width={size} height={size} className={className} aria-hidden>
      {cube(150, 210, 56, C.amber, C.gold, "#C9761F", "a")}
      {cube(96, 150, 44, C.teal, "#0E9E86", "#0B7E6B", "b")}
      {cube(206, 150, 44, C.violet, "#6347E0", "#4F37C2", "c")}
      {cube(150, 96, 40, C.coral, "#E5503F", "#C13E30", "d")}
    </svg>
  );
}

/* ── Wave — flowing layered curves (Wellness / Calm) ──────────────────────── */
export function WaveArt({ className, size = 260 }: IllProps) {
  return (
    <svg viewBox="0 0 300 220" width={size} height={size * 0.73} className={className} aria-hidden>
      <defs>
        <linearGradient id="wv1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.teal} /><stop offset="100%" stopColor={C.sky} />
        </linearGradient>
        <linearGradient id="wv2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.sage} /><stop offset="100%" stopColor={C.lime} />
        </linearGradient>
      </defs>
      <path d="M0 120 Q75 70 150 120 T300 120 V220 H0 Z" fill="url(#wv1)" opacity="0.85" className="z-float-sm" />
      <path d="M0 150 Q75 105 150 150 T300 150 V220 H0 Z" fill="url(#wv2)" opacity="0.8" className="z-float" />
      <circle cx="225" cy="60" r="22" fill={C.amber} className="z-breathe" />
    </svg>
  );
}

/* ── Tokens — stacked coins (ZOT economy) ─────────────────────────────────── */
export function TokenArt({ className, size = 260 }: IllProps) {
  return (
    <svg viewBox="0 0 300 300" width={size} height={size} className={className} aria-hidden>
      <defs>
        <linearGradient id="tk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE08A" /><stop offset="100%" stopColor={C.gold} />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <g key={i} className="z-float-sm" style={{ animationDelay: `${i * 0.3}s` }}>
          <ellipse cx="150" cy={210 - i * 46} rx="78" ry="30" fill="url(#tk)" stroke={C.gold} strokeWidth="2" />
          <text x="150" y={216 - i * 46} textAnchor="middle" fontSize="26" fontWeight="800" fill="#fff" opacity="0.9">Z</text>
        </g>
      ))}
    </svg>
  );
}

/* ── Compact tile icon — uses one of the art motifs at small size ─────────── */
export const TILE_ART = {
  orbit: OrbitArt,
  prism: PrismArt,
  growth: GrowthArt,
  neural: NeuralArt,
  iso: IsoArt,
  wave: WaveArt,
  token: TokenArt,
} as const;

export type TileArtKey = keyof typeof TILE_ART;
