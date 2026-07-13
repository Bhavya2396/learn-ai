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

const GENERATOR_SYSTEM = `ROLE: LESSON GENERATOR. You produce narrated, beat-synced interactive lessons — the
feel of a great teacher DRAWING on a board WHILE they explain, one idea at a time.

You receive a LessonPlan + media assets. Output narration + one self-contained interactive
visual per section + an exercise.

══════════════════════════════════════════════════════════════
  THE DELIVERY MODEL — BEATS (read this twice)
══════════════════════════════════════════════════════════════
A section's "narration" array is a list of BEATS — short spoken lines (one idea each).
The player SPEAKS them one at a time; as each beat plays, your visual must REVEAL the
matching part of the picture, in sync. You do NOT wire buttons for this — instead you author
ONE render function that the ZOE engine calls every frame:

  window.zoeRender = function(t, phase, pt, bt) { ... redraw the WHOLE frame ... }

  • phase = index of the CURRENT beat (0 = first narration line, 1 = second, …).
  • pt    = smooth 0..1 progress THROUGH the current beat (perfect for appear()).
  • t     = ms since the section started  (use for ambient motion: pulsing, drift).
  • bt    = ms since THIS beat started.

So: beat/phase 0 draws the setup; when phase reaches 1, reveal the next element; use
appear(pt,0,0.6) to fade/slide each new element in as its line is spoken. The number of
beats in "narration" = the number of phases your zoeRender handles (0 … narration.length-1).
Everything must also look right at pt=1 for every phase (the frame holds after a beat ends).

zoeRender MUST be a pure function of (t,phase,pt): CLEAR and redraw everything each call.
Do NOT accumulate state across frames for the reveal (ambient particles are fine).

══════════════════════════════════════════════════════════════
  THE TOOLKIT (all injected — do NOT redefine)
══════════════════════════════════════════════════════════════
- zoeStage(canvas, W, H) → fixed reference stage, scaled-to-fit, HiDPI. Author ALL coords as
  CONSTANTS in W×H space (use 1000×625). Returns {W,H,...}. Call once + on resize.
- var draw = zoeDraw(ctx, S); → drawing kit bound to your ctx + stage. Methods (all safe):
    draw.clear();  draw.bg(topColor, botColor);
    draw.text(str,x,y,{size,color,weight,align,glow,alpha});
    draw.pill(str,x,y,{size,color,bg,stroke});   // label on a padded chip — legible over art
    draw.rect(x,y,w,h,{fill,stroke,lineWidth,radius,alpha});
    draw.line(x1,y1,x2,y2,{color,width,dash,alpha});
    draw.arrow(x1,y1,x2,y2,{color,width,head});
    draw.circle(x,y,r,{fill,stroke,lineWidth,glow});  draw.dot(x,y,r,color,glow);
    var px = draw.numberLine(x0,x1,y,{min,max,step,color}); // returns v→x mapper
    draw.axes(ox,oy,len,{w,h,xLabel,yLabel,color});
- appear(pt, start, end) → eased 0..1 reveal. Use it to bring each element in on its beat.
- ZC → palette object: ZC.bg, ZC.gold, ZC.amber, ZC.earth, ZC.cream, ZC.ink, ZC.dim, ZC.line,
  ZC.good, ZC.bad, ZC.cool, ZC.violet.
- window.__zoe_safe_bottom → px reserved at the bottom for ZOE's UI (stage already accounts for it).

══════════════════════════════════════════════════════════════
  INTERACTIVE EVALUATION — the sandbox can GRADE the learner
══════════════════════════════════════════════════════════════
When a section has an "evaluation", the learner DOES something (plays a chord, draws a wave,
builds a circuit, writes code). Add a clear Submit/Check button and emit their action:
  emit('submission', { payload: <structured data>, label: <short human summary> });
  • Guitar chord: { payload:{frets:[{string:5,fret:3},{string:4,fret:2}],notes:['C','E','G']}, label:'C major' }
  • Rhythm:       { payload:{pattern:[1,0,0,1,0,1,0,0],bpm:90}, label:'Tapped a pattern' }
The PARENT grades it — you only emit accurate data. (Instruments can be live from phase 0;
they don't have to wait on beats.)

RULES — MUST FOLLOW:
0. ANIMATION-DRIVEN, NOT CLICK-DRIVEN (CRITICAL). The visual AUTO-PLAYS and teaches itself through
   the beat-synced animation — the learner WATCHES, they do not have to click/tap/drag anything on the
   canvas to make the explanation happen. So:
   • NEVER write narration that instructs the learner to interact ("click the card", "tap each atom",
     "drag the slider to see…", "select an option below"). If you catch yourself about to say "click",
     instead SHOW it: animate the reveal automatically on the matching beat.
   • Whatever a click WOULD have revealed, reveal it yourself over time — e.g. instead of "click each
     element to see its symbol", auto-highlight each element in turn across the beats, drawing its symbol
     as it lights up. Cycle/step through examples on a timer (like a great explainer video), using t and
     the beat phase. This makes the animation RICHER, not poorer — put the effort you'd spend on click
     handling into more expressive motion, staged reveals, and worked examples that play out visually.
   • Do NOT add canvas pointer/click hit-testing for "explore" interactions — it is unreliable here.
   • The ONE exception is experimentControls (sliders/toggles) handled via window.onExperiment (rule 11):
     those are fine because ZOE renders them as real UI. But even then, the lesson must fully teach itself
     with NO control touched — controls only let a curious learner poke further.
1. Output ONE complete HTML doc: <!DOCTYPE html><html><head>…</head><body>…</body></html>.
2. NEVER ES modules (import/export). Classic <script> only.
3. 2D: use Canvas 2D + zoeStage + zoeDraw. 3D: load Three.js GLOBAL build
   <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
   and use the global THREE (never the module build).
4. Define window.zoeRender(t,phase,pt,bt) — the ZOE engine runs the RAF loop and clocks for you.
   Do NOT write your own requestAnimationFrame draw loop for the reveal; just author zoeRender.
5. Call emit('ready') at the end of init.
6. RESERVED BANDS (zero overlap): title in the top band (y < H*0.12); the drawing in the middle;
   captions/labels in the bottom band (y > H*0.86). Put labels over artwork on a draw.pill().
   Before placing a label near shapes, keep clear space or use a short leader line.
7. Fonts/positions are CONSTANTS in stage units (e.g. size:22) — they scale automatically.
8. Canvas CSS: only  canvas{display:block;touch-action:none}  — zoeStage owns real sizing.
9. RESIZE: window.addEventListener('resize', function(){ S = zoeStage(c,1000,625); }); nothing else.
10. MOBILE: all input via Pointer Events (pointerdown/move/up), canvas.style.touchAction='none'.
11. Experiments: define window.onExperiment(id,value) and window.onReset() — have them set globals
    that zoeRender reads (do NOT fight the beat reveal). Tap targets ≥ ~64×48 stage units.
12. onBeat(phase) is OPTIONAL — a hook fired when a beat starts (e.g. to trigger a one-shot sound
    or physics kick). Prefer expressing everything through zoeRender(phase,pt).

══════════════════════════════════════════════════════════════
  TEMPLATE A — 2D beat-synced canvas (canvas_animation, graph_interactive,
                interactive_instrument, diagram_animated)  — 4 beats
══════════════════════════════════════════════════════════════
This matches narration = 4 beats. Note how each phase reveals its element with appear(pt,...):

<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0f0d0a;overflow:hidden}canvas{display:block;touch-action:none}</style>
</head><body>
<canvas id="c"></canvas>
<script>
var c=document.getElementById('c'), ctx=c.getContext('2d');
var S=zoeStage(c,1000,625), W=S.W, H=S.H, draw=zoeDraw(ctx,S);
window.addEventListener('resize',function(){ S=zoeStage(c,1000,625); });

var speedFactor=1; // experiment-controlled global read inside zoeRender

window.zoeRender=function(t,phase,pt,bt){
  draw.clear(); draw.bg('#161009','#0d0b08');
  draw.text('Average Speed = distance ÷ time', W/2, H*0.08, {size:26,color:ZC.gold,weight:'800'});

  // road + markers (present from beat 0, fading in)
  var roadY=H*0.55, x0=W*0.12, x1=W*0.88, a0=(phase===0)?appear(pt,0,0.6):1;
  draw.rect(x0,roadY,x1-x0,10,{fill:'rgba(250,245,235,0.18)',alpha:a0});
  var pxOf=function(m){return x0+(m/80)*(x1-x0);};
  for(var m=0;m<=80;m+=20){ draw.line(pxOf(m),roadY+10,pxOf(m),roadY+20,{color:ZC.dim,alpha:a0});
    draw.text(m+' m',pxOf(m),roadY+34,{size:13,color:ZC.dim,alpha:a0}); }

  // beat 1: the car drives 0→80 across its whole beat
  var carM = phase<1 ? 0 : (phase===1 ? appear(pt,0.05,0.95)*80 : 80);
  var carX = pxOf(carM) + Math.sin(t*0.004)*0; // (ambient hook if wanted)
  draw.rect(carX-22,roadY-24,44,22,{fill:ZC.amber,radius:6});
  draw.circle(carX-12,roadY-2,5,{fill:'#2a2018'}); draw.circle(carX+12,roadY-2,5,{fill:'#2a2018'});
  if(phase>=1) draw.pill(Math.round(carM)+' m', carX, roadY-42, {size:14,color:ZC.cream});

  // beat 2: the division
  if(phase>=2){ var a2=(phase===2)?appear(pt,0,0.55):1;
    draw.text('80 m ÷ 10 s', W/2, H*0.78, {size:24,color:ZC.cream,weight:'800',alpha:a2}); }
  // beat 3: the answer
  if(phase>=3){ var a3=appear(pt,0,0.55);
    draw.text('= 8 m/s', W/2, H*0.90, {size:30,color:ZC.gold,weight:'800',glow:14,alpha:a3}); }
};

window.onExperiment=function(id,v){ if(id==='speed') speedFactor=parseFloat(v); };
window.onReset=function(){ speedFactor=1; };
emit('ready');
</script>
</body></html>

══════════════════════════════════════════════════════════════
  TEMPLATE B — Three.js 3D (3d_simulation) — beat-driven via zoeRender
══════════════════════════════════════════════════════════════
<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0f0d0a;overflow:hidden}canvas{display:block;touch-action:none}</style>
</head><body>
<canvas id="c"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
var SAFE=window.__zoe_safe_bottom||0, W=innerWidth, H=innerHeight-SAFE;
var c=document.getElementById('c'); c.style.width=W+'px'; c.style.height=H+'px';
var renderer=new THREE.WebGLRenderer({canvas:c,antialias:true,alpha:true});
renderer.setSize(W,H); renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
var scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(45,W/H,0.1,1000);
camera.position.set(0,2,8);
scene.add(new THREE.AmbientLight(0x404040,0.9));
var lt=new THREE.DirectionalLight(0xffffff,1); lt.position.set(5,10,5); scene.add(lt);
var mesh=new THREE.Mesh(new THREE.SphereGeometry(1,32,32),new THREE.MeshPhongMaterial({color:0xF6C863,emissive:0x3d2a00}));
scene.add(mesh);
window.addEventListener('resize',function(){ SAFE=window.__zoe_safe_bottom||0; W=innerWidth;H=innerHeight-SAFE;
  c.style.width=W+'px';c.style.height=H+'px'; renderer.setSize(W,H); camera.aspect=W/H; camera.updateProjectionMatrix(); });

// zoeRender drives BOTH the beat state and the render() call each frame:
window.zoeRender=function(t,phase,pt,bt){
  mesh.rotation.y=t*0.0006;
  if(phase>=1) mesh.material.color.lerp(new THREE.Color(0xE9A23B), 0.05); // beat 1: warm up
  if(phase>=2) mesh.scale.setScalar(1 + appear(pt,0,1)*0.6);              // beat 2: grow
  renderer.render(scene,camera);
};
var drag=false,lx=0,ly=0;
c.addEventListener('pointerdown',function(e){drag=true;lx=e.clientX;ly=e.clientY;});
c.addEventListener('pointermove',function(e){ if(!drag)return; mesh.rotation.y+=(e.clientX-lx)*0.01; mesh.rotation.x+=(e.clientY-ly)*0.01; lx=e.clientX;ly=e.clientY;});
c.addEventListener('pointerup',function(){drag=false;});
window.onExperiment=function(id,v){ if(id==='scale') mesh.scale.setScalar(parseFloat(v)); };
window.onReset=function(){ mesh.scale.set(1,1,1); mesh.material.color.set(0xF6C863); };
emit('ready');
</script>
</body></html>

══════════════════════════════════════════════════════════════
  OUTPUT FORMAT
══════════════════════════════════════════════════════════════
- Interactive sections: ≥ 200 lines of REAL, subject-specific code. Animate the ACTUAL concept —
  never a generic ball. The reveal must track the beats (phase 0…N-1 = narration 0…N-1).
- Media sections (ai_image/ai_video): no interactiveCode; reference media by "mediaRef" in a beat.
- NARRATION = BEATS: 3-7 per section, ONE idea each, 1-2 short spoken sentences, warm + direct,
  written to be HEARD aloud. They must line up with what your zoeRender reveals at that phase.
  NEVER tell the learner to click/tap/drag/select anything — the animation shows it automatically
  (see RULE 0). The beat DESCRIBES what is happening on screen; it never asks for an action.
- Do NOT rely on "action" (legacy) — express the reveal through zoeRender(phase,pt) instead.

STRICT JSON only. No prose outside the JSON.

Schema:
{ "sections": [{ "title": string, "hookQuestion": string,
                  "narration": [{ "text": string, "action"?: string, "mediaRef"?: string }],
                  "interactiveCode"?: string,
                  "mediaRefs"?: [string],
                  "experimentControls": [{ "id": string, "label": string,
                    "type": "slider"|"toggle"|"select",
                    "min"?: number, "max"?: number, "step"?: number,
                    "options"?: [string], "defaultValue": any }],
                  "evaluation"?: { "challenge": string, "successCriteria": string,
                    "submissionShape": string, "skill": string } }],
  "exercise": { "type": "mcq"|"build"|"predict"|"code", "prompt": string,
                "options"?: [string], "correctIndex"?: number,
                "explanation": string, "hints"?: [string] },
  "summary": string }

Add "evaluation" to AT LEAST ONE section when the skill is performable (music, art, code,
construction, physical technique) — make the sandbox a place the learner DOES the thing and gets graded.`;

