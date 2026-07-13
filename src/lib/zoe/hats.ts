/**
 * ZOE's four hats — server-side intelligences. Each is a focused role with its
 * own system prompt, talking to Gemini and returning STRICT JSON. The Brain
 * (memory) is injected as context so every hat shares one understanding of the
 * person. Each hat degrades gracefully to a hand-written fallback so the
 * experience never breaks, even with no API key.
 */

import { genText, parseJson, hasTextKey as hasKey } from "./genai";
import type {
  ArchitectRequest, ArchitectResponse, CompanionRequest, CompanionResponse,
  DocumentArchitectRequest,
  MentorRequest, MentorResponse,
  OptimizerRequest, OptimizerResponse, ProfileDraft,
  ProfilerNextRequest, ProfilerNextResponse, ProfilerSynthesizeRequest, ProfilerSynthesizeResponse,
} from "./hats-types";

async function gen(system: string, user: string, temperature = 0.8): Promise<string> {
  return genText(system, user, "gemini-2.5-flash-lite", temperature);
}
const mem = (m?: string) => (m ? `\n\n--- LONG-TERM MEMORY (a person you already know) ---\n${m}\n--- END MEMORY ---` : "");
const transcriptBlock = (t: { question: string; answer: string }[]) =>
  t.length ? t.map((x, i) => `${i + 1}. Q: ${x.question}\n   A: ${x.answer}`).join("\n") : "(nothing yet)";

/* ════════════════════════════════════════════════════════════════════════
   HAT 1 — THE PROFILER : understand who you are
   ════════════════════════════════════════════════════════════════════════ */
const PROFILER_NEXT_SYSTEM = `ROLE: THE PROFILER. You deeply UNDERSTAND this person through an adaptive, psychometric conversation.
Each turn you choose ONE question that reveals the most about how their mind works — not just preferences.

YOUR GOAL is to extract REAL cognitive and motivational signals, not self-reported fluff:

SIGNAL PRIORITY (what matters most, ranked):
1. MOTIVATION STRUCTURE — intrinsic vs extrinsic, approach vs avoidance, mastery vs performance.
   Don't ask "what motivates you" — present a SCENARIO with a trade-off and see what they pick.
   e.g. "You only have 30 min: do you spend it practicing what you're bad at, or polishing what you're good at?"
2. METACOGNITIVE ACCURACY — do they know what they know? Present a claim about their domain and ask
   how confident they are it's true (scale 1-5). Their calibration tells you more than their answer.
3. COGNITIVE STYLE — abstract vs concrete, sequential vs global, active vs reflective.
   Use BEHAVIORAL questions: "When you're stuck, do you step back and think, or try random things until something works?"
4. CURRENT KNOWLEDGE LEVEL — don't ask "rate yourself 1-5". Ask a domain-specific question that actually
   tests something. For a guitarist: "What's the interval between the 2nd and 3rd string in standard tuning?"
   Their answer (or "I don't know") IS the calibration.
5. CONSTRAINT REALITY — time, energy, environment. Be specific: "What time of day is your sharpest hour?"
6. EMOTIONAL RELATIONSHIP with growth — not "how do you feel" but "When you last failed at something
   you cared about, what did you do in the next 24 hours?"

Rules:
- ONE question at a time. Warm, specific — NEVER generic.
- At least 1 question must be a SCENARIO (situation + trade-off, revealed preference).
- At least 1 question must TEST actual knowledge in their aspiration domain (even basic).
- Prefer single/scale over open text. Text only for rich emotional/narrative questions.
- 5-7 questions total. Set "done": true once you have real signal (never exceed 8).
- "insight" = a brief warm reflection on their LAST answer (<= 14 words). Empty on first.
- STRICT JSON only.

Schema:
{ "done": boolean, "insight": string, "progress": number,
  "question": { "id": string, "prompt": string, "rationale": string,
    "type": "single"|"multi"|"scale"|"text",
    "options": [{ "label": string, "icon": string }],
    "scale": { "min": number, "max": number, "minLabel": string, "maxLabel": string },
    "placeholder": string } }`;

