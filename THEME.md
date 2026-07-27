# ZOE Design System — Portable Theme Spec

A complete, self-contained description of the visual language used in this codebase, written so another AI can reproduce the same look and feel in a different project.

**Stack it assumes:** Next.js (App Router) + React 19 + Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`) + framer-motion + lucide-react + shadcn/ui (`base-nova` style, Base UI primitives) + next-themes.
Nothing here is hard-dependent on that stack — the tokens are plain CSS custom properties and the component classes are plain CSS. You can port them to Vite, Astro, Remix, or plain HTML by copying the CSS block.

---

## 1. Design intent (read this first)

The aesthetic has a name in-repo: **"Brilliant-inspired, warm and tactile."**

> Bright warm canvas, white rounded cards, chunky tactile buttons with a hard bottom "lip", bold geometric type, flat angular art. Friendly, confident, game-like — never glassy or glowing.

Five rules that define the whole system:

1. **Warm off-white canvas, never pure white.** The page background is `#FBF8F2`; cards are `#FFFFFF`. That 4-point difference is what makes the cards read as *objects on a surface*.
2. **Buttons are physical.** Instead of a soft drop shadow, primary/brand buttons carry a **hard, un-blurred bottom lip** (`box-shadow: 0 4px 0 <darker-edge>`). On `:active` the element translates down 3px and the lip shrinks to 1px — it visibly depresses like a key. No `transform: translateY(-2px)` hover lift in this theme.
3. **Amber is the only accent.** One brand hue (`#F0A91E`) drives every interactive/selected state. Selection = amber border + pale amber fill (`#FDDFA0`), never a blue focus ring.
4. **Everything is rounded, nothing is a rectangle.** Cards `18px`, buttons `14px`, chips/pills/docks `999px`.
5. **The background is alive.** A fixed layer of large, heavily-blurred colored blobs drifts slowly behind the content and shifts hue in response to app state. It is decorative, `pointer-events: none`, and always respects `prefers-reduced-motion`.

There are **three named themes** built on one shared token contract, applied as classes on a wrapper element:

| Class | Character | When used |
|---|---|---|
| `.zoe` | Base token layer — bright, premium, vibrant spectrum. Required on every wrapper. | Always (it defines the variables) |
| `.zoe .zoe-warm` | **The primary/production theme.** De-glassed: flat white cards, hairline borders, tactile lip buttons. | Every real screen |
| `.zoe .zoe-night` | "Aurora Glass" — dark, moody, iOS/visionOS-like, frosted cards, drifting aurora. | Dark/hero variant, optional |

Every screen wraps in `<div className="zoe zoe-warm">`. Themes override **the same variable names**, so all `.z-*` components restyle themselves automatically.

There is also a **legacy shadcn token layer** (`:root` / `.dark`) for the handful of shadcn/ui components. Treat it as secondary — see §9.

---

## 2. Tokens

### 2.1 Base layer — `.zoe`

```css
.zoe {
  /* Canvas + surfaces */
  --z-canvas:      #FBF8F3;   /* page background */
  --z-surface:     #FFFFFF;   /* cards, popovers */
  --z-surface-2:   #F4EFE7;   /* inset wells, icon tiles, track backgrounds */
  --z-ink:         #1B1714;   /* primary text (warm near-black, NOT #000) */
  --z-ink-2:       #5C544C;   /* secondary text */
  --z-ink-3:       #938A80;   /* tertiary text, placeholders, inactive icons */
  --z-line:        #ECE5DA;   /* hairline borders */
  --z-line-2:      #E0D7C9;   /* emphasised / hover borders */

  /* Deep "night" surfaces for hero or dark sections */
  --z-night:       #0E1422;
  --z-night-2:     #151D30;
  --z-night-3:     #1E2740;
  --z-night-ink:   #F4F1EA;
  --z-night-ink-2: #9AA4BE;
  --z-night-line:  rgba(255,255,255,0.10);

  /* Vibrant spectrum — illustrations, category colors, data viz */
  --z-amber:  #F5A524;   --z-gold:   #E0A33B;
  --z-coral:  #FF6B5B;   --z-violet: #7C5CFF;
  --z-indigo: #5468FF;   --z-sky:    #2E9BFF;
  --z-teal:   #15C2A5;   --z-sage:   #5BB98C;
  --z-pink:   #FF5DA2;   --z-lime:   #A8E05F;

  /* Brand */
  --z-brand:      #F5A524;
  --z-brand-deep: #E0892B;
  --z-on-brand:   #1B1714;

  /* Shape + depth + motion */
  --z-radius:     20px;
  --z-radius-sm:  14px;
  --z-radius-lg:  28px;
  --z-shadow-sm:  0 1px 2px rgba(27,23,20,0.06), 0 2px 8px rgba(27,23,20,0.04);
  --z-shadow:     0 4px 14px rgba(27,23,20,0.08), 0 10px 40px rgba(27,23,20,0.06);
  --z-shadow-lg:  0 12px 30px rgba(27,23,20,0.12), 0 30px 80px rgba(27,23,20,0.10);
  --z-ease:       cubic-bezier(0.22, 1, 0.36, 1);   /* the ONE easing curve */

  font-family: 'Outfit', system-ui, sans-serif;
  color: var(--z-ink);
  background: var(--z-canvas);
}
```

### 2.2 Primary theme — `.zoe-warm` (overrides)

```css
.zoe-warm {
  --z-canvas:      #FBF8F2;
  --z-surface:     #FFFFFF;
  --z-surface-2:   #F4EFE5;
  --z-field:       #FFFFFF;        /* input backgrounds */
  --z-ink:         #1E1A14;
  --z-ink-2:       #544A3C;
  --z-ink-3:       #7A7066;
  --z-line:        rgba(42,34,20,0.14);   /* alpha borders → sit on any surface */
  --z-line-2:      rgba(42,34,20,0.24);

  --z-accent:      #F0A91E;   /* interactive amber — fills, focus, selected */
  --z-accent-edge: #B86A0A;   /* the darker "lip" under amber buttons */
  --z-accent-soft: #FDDFA0;   /* selected-state tint — deliberately visible, not near-white */

  --z-good:        #3E6B2A;   /* success text */
  --z-good-soft:   #D4E8C4;   /* success fill */

  --z-brand:       #D97F1A;
  --z-brand-deep:  #7C4D08;   /* darkened for TEXT: 5.1:1 on white → passes WCAG AA */
  --z-on-brand:    #1E1A14;

  /* Flatter shadows — depth comes from the lip, not blur */
  --z-shadow-sm:   0 1px 0 rgba(42,34,20,0.05);
  --z-shadow:      0 2px 0 rgba(42,34,20,0.06);
  --z-shadow-lg:   0 8px 28px -14px rgba(42,34,20,0.28);
  --z-radius:      18px;
}
```