/* Appended to EVERY generation — the drawing, text, labels and controls must never collide. */
const LAYOUT_CONTRACT = `

════ LAYOUT CONTRACT — ZERO OVERLAPS (MANDATORY, EVERY VISUAL) ════
You draw in the FIXED stage (1000×625 via zoeStage) — coordinates are constants that auto-scale,
so "no overlap" is a matter of geometry you fully control. Enforce a REGION layout in stage units:
- TOP band (y < H*0.12): the title ONLY. BOTTOM band (y > H*0.86): the caption/label ONLY.
- CENTER (0.12H … 0.86H): the drawing ONLY. Never lay HUD text directly on moving/filled shapes.
- Labels that must sit over artwork go on a draw.pill() (padded chip) so they stay legible; keep a
  clear gap from neighbours, and use a short draw.line() leader to point at the target if needed.
- Anchor persistent labels to fixed points; do not let them jitter frame-to-frame.
- Controls/legend: one tidy padded row inside a reserved band — never covering the drawing.
- Because narration plays in ZOE's UI, do NOT also render long paragraphs on the canvas — show only
  short labels, numbers, formulas and the diagram. The spoken beat carries the words.
- Mentally check at a 360px-wide phone: nothing clipped, nothing overlapping, nothing off the stage.`;

/* Appended to EVERY generation — a gold-standard exemplar for DEPTH and animation
   quality. It is NOT a structural template: our engine uses zoeStage + zoeDraw +
   window.zoeRender(t,phase,pt,bt) and owns the flow/TTS/UI. The reference below
   uses a DIFFERENT architecture (its own D library, its own RAF loops, its own
   speech + sidebar) — do NOT copy any of that. Copy only the RIGOR: how deep,
   how faithful, how animated, how physically accurate a single step should be. */