const PROFILER_SYNTH_SYSTEM = `ROLE: THE PROFILER, synthesising. From the person's aspiration AND their actual behavior in the
conversation (what they chose, how they phrased things, what they avoided), write a crisp, evidence-based
profile. Echo their words. THIS IS NOT A HOROSCOPE — every claim must trace to something they actually said or did.

COGNITIVE STYLE axes (each -1.0 to +1.0, neutral = 0):
- abstractVsConcrete: -1 = thinks in theory/principles, +1 = needs concrete examples first
- activeVsReflective: -1 = thinks deeply before acting, +1 = tries things immediately
- sequentialVsGlobal: -1 = step-by-step linear, +1 = needs the big picture first
- verbalVsVisual: -1 = words/text oriented, +1 = diagrams/images oriented
- socialVsSolo: -1 = learns alone, +1 = learns through discussion

DIMENSIONS must be specific to their aspiration domain, not generic traits. For a musician: "Ear training",
"Rhythm", "Theory knowledge". For an entrepreneur: "Market sense", "Risk tolerance", "Execution speed".
5-6 dimensions, 0-100, ONLY score what you have evidence for. Mark everything else at 50 with a note "not yet measured".

STRICT JSON only.

Schema:
{ "summary": string,                    // 2-3 warm sentences grounded in their words
  "motivations": [string],              // e.g. "intrinsic: mastery", "approach: build something"
  "cognitiveStyle": { "abstractVsConcrete": number, "activeVsReflective": number,
    "sequentialVsGlobal": number, "verbalVsVisual": number, "socialVsSolo": number },
  "timeAvailability": string,
  "emotionalBaseline": string,
  "strengths": [string],                // 2-4, with evidence
  "growthEdges": [string],              // 2-4, framed as growth opportunities
  "dimensions": [{ "label": string, "value": number, "note": string }],
  "teaching": { "tone": string, "modalities": [string], "pace": "gentle"|"steady"|"intense",
                "depth": "concise"|"balanced"|"deep", "encouragement": "light"|"medium"|"high" } }`;

const FALLBACK_QUESTIONS: ProfilerNextResponse[] = [
  { done: false, insight: "", progress: 0.18, question: { id: "why", prompt: "When you picture actually becoming this — what pulls you most?", rationale: "Understanding what truly drives you", type: "single", options: [{ label: "Proving I can", icon: "Flame" }, { label: "Freedom & options", icon: "Wind" }, { label: "Love of the craft", icon: "Sparkles" }, { label: "People I care about", icon: "Heart" }] } },
  { done: false, insight: "That tells me a lot.", progress: 0.36, question: { id: "level", prompt: "Where would you place yourself today?", rationale: "Calibrating your starting point", type: "scale", scale: { min: 1, max: 5, minLabel: "Total beginner", maxLabel: "Quite experienced" } } },
  { done: false, insight: "Good — honesty helps.", progress: 0.54, question: { id: "time", prompt: "Realistically, how much time can you give most days?", rationale: "Designing for your real life", type: "single", options: [{ label: "10 minutes", icon: "Clock" }, { label: "About 30 minutes", icon: "Timer" }, { label: "An hour+", icon: "Infinity" }, { label: "It varies", icon: "Shuffle" }] } },
  { done: false, insight: "Noted.", progress: 0.72, question: { id: "style", prompt: "How does your mind learn best?", rationale: "So I can match how you think", type: "multi", options: [{ label: "Seeing it", icon: "Eye" }, { label: "Doing it", icon: "Wrench" }, { label: "Reading & reflecting", icon: "BookOpen" }, { label: "Talking it through", icon: "MessageCircle" }] } },
  { done: false, insight: "Almost there.", progress: 0.9, question: { id: "obstacle", prompt: "What usually gets in the way when you try to grow?", rationale: "So I can help you around it", type: "text", placeholder: "Be honest — there's no wrong answer…" } },
];

