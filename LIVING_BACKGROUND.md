# The Living Background — Build Guide

A complete, copy-pasteable guide to the drifting blob background used on every screen of this app. Written so another AI (or a person) can rebuild it from scratch in a different project.

**What it is:** a fixed, non-interactive layer of huge, heavily-blurred colored circles that drift and pulse very slowly behind the UI, merging into each other like lava through an SVG "gooey" filter, tinted by film grain, and cross-fading their colors in response to what the app is doing.

**Stack used here:** React + framer-motion + zustand + Tailwind. §9 covers a zero-dependency CSS-only version.

---

## 1. Where it lives

The component is `LivingBackground` and it's rendered **once per screen**, as the first child of the theme wrapper — never in the root layout. Every screen does:

```jsx
<div className="zoe zoe-warm relative min-h-screen">
  <LivingBackground />
  <div className="zoe-app relative z-10">
    {/* content */}
  </div>
</div>
```

It appears in `MobileShell`, `Home`, `Landing`, `AskZoe`, `JourneyView`, `ProfileView`, `OnboardingFlow`, `Login`, and `AuthGate` — including inside the early-return loading branches, so the background is present before content resolves and there is never a flash of flat canvas.

> **Why per-screen and not in the root layout?** Each screen sets its own ambient mood, and mounting per-screen means the background remounts cleanly on route change rather than carrying stale animation state. The cost is one extra DOM subtree per screen — negligible, since only one screen is mounted at a time.

**Two rules the layout depends on:**
- The background is `position: fixed; z-index: 0`, so the wrapper does **not** need `position: relative` for it to work — but the content next to it **must** be `position: relative; z-index: 10` or it will render underneath.
- The background never intercepts clicks: `pointer-events: none` on the container.

---

## 2. Anatomy — five stacked layers

Back to front:

| # | Layer | Purpose | Opacity |
|---|---|---|---|
| 1 | **Primary blobs** — 3 blobs, 52–60 vmax, hugged to the corners, gooey-filtered | The main color motion | `0.38` |
| 2 | **Secondary accents** — 2 small blobs, 22–28 vmax, in the mid-zone, gooey-filtered, faster cycles | Hue variation where the big blobs don't reach | `0.14` |
| 3 | **Warm vignette wash** — radial gradient from the top | Stops the top of the screen going muddy | in-gradient |
| 4 | **Centre clear-zone** — radial gradient at dead centre | Lifts the area where cards sit so text stays readable | in-gradient |
| 5 | **Footer glow** — radial gradient below the fold | Anchors the bottom of the screen with warmth | in-gradient |

Plus, over the whole thing, a **grain overlay** via `::after`, and an inline **`<svg>` holding the gooey filter definition**.

The two gradient layers (3 and 4) are the part most people skip, and they are what makes the difference between "pretty background" and "readable app." The blobs alone produce uneven contrast under the content column; the washes flatten it back out without hiding the motion.

---

## 3. The CSS

```css
/* Container — fixed, behind everything, click-through */
.living {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

/* A single blob */
.living-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  will-change: transform, background;
}

/* Film grain over the top — sold separately, applied to the same element */
.living-grain::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Pure-CSS drift keyframes — used by the no-JS variant (§9) */
@keyframes living-1 { 0%,100% { transform: translate(0,0) scale(1);    } 50% { transform: translate(7%, 5%)   scale(1.12); } }
@keyframes living-2 { 0%,100% { transform: translate(0,0) scale(1.08); } 50% { transform: translate(-9%,-7%)  scale(0.96); } }
@keyframes living-3 { 0%,100% { transform: translate(0,0) scale(1);    } 50% { transform: translate(5%, -9%)  scale(1.16); } }

.living-a { animation: living-1 20s ease-in-out infinite; }
.living-b { animation: living-2 24s ease-in-out infinite; }
.living-c { animation: living-3 22s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .living-a, .living-b, .living-c { animation: none !important; }
}
```

### Notes on the values