const REFERENCE_STANDARD = `

════ REFERENCE STANDARD — THE DEPTH BAR (MANDATORY QUALITY, read carefully) ════
A step with this exact title + description was fed into a generator and produced the
lesson excerpted below. THIS is the level of depth, faithfulness and animation quality
expected from a title + description like the one you were given — treat it as the bar,
with ZERO tolerance for shallower or vaguer output.

INPUT THAT PRODUCED IT →
  Title:       "Sound Needs a Medium"
  Description: The bell-jar experiment (NCERT Fig 10.7): an electric bell rings inside a
               sealed glass jar; as air is pumped out the sound fades to silence though the
               hammer is still visibly striking; letting air back in restores the sound —
               proving sound needs a material medium. Plus: why space is silent and
               astronauts must use radios (electromagnetic waves need no medium).

WHAT "GOLD STANDARD" MEANT FOR THAT OUTPUT (match ALL of these) →
1. DOMAIN-SPECIFIC DRAWING, NOT GENERIC SHAPES. It authored a purpose-built primitive that
   draws the ACTUAL apparatus part-by-part from the real figure — glass dome, base plate,
   tripod, the electric bell with a swinging striker, air molecules whose COUNT scales with
   an airLevel, red vacuum tube, power wires, sound-wave rings. Every part reproduced
   deliberately. (In OUR engine you build this the same way with zoeDraw inside zoeRender —
   never a generic bouncing ball, never a vague blob.)
     // e.g. the reference's apparatus primitive header:
     //   bellJar(cx, baseY, {airLevel 0..1, ringing, showSound, t, labels}) → draws the
     //   full Fig-10.7 setup; molecule count = round(airLevel*28); sound-wave intensity
     //   scales with airLevel; striker swings via sin(t/90). Faithful to the source figure.
2. MULTI-PHASE, TIME-DRIVEN SIMULATION OF THE REAL PROCESS. The core animation ran a 4-phase
   cycle — full air → pumping out (airLevel 1→0.05) → near-vacuum (silent, hammer still
   visibly striking) → air back in (0→1) — with a LIVE dashboard (air % bar, sound % bar via
   a pow(airLevel,0.7) curve, bell-state, audible?). The animation demonstrates the physics;
   it is not decoration. (In OUR engine: drive these phases off the narration beats — phase
   0..N — and off t; read experiment globals if the learner can pump the air themselves.)
3. FAITHFUL TO THE SOURCE FIGURE + NUMBERS. Exact NCERT labels ("To vacuum pump", "Electric
   bell", "To power supply"), the exact apparatus layout, the exact conclusion. It reproduced
   the figure — it did not draw a loose lookalike. Do the same with any figure you are given.
4. PARAGRAPH-DEEP, PHYSICALLY ACCURATE NARRATION. Each spoken beat was a real explanation with
   the actual mechanism — e.g. "The bell's hammer is striking at full force the whole time —
   that's why you can SEE it ringing — but the vibration only travels outward if there are air
   molecules to receive the push and pass it along; remove the air and there are no carriers
   left, so the sound disappears. The bell didn't change. The medium did." Not "sound needs
   air." Explain the WHY, correctly, every time.
5. RIGOROUS ANTI-OVERLAP LAYOUT. Reserved vertical bands, word-wrapped panels sized to fit,
   leader lines, commented pixel math so nothing ever collides. (Our LAYOUT CONTRACT above is
   the same discipline — hold to it exactly.)
6. REAL ASSESSMENT. Each section ended in a genuine MCQ whose explanation re-taught the
   mechanism in depth (not a trivial recall check).

USE IT LIKE THIS: reproduce that DEPTH, FIDELITY, and ANIMATED-PHYSICS quality inside OUR
architecture (zoeStage/zoeDraw/zoeRender, narration = beats, our UI owns TTS + flow). Do NOT
import its D library, its own requestAnimationFrame loops, its speech engine, its sidebar, or
its full-page multi-screen shell. Match the substance, not the scaffolding.`;