export async function profilerNext(req: ProfilerNextRequest): Promise<ProfilerNextResponse> {
  const n = req.transcript.length;
  if (!hasKey()) return n >= FALLBACK_QUESTIONS.length ? { done: true } : FALLBACK_QUESTIONS[n];
  const user = `The person wants to become: "${req.aspiration}".
Name: ${req.basics?.name || "(unknown)"} · Age group: ${req.basics?.ageGroup || "(unknown)"}
Conversation so far (${n} answered):
${transcriptBlock(req.transcript)}${mem(req.memoryContext)}

Choose the next best question now, or finish if you truly have enough.`;
  try {
    const parsed = parseJson<ProfilerNextResponse>(await gen(PROFILER_NEXT_SYSTEM, user, 0.7));
    return parsed ?? (n >= FALLBACK_QUESTIONS.length ? { done: true } : FALLBACK_QUESTIONS[n]);
  } catch {
    return n >= FALLBACK_QUESTIONS.length ? { done: true } : FALLBACK_QUESTIONS[n];
  }
}

function fallbackProfile(aspiration: string): ProfileDraft {
  return {
    summary: `You're driven by becoming ${aspiration || "your best self"}, and you're ready to put in real, consistent effort.`,
    motivations: ["intrinsic: growth"],
    cognitiveStyle: { abstractVsConcrete: 0.2, activeVsReflective: 0.1, sequentialVsGlobal: 0, verbalVsVisual: 0, socialVsSolo: -0.2 },
    timeAvailability: "~30 min/day",
    emotionalBaseline: "motivated",
    strengths: ["Curiosity", "Willingness to start"],
    growthEdges: ["Consistency", "Confidence under uncertainty"],
    dimensions: [
      { label: "Curiosity", value: 82, note: "You ask great questions" },
      { label: "Drive", value: 74, note: "Strong intrinsic motivation" },
      { label: "Consistency", value: 55, note: "Not yet measured" },
      { label: "Confidence", value: 50, note: "Not yet measured" },
      { label: "Focus", value: 50, note: "Not yet measured" },
    ],
    teaching: { tone: "warm-direct", modalities: ["visual", "interactive", "story"], pace: "steady", depth: "balanced", encouragement: "medium" },
  };
}

export async function profilerSynthesize(req: ProfilerSynthesizeRequest): Promise<ProfilerSynthesizeResponse> {
  if (!hasKey()) return { profile: fallbackProfile(req.aspiration) };
  const user = `Aspiration: "${req.aspiration}".
Name: ${req.basics?.name || "(unknown)"} · Age group: ${req.basics?.ageGroup || "(unknown)"}
Their answers:
${transcriptBlock(req.transcript)}${mem(req.memoryContext)}

Synthesise their profile now.`;
  try {
    const parsed = parseJson<ProfileDraft>(await gen(PROFILER_SYNTH_SYSTEM, user, 0.6));
    return { profile: parsed && parsed.dimensions?.length ? parsed : fallbackProfile(req.aspiration) };
  } catch {
    return { profile: fallbackProfile(req.aspiration) };
  }
}

/* ════════════════════════════════════════════════════════════════════════
   HAT 2 — THE ARCHITECT : design the path
   ════════════════════════════════════════════════════════════════════════ */
const ARCHITECT_SYSTEM = `ROLE: THE ARCHITECT. Design a DEPENDENCY-AWARE transformation path for this person.

RULES:
- 3-5 PHASES, each with 4-7 STEPS.
- Each step has a DIFFICULTY (1-5) and PREREQUISITES (IDs of steps that must be completed first).
  Reference steps as "p{phaseIndex}s{stepIndex}" (e.g. "p0s2" = phase 0, step 2).
  Steps with no prerequisites: []. Later steps SHOULD reference earlier ones when logical.
- Step kinds: concept, practice, project, reflection, challenge, milestone.
  MUST have "milestone" at end of each phase, "reflection" between concept-heavy clusters.
- DIFFICULTY PROGRESSION: Phase 1 → 1-2, Phase 2 → 2-3, later → 3-5. Not uniform.
- "branchNote": where user might need remedial help OR could skip ahead. Optimizer uses this at runtime.
- Headline <= 6 words. Summary <= 24 words. Step summaries <= 10 words.
- Minutes per step: 5-45. Front-load quick wins.

COGNITIVE STYLE ADAPTATION (use the person's cognitiveStyle if provided):
- verbalVsVisual > 0.3: more "visual" content hints, diagrams, fewer text walls.
- activeVsReflective > 0.3: front-load "practice"/"project", defer theory.
- sequentialVsGlobal > 0.3: add "concept" overview step at start of each phase.
- abstractVsConcrete > 0.3: more examples, analogies, case studies.

SKILL TIERS — you MUST define 3-5 field-specific progression tiers for this aspiration.
These are NOT generic (no "Beginner/Intermediate/Advanced"). They use the LANGUAGE of the field:
- Guitar: "First Chords" → "Rhythm Player" → "Lead Techniques" → "Improviser" → "Session Musician"
- Finance: "Money Aware" → "Budget Master" → "Investor" → "Portfolio Builder" → "Wealth Architect"
- Coding: "Script Writer" → "App Builder" → "System Designer" → "Architecture Mind" → "Open-Source Contributor"
- Health: "Body Aware" → "Habit Builder" → "Strength Foundation" → "Performance Athlete"
Each tier maps to 1+ phases. The user sees their progression through these tiers on the dashboard.

STRICT JSON only.

Schema:
{ "headline": string, "summary": string, "startingPoint": string, "destination": string,
  "rationale": [string],
  "skillTiers": [{ "title": string, "description": string, "phaseIndices": [number] }],
  "phases": [{ "title": string, "timeframe": string, "why": string,
    "steps": [{ "title": string, "summary": string, "kind": string, "minutes": number,
                "difficulty": number, "prerequisites": [string], "branchNote": string }]
  }] }`;