- **`vmax` sizing, not `%` or `px`.** Blobs are 52–60 **vmax** so they stay proportionally huge on both a phone in portrait and a desktop in landscape. With `vw` they'd collapse on tall narrow screens.
- **Negative offsets.** Blobs are positioned at `top: -24%`, `left: -16%`, `right: -22%`, `bottom: -26%` — deliberately hanging off the edges. You only ever see the fat middle of each circle, never a curved edge, which is what stops it reading as "circles" and starts it reading as "atmosphere."
- **`blur(70px)` on the blob + `stdDeviation="52"` in the filter.** These stack. The CSS blur softens each blob individually; the SVG filter blurs the *group* and then re-sharpens the alpha, which is what merges them.
- **Grain at `opacity: 0.04`.** Barely perceptible. It exists to break up the gradient banding that large soft gradients produce on 8-bit displays. Go above `0.06` and it starts to look like noise instead of film.

---

## 4. The gooey filter (the secret ingredient)

Without this, overlapping translucent circles just stack and you can see each disc. With it, they merge and separate like lava-lamp wax.

```jsx
<svg width="0" height="0" className="absolute" aria-hidden focusable="false">
  <defs>
    <filter id="z-goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="52" result="b" />
      <feColorMatrix in="b" mode="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 16 -6" />
    </filter>
  </defs>
</svg>
```

Applied via `style={{ filter: "url(#z-goo)" }}` on the **wrapper div** that holds the blobs — not on the blobs themselves. It has to be the group, or there is nothing to merge.

### How it works

1. `feGaussianBlur` smears everything into a soft alpha field. Where two blobs overlap, the alpha adds up higher than either alone.
2. `feColorMatrix` leaves RGB untouched (the first three rows are identity) and rewrites **alpha only**: the last row `0 0 0 16 -6` means `newAlpha = (16 × alpha) − 6`.

That's a steep contrast curve on the alpha channel. Alpha below ~`0.375` is crushed to 0; alpha above ~`0.44` is pushed to 1. The blurry halo vanishes and a hard, organic edge appears exactly where the blobs' blurred fields cross the threshold — so two approaching blobs grow a "neck" and snap together.

### Tuning the two numbers

| Change | Effect |
|---|---|
| ↑ `stdDeviation` (52 → 80) | Blobs merge from further apart; softer, more liquid |
| ↓ `stdDeviation` (52 → 25) | Blobs stay separate; tighter, more "bubbles" |
| ↑ multiplier (16 → 25) | Harder, more defined gooey edge |
| ↓ multiplier (16 → 8) | Softer, mistier — approaches plain blur |
| Offset must stay ≈ `−0.4 × multiplier` | Keeps the threshold near mid-alpha. Too negative → everything disappears; too close to 0 → the halo comes back |

This build uses a deliberately **soft** setting (52 / 16 / −6) — the source comment says *"higher blur + gentler matrix so blob edges don't look sharp."* Classic goo demos use ~`20 / 19 / −9`, which is much crisper and reads as distinct droplets. For an app background you want the soft end; crisp goo is distracting behind text.

> **Performance:** an SVG filter over a full-screen element is the single most expensive thing here. It is GPU-composited on modern browsers but can force repaints on older Android. §8 covers how to drop it.

---

## 5. The React component