> **Accessibility note carried over from the source:** `--z-brand-deep` exists as a *separate, darker* token from `--z-brand` specifically so brand-colored text passes AA on white. Never use `--z-accent` (`#F0A91E`) as a text color on a light surface — use it as a *fill* with `--z-ink` text on top.

### 2.3 Dark theme — `.zoe-night` (overrides)

```css
.zoe-night {
  --z-canvas:    #0B0A08;
  --z-surface:   rgba(255,255,255,0.055);
  --z-surface-2: rgba(255,255,255,0.10);
  --z-ink:       #F6F1E8;
  --z-ink-2:     #C0B6A7;
  --z-ink-3:     #8A8073;
  --z-line:      rgba(255,255,255,0.10);
  --z-line-2:    rgba(255,255,255,0.18);
  --z-shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
  --z-shadow:    0 10px 40px rgba(0,0,0,0.45);
  --z-shadow-lg: 0 30px 80px rgba(0,0,0,0.55);
}
.zoe-night .z-card {
  background: rgba(255,255,255,0.05);
  border-color: rgba(255,255,255,0.10);
  backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);
}
.zoe-night .z-btn-primary { background: #F6F1E8; color: #1B1714; box-shadow: 0 8px 24px rgba(0,0,0,0.5); }
.zoe-night .z-btn-ghost {
  background: rgba(255,255,255,0.07); color: var(--z-ink);
  border-color: rgba(255,255,255,0.16); backdrop-filter: blur(12px);
}
```

### 2.4 Semantic category palette

Domain categories each own a color drawn from the vibrant spectrum. Rendered as `background: {color}22` (13% alpha) with `color: {color}` text — a tinted chip.

```ts
export const AREA_META = {
  career:           { label: "Career",             color: "#2E9BFF" },
  entrepreneurship: { label: "Entrepreneurship",   color: "#FF6B5B" },
  health:           { label: "Health & wellbeing", color: "#5BB98C" },
  mindset:          { label: "Mindset & growth",   color: "#7C5CFF" },
  money:            { label: "Money & finance",    color: "#15C2A5" },
  craft:            { label: "Craft & creativity", color: "#F5A524" },
  sustainability:   { label: "Sustainability",     color: "#3FB984" },
  knowledge:        { label: "Knowledge & skill",  color: "#E0892B" },
  other:            { label: "Personal",           color: "#9A8C7A" },
};
```

A scalar → color scale for progress/mastery:

```ts
mastery >= 80 → "#22c55e"  // Strong
mastery >= 60 → "#3b82f6"  // Proficient
mastery >= 40 → "#f59e0b"  // Developing
mastery >= 20 → "#f97316"  // Beginner
else          → "#ef4444"  // Not Started
```

---

## 3. Typography

**Two fonts only**, loaded from Google Fonts at the very top of the stylesheet:

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
```

- **Outfit** — everything. Geometric, friendly, wide. `--font-sans: 'Outfit', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;`
- **JetBrains Mono** — code, numbers, technical labels. Exposed as `.zoe-mono` / `.z-mono`.

### Weight is the primary hierarchy signal — not size.

The UI leans **heavy**: `600` is the *minimum* for anything that isn't body copy.

| Role | Weight | Size | Tracking |
|---|---|---|---|
| Display / hero | 800 | `clamp(2.8rem, 6vw, 4.6rem)` | `-0.02em`, `line-height: 1.08` |
| Screen title | 800 | 20–22px | `-0.02em` |
| Card title | 700–800 | 15–17px | `-0.01em` |
| Button label | 800 (`.zoe-warm`) / 700 (base) | 15px | `-0.01em` |
| Body | 500 | 15–16px | `line-height: 1.46–1.7` |
| Secondary body | 500 | 13–14px, `--z-ink-2` | |
| Meta / caption | 700 | 11–13px, `--z-ink-3` | |
| Eyebrow | 700 | 12px, UPPERCASE | `0.08em` |

```css
.zoe-display { font-family: 'Outfit', system-ui, sans-serif; font-weight: 800; letter-spacing: -0.02em; line-height: 1.08; }
.zoe-mono, .z-mono { font-family: 'JetBrains Mono', monospace; }
.z-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--z-ink-3); }
```

### Sizing convention

The codebase uses **explicit pixel values via Tailwind arbitrary values**, not Tailwind's `text-sm`/`text-base` scale, and freely uses half-pixels for optical tuning. Actual observed distribution, most-used first:

`text-[13px]`, `text-[12px]`, `text-[16px]`, `text-[14px]`, `text-[11px]`, `text-[15px]`, `text-[13.5px]`, `text-[15.5px]`, `text-[14.5px]`, `text-[10px]`

If you replicate this system, keep the explicit-px habit — it is what gives the dense, app-like (rather than website-like) rhythm. Note the mobile-input exception: text inputs are **16px** to prevent iOS zoom-on-focus.

---

## 4. Component classes

Copy these verbatim. They are the vocabulary the whole UI is written in — JSX composes `.z-*` classes with Tailwind layout utilities and inline `style={{ color: "var(--z-ink)" }}` for token colors.

### 4.1 Buttons

```css
.z-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  font-weight: 700; font-size: 15px; line-height: 1;
  padding: 0.95rem 1.5rem; border-radius: 999px;
  transition: transform 0.2s var(--z-ease), box-shadow 0.2s var(--z-ease), background 0.2s var(--z-ease);
  cursor: pointer; white-space: nowrap; border: 1px solid transparent;
}
.z-btn:active { transform: translateY(1px) scale(0.99); }