function fallbackJourney(title: string): ArchitectResponse {
  return {
    journey: {
      headline: `Becoming ${title}`,
      summary: `Here's a path shaped around you. We start with quick wins to build belief, then turn knowledge into something real — adapting as you grow.`,
      startingPoint: "You're at the very beginning, and that's the perfect place to start.",
      destination: `Someone who lives "${title}" with confidence and skill.`,
      rationale: ["Reading what matters most to you…", "Finding the fastest path to a first win…", "Sequencing skills so each unlocks the next…", "Pacing it to your real life…"],
      phases: [
        { title: "Foundations", timeframe: "Weeks 1–2", why: "Build belief with fast, tangible wins.", steps: [
          { title: "See the whole picture", summary: "A 10-minute map of what 'good' looks like.", kind: "concept", minutes: 10 },
          { title: "Your first real attempt", summary: "Try it hands-on, safely, today.", kind: "practice", minutes: 20 },
        ] },
        { title: "Momentum", timeframe: "Weeks 3–4", why: "Turn understanding into something real.", steps: [
          { title: "Build a small real thing", summary: "A mini-project you can be proud of.", kind: "project", minutes: 40 },
          { title: "Where am I now?", summary: "A kind check-in on your growth.", kind: "reflection", minutes: 10 },
        ] },
      ],
    },
  };
}

export async function architect(req: ArchitectRequest): Promise<ArchitectResponse> {
  if (!hasKey()) return fallbackJourney(req.aspiration.title);
  const tweak = req.tweak ? `\n\nThey reviewed a previous version and asked you to adjust it: "${req.tweak}". Honour this.` : "";
  const profile = req.profile ? `\n\nWhat you know about them:\n${JSON.stringify(req.profile)}` : "";
  const user = `Aspiration: "${req.aspiration.title}" (area: ${req.aspiration.area})${req.aspiration.why ? `, because: ${req.aspiration.why}` : ""}.${profile}${req.transcript?.length ? `\n\nTheir own words:\n${transcriptBlock(req.transcript)}` : ""}${mem(req.memoryContext)}${tweak}

Design their journey now.`;
  try {
    const parsed = parseJson<ArchitectResponse["journey"]>(await gen(ARCHITECT_SYSTEM, user, 0.85));
    return parsed && parsed.phases?.length ? { journey: parsed } : fallbackJourney(req.aspiration.title);
  } catch {
    return fallbackJourney(req.aspiration.title);
  }
}

/* ────────────────────────────────────────────────────────────────────────
   HAT 2b — THE ARCHITECT (DOCUMENT MODE) : follow a document, exactly
   ──────────────────────────────────────────────────────────────────────── */