```jsx
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
        x:               { duration: dur,        repeat: Infinity, ease: "easeInOut" },
        y:               { duration: dur * 1.18, repeat: Infinity, ease: "easeInOut" },
        scale:           { duration: dur * 0.9,  repeat: Infinity, ease: "easeInOut" },
        backgroundColor: { duration: 1.4,        ease: "easeInOut" },
      }}
    />
  );

  return (
    <div className="living living-grain" aria-hidden>
      {/* 1 — Primary blobs, hugged to corners, leaving the content centre clear */}
      <div className="absolute inset-0" style={{ filter: "url(#z-goo)", opacity: 0.38 }}>
        {blob(pal.blobs[0], { top: "-24%",    left: "-16%",  width: "60vmax", height: "60vmax" }, { x: [0,  10,  -5, 0], y: [0,   7,  12, 0] }, [1, 1.07, 0.96, 1], 22)}
        {blob(pal.blobs[1], { top: "18%",     right: "-22%", width: "52vmax", height: "52vmax" }, { x: [0, -12,   6, 0], y: [0,  10,  -7, 0] }, [1, 0.94, 1.05, 1], 28)}
        {blob(pal.blobs[2], { bottom: "-26%", left: "10%",   width: "56vmax", height: "56vmax" }, { x: [0,   8, -10, 0], y: [0, -10,   6, 0] }, [1, 1.04, 0.94, 1], 25)}
      </div>

      {/* 2 — Secondary accents, very faint, just hue variation in the mid-zone */}
      <div className="absolute inset-0" style={{ filter: "url(#z-goo)", opacity: 0.14 }}>
        {blob(pal.blobs[1], { top: "45%", left: "55%", width: "28vmax", height: "28vmax" }, { x: [0, -16, 9, 5, 0], y: [0, 11, -14, 4, 0] }, [0.9, 1.12, 0.86, 1.08, 0.9], 16)}
        {blob(pal.blobs[0], { top: "8%",  left: "28%", width: "22vmax", height: "22vmax" }, { x: [0,  13, -7, 0],    y: [0, -9,  12, 0]     }, [1, 1.18, 0.9, 1],          19)}
      </div>

      {/* 3 — Warm vignette wash: keeps the content column readable without a harsh white hit */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 50% -8%, rgba(255,250,242,0.62), transparent 52%)" }} />

      {/* 4 — Soft centre clear-zone: gently lifts the middle where cards live */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(55% 50% at 50% 50%, rgba(255,252,246,0.28), transparent 100%)" }} />

      {/* 5 — Warm footer glow: anchors the screen */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(90% 50% at 50% 115%, rgba(230,185,70,0.09), transparent 50%)" }} />

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
```

### Five details that matter

1. **Mismatched periods.** `x` runs at `dur`, `y` at `dur × 1.18`, `scale` at `dur × 0.9`. Because those durations share no common factor, the composite motion never visibly repeats — the eye can't find the loop point. Give all three the same duration and it immediately looks like a GIF.

2. **Per-blob base durations are also coprime-ish:** 22s, 28s, 25s, 16s, 19s. Same reasoning one level up — the *blobs* never re-align with each other either.

3. **Keyframe arrays return to their start.** Every drift array ends where it began (`[0, 10, -5, 0]`), so `repeat: Infinity` loops seamlessly with no jump. If you edit these, keep the first and last value identical.

4. **`initial={false}`.** Suppresses the mount animation. Without it, every route change would visibly slide the blobs in from their initial position.

5. **`x`/`y` are percentage strings, `scale` is a number.** Percent translate is relative to the blob's own size, so drift stays proportional across viewports. `will-change: transform` keeps it on the compositor.

---

## 6. Making it react — the mood system

This is what earns the name "living." A single global `mood` value drives the blob colors, and the whole canvas cross-fades over `1.4s` when it changes.

### The store