/* Base (.zoe) variants — soft shadow, hover lift */
.z-btn-primary { background: var(--z-ink); color: #fff; box-shadow: 0 6px 18px rgba(27,23,20,0.22); }
.z-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(27,23,20,0.28); }
.z-btn-brand   { background: linear-gradient(135deg, #FFC04A, var(--z-brand-deep)); color: var(--z-on-brand); box-shadow: 0 8px 22px rgba(224,137,43,0.35); }
.z-btn-brand:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(224,137,43,0.45); }
.z-btn-ghost   { background: var(--z-surface); color: var(--z-ink); border-color: var(--z-line-2); box-shadow: var(--z-shadow-sm); }
.z-btn-ghost:hover { transform: translateY(-2px); box-shadow: var(--z-shadow); }
.z-btn-night   { background: rgba(255,255,255,0.08); color: var(--z-night-ink); border-color: rgba(255,255,255,0.16); backdrop-filter: blur(8px); }

/* ── .zoe-warm override: THE TACTILE LIP. This is the signature. ── */
.zoe-warm .z-btn { border-radius: 14px; font-weight: 800; letter-spacing: -0.01em; }

.zoe-warm .z-btn-brand {
  background: var(--z-accent); color: #1E1A14;          /* dark ink on amber = max contrast */
  box-shadow: 0 4px 0 var(--z-accent-edge); border-color: transparent;
}
.zoe-warm .z-btn-brand:hover  { transform: none; box-shadow: 0 4px 0 var(--z-accent-edge); filter: brightness(1.03); }
.zoe-warm .z-btn-brand:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--z-accent-edge); }

.zoe-warm .z-btn-primary { background: var(--z-ink); color: #fff; box-shadow: 0 4px 0 rgba(42,34,20,0.45); }
.zoe-warm .z-btn-primary:hover  { transform: none; box-shadow: 0 4px 0 rgba(42,34,20,0.45); }
.zoe-warm .z-btn-primary:active { transform: translateY(3px); box-shadow: 0 1px 0 rgba(42,34,20,0.45); }

.zoe-warm .z-btn-ghost { background: var(--z-surface); color: var(--z-ink); border: 1.5px solid var(--z-line-2); box-shadow: 0 3px 0 var(--z-line-2); backdrop-filter: none; }
.zoe-warm .z-btn-ghost:hover  { transform: none; box-shadow: 0 3px 0 var(--z-line-2); background: var(--z-surface-2); }
.zoe-warm .z-btn-ghost:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--z-line-2); }

.zoe-warm .z-btn:disabled { box-shadow: none; opacity: 0.4; }
.zoe-warm .z-btn:disabled:active { transform: none; }
```

**The lip formula:** `box-shadow: 0 {N}px 0 {edge-color}` at rest → `translateY({N-1}px)` + `0 1px 0 {edge}` on `:active`. `N` = 4 for primary/brand, 3 for ghost/option/pill, 2 for bubbles. Hover **never** moves the element in `.zoe-warm`; only `:active` does.

### 4.2 Cards, chips, layout helpers

```css
.z-card {
  background: var(--z-surface);
  border: 1px solid var(--z-line);
  border-radius: var(--z-radius);
  box-shadow: var(--z-shadow-sm);
  transition: transform 0.3s var(--z-ease), box-shadow 0.3s var(--z-ease), border-color 0.3s var(--z-ease);
}
.z-card-hover:hover { transform: translateY(-6px); box-shadow: var(--z-shadow-lg); border-color: var(--z-line-2); }

/* .zoe-warm de-glasses everything and kills the lift */
.zoe-warm .glass, .zoe-warm .z-card {
  background: var(--z-surface); border: 1px solid var(--z-line);
  box-shadow: var(--z-shadow-sm);
  backdrop-filter: none; -webkit-backdrop-filter: none;
  border-radius: var(--z-radius);
}
.zoe-warm .glass-soft {
  background: var(--z-field); border: 1.5px solid var(--z-line);
  box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; border-radius: 14px;
}
.zoe-warm .z-card-hover:hover { border-color: var(--z-line-2); box-shadow: var(--z-shadow); transform: none; }

.z-chip {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 12.5px; font-weight: 700; letter-spacing: 0.02em;
  padding: 0.4rem 0.8rem; border-radius: 999px;
}
.zoe-warm .z-chip { border-radius: 999px; font-weight: 700; }

/* Page container */
.z-wrap { width: 100%; max-width: 1200px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }

/* Film-grain overlay — put on a `position: relative` section */
.z-grain::before {
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0.035; z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

Chips are colored inline from the category palette:
```jsx
<span className="z-chip" style={{ background: `${meta.color}22`, color: meta.color }}>{meta.label}</span>
```

### 4.3 Selectable option tile (onboarding / quiz)

```css
.zoe-warm .z-opt {
  display: flex; align-items: center; gap: 14px; width: 100%; text-align: left;
  padding: 16px 18px; border-radius: 18px;
  background: var(--z-surface); border: 2px solid var(--z-line);
  box-shadow: 0 3px 0 rgba(42,34,20,0.07);
  transition: border-color 0.15s var(--z-ease), background 0.15s var(--z-ease),
              transform 0.1s var(--z-ease), box-shadow 0.1s var(--z-ease);
  cursor: pointer;
}
.zoe-warm .z-opt:hover  { border-color: var(--z-line-2); }
.zoe-warm .z-opt:active { transform: translateY(2px); box-shadow: 0 1px 0 rgba(42,34,20,0.07); }
.zoe-warm .z-opt[data-on="true"] {
  border-color: var(--z-accent); background: var(--z-accent-soft); box-shadow: 0 3px 0 var(--z-accent-edge);
}
.z-opt-ico { width: 46px; height: 46px; border-radius: 13px; flex-shrink: 0; display: grid; place-items: center; background: var(--z-surface-2); }
.z-opt[data-on="true"] .z-opt-ico { background: rgba(255,255,255,0.65); }
```

> **Selection convention:** state lives in `data-on="true"`, **not** a class toggle. Selected = 2px amber border + `--z-accent-soft` fill + amber lip. Reuse this exact pattern for `.z-pick` and `.z-pill` too.

### 4.4 Progress rail

```css
.zoe-warm .z-progress { height: 12px; border-radius: 999px; background: var(--z-surface-2); border: 1px solid var(--z-line); overflow: hidden; }
.zoe-warm .z-progress > i { display: block; height: 100%; border-radius: 999px; background: var(--z-accent); }
```

### 4.5 Chat bubbles, picks, pills, input dock

```css
.zoe-warm .z-bubble-zoe {
  background: var(--z-surface); border: 1.5px solid var(--z-line); color: var(--z-ink);
  border-radius: 20px 20px 20px 7px;      /* tail bottom-left */
  padding: 11px 15px; font-weight: 500; font-size: 15.5px; line-height: 1.46; max-width: 84%;
  box-shadow: 0 2px 0 rgba(42,34,20,0.05);
}
.zoe-warm .z-bubble-user {
  background: var(--z-accent-soft); border: 1.5px solid var(--z-accent); color: var(--z-ink);
  border-radius: 20px 20px 7px 20px;      /* tail bottom-right */
  padding: 11px 15px; font-weight: 600; font-size: 15.5px; line-height: 1.46; max-width: 84%;
}

/* Quick-reply pick */
.zoe-warm .z-pick {
  display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 999px;
  background: var(--z-surface); border: 2px solid var(--z-line); color: var(--z-ink);
  font-weight: 700; font-size: 14.5px; box-shadow: 0 3px 0 rgba(42,34,20,0.07); cursor: pointer;
  transition: border-color .15s var(--z-ease), background .15s var(--z-ease), transform .1s var(--z-ease), box-shadow .1s var(--z-ease);
}
.zoe-warm .z-pick:hover  { border-color: var(--z-line-2); }
.zoe-warm .z-pick:active { transform: translateY(2px); box-shadow: 0 1px 0 rgba(42,34,20,0.07); }
.zoe-warm .z-pick[data-on="true"] { border-color: var(--z-accent); background: var(--z-accent-soft); box-shadow: 0 3px 0 var(--z-accent-edge); }

/* Dashed "add / optional" pill */
.zoe-warm .z-pill {
  display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; border-radius: 999px;
  background: transparent; border: 2px dashed var(--z-line-2); color: var(--z-ink);
  font-weight: 600; font-size: 15px; cursor: pointer;
  transition: background .18s var(--z-ease), border-color .18s var(--z-ease), transform .1s var(--z-ease);
}
.zoe-warm .z-pill:hover  { background: var(--z-surface); border-color: var(--z-accent); }
.zoe-warm .z-pill:active { transform: scale(0.96); }
.zoe-warm .z-pill[data-on="true"] { background: var(--z-accent-soft); border-color: var(--z-accent); border-style: solid; }

/* Composer */
.zoe-warm .z-dock-input {
  flex: 1; min-height: 50px; max-height: 132px; resize: none;
  background: var(--z-field); border: 2px solid var(--z-line); border-radius: 16px;
  padding: 13px 16px; font-size: 16px; font-weight: 500; color: var(--z-ink); outline: none;
  transition: border-color .15s var(--z-ease);
}
.zoe-warm .z-dock-input:focus { border-color: var(--z-accent); }   /* focus = amber border, no ring */
.zoe-warm .z-dock-send {
  width: 50px; height: 50px; flex-shrink: 0; border-radius: 14px; display: grid; place-items: center;
  background: var(--z-accent); color: var(--z-on-brand); box-shadow: 0 4px 0 var(--z-accent-edge);
  transition: transform .1s var(--z-ease), box-shadow .1s var(--z-ease), opacity .15s var(--z-ease);
}
.zoe-warm .z-dock-send:active   { transform: translateY(3px); box-shadow: 0 1px 0 var(--z-accent-edge); }
.zoe-warm .z-dock-send:disabled { opacity: .4; box-shadow: none; }

/* Big centered single-field input (name, goal…) */
.zoe-warm .z-center-input {
  width: 100%; max-width: 320px; text-align: center;
  background: transparent; border: none; border-bottom: 2px solid var(--z-line-2);
  padding: 12px 0; font-size: 22px; font-weight: 700; color: var(--z-ink); outline: none;
  transition: border-color .18s var(--z-ease); font-family: inherit;
}
.zoe-warm .z-center-input::placeholder { color: var(--z-ink-3); font-weight: 500; }
.zoe-warm .z-center-input:focus { border-color: var(--z-accent); }

/* 1–5 rating scale */
.zoe-warm .z-scale-btn {
  aspect-ratio: 1; border-radius: 14px; font-weight: 800; font-size: 17px;
  background: var(--z-surface); border: 2px solid var(--z-line); color: var(--z-ink);
  box-shadow: 0 3px 0 rgba(42,34,20,0.07);
  transition: transform .1s var(--z-ease), box-shadow .1s var(--z-ease), background .12s var(--z-ease), border-color .12s var(--z-ease);
}
.zoe-warm .z-scale-btn:hover  { border-color: var(--z-accent); }
.zoe-warm .z-scale-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 rgba(42,34,20,0.07); }

/* Typing indicator */
@keyframes z-dot { 0%,60%,100% { transform: translateY(0); opacity: .4; } 30% { transform: translateY(-4px); opacity: 1; } }
.z-typing-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--z-ink-3); animation: z-dot 1.1s ease-in-out infinite; }
```

### 4.6 Range slider (chunky, tactile)

```css
.z-range { -webkit-appearance: none; appearance: none; height: 8px; border-radius: 999px; outline: none; background: var(--z-surface-2); }
.z-range::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 26px; height: 26px; border-radius: 50%;
  background: #fff; border: 4px solid var(--z-brand);
  box-shadow: 0 3px 10px rgba(27,23,20,0.20); cursor: pointer;
  transition: transform 0.15s var(--z-ease);
}
.z-range::-webkit-slider-thumb:active { transform: scale(1.18); }
.z-range::-moz-range-thumb {
  width: 26px; height: 26px; border-radius: 50%;
  background: #fff; border: 4px solid var(--z-brand); box-shadow: 0 3px 10px rgba(27,23,20,0.20); cursor: pointer;
}
```

### 4.7 Glass primitives (used by `.zoe-night`; neutralised by `.zoe-warm`)

```css
.glass {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(34px) saturate(140%); -webkit-backdrop-filter: blur(34px) saturate(140%);
  border: 1px solid rgba(255,255,255,0.12); border-radius: 28px;
}
.glass-soft {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
}
.glow-ring { box-shadow: 0 0 0 1px rgba(255,255,255,0.10), 0 0 40px -8px var(--glow, rgba(245,165,36,0.6)); }
.zoe-warm .glow-ring { box-shadow: none; }
```

---

## 5. Mobile-native shell

The app renders as a **centered phone-width column** (max 520px) on all viewports, with a floating top bar and a floating bottom dock. Safe-area insets are respected everywhere.

```css
.zoe-app {
  position: relative; z-index: 10;
  width: 100%; max-width: 520px; margin: 0 auto;
  min-height: 100svh;                 /* svh, not vh — no mobile URL-bar jump */
  padding: calc(62px + env(safe-area-inset-top)) 18px
           calc(96px + env(safe-area-inset-bottom)) 18px;
}
.zoe-topbar {
  position: absolute; top: 0; left: 0; right: 0; z-index: 30;   /* floats; content scrolls under */
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: calc(14px + env(safe-area-inset-top)) 20px 12px 20px;
}
.zoe-tabbar {
  position: fixed; left: 50%; transform: translateX(-50%);
  bottom: calc(14px + env(safe-area-inset-bottom)); z-index: 40;
  display: flex; align-items: center; gap: 6px;
  padding: 8px; border-radius: 999px;
  background: rgba(255,252,245,0.78);
  backdrop-filter: blur(22px) saturate(150%); -webkit-backdrop-filter: blur(22px) saturate(150%);
  border: 1px solid rgba(255,255,255,0.7);
  box-shadow: var(--z-shadow-lg);
}
.zoe-tab {
  display: inline-flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 9px 16px; border-radius: 999px; font-size: 11px; font-weight: 800;
  color: var(--z-ink-3); transition: color 0.2s var(--z-ease), background 0.2s var(--z-ease);
}
.zoe-tab[data-active="true"] { color: var(--z-on-brand); background: linear-gradient(135deg,#FFD27A,var(--z-brand-deep)); }
.zoe-tab-fab {
  width: 56px; height: 56px; border-radius: 50%; margin: -18px 4px 0;
  display: inline-grid; place-items: center; color: #fff;
  background: linear-gradient(135deg,#FFC04A,var(--z-brand-deep));
  box-shadow: 0 10px 26px -6px rgba(224,137,43,0.7);
}
.zoe-haptic:active { transform: scale(0.96); }   /* add to any tappable element */

/* Ask dock — single floating companion bar (used instead of the tab bar) */
.ask-dock {
  position: fixed; left: 50%; transform: translateX(-50%);
  bottom: calc(16px + env(safe-area-inset-bottom)); z-index: 40;
  width: min(480px, calc(100vw - 28px));
  display: flex; align-items: center; gap: 10px;
  padding: 9px 9px 9px 12px; border-radius: 999px;
  background: var(--z-surface); border: 1.5px solid var(--z-line-2);
  box-shadow: 0 8px 28px -14px rgba(42,34,20,0.30), 0 3px 0 var(--z-line);
}
.ask-dock-status { flex: 1; min-width: 0; font-size: 14px; font-weight: 600; color: var(--z-ink-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ask-dock-icon { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; display: inline-grid; place-items: center; color: var(--z-ink-2); background: var(--z-surface-2); border: 1px solid var(--z-line); }
.ask-dock-mic  { width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0; display: inline-grid; place-items: center; color: var(--z-on-brand); background: var(--z-accent); box-shadow: 0 3px 0 var(--z-accent-edge); }
.ask-glow { position: absolute; inset: -2px; border-radius: 999px; z-index: -1; opacity: 0; border: 2px solid var(--z-accent); }
.ask-glow[data-on="true"] { opacity: 0.5; transition: opacity 0.4s var(--z-ease); }

/* Horizontal chip scroller with hidden scrollbar */
.ask-chips { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
.ask-chips::-webkit-scrollbar { display: none; }
```

Because the base `html`/`body` are `overflow: hidden`, full-page scrolling sections use a dedicated fixed scroll container:

```css
.zoe-root { position: fixed; inset: 0; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; background: #FBF8F2; }
```

Shell usage:

```jsx
<div className="zoe zoe-warm relative min-h-screen">
  <LivingBackground />
  <div className="zoe-app">
    <header className="zoe-topbar">…</header>
    {children}
  </div>
  <AskDock />
</div>
```

---

## 6. Motion

### One easing curve, everywhere

```
cubic-bezier(0.22, 1, 0.36, 1)      // --z-ease  (a strong ease-out / "expo-out")
```

In JS/framer-motion it is redeclared per file as a tuple:

```ts
const EASE = [0.22, 1, 0.36, 1] as const;
```

### Standard entrance

Every card, row, and section enters with a small upward fade, staggered by a hand-tuned `delay` (roughly `0.02–0.04s` per item):

```jsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.08, ease: EASE }}
/>
```

Scroll-reveal variant (used on the marketing/landing page):

```jsx
<motion.div
  initial={{ opacity: 0, y: 22 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6, ease: EASE, delay }}
/>
```

Durations: micro-interactions `0.1–0.2s`, card transitions `0.3s`, entrances `0.6–0.7s`.

### Ambient keyframes

```css
@keyframes z-float     { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes z-float-sm  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes z-breathe   { 0%,100% { transform: scale(1);   opacity: 0.85; } 50% { transform: scale(1.06); opacity: 1; } }
@keyframes z-spin-slow { to { transform: rotate(360deg); } }
@keyframes z-spin-rev  { to { transform: rotate(-360deg); } }
@keyframes z-dash      { to { stroke-dashoffset: 0; } }
@keyframes z-shimmer   { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes z-pan       { 0%,100% { transform: translate(0,0); } 50% { transform: translate(3%, -3%); } }
@keyframes z-pop       { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }

.z-float     { animation: z-float 6s ease-in-out infinite; }
.z-float-sm  { animation: z-float-sm 5s ease-in-out infinite; }
.z-breathe   { animation: z-breathe 4s ease-in-out infinite; }
.z-spin-slow { animation: z-spin-slow 26s linear infinite; transform-origin: center; }
.z-spin-rev  { animation: z-spin-rev 34s linear infinite; transform-origin: center; }
.z-pop       { animation: z-pop 0.45s var(--z-ease) both; }
```

Ambient loops are deliberately **slow** — 16–34s. Nothing decorative should read as "animating"; it should read as "breathing."

### Reduced motion — mandatory

Every ambient animation is disabled under `prefers-reduced-motion`, and framer-motion components call `useReducedMotion()` to drop to a static state:

```css
@media (prefers-reduced-motion: reduce) {
  .z-float, .z-float-sm, .z-breathe, .z-spin-slow, .z-spin-rev, .z-pop,
  .aurora-a, .aurora-b, .aurora-c,
  .living-a, .living-b, .living-c,
  .orb-core, .orb-glow, .orb-ring, .orb-ring-2,
  .ask-glow { animation: none !important; }
}
```

---

## 7. The living background (signature element)

A fixed, non-interactive layer of huge blurred blobs that drift and **shift hue with app state**. This is what makes the product feel alive; treat it as core, not decoration.

```css
.living { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.living-blob { position: absolute; border-radius: 50%; filter: blur(70px); will-change: transform, background; }
.living-grain::after {
  content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
@keyframes living-1 { 0%,100% { transform: translate(0,0) scale(1);    } 50% { transform: translate(7%, 5%)  scale(1.12); } }
@keyframes living-2 { 0%,100% { transform: translate(0,0) scale(1.08); } 50% { transform: translate(-9%,-7%) scale(0.96); } }
@keyframes living-3 { 0%,100% { transform: translate(0,0) scale(1);    } 50% { transform: translate(5%, -9%) scale(1.16); } }
.living-a { animation: living-1 20s ease-in-out infinite; }
.living-b { animation: living-2 24s ease-in-out infinite; }
.living-c { animation: living-3 22s ease-in-out infinite; }
```

### Construction (5 layers, back to front)

1. **Primary blobs** — 3 blobs, `60/52/56vmax`, hugged to the corners so the content centre stays clear, wrapped in `filter: url(#z-goo)` at `opacity: 0.38`.
2. **Secondary accents** — 2 small blobs (`28/22vmax`) in the mid-zone at `opacity: 0.14`, faster cycles, just for hue variation.
3. **Warm vignette wash** — `radial-gradient(120% 80% at 50% -8%, rgba(255,250,242,0.62), transparent 52%)`.
4. **Centre clear-zone** — `radial-gradient(55% 50% at 50% 50%, rgba(255,252,246,0.28), transparent 100%)` — lifts the area where cards sit so text stays readable.
5. **Footer glow** — `radial-gradient(90% 50% at 50% 115%, rgba(230,185,70,0.09), transparent 50%)`.

Plus an inline SVG **gooey filter** so overlapping blobs merge like lava rather than stacking as discs:

```jsx
<svg width="0" height="0" className="absolute" aria-hidden focusable="false">
  <defs>
    <filter id="z-goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="52" result="b" />
      <feColorMatrix in="b" mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -6" />
    </filter>
  </defs>
</svg>
```

Blob drift is animated with framer-motion (percent `x`/`y` keyframe arrays + `scale`), with `x` at duration `d`, `y` at `d * 1.18`, and `scale` at `d * 0.9` — the mismatched periods prevent any visible loop.

### Mood system

A tiny zustand store holds one `mood`, and both the background and the mascot orb read from it. Colors cross-fade over `1.4s`.

```ts
export type Mood = "idle" | "thinking" | "listening" | "success" | "struggle" | "calm";

// Chalky, low-saturation pastels — warmth from hue, not chroma.
// Each mood pairs one warm blob, one cool blob, one neutral, so there's contrast
// *within* the background without the blobs fighting the UI.
export const MOOD: Record<Mood, { blobs: [string,string,string]; orb: [string,string]; glow: string }> = {
  idle:      { blobs: ["#EDD8A6", "#B4CCBE", "#DFC4B0"], orb: ["#FFF1D6", "#F2B968"], glow: "#F4C77E" },
  thinking:  { blobs: ["#E4C47A", "#AABFBA", "#D4AE8C"], orb: ["#FFE8BC", "#EC9A4A"], glow: "#EDA85A" },
  listening: { blobs: ["#ECD49C", "#B0C8C0", "#DBBCAA"], orb: ["#FFF2D2", "#EAC078"], glow: "#EECB84" },
  success:   { blobs: ["#C0D4A4", "#E2CE8C", "#B4C8A4"], orb: ["#FFF3D4", "#AFC58E"], glow: "#CBBE7E" },
  struggle:  { blobs: ["#E4B89C", "#CCA8A4", "#D4AE90"], orb: ["#FFD8AE", "#D07E4A"], glow: "#D58A56" },
  calm:      { blobs: ["#E8D8B0", "#B8CCBC", "#DCC8B4"], orb: ["#FFF8E6", "#F0CE84"], glow: "#F2D79A" },
};
```

Store API: `setMood(m)` (sticky), `setBase(m)` (the mood the app settles back to), `pulse(m, ms = 2600)` (flash then ease back to base). Screens call `setBase` on mount and `pulse("success")` / `pulse("thinking")` on events.

### Aurora variant (for `.zoe-night`)

```css
.aurora { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.aurora-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.5; will-change: transform; mix-blend-mode: screen; }
.aurora-grain::after { /* same SVG noise, opacity 0.05 */ }
@keyframes aurora-1 { 0%,100% { transform: translate(0,0) scale(1);   } 50% { transform: translate(8%, 6%)  scale(1.15); } }
@keyframes aurora-2 { 0%,100% { transform: translate(0,0) scale(1.1); } 50% { transform: translate(-10%,-8%) scale(0.95); } }
@keyframes aurora-3 { 0%,100% { transform: translate(0,0) scale(1);   } 50% { transform: translate(6%, -10%) scale(1.2); } }
.aurora-a { animation: aurora-1 16s ease-in-out infinite; }
.aurora-b { animation: aurora-2 20s ease-in-out infinite; }
.aurora-c { animation: aurora-3 24s ease-in-out infinite; }
```

Difference from `.living`: `mix-blend-mode: screen` (additive on dark), `blur(80px)`, higher opacity.

---

## 8. The mascot orb

A branded SVG sphere used as logo, loading state, and emotional feedback — one element that carries the product's personality. Anatomy, from the source:

- 3-layer gradient sphere (light source → gold → dark edge)
- Specular highlight (white hot-spot, upper-left)
- Rim light (warm bounce from below)
- Edge occlusion (darkens the perimeter for depth)
- Ambient glow (mood-colored bloom that breathes)
- A face — brows, eyes, smile — that **morphs** between moods
- Random blink + slow iris orbit
- Cheek flush on `success`, bouncing dots on `thinking`, optional floating sparkles

The morph trick: every expression path is written with **identical SVG command counts** so framer-motion can interpolate between them cleanly.

```ts
const SMILE: Record<Mood, string> = {
  idle:      "M 15 27.5 Q 24 32.5 33 27.5",
  calm:      "M 15 27   Q 24 32   33 27",
  thinking:  "M 15 27.5 Q 24 30   33 27.5",
  listening: "M 15 27   Q 24 32   33 27",
  success:   "M 13 26   Q 24 35   35 26",   // wider + deeper
  struggle:  "M 15 28   Q 24 25.5 33 28",   // inverted
};
const BREATH_DUR: Record<Mood, number> = { idle: 3.2, calm: 3.8, thinking: 1.9, listening: 2.6, success: 2.4, struggle: 2.0 };
```

```css
@keyframes orb-breathe  { 0%,100% { transform: scale(1); } 50% { transform: scale(1.045); } }
@keyframes orb-glow     { 0%,100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.12); } }
@keyframes orb-spin     { to { transform: rotate(360deg); } }
@keyframes orb-spin-rev { to { transform: rotate(-360deg); } }
.orb-wrap   { position: relative; display: inline-grid; place-items: center; }
.orb-core   { position: relative; border-radius: 50%; will-change: transform; animation: orb-breathe 4.5s ease-in-out infinite; }
.orb-glow   { position: absolute; inset: -22%; border-radius: 50%; filter: blur(26px); animation: orb-glow 4.5s ease-in-out infinite; z-index: -1; }
.orb-ring   { position: absolute; inset: -10%; border-radius: 50%; animation: orb-spin 18s linear infinite; }
.orb-ring-2 { position: absolute; inset: -2%;  border-radius: 50%; animation: orb-spin-rev 26s linear infinite; }
.orb-spark  { position: absolute; width: 6%; height: 6%; border-radius: 50%; background: #fff; }
```

API: `<ZoeOrb size={30} mood={mood} sparks={false} />`. Sizes range 30px (topbar logo) → 96px+ (hero).

---

## 9. Secondary layer — shadcn/ui tokens

A separate, older token set powers the few shadcn/ui components (`button`, `badge`, `accordion`, `progress`, `scroll-area`, `separator`, `sheet`, `tooltip`). It is a **frosted-glass on warm-gradient** theme — visually distinct from `.zoe-warm`. Port it only if you want those components; the `.z-*` classes above are the real design language.

```css
:root {
  --background: transparent;
  --bg-gradient: linear-gradient(180deg, #c8d8ce 0%, #dfcbaa 35%, #dbb8b0 65%, #d4aeb8 100%);
  --foreground: #1a1a1a;
  --card: rgba(255,255,255,0.55);
  --popover: rgba(255,255,255,0.85);
  --primary: #1a1a1a;            --primary-foreground: #ffffff;
  --secondary: rgba(255,255,255,0.40);
  --muted: rgba(0,0,0,0.04);     --muted-foreground: rgba(60,55,50,0.60);
  --accent: #9b7bbd;             --accent-foreground: #ffffff;
  --destructive: #dc2626;
  --border: rgba(0,0,0,0.07);    --input: rgba(0,0,0,0.05);  --ring: #9b7bbd;
  --chart-1: #9b7bbd; --chart-2: #e8a87c; --chart-3: #7bb8a0; --chart-4: #f472b6; --chart-5: #60a5fa;
  --radius: 1rem;
  --glass-bg: rgba(255,255,255,0.45); --glass-border: rgba(255,255,255,0.50); --glass-blur: 24px;
  /* + sidebar-*, surface, text-*, accent-warm, bubble-*, input-* … */
}
.dark {
  --bg-gradient: linear-gradient(180deg, #1a1f2e 0%, #2a2035 35%, #1e1a28 65%, #151520 100%);
  --foreground: rgba(255,255,255,0.95);
  --card: rgba(255,255,255,0.06);
  --accent: #c9a0e0;
  --border: rgba(255,255,255,0.08);
  --glass-bg: rgba(255,255,255,0.05); --glass-border: rgba(255,255,255,0.08);
  /* … */
}
```

### Tailwind v4 wiring (no config file)

```css
@import url('…Outfit…JetBrains+Mono…');
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: 'Outfit', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-primary: var(--primary);
  /* …one --color-* alias per token… */
  --radius-sm:  calc(var(--radius) * 0.6);
  --radius-md:  calc(var(--radius) * 0.8);
  --radius-lg:  var(--radius);
  --radius-xl:  calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}
```

Radii are **derived by multiplier** from a single `--radius`, so the whole app's roundness is one-knob tunable.

### Base layer + chrome

```css
@layer base {
  * { @apply border-border outline-ring/50; box-sizing: border-box; }
  html {
    @apply font-sans;
    height: 100%; overflow: hidden;                /* app shell, not a document */
    background: var(--bg-gradient); background-attachment: fixed;
  }
  body {
    @apply text-foreground font-sans;
    -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
    height: 100%; overflow: hidden; background: transparent;
  }
}

::placeholder { color: var(--text-tertiary); }
::selection   { background: rgba(197,139,110,0.30); color: var(--text); }
.zoe ::selection      { background: rgba(245,165,36,0.28); color: var(--z-ink); }
.zoe-warm ::selection { background: rgba(240,169,30,0.26); color: var(--z-ink); }

::-webkit-scrollbar { width: 5px; }                              /* thin, 5px */
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.10); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.20); }
.dark ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); }
```

Provider setup (`app/layout.tsx`):

```jsx
<html lang="en" suppressHydrationWarning>
  <body className="antialiased">
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
      {children}
    </ThemeProvider>
  </body>
</html>
```

shadcn config (`components.json`): `style: "base-nova"`, `baseColor: "neutral"`, `cssVariables: true`, `iconLibrary: "lucide"`, `rsc: true`.

---

## 10. Prose / markdown styling

Two scoped classes for AI-generated and lesson content.

```css
/* Chat / AI messages — larger, airier */
.msg-md p       { font-size: 16px; line-height: 1.7; margin-bottom: 0.55em; color: var(--text-secondary); letter-spacing: -0.008em; }
@media (min-width: 640px) { .msg-md p { font-size: 17px; } }
.msg-md p:last-child { margin-bottom: 0; }
.msg-md strong  { color: var(--text); font-weight: 600; }
.msg-md h2      { font-size: 18px; font-weight: 700; color: var(--text); margin: 1.1em 0 0.35em; letter-spacing: -0.02em; }
.msg-md h3      { font-size: 16px; font-weight: 600; color: var(--accent-warm); margin: 0.9em 0 0.3em; letter-spacing: -0.01em; }
.msg-md ul, .msg-md ol { padding-left: 1.3em; margin-bottom: 0.5em; }
.msg-md li      { font-size: 16px; line-height: 1.6; color: var(--text-secondary); margin-bottom: 0.12em; }
.msg-md code    { background: var(--surface); border-radius: 6px; padding: 2px 7px; font-size: 0.87em; font-family: 'SF Mono','Menlo',monospace; color: var(--text); }
.msg-md blockquote { background: rgba(197,139,110,0.08); border-radius: 10px; padding: 0.8em 1em; color: var(--text-tertiary); font-style: italic; margin: 0.5em 0; }

/* Lesson content — denser, with ruled h2 */
.content-md h2  { font-size: 16px; font-weight: 700; color: var(--text); margin: 1.3em 0 0.4em; padding-bottom: 0.35em; border-bottom: 1px solid var(--border); letter-spacing: -0.015em; }
.content-md h3  { font-size: 14px; font-weight: 600; color: var(--accent-warm); margin: 1em 0 0.35em; }
.content-md p   { font-size: 14px; line-height: 1.7; color: var(--text-secondary); margin-bottom: 0.45em; }
.content-md li  { font-size: 14px; line-height: 1.65; color: var(--text-secondary); }
.content-md img { max-width: 100%; border-radius: 12px; margin: 0.8em 0; }

.katex-display { overflow-x: auto; overflow-y: hidden; padding: 6px 0; }
```

Headings step **down** in size from `.msg-md` (18/16) to `.content-md` (16/14): chat is conversational, lesson body is reference-dense. `h3` is always `--accent-warm` — the one place a warm accent is used as text.

### Diagrams (mermaid)

Mermaid defaults are unreadable on the warm canvas, so they're forced:

```css
.zoe-mermaid svg .label, .zoe-mermaid svg text, .zoe-mermaid svg tspan,
.zoe-mermaid svg .nodeLabel, .zoe-mermaid svg .edgeLabel {
  fill: #1E1A14 !important; color: #1E1A14 !important;
  font-family: 'Outfit', system-ui, sans-serif !important; font-weight: 600 !important;
}
.zoe-mermaid svg .edgePath .path { stroke: #B86A0A !important; stroke-width: 2px !important; }
.zoe-mermaid svg .edgeLabel .label { background: #FBF8F2 !important; }
```

---

## 11. Authoring conventions

How JSX is actually written against this system:

1. **Tailwind for layout, `.z-*` for identity, inline `style` for tokens.**
   ```jsx
   <span className="text-[16px] font-extrabold tracking-tight" style={{ color: "var(--z-ink)" }}>ZOE</span>
   ```
   Token colors go through inline `style` with `var(--z-*)` rather than Tailwind color classes — that's why themes can swap by changing one wrapper class.

2. **`data-*` attributes drive state, not conditional classNames:** `data-on="true"` (selected), `data-active="true"` (current tab). Styling stays in CSS.

3. **Tailwind `!` important modifiers override `.z-*` padding/size when a one-off is needed:**
   ```jsx
   <Link className="z-btn z-btn-brand mt-6 !px-6 !py-3.5">Back home <ArrowRight className="w-4.5 h-4.5" /></Link>
   ```

4. **Icons:** lucide-react only, typically `w-4 h-4` / `w-4.5 h-4.5` inline in buttons, `w-2.5 h-2.5` in chips.

5. **`cn()` helper** for class merging:
   ```ts
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";
   export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
   ```

6. **`const EASE = [0.22, 1, 0.36, 1] as const;`** is redeclared at the top of every animated component file.

7. **Comment style** — heavy section banners in CSS, and a docblock at the top of any component with visual intent explaining *why* it looks the way it does. Worth keeping; it's how the design rationale survives.
   ```css
   /* ═══════════════════════════════════════════
      Section name
      ═══════════════════════════════════════════ */
   ```

---

## 12. Porting checklist

To apply this theme to a new project:

1. Add the Google Fonts `@import` (Outfit 300–800, JetBrains Mono 400/500/700) as the **first** line of your global CSS.
2. Copy `.zoe` and `.zoe-warm` token blocks (§2.1, §2.2). Add `.zoe-night` (§2.3) only if you want a dark variant.
3. Copy the component classes: buttons (§4.1), cards/chips/`.z-wrap` (§4.2), then whichever of §4.3–4.7 you need.
4. Copy the reduced-motion block (§6) — non-negotiable.
5. If mobile-native: copy `.zoe-app`, `.zoe-topbar`, `.zoe-tabbar`/`.ask-dock` (§5), and wrap screens in `<div className="zoe zoe-warm">`.
6. If you want the living background: copy `.living*` CSS (§7), build the 5-layer component with the `#z-goo` SVG filter, and add the mood store.
7. Set `const EASE = [0.22, 1, 0.36, 1]` and use `initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay, ease: EASE}}` for entrances.
8. Skip §9 entirely unless you also need shadcn/ui components.

### Do / Don't

| Do | Don't |
|---|---|
| Warm off-white canvas `#FBF8F2` | Pure white `#FFFFFF` page background |
| Warm near-black ink `#1E1A14` | Pure black `#000000` text |
| Hard bottom lip `0 4px 0 <edge>` | Blurred `box-shadow` on buttons in `.zoe-warm` |
| Move on `:active` only | Hover-lift buttons in `.zoe-warm` |
| Amber border + `#FDDFA0` fill for selection | Blue focus rings, or near-white selected tints |
| `--z-brand-deep` (`#7C4D08`) for brand **text** | `--z-accent` (`#F0A91E`) as text on light |
| Font-weight 700–800 for UI labels | 400/500 weights on buttons or titles |
| One easing curve `cubic-bezier(0.22,1,0.36,1)` | Mixed `ease-in-out` / `linear` / spring curves |
| 16–34s ambient loops | Fast, noticeable background motion |
| Explicit px sizes (`text-[13px]`) | Tailwind's `text-sm`/`text-base` scale |
| `data-on` / `data-active` for state | Conditional className string building |
| `100svh` + `env(safe-area-inset-*)` | `100vh` on mobile shells |