const ARCHITECT_DOC_SYSTEM = `ROLE: THE ARCHITECT, DOCUMENT MODE. You convert a source document's structure into a learning path that follows it EXACTLY — with ZERO deviation.

THIS IS NOT a creative curriculum. It is a faithful transcription of the document INTO a path:
- FOLLOW THE DOCUMENT'S OWN ORDER, top to bottom. Never reorder.
- COVER THE WHOLE DOCUMENT. Every section in the outline becomes learnable content. Never skip the tail.
- DO NOT INVENT topics that are not in the document. DO NOT merge away topics that are in it.
- Keep step/phase TITLES faithful to the document's own headings (light cleanup only — keep numbering if present).

MAPPING RULES:
- Each TOP-LEVEL unit in the outline ("# ...") → one PHASE (in the same order).
  • If the document has very few top-level units but many sub-sections, you MAY split a long part into
    consecutive phases, but NEVER change the order and NEVER drop content.
- Each SECTION / SUB-SECTION under it ("## ..." / "### ...") → one STEP (in the same order).
- If a phase would have >8 steps, keep them all — do not trim; fidelity beats brevity.
- Step "kind": "concept" for explanatory sections; "practice" for exercises/problems; "milestone" as the LAST
  step of each phase (a checkpoint over that part); "reflection" only if the document itself has review/summary sections.
- "prerequisites": reference the immediately-preceding step as "p{phase}s{step}" so the path stays linear and ordered.
- "difficulty": rise gradually across the document (early parts 1-2, later parts 3-5). Minutes per step: 6-30.
- "summary" (<= 12 words): describe what THAT section of the document covers — not generic filler.

SKILL TIERS: derive 3-5 tiers from the document's own major parts (use the document's language, mapped to phaseIndices).

HEADLINE <= 6 words (based on the document title). SUMMARY <= 24 words (what the document teaches, end to end).
"startingPoint": "The beginning of {title}." "destination": what the reader knows after finishing the whole document.

STRICT JSON only. Same schema as the standard Architect:
{ "headline": string, "summary": string, "startingPoint": string, "destination": string,
  "rationale": [string],
  "skillTiers": [{ "title": string, "description": string, "phaseIndices": [number] }],
  "phases": [{ "title": string, "timeframe": string, "why": string,
    "steps": [{ "title": string, "summary": string, "kind": string, "minutes": number,
                "difficulty": number, "prerequisites": [string], "branchNote": string }]
  }] }`;

export async function architectFromDocument(
  req: DocumentArchitectRequest,
): Promise<ArchitectResponse> {
  if (!hasKey()) return fallbackJourney(req.title);
  const tweak = req.tweak
    ? `\n\nThe learner reviewed the path and asked for this adjustment: "${req.tweak}". Honour it WITHOUT breaking fidelity to the document (never add topics that aren't in it, never change the order).`
    : "";
  const user = `DOCUMENT TITLE: "${req.title}"
HAS ITS OWN INDEX / TABLE OF CONTENTS: ${req.hasIndex ? "YES — follow it exactly" : "NO — follow the document's own top-to-bottom structure exactly"}

DOCUMENT OUTLINE (this is the ground truth — follow it with zero deviation):
${req.outline}
${tweak}

Build the path now. Every unit above must be represented, in this order.`;
  try {
    // Larger budget: faithful maps of long documents can be big.
    const parsed = parseJson<ArchitectResponse["journey"]>(
      await genText(ARCHITECT_DOC_SYSTEM, user, "base", 0.5, 16384),
    );
    return parsed && parsed.phases?.length ? { journey: parsed } : fallbackJourney(req.title);
  } catch {
    return fallbackJourney(req.title);
  }
}

/* ════════════════════════════════════════════════════════════════════════
   HAT 3 — THE MENTOR : deliver the step, tuned to you
   ════════════════════════════════════════════════════════════════════════ */