```ts
"use client";

import { create } from "zustand";

export type Mood = "idle" | "thinking" | "listening" | "success" | "struggle" | "calm";

export interface MoodPalette {
  blobs: [string, string, string];
  orb: [string, string];   // [inner highlight, outer] — for the mascot
  glow: string;
}

// Blob palettes use chalky, low-saturation pastels — warmth from hue, not chroma.
// Each mood pairs one warm blob, one cool blob, one neutral so you feel contrast
// *within* the background without the blobs fighting the UI.
export const MOOD: Record<Mood, MoodPalette> = {
  //                    warm straw          cool sage-mint     pale blush terra
  idle:      { blobs: ["#EDD8A6", "#B4CCBE", "#DFC4B0"], orb: ["#FFF1D6", "#F2B968"], glow: "#F4C77E" },
  //                    deeper amber        cool slate-sage    warm sand
  thinking:  { blobs: ["#E4C47A", "#AABFBA", "#D4AE8C"], orb: ["#FFE8BC", "#EC9A4A"], glow: "#EDA85A" },
  //                    golden-straw        pale teal          peach
  listening: { blobs: ["#ECD49C", "#B0C8C0", "#DBBCAA"], orb: ["#FFF2D2", "#EAC078"], glow: "#EECB84" },
  //                    sage-green          pale gold          soft moss
  success:   { blobs: ["#C0D4A4", "#E2CE8C", "#B4C8A4"], orb: ["#FFF3D4", "#AFC58E"], glow: "#CBBE7E" },
  //                    pale terra          blush-rose         warm sand
  struggle:  { blobs: ["#E4B89C", "#CCA8A4", "#D4AE90"], orb: ["#FFD8AE", "#D07E4A"], glow: "#D58A56" },
  //                    soft cream-gold     sage-slate         pale linen
  calm:      { blobs: ["#E8D8B0", "#B8CCBC", "#DCC8B4"], orb: ["#FFF8E6", "#F0CE84"], glow: "#F2D79A" },
};

interface AmbienceState {
  mood: Mood;
  base: Mood;
  setMood: (m: Mood) => void;
  /** Set a base mood the app settles back to. */
  setBase: (m: Mood) => void;
  /** Flash a mood for `ms`, then ease back to the base mood. */
  pulse: (m: Mood, ms?: number) => void;
}

let pulseTimer: ReturnType<typeof setTimeout> | null = null;

export const useAmbience = create<AmbienceState>((set, get) => ({
  mood: "idle",
  base: "idle",
  setMood: (m) => {
    if (pulseTimer) { clearTimeout(pulseTimer); pulseTimer = null; }
    set({ mood: m });
  },
  setBase: (m) => set({ base: m, mood: m }),
  pulse: (m, ms = 2600) => {
    if (pulseTimer) clearTimeout(pulseTimer);
    set({ mood: m });
    pulseTimer = setTimeout(() => { set({ mood: get().base }); pulseTimer = null; }, ms);
  },
}));
```

### Palette design rules

These are what keep it from looking like a cheap gradient generator:

- **Chalky pastels, never saturated.** Every value is a desaturated mid-tone. Warmth comes from *hue*, not chroma. Saturated blobs at 38% opacity turn the canvas into a tie-dye and destroy text contrast.
- **One warm + one cool + one neutral per mood.** You get visible internal contrast in the background without any blob competing with the UI's amber accent.
- **Moods differ by a nudge, not a jump.** `idle` → `thinking` shifts the straw from `#EDD8A6` to `#E4C47A`. You *feel* the change without being able to name it. Big hue jumps read as a bug.
- **`success` is the only one that leaves the warm family**, drifting sage-green. That's the payoff moment, so it earns the shift.

### The three-verb API

| Call | Behavior | Use for |
|---|---|---|
| `setBase(m)` | Sets both the current and the resting mood | Screen mount — "this screen feels like *calm*" |
| `setMood(m)` | Sets current mood, sticky, cancels any pulse | Long-running state you'll clear yourself |
| `pulse(m, ms)` | Flash `m`, then auto-return to `base` after `ms` (default 2600) | Events — a correct answer, a submitted form |

The `base` concept is the good part: screens declare a resting temperature, events borrow the canvas briefly, and it always returns home on its own. No component has to remember to clean up.

### Real usage from the app

```ts
// Screen mount declares its resting mood
useEffect(() => { setBase("calm"); }, [setBase]);

// Onboarding maps its phase machine onto moods
useEffect(() => {
  if (phase === "researching") setBase("thinking");
  else if (phase === "preview" || phase === "ready") setBase("success");
  else if (phase === "welcomeBack") setBase("calm");
  else setBase("listening");
}, [phase]);

// Long async work — sticky, cleared by the same effect
useEffect(() => { setMood(loading ? "thinking" : "calm"); }, [loading, setMood]);

// Discrete events — brief flashes
pulse("success", 800);                                     // an option was picked
pulse("thinking", 6000);                                   // a long research call
pulse(sentiment === "struggle" ? "struggle" : "success", 3200);  // answer graded

// Voice input
setMood("listening");   // mic opens
setMood("thinking");    // request in flight
setMood("success");     // answer arrived
setTimeout(() => setMood("calm"), 1800);
```

