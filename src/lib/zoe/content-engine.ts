/**
 * ZOE Content Engine — on-demand rich lesson generation.
 *
 * Three-stage pipeline:
 *   1. planLesson()     — Planner (gemini-2.5-flash) decides structure + modalities
 *   2. generateMedia()  — Nano Banana + Veo 3.1 produce images/videos in parallel
 *   3. generateLesson() — Generator (gemini-2.5-pro) writes narration + interactive code
 */

import { genText, parseJson, genImage, genVideo, hasTextKey } from "./genai";
import { verifyLesson, verifyInteractiveCode, buildRepairInstruction } from "./lesson-verifier";
import type {
  LessonPlan, LessonContent, LessonSection,
  MediaPrompt, MediaAsset, ContentRequest, LessonSource,
} from "./content-types";

/* ── Source fidelity helpers (document-grounded lessons) ─────────────────── */

/** Renders the matched PDF section + its figures into a prompt block. */
function sourceBlock(source?: LessonSource): string {
  if (!source?.faithful || !source.excerpt?.trim()) return "";
  const figs = source.figures?.length
    ? "\n\nFIGURES IN THIS SECTION — reproduce each one faithfully:\n" +
      source.figures.map((f, i) =>
        `[F${i + 1}] kind=${f.kind}${f.caption ? ` · caption="${f.caption}"` : ""}\n     ${f.description}` +
        `${f.labels?.length ? `\n     labels: ${f.labels.join("  |  ")}` : ""}` +
        `${f.values ? `\n     data: ${f.values}` : ""}`
      ).join("\n")
    : "";
  return `\n\n════ SOURCE MATERIAL — teach EXACTLY this. Do NOT add, invent, or stretch. ════\n${source.excerpt}${figs}\n════ END SOURCE ════`;
}

/** Appended to the PLANNER system prompt when a step is document-grounded. */
const PLANNER_FAITHFUL = `

════ FAITHFUL / DOCUMENT MODE ════
SOURCE MATERIAL is provided in the user message. You MUST:
- Plan a lesson that teaches ONLY what the source contains. Do NOT introduce concepts, examples, or tangents that are not in it.
- Match DEPTH to the source: a short source section → 1-2 tight sections; a rich one → more. NEVER pad a thin topic into a long lesson. Section count reflects the source, not a fixed target.
- For EACH figure in the source, plan a section that reproduces it:
  • "diagram"/"equation" → "diagram_animated" or "canvas_animation" (redraw as vector graphics with the exact labels).
  • "chart"/"table"       → "graph_interactive" (plot the exact given values).
  • "photo"               → "ai_image" only if it truly aids understanding; otherwise a labelled "diagram_animated" schematic. NEVER pass a photo off as a diagram.
- Prefer procedural SVG/canvas over ai_image for anything schematic — it is faithful and precise, and needs no media generation.`;

/* ════════════════════════════════════════════════════════════════════════
   STAGE 1 — THE PLANNER
   ════════════════════════════════════════════════════════════════════════ */