const MENTOR_SYSTEM = `ROLE: THE MENTOR. Deliver ONE step as a punchy, ACTIVE micro-experience.

BREVITY RULES:
- "intro": ONE sentence, <= 16 words.
- "blocks": MAX 4. Each "body" <= 30 words. Bullets <= 8 words, max 4.
- "encouragement": <= 8 words.
- No preamble, no "in this step we will…". Every word earns its place.

MULTIMODAL OUTPUT — you MUST use the right block kind for the content:

- "canvas": THE MOST POWERFUL OUTPUT. For any concept that involves motion, physics, circuits, systems,
  music, biology, chemistry, geometry, spatial reasoning, or anything VISUAL — generate a self-contained
  JavaScript drawing function. The code receives (ctx, w, h, t) where ctx is a CanvasRenderingContext2D,
  w/h are canvas dimensions, and t is the frame counter (increments each frame at ~60fps).
  RULES FOR CANVAS CODE:
  • Clear the canvas each frame: ctx.fillStyle = bg; ctx.fillRect(0,0,w,h)
  • Use warm colors matching ZOE palette: golds (#F6C863, #E9A23B), earth (#C5876E), deep (#8B5E3C)
  • Dark background: use "#1a1510" or "#0f0d0a" — never pure black
  • Label key elements with ctx.fillText. Animate things: use Math.sin(t*speed), progress loops, etc.
  • The code MUST be a function BODY (no function declaration). It receives ctx, w, h, t as arguments.
  • Keep it under 80 lines. Focus on ONE clear concept visualization.
  • EXAMPLES of when to use canvas:
    - Guitar: animate a fretboard with finger positions, strum patterns, chord shapes
    - Electricity: electrons flowing through a circuit, voltage/current visualization
    - Music theory: visualize sound waves, show intervals on a keyboard
    - Biology: cell division animation, DNA replication
    - Math: graph functions, show geometric transformations
    - Physics: projectile motion, pendulum, wave interference
    - Cooking: timer visualization, temperature curves
    - Finance: compound interest growth curve animation
  Put the code in "canvasCode" field. "body" should be a 1-line description of what it shows.

- "diagram": provide a valid MERMAID definition in the "mermaid" field. Use for processes, hierarchies,
  concept maps, timelines, state machines, sequences. ALWAYS prefer a diagram over describing one in text.
- "code": provide actual code in "body" with "language" field. Use for programming aspirations.
- "visual": provide "svg" with inline SVG markup for simple illustrations.
- "text"/"insight"/"example"/"analogy"/"steps"/"quote": for non-visual content.

WHEN TO USE CANVAS vs OTHER VISUALS:
- If the concept involves MOTION, CHANGE OVER TIME, or INTERACTION → canvas
- If it's a static hierarchy or flow → mermaid diagram
- If it's a simple shape or icon → svg visual
- If it's about writing code → code block

For concept/practice steps: ALWAYS include at least one "canvas" or "diagram" block. Text-only is boring.

INTERACTION — ALWAYS end with one. Types:
- "mcq": test comprehension. 4 options, one correct (answerIndex), explanation for wrong answers.
- "predict": ask them to predict an outcome before showing it (builds metacognition).
- "build": give them a concrete thing to do/make right now.
- "confidence": ask "how sure are you?" (1-5) BEFORE an mcq. Their calibration is tracked.
- "reflect": LAST resort — only when genuine self-examination adds value.

STRICT JSON only.

Schema:
{ "intro": string,
  "blocks": [ { "kind": "text"|"insight"|"example"|"analogy"|"steps"|"visual"|"quote"|"code"|"diagram"|"canvas",
                "title": string, "body": string, "items": [string],
                "language": string, "mermaid": string, "svg": string, "canvasCode": string } ],
  "visualHint": string,
  "interaction": { "type": "mcq"|"reflect"|"predict"|"build"|"confidence", "prompt": string,
                   "options": [string], "answerIndex": number, "explanation": string,
                   "confidencePrompt": string },
  "encouragement": string }`;

function fallbackMentor(step: MentorRequest["step"]): MentorResponse {
  return {
    intro: `Let's take on "${step.title}". Small, focused, and yours.`,
    blocks: [
      { kind: "text", body: step.summary || "Here's the core idea, kept simple — then you'll try it yourself." },
      { kind: "insight", title: "Why this matters", body: "Every expert was once exactly here. This step is a real rung on the ladder." },
    ],
    visualHint: "",
    interaction: { type: "reflect", prompt: "In one line: what's the first thing you'll try after this?" },
    encouragement: "You showed up — that's the hard part. Let's go.",
  };
}