### Porting without zustand

Any global store works — the component only needs to read one string. Context:

```jsx
const AmbienceCtx = createContext({ mood: "idle", setBase: () => {}, pulse: () => {} });
// …provider holds useState + a ref for the pulse timer, same logic as above
```

Or skip reactivity entirely: pass `mood` as a prop, or hardcode `const pal = MOOD.calm` and you still get a beautiful static-palette drifting background. **The mood system is the upgrade, not the foundation** — build the blobs first, wire moods second.

---

## 7. Accessibility

Three things, all mandatory:

```jsx
<div className="living living-grain" aria-hidden>
```

1. **`aria-hidden`** on the container — it is pure decoration and must not reach a screen reader.
2. **`pointer-events: none`** in `.living` — the fixed full-screen layer would otherwise eat every click on the page. This is the #1 bug when people reimplement this.
3. **`useReducedMotion()`** — when the user has reduced motion on, the component animates `backgroundColor` **only**. Blobs still get their mood colors and still cross-fade; they simply stop moving. That is the right call: the color feedback is *information*, the drift is *decoration*. Drop the decoration, keep the information.

Plus the CSS backstop for the non-JS variant:

```css
@media (prefers-reduced-motion: reduce) {
  .living-a, .living-b, .living-c { animation: none !important; }
}
```

**Contrast:** verify text contrast against the *lightest* and *darkest* points of the blob field, not the base canvas. Layers 3–5 exist to compress that range; if you change the palette, re-check. With this palette, body text at `#1E1A14` sits far above AA everywhere.

---

## 8. Performance

What this costs, and how to cut it:

- **Compositor-only animation.** Only `transform` and `backgroundColor` animate. No layout, no reflow. `will-change: transform, background` promotes each blob to its own layer.
- **5 blobs is the ceiling.** Each is a separately-composited, blurred, filtered layer. Going to 8–10 is where mid-range Android starts dropping frames.
- **The SVG filter is the expensive part.** If you need to cut cost, drop `filter: url(#z-goo)` and raise the per-blob `blur()` from `70px` to `~90px`. You lose the merging but keep 90% of the look at a fraction of the cost.
- **`vmax` + percentage transforms** mean zero JS on resize.

Mobile fallback:

```jsx
const isLowEnd = typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4;
<div style={{ filter: isLowEnd ? "none" : "url(#z-goo)", opacity: 0.38 }}>
```

### One caveat in the current implementation

Each `LivingBackground` instance renders its own `<filter id="z-goo">`. Duplicate DOM IDs are invalid HTML, and browsers resolve `url(#z-goo)` to the **first** match in document order. In this app it's harmless — only one screen mounts at a time, and the early-return branches in `Home` and `JourneyView` are mutually exclusive with the main branch. But if you ever render two backgrounds simultaneously, hoist the `<svg>` into the root layout and remove it from the component, or generate the id with `useId()`:

