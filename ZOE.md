# ZOE ONE — Technical Documentation

> **ZOE** is a Global Regenerative Human Capital Development Ecosystem — a "Human Intelligence Operating System." It is not a course catalogue or an education platform. It is a becoming engine: you tell ZOE who you want to become, and it builds a living, adaptive path that morphs to match how your mind works.

---

## Table of Contents

1. [Vision](#1-vision)
2. [Tech Stack](#2-tech-stack)
3. [Architecture Overview](#3-architecture-overview)
4. [AI Systems — The Five Hats](#4-ai-systems--the-five-hats)
5. [Content Engine](#5-content-engine)
6. [Data Model](#6-data-model)
7. [Persistence Layer](#7-persistence-layer)
8. [API Routes](#8-api-routes)
9. [UI Component Map](#9-ui-component-map)
10. [Pages & Routing](#10-pages--routing)
11. [Design System](#11-design-system)
12. [Environment Variables](#12-environment-variables)

---

## 1. Vision

ZOE is built around three core beliefs:

- **Anyone can become anything** — the constraint is never intelligence, it's always the quality of the path and the quality of the guide.
- **The AI must truly know you** — not your demographics, but your cognitive wiring, your motivations, your fears, your behavioral patterns.
- **Content must be alive** — every lesson is generated on demand, tailored to the learner's domain, modality, and current depth. No static courses.

The UI philosophy is inspired by Brilliant.org's warmth and interactivity, Apple's single-focus screen discipline, and ZOE's own warm gold palette — anti-AI-slop by design.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| State | Zustand 5 |
| Icons | Lucide React |
| Diagrams | Mermaid 11 |
| AI — Text (primary) | OpenRouter → `anthropic/claude-sonnet-4.6` |
| AI — Complex code/labs | OpenRouter → `anthropic/claude-opus-4.8` |
| AI — Fast/cheap calls | OpenRouter → `anthropic/claude-haiku-4.5` |
| AI — Image generation | Google Gemini `gemini-2.5-flash-image` (Nano Banana) |
| AI — Video generation | Google Veo `veo-3.1-generate-preview` |
| AI — Audio evaluation | Google Gemini `gemini-2.5-flash` |
| AI — Vision evaluation | OpenRouter → Claude Sonnet 4.6 |
| Persistence | Zustand + localStorage (profile/journey) + IndexedDB (generated lessons) |

---

## 3. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│  ZOE Client (Next.js App Router)                                    │
│                                                                     │
│  Landing → Onboarding → Home → Journey → StepRunner → LessonPlayer │
│                                                                     │
│  ┌──────────────┐   ┌──────────────┐   ┌───────────────────────┐   │
│  │  ZoeBrain    │   │  Ambience    │   │  Lesson Cache         │   │
│  │  (Zustand)   │   │  (Zustand)   │   │  (Memory + IndexedDB) │   │
│  └──────────────┘   └──────────────┘   └───────────────────────┘   │
└────────────────────────────┬────────────────────────────────────────┘
                             │ fetch / SSE
┌────────────────────────────▼────────────────────────────────────────┐
│  API Routes (Next.js Route Handlers)                                │
│                                                                     │
│  /api/zoe          — Hat dispatcher (Profiler/Architect/Mentor/…)   │
│  /api/zoe/content  — Content Engine (streaming SSE)                 │
│  /api/zoe/analyze  — Multimodal evaluation (audio/image/sketch/…)   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
        ┌────────────────────┼──────────────────────┐
        ▼                    ▼                       ▼
  OpenRouter            Google Gemini           Google Veo
  (Claude models)       (Nano Banana)         (Video gen)
```

---

## 4. AI Systems — The Five Hats

Each "hat" is a specialised AI persona. Together they form ZOE's intelligence. All text generation now routes through **OpenRouter** (Claude models), with Gemini reserved for native image/video/audio.

### Hat 1 — Profiler (`src/lib/zoe/hats.ts`)

**Purpose:** Understand *who* the person is at a deep psychometric level.

**What it does:**
- Runs an adaptive questioning sequence to extract motivations, cognitive style, time availability, and learning preferences
- Synthesises answers into a `ZoeProfile` — a structured psychometric model
- Tracks 9+ `DnaDimension` scores (e.g. abstract vs. concrete thinking, active vs. reflective style)
- Extracts strengths, growth edges, and an emotional baseline
- Outputs a `TeachingStyle` profile that the Mentor and Optimizer will use

**Model used:** `claude-sonnet-4.6` (base tier via OpenRouter)

**Fallback question bank:** 5 hardcoded seed questions cover "why this goal", "time available", and "how you learn best" — using Lucide icon names for visual representation (no emoji).

---

### Hat 2 — Architect (`src/lib/zoe/hats.ts`)

**Purpose:** Design the *path* for one specific aspiration.

**What it does:**
- Takes the aspiration title + area + profile summary
- Generates a multi-phase `Journey` with `JourneyPhase` → `JourneyStep` structure
- Assigns step kinds: `concept | practice | project | reflection | challenge | milestone`
- Creates field-specific `SkillTier` labels (e.g. "Rhythm Player" → "Lead Guitarist" for guitar)
- Generates a Mermaid flowchart of the journey for visual mapping
- Estimates time per step (5–60 min) and difficulty (1–5)

**Model used:** `claude-sonnet-4.6` (base tier)

---

### Hat 3 — Mentor (`src/lib/zoe/hats.ts`)

**Purpose:** *Deliver* a step with optimal content for this person right now.

**What it does:**
- Receives step details, profile, teaching style, and conversation history
- Returns rich `MentorResponse` with: intro, content blocks (insight / quote / code / diagram / visual / analogy), an interaction (MCQ / build / predict / confidence-check), and a hint
- Powers the legacy `Delivered` card-swipe flow in `StepRunner`
- Also handles follow-up "deep dive" questions in `ConversationPane`

**Model used:** `claude-sonnet-4.6` (base tier)

---

### Hat 4 — Optimizer (`src/lib/zoe/hats.ts`)

**Purpose:** Silently improve everything based on observed behavior.

**What it does:**
- Runs after each step completion (fire-and-forget)
- Reads recent events, behavioral metrics, and step performance data
- Updates `DnaDimension` scores (e.g. raises visual-learner score if they always prefer diagrams)
- Mutates the `TeachingStyle` (changes pace, tone, encouragement level)
- Can suggest skipping steps the learner has clearly already mastered
- Flags calibration issues (overconfident vs underconfident patterns)

**Model used:** `claude-sonnet-4.6` (base tier)

---

### Hat 5 — Companion (`src/lib/zoe/hats.ts`)

**Purpose:** Free-form conversational AI available anywhere in the app.

**What it does:**
- Answers any question the learner has
- Aware of full memory context (profile, aspirations, recent events)
- Maintains conversational warmth — ZOE's core personality
- Accessible via `AskDock` (floating bottom bar) and `AskZoe` component

**Model used:** `claude-sonnet-4.6` (base tier)

---

## 5. Content Engine

The Content Engine is ZOE's most powerful system. When a learner opens a step for the first time, instead of returning a simple JSON response from the Mentor hat, it generates a complete **rich, interactive, multimodal lesson** on demand.

### Pipeline (`src/lib/zoe/content-engine.ts`)

```
User clicks step
      │
      ▼
┌──────────────┐   claude-sonnet-4.6
│   Planner    │ ──────────────────── Analyses subject, domain, learner profile
│              │                      Decides section count, modalities, media needs
│              │                      Outputs: LessonPlan (sections + media prompts)
└──────┬───────┘
       │ parallel
   ┌───┴────────────────────────────────┐
   ▼                                    ▼
┌──────────────┐                ┌───────────────────┐   claude-opus-4.8
│    Media     │                │  Lesson Generator │ ──────────────────
│  Generator   │                │                   │  Generates per section:
│              │                │                   │  - narration steps (3–7)
│ Nano Banana  │                │                   │  - interactiveCode (HTML+JS+CSS)
│ (images)     │                │                   │  - experiment controls
│              │                │                   │  - InteractiveEvaluation (optional)
│ Veo 3.1      │                │                   │  - hook question
│ (video)      │                │                   │  - final exercise (MCQ/build/predict)
└──────┬───────┘                └────────┬──────────┘
       └──────────────┬──────────────────┘
                      ▼
              ┌───────────────┐
              │   Verifier    │  lesson-verifier.ts
              │               │  Static analysis: ES modules? Wrong Three.js CDN?
              │               │  No visual target? Too short? Truncated?
              │               │  → Auto-repair (claude-opus-4.8) or drop section
              └───────┬───────┘
                      ▼
              ┌───────────────┐
              │  done: lesson │  Streamed to client via SSE
              └───────────────┘
```

### Streaming Stages (SSE)

| Stage | Description |
|---|---|
| `planning` | Planner is thinking |
| `planned` | Section count decided |
| `media` | Generating images/video |
| `media_done` | Media count ready |
| `generating` | Building interactive lesson |
| `verifying` | Static code analysis running |
| `verified` | Code quality confirmed |
| `done` | Full `LessonContent` object delivered |

### Modality Selection

The Planner picks the best visual modality per section based on subject domain:

| Modality | Use Case |
|---|---|
| `3d_simulation` | Physics, chemistry, astronomy — Three.js scene |
| `canvas_animation` | Math, electricity, waves — 2D canvas with animation |
| `interactive_instrument` | Music (guitar fretboard), piano, etc. |
| `code_playground` | Programming concepts with live execution |
| `graph_interactive` | Data, economics — draggable charts |
| `diagram_animated` | History, biology — animated SVG |
| `ai_image` | Conceptual illustrations via Nano Banana |
| `ai_video` | Demonstrations, processes via Veo 3.1 |
| `text_rich` | Fallback for purely text-driven concepts |

### Interactive Evaluation Protocol

When a sandbox doubles as an input device (e.g. a guitar fretboard where the learner must play a chord):

1. The generated iframe calls `emit('submission', { data, label })` with the learner's input
2. `LessonPlayer` intercepts this via `IframeCanvas.onSubmission`
3. It POSTs to `/api/zoe/analyze` with type `performance`
4. Claude Sonnet 4.6 grades it against `successCriteria`
5. Score + feedback are displayed in the evaluation chip above the narration bubble

### Code Verification (`src/lib/zoe/lesson-verifier.ts`)

The verifier catches common AI code generation failures before showing anything to the user:

- `ES_MODULE` — uses `import/export`, won't work in classic `<script>` tags
- `THREE_MODULE` — wrong Three.js CDN build (module vs global)
- `NO_SCRIPT` — no `<script>` tag at all
- `NO_VISUAL_TARGET` — no `<canvas>`, `<svg>`, or visual element
- `TRUNCATED` — code ends mid-function (generation cut off)
- `TOO_SHORT` — less than 500 chars (stub, not a real implementation)

### Lesson Cache (`src/lib/zoe/lesson-cache.ts`)

Two-layer persistence so generated lessons are never regenerated unnecessarily:

- **Layer 1 — Memory (LRU, 12 entries):** Instant in-session access. Populated on lazy state initialisation, so navigating back to a step is zero-latency.
- **Layer 2 — IndexedDB (60 entries):** Survives page refreshes. Lessons are typically 50–500KB (base64 images, interactive code).

---

## 6. Data Model

### Core entities (`src/lib/zoe/types.ts`)

```typescript
ZoeIdentity          // who you are (name, age, locale)
ZoeProfile           // how your mind works (psychometric + behavioral)
  ├── DnaDimension[] // 9+ scored dimensions with history
  ├── BehavioralMetrics // observed signals (MCQ accuracy, time on task, etc.)
  ├── CognitiveStyle // abstract/concrete, active/reflective, verbal/visual, etc.
  └── TeachingStyle  // how ZOE teaches you right now (tone, pace, modalities)

Aspiration           // one "who you want to become" goal
  ├── Journey        // the full path
  │   ├── JourneyPhase[] // named phases (e.g. "Foundations", "Application")
  │   │   └── JourneyStep[] // individual steps
  │   │       ├── MasteryBreakdown // comprehension/application/depth/confidence/retention
  │   │       └── StepThread[]     // conversational deep-dive history
  └── SkillTier[]    // field-specific level names (domain-aware progression)

MemoryEvent          // episodic log entry (step started/completed, struggle, insight, etc.)
TokenEntry           // ZOT token ledger (skill/innovate/learn streams)
```

### Life Areas

| Key | Label | Color |
|---|---|---|
| `career` | Career | Blue `#2E9BFF` |
| `entrepreneurship` | Entrepreneurship | Coral `#FF6B5B` |
| `health` | Health & wellbeing | Sage `#5BB98C` |
| `mindset` | Mindset & growth | Violet `#7C5CFF` |
| `money` | Money & finance | Teal `#15C2A5` |
| `craft` | Craft & creativity | Amber `#F5A524` |
| `sustainability` | Sustainability | Green `#3FB984` |
| `knowledge` | Knowledge & skill | Gold `#E0892B` |
| `other` | Personal | Stone `#9A8C7A` |

### Content types (`src/lib/zoe/content-types.ts`)

```typescript
LessonContent        // the full generated lesson
  ├── LessonPlan     // Planner output: sections + media prompts
  ├── LessonSection[]
  │   ├── narration: NarrationStep[]       // text + optional iframe action
  │   ├── interactiveCode?: string         // self-contained HTML+JS+CSS
  │   ├── experimentControls: ExperimentControl[]
  │   └── evaluation?: InteractiveEvaluation // sandbox grading descriptor
  ├── media: MediaAsset[]    // generated images (dataUrl) + videos (videoUri)
  ├── exercise: LessonExercise   // MCQ/build/predict final check
  └── summary: string
```

---

## 7. Persistence Layer

| Data | Where | TTL |
|---|---|---|
| Identity, profile, aspirations, journeys | Zustand → localStorage | Forever |
| Memory events (last 200) | Zustand → localStorage | Forever |
| ZOT ledger | Zustand → localStorage | Forever |
| Generated lesson content | IndexedDB (`zoe-lessons`) | 60 lessons LRU |
| Same-session lessons | Module-level Map (12 LRU) | Page lifetime |
| Ambience mood | Zustand in-memory | Page lifetime |

**Brain store** (`src/lib/zoe/brain.ts`): Zustand store with full persistence. Exposes actions for every state mutation: `setProfile`, `addAspiration`, `setStepStatus`, `recordStepMetrics`, `awardTokens`, `logEvent`, `recordBehavior`, `tuneTeaching`, `updateDimension`.

**Memory system** (`src/lib/zoe/memory.ts`): Builds a compressed narrative context string from recent events and behavioral signals. Passed to all AI hat calls so every response is contextually aware.

**Ambience system** (`src/lib/zoe/ambience.ts`): Controls the living background mood (`idle | thinking | calm | success | struggle`). Connected to `LivingBackground` for dynamic color shifts.

---

## 8. API Routes

### `POST /api/zoe`

Dispatches to the appropriate hat.

**Request body:**
```json
{
  "hat": "profiler | architect | mentor | optimizer | companion",
  "...hat-specific fields..."
}
```

Hats called: Profiler (adaptive questions + synthesise), Architect (journey design), Mentor (step delivery + follow-ups), Optimizer (background tuning), Companion (free chat).

---

### `POST /api/zoe/content` (streaming SSE)

Runs the full Content Engine pipeline for a journey step.

**Request body:**
```json
{
  "step": { "id", "title", "summary", "kind", "minutes", "difficulty" },
  "aspiration": { "title", "area" },
  "profileSummary": "...",
  "teachingStyle": { ... },
  "memoryContext": "..."
}
```

**Response:** Newline-delimited JSON objects (one per stage). Final `done` message contains the full `LessonContent`.

---

### `POST /api/zoe/analyze`

Multimodal evaluation endpoint. Routes to the optimal model per submission type.

**Request body:**
```json
{
  "type": "audio | image | sketch | performance",
  "context": "step title — section title",
  "question": "what was asked",
  "submission": "base64 or text payload",
  "successCriteria": "..."
}
```

**Routing:**
| Type | Model |
|---|---|
| `audio` | Gemini `gemini-2.5-flash` (native audio understanding) |
| `image` / `sketch` | Claude Sonnet 4.6 vision via OpenRouter |
| `performance` | Claude Sonnet 4.6 text via OpenRouter |

**Response:** `{ feedback: string, score: number (0–100) }`

---

## 9. UI Component Map

### Shell & Navigation

| Component | Purpose |
|---|---|
| `MobileShell` | App chrome: top bar (ZOE wordmark + ZOT balance chip), bottom nav, living background |
| `Nav` | Desktop navigation |
| `AskDock` | Floating bottom bar with quick-ask orb for Companion access |
| `LivingBackground` | Animated gradient canvas that shifts mood with ambience state |
| `ZoeOrb` | The central animated ZOE mark — breathing, sparks, mood-aware |
| `Aurora` | Subtle ambient light effect |

### Onboarding

| Component | Purpose |
|---|---|
| `OnboardingFlow` | Full-screen Apple-style setup flow: name → age → role → aspiration → AI profiling → journey generation |
| `QuestionCard` | Single adaptive question with Lucide-icon option pills (single / multi / scale / text) |
| `JourneyPreview` | Animated preview of the generated journey shown before confirmation |
| `LivingBackground` | Dynamic background throughout onboarding |

**Onboarding phases:** `boot → name → age → role → aspiration → profiling → researching → preview → done | failed`

### Dashboard

| Component | Purpose |
|---|---|
| `Home` | Main dashboard: time-based greeting, vibrant gradient "continue" hero card, skill tier card, quick stats |
| `ProfileView` | Full psychometric profile: DNA dimensions, behavioral metrics, teaching style, aspirations list |

### Journey

| Component | Purpose |
|---|---|
| `JourneyView` | Aspiration view with tabbed layout: winding trail path + Mermaid map |
| `MermaidMap` | Renders AI-generated Mermaid flowchart of the journey |
| `StepRunner` | Orchestrates opening a step: cache check → content generation → lesson or legacy delivery |

### Learning

| Component | Purpose |
|---|---|
| `LessonPlayer` | Immersive full-screen lesson: flex-column layout (top bar / visual area / narration panel), zero overlap guaranteed |
| `IframeCanvas` | Sandboxed `<iframe srcdoc>` renderer for AI-generated interactive HTML+JS+CSS. Includes bridge preamble, error threshold guard, blank-screen detection, `emit('ready')` / `emit('submission')` protocol |
| `CanvasVisual` | Inline 2D canvas renderer for simple `canvasCode` blocks |
| `AudioRecorder` | Records audio via `MediaRecorder`, base64-encodes, sends to `/api/zoe/analyze` |
| `PhotoCapture` | Camera/file-upload capture, preview, sends to `/api/zoe/analyze` |
| `SketchPad` | Canvas drawing pad with pen/eraser, exports PNG, sends to `/api/zoe/analyze` |

### Graphics & Illustrations

| Component | Purpose |
|---|---|
| `ZoeOrb` | Primary animated brand mark (SVG, mood-aware, breathing + spark particles) |
| `ZoeGraphics` | `ProgressRing`, `SkillPathVis`, `SparkBurst` — custom SVG data visualisations |
| `illustrations.tsx` | `AreaIcon` — 9 custom SVG icons for life areas; `ZoeMark` |

---

## 10. Pages & Routing

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Landing page — hero, features, CTA |
| `/start` | `app/start/page.tsx` | Onboarding entry point |
| `/home` | `app/home/page.tsx` | Main dashboard (requires profile) |
| `/journey/[id]` | `app/journey/[id]/page.tsx` | Journey view for a specific aspiration |
| `/ask` | `app/ask/page.tsx` | Full-page Companion chat |
| `/profile` | `app/profile/page.tsx` | Psychometric profile view |

---

## 11. Design System

### Color Palette (CSS variables)

```css
--z-accent:       #F5A524   /* ZOE gold — primary actions, highlights */
--z-accent-edge:  #C47E18   /* gold shadow/border */
--z-accent-soft:  rgba(245,165,36,0.12)
--z-brand-deep:   #7A4F1A   /* deep amber for text on gold */
--z-on-brand:     #FBF5E6   /* text on gold buttons */

--z-ink:          #1B1714   /* primary text */
--z-ink-2:        #5C4E3A   /* secondary text */
--z-ink-3:        #9A8C7A   /* tertiary / hint text */

--z-surface:      #F5F0E8   /* card backgrounds */
--z-surface-2:    #EDE5D8   /* nested card backgrounds */
--z-line:         #D9CFC4   /* borders */
--z-line-2:       #EDE5D8   /* subtle dividers */

--z-good:         #3FB984   /* success green */
--z-good-soft:    rgba(63,185,132,0.12)
```

### Typography

- **Display:** `zoe-display` — serif, for large headings and statements
- **Body:** System sans-serif, `font-medium` base weight
- **Mono:** `z-mono` — monospace for code and numbers

### Utility Classes

```css
.z-btn          /* base button */
.z-btn-brand    /* gold filled button */
.z-chip         /* small rounded label */
.z-pill         /* dashed border selection pill */
.z-opt          /* large option row (icon + label + arrow) */
.glass          /* glass card (light background) */
.glass-soft     /* softer glass card */
.z-wrap         /* max-width container */
```

### Key Layout Patterns

- **Lesson screen:** `flex flex-col h-[calc(100svh-120px)]` — three fixed zones (top bar / visual flex-1 / narration panel), guaranteed zero overlap
- **Mobile shell:** `h-[100svh]` with bottom navigation inset
- **Onboarding:** Full-screen `min-h-[100svh]` centered cards with `LivingBackground`

---

## 12. Environment Variables

```env
# Google AI (Gemini, Veo, Nano Banana) — image and video generation + audio eval
GOOGLE_API_KEY=...

# OpenRouter — all text generation (Claude Sonnet, Opus, Haiku)
OPENROUTER_API_KEY=...
```

**Model routing summary:**

| Task | Provider | Model |
|---|---|---|
| All text (hats, planning, narration) | OpenRouter | `anthropic/claude-sonnet-4.6` |
| Interactive code / lab generation | OpenRouter | `anthropic/claude-opus-4.8` |
| Fast utility calls | OpenRouter | `anthropic/claude-haiku-4.5` |
| Vision evaluation (image/sketch) | OpenRouter | `anthropic/claude-sonnet-4.6` |
| Image generation | Google Gemini | `gemini-2.5-flash-image` |
| Video generation | Google Veo | `veo-3.1-generate-preview` |
| Audio evaluation | Google Gemini | `gemini-2.5-flash` |

---

## File Reference

```
src/
├── app/
│   ├── api/zoe/
│   │   ├── route.ts             Hat dispatcher
│   │   ├── content/route.ts     Content Engine SSE stream
│   │   └── analyze/route.ts     Multimodal evaluation
│   ├── home/page.tsx
│   ├── journey/[id]/page.tsx
│   ├── start/page.tsx
│   ├── ask/page.tsx
│   ├── profile/page.tsx
│   └── page.tsx                 Landing
│
├── components/zoe/
│   ├── OnboardingFlow.tsx       Full onboarding experience
│   ├── QuestionCard.tsx         Adaptive question cards
│   ├── Home.tsx                 Dashboard
│   ├── JourneyView.tsx          Journey winding trail + map
│   ├── StepRunner.tsx           Step orchestrator + cache logic
│   ├── LessonPlayer.tsx         Immersive lesson (flex-column, zero overlap)
│   ├── IframeCanvas.tsx         Sandboxed AI-generated interactive HTML
│   ├── AudioRecorder.tsx        Voice capture → /api/zoe/analyze
│   ├── PhotoCapture.tsx         Camera/upload → /api/zoe/analyze
│   ├── SketchPad.tsx            Drawing pad → /api/zoe/analyze
│   ├── MobileShell.tsx          App chrome + navigation
│   ├── ZoeOrb.tsx               Animated brand mark
│   ├── ZoeGraphics.tsx          ProgressRing, SkillPathVis, SparkBurst
│   ├── illustrations.tsx        AreaIcon SVGs
│   ├── LivingBackground.tsx     Mood-reactive animated canvas
│   ├── AskDock.tsx              Floating companion access
│   └── ProfileView.tsx          Psychometric profile display
│
└── lib/zoe/
    ├── types.ts                 Core data model
    ├── content-types.ts         Content Engine types
    ├── hats-types.ts            AI hat contracts
    ├── brain.ts                 Zustand store + all actions
    ├── hats.ts                  Five hat implementations
    ├── content-engine.ts        Full lesson generation pipeline
    ├── lesson-verifier.ts       Static code analysis + repair
    ├── lesson-cache.ts          Two-layer lesson persistence
    ├── genai.ts                 Unified generation wrapper (OpenRouter + Gemini)
    ├── openrouter.ts            OpenRouter client + model tiers
    ├── journey.ts               Journey normalisation + mastery calc
    ├── memory.ts                Episodic memory context builder
    ├── ambience.ts              Mood/ambience state
    └── storage.ts               localStorage helpers
```