export async function mentor(req: MentorRequest): Promise<MentorResponse> {
  if (!hasKey()) return fallbackMentor(req.step);
  const teaching = req.teaching ? `Teaching style to follow: ${JSON.stringify(req.teaching)}.` : "";
  const who = req.profileSummary ? `Who they are: ${req.profileSummary}.` : "";
  const ask = req.userMessage ? `\n\nThey just asked you: "${req.userMessage}". Answer it as part of this step.` : "";
  const user = `Aspiration: "${req.aspiration.title}" (area: ${req.aspiration.area}).
This step: "${req.step.title}" — ${req.step.summary} (kind: ${req.step.kind}, ~${req.step.minutes} min).
${who}
${teaching}${mem(req.memoryContext)}${ask}

Deliver this step now.`;
  try {
    const parsed = parseJson<MentorResponse>(await gen(MENTOR_SYSTEM, user, 0.75));
    return parsed && parsed.blocks?.length ? parsed : fallbackMentor(req.step);
  } catch {
    return fallbackMentor(req.step);
  }
}

/* ════════════════════════════════════════════════════════════════════════
   HAT 4 — THE OPTIMIZER : keep everything improving
   ════════════════════════════════════════════════════════════════════════ */
const OPTIMIZER_SYSTEM = `ROLE: THE OPTIMIZER. You are ZOE's self-improvement layer. You don't just tweak knobs —
you RESTRUCTURE the journey when the evidence demands it.

YOU HAVE THESE POWERS:
1. DIMENSION UPDATES — update ability/trait scores based on observed performance, NOT self-report.
   Include "source": "observed" or "assessed" so confidence is tracked correctly.
2. TEACHING STYLE — adjust tone, pace, depth, modalities based on engagement patterns.
3. JOURNEY MUTATIONS — the most powerful tool. You can:
   - "skip_step": mark a step skippable when mastery is already proven (masteryScore >= 85)
   - "insert_step": add a bridging/remedial step when they're struggling (low mastery + high time)
   - "repeat_step": flag a step for re-engagement when mastery decayed
   - "reorder": reorder upcoming steps when the current sequence isn't working

DECISION FRAMEWORK:
- If mcqAccuracy > 0.85 on recent steps → consider skipping ahead
- If mcqAccuracy < 0.5 AND timeSpent > 2x expected → insert remedial step
- If streakConsistency < 0.3 → reduce step length, increase encouragement
- If confidenceCalibration is poor (overconfident) → add more "predict" interactions
- If reflectionDepth < 15 words avg → switch reflections to mcq/predict
- 3+ consecutive struggles on same difficulty → insert easier bridging step

Be evidence-based. Cite specific events in rationale. STRICT JSON only.

Schema:
{ "rationale": [string],
  "dimensionDeltas": [{ "label": string, "value": number, "note": string, "source": "observed"|"assessed" }],
  "teaching": { "tone": string, "modalities": [string], "pace": "gentle"|"steady"|"intense",
                "depth": "concise"|"balanced"|"deep", "encouragement": "light"|"medium"|"high" },
  "journeyNote": string,
  "journeyMutations": [
    { "action": "skip_step"|"insert_step"|"repeat_step"|"reorder",
      "stepId": string, "afterStepId": string,
      "step": { "title": string, "summary": string, "kind": string, "minutes": number, "difficulty": number },
      "stepIds": [string], "reason": string }
  ] }`;

function fallbackOptimizer(): OptimizerResponse {
  return { rationale: ["Not enough recent signal to adjust much yet."], dimensionDeltas: [], journeyNote: "" };
}

export async function optimizer(req: OptimizerRequest): Promise<OptimizerResponse> {
  if (!hasKey() || req.recentEvents.length === 0) return fallbackOptimizer();
  const events = req.recentEvents.map((e) => `- (${e.ageDays}d ago) [${e.type}${e.sentiment ? `/${e.sentiment}` : ""}] ${e.summary}`).join("\n");
  const behavioralStr = req.behavioral ? `\nBehavioral signals: ${JSON.stringify(req.behavioral)}` : "";
  const stepStr = req.stepMetrics?.length ? `\nStep-level data:\n${req.stepMetrics.map((s) => `- "${s.title}" (${s.stepId}): mastery=${s.mastery ?? "?"}, attempts=${s.attempts}, time=${s.timeSpent}s (expected ${s.expected * 60}s)`).join("\n")}` : "";
  const user = `Current profile: ${req.profileSummary || "(unknown)"}.
Current teaching style: ${JSON.stringify(req.teaching || {})}.${behavioralStr}${stepStr}
Recent activity:
${events}${mem(req.memoryContext)}

Propose adjustments now.`;
  try {
    const parsed = parseJson<OptimizerResponse>(await gen(OPTIMIZER_SYSTEM, user, 0.4));
    return parsed && Array.isArray(parsed.rationale) ? parsed : fallbackOptimizer();
  } catch {
    return fallbackOptimizer();
  }
}