```jsx
const gooId = useId();
// …then style={{ filter: `url(#${gooId})` }} and <filter id={gooId}>
```

---

## 9. Zero-dependency version

No React, no framer-motion, no store. Static palette, CSS-only drift. Drop this in any project:

```html
<div class="living living-grain" aria-hidden="true">
  <div class="living-group" style="opacity:.38">
    <div class="living-blob living-a" style="top:-24%;  left:-16%;  width:60vmax; height:60vmax; background:#EDD8A6"></div>
    <div class="living-blob living-b" style="top:18%;   right:-22%; width:52vmax; height:52vmax; background:#B4CCBE"></div>
    <div class="living-blob living-c" style="bottom:-26%;left:10%;  width:56vmax; height:56vmax; background:#DFC4B0"></div>
  </div>
  <div class="living-group" style="opacity:.14">
    <div class="living-blob living-b" style="top:45%; left:55%; width:28vmax; height:28vmax; background:#B4CCBE; animation-duration:16s"></div>
    <div class="living-blob living-c" style="top:8%;  left:28%; width:22vmax; height:22vmax; background:#EDD8A6; animation-duration:19s"></div>
  </div>

  <div class="living-wash living-wash-top"></div>
  <div class="living-wash living-wash-centre"></div>
  <div class="living-wash living-wash-foot"></div>

  <svg width="0" height="0" aria-hidden="true" focusable="false">
    <defs>
      <filter id="z-goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="52" result="b"/>
        <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -6"/>
      </filter>
    </defs>
  </svg>
</div>
```

```css
.living { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.living-group { position: absolute; inset: 0; filter: url(#z-goo); }
.living-blob { position: absolute; border-radius: 50%; filter: blur(70px); will-change: transform; }
.living-wash { position: absolute; inset: 0; }

.living-wash-top    { background: radial-gradient(120% 80% at 50% -8%,  rgba(255,250,242,0.62), transparent 52%); }
.living-wash-centre { background: radial-gradient(55% 50% at 50% 50%,   rgba(255,252,246,0.28), transparent 100%); }
.living-wash-foot   { background: radial-gradient(90% 50% at 50% 115%,  rgba(230,185,70,0.09),  transparent 50%); }

.living-grain::after {
  content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@keyframes living-1 { 0%,100% { transform: translate(0,0) scale(1);    } 50% { transform: translate(7%, 5%)  scale(1.12); } }
@keyframes living-2 { 0%,100% { transform: translate(0,0) scale(1.08); } 50% { transform: translate(-9%,-7%) scale(0.96); } }
@keyframes living-3 { 0%,100% { transform: translate(0,0) scale(1);    } 50% { transform: translate(5%,-9%)  scale(1.16); } }

.living-a { animation: living-1 20s ease-in-out infinite; }
.living-b { animation: living-2 24s ease-in-out infinite; }
.living-c { animation: living-3 22s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) { .living-a, .living-b, .living-c { animation: none !important; } }
```

To add mood reactivity later without React, put the colors in CSS variables and swap a class on `<html>`:

```css
.living-blob { transition: background-color 1.4s ease-in-out; }
.mood-calm    { --b1:#E8D8B0; --b2:#B8CCBC; --b3:#DCC8B4; }
.mood-success { --b1:#C0D4A4; --b2:#E2CE8C; --b3:#B4C8A4; }
```

---

## 10. The dark variant — "Aurora"

Same idea, retuned for dark backgrounds. Used on `.zoe-night` screens.

```jsx
export default function Aurora({ variant = "warm" }) {
  const palettes = {
    warm:   ["#F5A524", "#FF6B5B", "#E0892B", "#8E7BA3"],
    cool:   ["#5BB98C", "#15C2A5", "#2E9BFF", "#F5A524"],
    violet: ["#8E7BA3", "#7C5CFF", "#FF5DA2", "#F5A524"],
  };
  const c = palettes[variant];
  return (
    <div className="aurora aurora-grain" aria-hidden>
      <div className="aurora-blob aurora-a" style={{ width: "55vw", height: "55vw", top: "-12%",    left: "-8%",  background: c[0] }} />
      <div className="aurora-blob aurora-b" style={{ width: "48vw", height: "48vw", top: "8%",      right: "-12%", background: c[1] }} />
      <div className="aurora-blob aurora-c" style={{ width: "46vw", height: "46vw", bottom: "-18%", left: "18%",  background: c[2] }} />
      <div className="aurora-blob aurora-a" style={{ width: "32vw", height: "32vw", bottom: "-6%",  right: "6%",  background: c[3], opacity: 0.4 }} />
      {/* vignette so glass reads cleanly */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 0%, transparent 40%, rgba(11,10,8,0.7) 100%)" }} />
    </div>
  );
}
```

```css
.aurora { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.aurora-blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.5; will-change: transform;
  mix-blend-mode: screen;
}
.aurora-grain::after { /* same noise data-URI, opacity: 0.05 */ }

@keyframes aurora-1 { 0%,100% { transform: translate(0,0) scale(1);   } 50% { transform: translate(8%, 6%)   scale(1.15); } }
@keyframes aurora-2 { 0%,100% { transform: translate(0,0) scale(1.1); } 50% { transform: translate(-10%,-8%) scale(0.95); } }
@keyframes aurora-3 { 0%,100% { transform: translate(0,0) scale(1);   } 50% { transform: translate(6%,-10%)  scale(1.2);  } }
.aurora-a { animation: aurora-1 16s ease-in-out infinite; }
.aurora-b { animation: aurora-2 20s ease-in-out infinite; }
.aurora-c { animation: aurora-3 24s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) { .aurora-a, .aurora-b, .aurora-c { animation: none !important; } }
```

### What changes for dark, and why

| | Living (light) | Aurora (dark) |
|---|---|---|
| Blend mode | normal | **`mix-blend-mode: screen`** — additive, so blobs *glow* instead of muddying |
| Colors | chalky desaturated pastels | **fully saturated brand hues** — needed to register on near-black |
| Blur | `70px` | `80px` |
| Opacity | `0.38` / `0.14` | `0.5` |
| Goo filter | yes | **no** — `screen` blending already merges them |
| Vignette | light wash *lifting* the centre | dark vignette *darkening* the edges |
| Sizing | `vmax` | `vw` |
| Motion | JS keyframes, mood-reactive | pure CSS, static variant prop |
| Cycles | 16–28s | 16–24s |

The palette inversion is the key lesson: **on light backgrounds desaturate, on dark backgrounds saturate.** A pastel `#EDD8A6` blob on `#0B0A08` is invisible mud; a saturated `#F5A524` on `#FBF8F2` is an eyesore. Same technique, opposite color strategy.

---

## 11. Build checklist

1. Add `.living` and `.living-blob` CSS. Confirm `pointer-events: none` and `z-index: 0`.
2. Give your content wrapper `position: relative; z-index: 10` — otherwise it renders behind the background.
3. Add the `<svg>` goo filter (`stdDeviation="52"`, matrix alpha row `0 0 0 16 -6`). Apply `filter: url(#z-goo)` to the blob **group**, not to individual blobs.
4. Place 3 primary blobs at 52–60 vmax with **negative** corner offsets, group opacity `0.38`.
5. Add 2 secondary blobs at 22–28 vmax in the mid-zone, group opacity `0.14`, faster cycles.
6. Add the three radial-gradient washes — top, centre, footer. **Don't skip these**; they're what keeps text readable.
7. Add the grain `::after` at `opacity: 0.04`.
8. Animate `x`/`y`/`scale` with mismatched durations (`d`, `d × 1.18`, `d × 0.9`), keyframe arrays that return to their start, base durations of 16–28s.
9. Set `aria-hidden` on the container and honor `prefers-reduced-motion` — colors keep animating, motion stops.
10. *(Optional)* Add the mood store and cross-fade `backgroundColor` over `1.4s`.

### Do / Don't

| Do | Don't |
|---|---|
| `position: fixed` + `pointer-events: none` | Let the layer swallow clicks |
| Blobs 22–60 **vmax** | `px` or `%` sizes that break on other viewports |
| Negative offsets so blobs hang off-screen | Fully visible circles — they read as circles |
| Chalky desaturated pastels on light | Saturated colors on a light canvas |
| `mix-blend-mode: screen` + saturated colors on dark | Pastels on dark — they turn to mud |
| Mismatched x/y/scale durations | One duration for all — the loop becomes visible |
| Keyframe arrays that end where they start | Arrays that jump on repeat |
| 16–28s cycles | Anything under ~10s; it becomes distracting |
| The three gradient washes | Blobs alone — contrast under content goes uneven |
| Animate `transform` + `backgroundColor` only | Animating `top`/`left`/`width` — forces layout |
| `aria-hidden` + reduced-motion support | Ignoring either |
| Max ~5 blobs | 10+ blurred filtered layers |