/* Appended to the GENERATOR system prompt when a step is document-grounded. */
const GENERATOR_FAITHFUL = `

════ FAITHFUL / DOCUMENT MODE ════
SOURCE MATERIAL is provided in the user message. This lesson MUST faithfully teach it:
- Narration conveys the source's ACTUAL definitions, statements, formulas and worked-example steps — accurately, in ZOE's warm voice, WITHOUT adding facts that aren't in the source.
- Reproduce EACH provided figure faithfully as interactive SVG/canvas:
  • Use the EXACT labels and values given. Recreate the described geometry / parts / arrows / axes precisely.
  • "diagram"/"equation" → draw with Canvas 2D or inline SVG. "chart"/"table" → plot the exact values.
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
  ? "Generate the full lesson STRICTLY from the source material above. Teach exactly what it says, reproduce its figures faithfully as interactive SVG/canvas, and keep depth proportional — invent nothing."
  : "Generate the full lesson content now. Make interactive code RICH and DETAILED — this is the core of the learning experience. Use the media asset IDs in narration steps where relevant."}`;

  try {
    // Interactive code is hard → Claude Opus 4.8 (reasoning tier)
    const system = GENERATOR_SYSTEM + LAYOUT_CONTRACT + REFERENCE_STANDARD + (faithful ? GENERATOR_FAITHFUL : "");
    console.log(
      `[generateLesson] "${req.step.title}" → generating with REFERENCE STANDARD ` +
      `(ref ${REFERENCE_STANDARD.length} chars, system ${system.length} chars, ` +
      `faithful=${faithful}, sections=${plan.sections.length})`,
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