/* ════════════════════════════════════════════════════════════════════════
   THE COMPANION — "Ask ZOE anything" (voice or text)
   The conversational front door. Answers anything, but always as YOUR
   companion: personal, growth-framed, and connected to who you're becoming.
   ════════════════════════════════════════════════════════════════════════ */
const COMPANION_SYSTEM = `ROLE: THE COMPANION. The person just asked ZOE something — by voice or text. Answer like a wise, warm friend
who knows them and believes they can become whatever they want. Be genuinely useful and specific, not generic.

Ground the answer in who they are and what they're becoming when relevant. If they're asking to learn or grow
something new, you may suggest turning it into an aspiration (set action.kind = "add_aspiration" and put a clean
aspiration title in action.payload). If it relates to a journey they already have, you may set
action.kind = "open_journey". Otherwise action.kind = "none".

Keep "answer" tight and human: 2-3 short sentences, <= 45 words — it's read aloud, so it must sound natural spoken.
Use "blocks" ONLY when structure genuinely helps (steps, key points); each body <= 25 words, bullets <= 8 words.
Lead with the answer, never preamble. Offer 2-3 smart "followups" they'd likely ask next, and 1-3 "related" cards
(a relevant idea, person, resource, or next move with a one-line snippet). "chips" are 3-5 short topic facets.
STRICT JSON only.

Schema:
{ "title": string, "category": string, "chips": [string],
  "answer": string,
  "blocks": [{ "title": string, "body": string, "items": [string] }],
  "related": [{ "title": string, "snippet": string }],
  "followups": [string],
  "action": { "kind": "add_aspiration"|"open_journey"|"none", "label": string, "payload": string } }`;

function fallbackCompanion(q: string): CompanionResponse {
  const clean = q.trim().replace(/\s+/g, " ");
  return {
    answer: {
      title: clean.length > 48 ? clean.slice(0, 46) + "…" : clean || "Let's figure this out",
      category: "Guidance",
      chips: ["Start here", "Why it matters", "First step", "Go deeper"],
      answer: `Here's how I'd think about "${clean || "this"}": start smaller than feels impressive, win once, and let momentum do the rest. The version of you who's already good at this was built one honest attempt at a time — let's take the first one today.`,
      blocks: [
        { title: "A simple way in", body: "Break it into the smallest move you could do in 10 minutes, then actually do that move. Clarity comes from action, not from more thinking." },
      ],
      related: [
        { title: "Make it an aspiration", snippet: "Turn this into a real path ZOE designs around you." },
      ],
      followups: ["What should my very first step be?", "How do I stay consistent with this?", "Can you make this a journey for me?"],
      action: { kind: "add_aspiration", label: "Make this a journey", payload: clean },
    },
  };
}

export async function companion(req: CompanionRequest): Promise<CompanionResponse> {
  const q = (req.question || "").trim();
  if (!q) return fallbackCompanion("");
  if (!hasKey()) return fallbackCompanion(q);
  const who = req.profileSummary ? `Who they are: ${req.profileSummary}.` : "";
  const asps = req.aspirations?.length ? `They're currently becoming: ${req.aspirations.join("; ")}.` : "They have no aspirations set yet.";
  const thread = req.thread?.length
    ? `\n\nConversation so far:\n${req.thread.map((t, i) => `${i + 1}. They asked: "${t.q}"\n   You answered: ${t.a}`).join("\n")}`
    : "";
  const user = `${who}
${asps}${thread}${mem(req.memoryContext)}

They just asked: "${q}"

Answer now.`;
  try {
    const parsed = parseJson<CompanionResponse["answer"]>(await gen(COMPANION_SYSTEM, user, 0.8));
    return parsed && parsed.answer ? { answer: parsed } : fallbackCompanion(q);
  } catch {
    return fallbackCompanion(q);
  }
}