const PLANNER_SYSTEM = `ROLE: CONTENT PLANNER. You decide HOW to teach a concept using the richest possible modalities.

Given a step (topic, subject area, difficulty), output a LessonPlan that selects the OPTIMAL
teaching modality for each section. You have access to three AI generation capabilities:

MODALITY OPTIONS:
- "3d_simulation" — Three.js scene with experiment controls. Best for physics, engineering, spatial.
- "canvas_animation" — 2D animated visualization. Good for diagrams-in-motion, data flow, cycles.
- "interactive_instrument" — Domain-specific playable tool (guitar fretboard, piano keyboard, beat grid, color mixer). Best for music, art, physical skills.
- "code_playground" — Live code editor with execution. For programming/CS topics.
- "graph_interactive" — Draggable graph, chart, or equation visualizer. Best for math, statistics, finance.
- "diagram_animated" — Animated flowchart/diagram with step-through. For processes, architectures.
- "ai_image" — Generate a photorealistic or illustrated image via AI. Best for:
  • Anatomy, biology, real-world reference photos
  • Historical/cultural scenes, architectural examples
  • Art technique demonstrations, food/cooking visuals
  • Any concept where a realistic image teaches better than a simulation
- "ai_video" — Generate a short 8-second video clip via AI. Best for:
  • Physical movement/technique demonstrations (instrument technique, dance, yoga, sports form)
  • Time-based processes (chemical reactions, plant growth, manufacturing)
  • Real-world scenarios that must be SEEN in motion
- "ai_image_interactive" — AI image with interactive annotations/overlays.
- "text_rich" — Enhanced text (last resort fallback).

MODALITY MAP BY SUBJECT:
- Physics/Engineering: 3d_simulation + ai_image (real examples) + ai_video (lab demos)
- Music: interactive_instrument + ai_video (technique) + ai_image (notation)
- Biology/Medicine: ai_image (anatomy) + ai_video (processes) + canvas_animation (cycles)
- Art/Design: ai_image (style examples) + interactive_instrument (color tools)
- Cooking: ai_image (plating) + ai_video (knife techniques) + canvas_animation (timers)
- Finance/Economics: graph_interactive + ai_image (infographics) + canvas_animation (growth)
- Programming/CS: code_playground + diagram_animated + canvas_animation (algorithms)
- Math: graph_interactive + canvas_animation + 3d_simulation (geometry)
- Sports/Fitness: ai_video (form/technique) + ai_image (muscle groups)
- Language/Writing: ai_image (context visuals) + canvas_animation (sentence structure)

RULES:
- Generate 3-6 sections per lesson. Each section teaches ONE concept deeply.
- Every lesson MUST have at least one interactive or media section. No text-only lessons.
- Include media prompts for every section that uses ai_image or ai_video.
- Image prompts: be specific and detailed. Include subject, angle, lighting, style.
- Video prompts: describe the action, camera angle, duration context (8 seconds).
- hookQuestion: a provocative opening question for at least the first section.
- experimentControls: list specific controls for interactive sections (e.g. "voltage: slider 0-12V").

STRICT JSON only.

Schema:
{ "stepId": string,
  "totalMinutes": number,
  "sections": [{ "title": string, "concept": string, "modality": string,
                  "narrationSteps": number, "experimentControls": [string],
                  "hookQuestion": string, "mediaIds": [string] }],
  "mediaPrompts": [{ "id": string, "type": "image"|"video", "prompt": string,
                      "sectionIndex": number, "style": string }],
  "assessmentType": "mcq"|"build"|"predict"|"code" }`;

function fallbackPlan(stepId: string, minutes: number): LessonPlan {
  return {
    stepId,
    totalMinutes: minutes,
    sections: [
      { title: "Core Concept", concept: "Main idea", modality: "canvas_animation", narrationSteps: 3, hookQuestion: "What do you think happens here?" },
      { title: "In Practice", concept: "Application", modality: "text_rich", narrationSteps: 2 },
    ],
    mediaPrompts: [],
    assessmentType: "mcq",
  };
}

export async function planLesson(req: ContentRequest): Promise<LessonPlan> {
  if (!hasTextKey()) return fallbackPlan(req.step.id, req.step.minutes);

  const faithful = !!req.source?.faithful;
  const user = `Step: "${req.step.title}" — ${req.step.summary}
Subject area: ${req.aspiration.area}
Aspiration: "${req.aspiration.title}"
Difficulty: ${req.step.difficulty}/5
Duration: ~${req.step.minutes} minutes
Step kind: ${req.step.kind}
${req.profileSummary ? `Learner profile: ${req.profileSummary}` : ""}
${req.teachingStyle ? `Teaching style: ${JSON.stringify(req.teachingStyle)}` : ""}${sourceBlock(req.source)}

${faithful
  ? "Plan the lesson STRICTLY from the source material above — proportional depth, reproduce its figures, nothing invented."
  : "Plan the lesson now. Be ambitious with modalities — use images and video where they genuinely improve understanding."}`;

  try {
    // Planning is reasoning-light → base model (Claude Sonnet 4.6)
    const raw = await genText(PLANNER_SYSTEM + (faithful ? PLANNER_FAITHFUL : ""), user, "base", faithful ? 0.4 : 0.7);
    const parsed = parseJson<LessonPlan>(raw);
    if (parsed?.sections?.length) {
      parsed.stepId = req.step.id;
      return parsed;
    }
    return fallbackPlan(req.step.id, req.step.minutes);
  } catch {
    return fallbackPlan(req.step.id, req.step.minutes);
  }
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 2 — MEDIA GENERATION
   ════════════════════════════════════════════════════════════════════════ */

export async function generateMedia(prompts: MediaPrompt[]): Promise<MediaAsset[]> {
  if (!prompts.length) return [];

  const tasks = prompts.map(async (p): Promise<MediaAsset> => {
    if (p.type === "image") {
      const result = await genImage(p.prompt, p.style);
      if (result) {
        return {
          id: p.id,
          type: "image",
          dataUrl: `data:${result.mimeType};base64,${result.base64}`,
          prompt: p.prompt,
          status: "ready",
        };
      }
      return { id: p.id, type: "image", prompt: p.prompt, status: "failed" };
    }

    if (p.type === "video") {
      const result = await genVideo(p.prompt);
      if (result) {
        return {
          id: p.id,
          type: "video",
          videoUri: result.uri,
          prompt: p.prompt,
          status: "ready",
        };
      }
      return { id: p.id, type: "video", prompt: p.prompt, status: "failed" };
    }

    return { id: p.id, type: p.type, prompt: p.prompt, status: "failed" };
  });

  return Promise.all(tasks);
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 3 — LESSON GENERATOR
   ════════════════════════════════════════════════════════════════════════ */

const GENERATOR_SYSTEM = `ROLE: LESSON GENERATOR. You produce narrated, beat-synced VISUAL lessons — like a great
teacher DRAWING an accurate diagram while explaining, one idea at a time. Output narration +
one animated 2D-canvas visual per section + an exercise. The lesson is WATCHED, not operated:
it auto-plays. NO interactivity (no clicks, taps, sliders, or graded input in the visual).

HOW BEATS WORK
"narration" is an array of BEATS (short spoken lines, one idea each). You author ONE function
the engine calls every frame:  window.zoeRender(t, phase, pt, bt)
  • phase = current beat index (0-based).   • pt = 0..1 progress through this beat (use appear()).
  • t = ms since section start (ambient motion).   • bt = ms since this beat started.
zoeRender is PURE: clear and redraw the whole frame every call; don't accumulate reveal state.

THE 4 THINGS THAT MAKE A LESSON GOOD (in priority order):
1) EXACT SYNC. narration[i] describes EXACTLY what the screen reveals at phase i — write them
   together. Every beat reveals a NEW element (never plays over an unchanged screen). Earlier
   phases' elements stay visible. narration.length === the number of phases zoeRender handles.
2) DEPTH + ACCURACY. Draw the REAL thing being taught (its actual parts, correct proportions,
   correct values/labels) — never a generic placeholder. If SOURCE MATERIAL/figures give labels,
   numbers, or formulas, reproduce them EXACTLY. Correct-but-plain beats flashy-but-wrong. phase 0
   is already a full accurate picture, not a lone title.
3) ANIMATE — EVERY SECTION IS A MOVING VISUAL, NOT A STATIC SLIDESHOW. Bring each new element in
   with appear(pt,...); and beyond reveals, make the concept MOVE: animate the actual thing the
   topic describes — a value rising/falling, a process stepping through, an object travelling, a
   quantity being measured, a diagram assembling, a flow moving along its path, a graph plotting.
   Use t for continuous life (drift, pulse, flow) and pt for the beat's action. The motion must
   demonstrate the concept (not random particles). A section that never moves is a failure.
4) CLEAN LAYOUT (see LAYOUT below) — nothing overlaps, positions are computed, everything fits.

TOOLKIT (injected — do NOT redefine):
- zoeStage(canvas,1000,625) → fixed 1000×625 stage, auto-scaled to any screen (this is your
  responsiveness — just author in W/H units, no media queries needed). Returns {W,H,...}.
- var draw = zoeDraw(ctx,S); methods (all safe): draw.clear(); draw.bg(top,bot);
  draw.text(s,x,y,{size,color,weight,align,glow,alpha}); draw.pill(s,x,y,{size,color,bg,stroke});
  draw.rect(x,y,w,h,{fill,stroke,lineWidth,radius,alpha}); draw.line(x1,y1,x2,y2,{color,width,dash});
  draw.arrow(x1,y1,x2,y2,{color,width,head}); draw.circle(x,y,r,{fill,stroke,glow}); draw.dot(x,y,r,color,glow);
  draw.numberLine(x0,x1,y,{min,max,step}); draw.axes(ox,oy,len,{w,h,xLabel,yLabel}).
  You may also use raw ctx (paths, curves, gradients) to draw the real figure part-by-part.
- appear(pt,start,end) → eased 0..1 reveal.   ZC → palette (ZC.gold/amber/cream/dim/line/good/bad/cool/violet).

LAYOUT — NO OVERLAPS, COMPUTED POSITIONS (this is where lessons currently break):
- Reserve space BEFORE drawing. Title in top band (y<H*0.12), diagram in the middle, short
  captions in bottom band (y>H*0.86). Never draw text/box on top of another element. If a big
  container holds sub-items, give the container its OWN vertical span and place the sub-items
  BELOW/inside it with a clear gap — never let them overlap the container.
- COMPUTE even layouts, never eyeball. For N items of width itemW across [cx0..cx1]:
    var gap=((cx1-cx0)-N*itemW)/(N+1);  var xOf=i=>cx0+gap+i*(itemW+gap);   // equal gaps + margins
  Same-role items share the same size and gap; a column shares one x; a row shares one y; leftover
  space splits equally into left/right margins so the group is centred and symmetric.
- Labels over artwork go on a draw.pill(); keep clear gaps; use a short leader line if needed.
- Don't render long paragraphs on canvas (the spoken beat carries the words) — only short labels,
  numbers, formulas, and the diagram.

HARD RULES:
- ONE complete HTML doc (<!DOCTYPE html>…). Classic <script> only (no import/export).
- 2D ONLY — Canvas 2D + zoeStage + zoeDraw (+ raw ctx). Do NOT load Three.js or any library.
- Define window.zoeRender(t,phase,pt,bt); do NOT write your own RAF loop. Call emit('ready') at end.
- No pointer/click handlers, buttons, onExperiment/onReset, or emit('submission').
- Canvas CSS only: canvas{display:block;touch-action:none}. Resize: window.addEventListener('resize',()=>{S=zoeStage(c,1000,625);}).

TEMPLATE (narration = 4 beats; note phase 0 is already a full picture, each phase adds one thing):
<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0f0d0a;overflow:hidden}canvas{display:block;touch-action:none}</style>
</head><body>
<canvas id="c"></canvas>
<script>
var c=document.getElementById('c'), ctx=c.getContext('2d');
var S=zoeStage(c,1000,625), W=S.W, H=S.H, draw=zoeDraw(ctx,S);
window.addEventListener('resize',function(){ S=zoeStage(c,1000,625); });
window.zoeRender=function(t,phase,pt,bt){
  draw.clear(); draw.bg('#161009','#0d0b08');
  draw.text('Average Speed = distance ÷ time', W/2, H*0.08, {size:26,color:ZC.gold,weight:'800'});
  // phase 0: full road + markers already drawn
  var roadY=H*0.55, x0=W*0.12, x1=W*0.88, a0=(phase===0)?appear(pt,0,0.6):1;
  draw.rect(x0,roadY,x1-x0,10,{fill:'rgba(250,245,235,0.18)',alpha:a0});
  var pxOf=function(m){return x0+(m/80)*(x1-x0);};
  for(var m=0;m<=80;m+=20){ draw.line(pxOf(m),roadY+10,pxOf(m),roadY+20,{color:ZC.dim,alpha:a0});
    draw.text(m+' m',pxOf(m),roadY+34,{size:13,color:ZC.dim,alpha:a0}); }
  // beat 1: car drives 0→80
  var carM=phase<1?0:(phase===1?appear(pt,0.05,0.95)*80:80), carX=pxOf(carM);
  draw.rect(carX-22,roadY-24,44,22,{fill:ZC.amber,radius:6});
  if(phase>=1) draw.pill(Math.round(carM)+' m', carX, roadY-42, {size:14,color:ZC.cream});
  // beat 2: the division
  if(phase>=2){ var a2=(phase===2)?appear(pt,0,0.55):1; draw.text('80 m ÷ 10 s', W/2, H*0.78, {size:24,color:ZC.cream,weight:'800',alpha:a2}); }
  // beat 3: the answer
  if(phase>=3){ var a3=appear(pt,0,0.55); draw.text('= 8 m/s', W/2, H*0.90, {size:30,color:ZC.gold,weight:'800',glow:14,alpha:a3}); }
};
emit('ready');
</script>
</body></html>

OUTPUT — STRICT JSON only, no prose outside it:
- Every section has a substantial ANIMATED visual (≥180 lines of real, accurate drawing code for
  the actual topic — it moves and demonstrates the concept, never a static slideshow).
- 3-7 beats/section, one idea each, 1-2 short spoken sentences, warm + direct, each matching its phase.
Schema:
{ "sections": [{ "title": string, "hookQuestion": string,
                  "narration": [{ "text": string }],
                  "interactiveCode": string,
                  "experimentControls": [] }],
  "exercise": { "type": "mcq"|"predict", "prompt": string,
                "options"?: [string], "correctIndex"?: number, "explanation": string },
  "summary": string }
("interactiveCode" is a legacy field name — it holds your non-interactive VISUAL canvas HTML.
Always populate it for every section.)`;


/* Appended to the GENERATOR system prompt when a step is document-grounded. */
const GENERATOR_FAITHFUL = `

════ FAITHFUL / DOCUMENT MODE ════
SOURCE MATERIAL is provided in the user message. This lesson MUST faithfully teach it:
- Narration conveys the source's ACTUAL definitions, statements, formulas and worked-example steps — accurately, in ZOE's warm voice, WITHOUT adding facts that aren't in the source.
- Reproduce EACH provided figure faithfully as an animated 2D canvas visual (zoeDraw/ctx):
  • Use the EXACT labels and values given. Recreate the described geometry / parts / arrows / axes precisely.
  • "diagram"/"equation" → draw it part-by-part with Canvas 2D. "chart"/"table" → plot/lay out the exact values.
  • Do NOT draw a loose approximation and do NOT substitute a generic demo. Match the description.
  • "photo": you cannot redraw a photograph exactly — instead render a CLEAN LABELLED SCHEMATIC of what it depicts and note it represents the photo. Never present a fake image as the real one.
- Proportional depth ONLY: no invented sections, tangents, or "fun facts" beyond the source. If the source section is short, keep the lesson short.`;

function fallbackLesson(plan: LessonPlan): Omit<LessonContent, "plan" | "media"> {
  return {
    sections: plan.sections.map((s) => ({
      title: s.title,
      hookQuestion: s.hookQuestion,
      narration: [{ text: `Let's explore: ${s.concept}` }],
      experimentControls: [],
    })),
    exercise: {
      type: "mcq",
      prompt: "What was the key takeaway from this lesson?",
      options: ["I understand the core concept", "I need to review", "I want to go deeper", "I'm not sure"],
      correctIndex: 0,
      explanation: "Understanding the core concept is the foundation for everything else.",
    },
    summary: `Explored ${plan.sections.length} concepts in this lesson.`,
  };
}

export async function generateLesson(
  plan: LessonPlan,
  media: MediaAsset[],
  req: ContentRequest,
): Promise<LessonContent> {
  if (!hasTextKey()) return { plan, media, ...fallbackLesson(plan) };

  const faithful = !!req.source?.faithful;

  // Context comes from the PLAN's media prompts (ids + descriptions), not resolved
  // bytes — so this can run in parallel with media generation.
  const mediaContext = plan.mediaPrompts.length
    ? plan.mediaPrompts.map((m) => `- ${m.id} (${m.type}): "${m.prompt}"`).join("\n")
    : media.filter((m) => m.status === "ready").map((m) => `- ${m.id} (${m.type}): "${m.prompt}"`).join("\n");

  const planContext = plan.sections
    .map((s, i) => `Section ${i + 1}: "${s.title}" — concept: ${s.concept}, modality: ${s.modality}${s.experimentControls?.length ? `, controls: ${s.experimentControls.join(", ")}` : ""}${s.hookQuestion ? `, hook: "${s.hookQuestion}"` : ""}${s.mediaIds?.length ? `, media: ${s.mediaIds.join(", ")}` : ""}`)
    .join("\n");

  const user = `LESSON PLAN:
${planContext}

GENERATED MEDIA ASSETS:
${mediaContext || "(none)"}

CONTEXT:
Step: "${req.step.title}" — ${req.step.summary}
Subject area: ${req.aspiration.area}
Aspiration: "${req.aspiration.title}"
Difficulty: ${req.step.difficulty}/5
Duration: ~${req.step.minutes} minutes
${req.profileSummary ? `Learner: ${req.profileSummary}` : ""}${sourceBlock(req.source)}

${faithful
  ? "Generate the full lesson STRICTLY from the source material above. Teach exactly what it says, reproduce its figures faithfully as an accurate animated 2D canvas visual (exact labels/values), keep narration exactly synced to each phase, and keep depth proportional — invent nothing."
  : "Generate the full visual lesson now. For each section, draw the ACTUAL topic accurately as an auto-playing 2D canvas animation with narration exactly synced to each phase — depth and correctness over decoration, no empty/title-only frames, no interactivity."}`;

  try {
    // Visual (canvas) generation is hard → Claude Opus 4.8 (reasoning tier)
    const system = GENERATOR_SYSTEM + (faithful ? GENERATOR_FAITHFUL : "");
    console.log(
      `[generateLesson] "${req.step.title}" → generating visual lesson ` +
      `(system ${system.length} chars, faithful=${faithful}, sections=${plan.sections.length})`,
    );
    const raw = await genText(system, user, "reasoning", faithful ? 0.5 : 0.7, 32000);
    const parsed = parseJson<Omit<LessonContent, "plan" | "media">>(raw);
    const codeSections = parsed?.sections?.filter((s) => s.interactiveCode && s.interactiveCode.trim().length >= 500).length ?? 0;
    console.log(
      `[generateLesson] "${req.step.title}" ← got ${parsed?.sections?.length ?? 0} sections ` +
      `(${codeSections} with interactive code), raw ${raw.length} chars`,
    );
    if (parsed?.sections?.length) {
      const cleaned = {
        ...parsed,
        sections: parsed.sections.map((s, i) => {
          const sec = { ...s };
          if (!sec.narration?.length) {
            sec.narration = [{ text: plan.sections[i]?.concept || "Explore this concept." }];
          }
          if (sec.interactiveCode && sec.interactiveCode.trim().length < 500) {
            sec.interactiveCode = undefined;
          }
          if (!sec.experimentControls) sec.experimentControls = [];
          sec.generatedBy = "reasoning";
          return sec;
        }),
      };
      if (!cleaned.exercise) cleaned.exercise = fallbackLesson(plan).exercise;
      if (!cleaned.summary) cleaned.summary = `Explored ${cleaned.sections.length} concepts in this lesson.`;
      return { plan, media, ...cleaned };
    }
    return { plan, media, ...fallbackLesson(plan) };
  } catch {
    return { plan, media, ...fallbackLesson(plan) };
  }
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 3.5 — VERIFY & REPAIR (the "is everything in place?" check)
   ════════════════════════════════════════════════════════════════════════ */

/** Ask the model to fix a single broken section's interactive code. */
async function repairSection(section: LessonSection): Promise<string | null> {
  if (!section.interactiveCode || !hasTextKey()) return null;
  const issues = verifyInteractiveCode(section.interactiveCode);
  const fatal = issues.filter((i) => i.severity === "fatal");
  if (!fatal.length) return section.interactiveCode;

  try {
    const instruction = buildRepairInstruction(section, issues);
    const raw = await genText(
      `ROLE: CODE REPAIR. You fix broken self-contained interactive HTML lessons. Return STRICT JSON: { "interactiveCode": "<full corrected HTML document>" }`,
      `BROKEN CODE:\n\n${section.interactiveCode}\n\n${instruction}`,
      "reasoning",
      0.4,
      32000,
    );
    const parsed = parseJson<{ interactiveCode: string }>(raw);
    if (parsed?.interactiveCode && verifyInteractiveCode(parsed.interactiveCode).every((i) => i.severity !== "fatal")) {
      return parsed.interactiveCode;
    }
  } catch { /* fall through */ }
  return null;
}

/**
 * Verify the whole lesson; repair broken sections once; if still broken,
 * strip the code so the section degrades gracefully (narration/media) instead
 * of showing a black box. Returns the cleaned lesson + verdict summary.
 */
export async function verifyAndRepairLesson(
  lesson: LessonContent,
): Promise<{ lesson: LessonContent; summary: string; repaired: number; dropped: number }> {
  const verdict = verifyLesson(lesson);
  let repaired = 0;
  let dropped = 0;

  if (verdict.ok) {
    const sections = lesson.sections.map((s, i) => ({ ...s, verified: verdict.sections[i]?.ok ?? true }));
    return { lesson: { ...lesson, sections }, summary: verdict.summary, repaired, dropped };
  }

  const sections = await Promise.all(
    lesson.sections.map(async (section, i) => {
      const sv = verdict.sections[i];
      if (!sv || sv.ok) return { ...section, verified: true };

      const fixed = await repairSection(section);
      if (fixed) {
        repaired++;
        return { ...section, interactiveCode: fixed, verified: true };
      }
      // Couldn't fix — drop the code, keep narration/media so it's never a black box
      dropped++;
      return { ...section, interactiveCode: undefined, verified: false };
    }),
  );

  const finalVerdict = verifyLesson({ ...lesson, sections });
  return {
    lesson: { ...lesson, sections },
    summary: `${finalVerdict.summary}${repaired ? ` Repaired ${repaired}.` : ""}${dropped ? ` ${dropped} fell back to narration.` : ""}`,
    repaired,
    dropped,
  };
}

/* ════════════════════════════════════════════════════════════════════════
   FULL PIPELINE — chains all stages
   ════════════════════════════════════════════════════════════════════════ */

export async function generateFullLesson(req: ContentRequest): Promise<LessonContent> {
  console.log(`[generateFullLesson] START "${req.step.title}" (faithful=${!!req.source?.faithful})`);
  const plan = await planLesson(req);
  // Media (Gemini) and lesson code (Opus) both depend only on the plan → run in parallel
  const [media, lesson] = await Promise.all([
    generateMedia(plan.mediaPrompts),
    generateLesson(plan, [], req),
  ]);
  const withMedia: LessonContent = { ...lesson, media };
  const { lesson: verified } = await verifyAndRepairLesson(withMedia);
  return verified;
}
