/**
 * ZOE Content Engine — type definitions.
 *
 * Describes the full pipeline: Planner output → Media assets → Lesson content.
 * The engine uses three Google AI capabilities:
 *   - Gemini 2.5 Pro for lesson structure / narration / interactive code
 *   - Nano Banana (gemini-2.5-flash-image) for AI-generated images
 *   - Veo 3.1 for AI-generated video clips
 */

/* ── Section modality — what kind of visual/interactive each section uses ── */

export type SectionModality =
  | "3d_simulation"          // Three.js scene with experiment controls
  | "canvas_animation"       // 2D canvas with animated visualization
  | "interactive_instrument" // domain-specific tool (fretboard, keyboard, etc.)
  | "code_playground"        // live code editor with execution
  | "graph_interactive"      // draggable graph / chart
  | "diagram_animated"       // animated SVG / mermaid with step-through
  | "ai_image"               // Nano Banana generated image
  | "ai_video"               // Veo 3.1 generated video clip
  | "ai_image_interactive"   // AI image with interactive overlay/annotations
  | "text_rich";             // enhanced text with highlights (fallback)

/* ── Media generation ──────────────────────────────────────────────────── */

export interface MediaPrompt {
  id: string;
  type: "image" | "video";
  prompt: string;
  sectionIndex: number;
  style?: string;            // "photorealistic" | "diagram" | "illustration" | "technical"
  aspectRatio?: "16:9" | "9:16" | "1:1";
}

export interface MediaAsset {
  id: string;
  type: "image" | "video";
  dataUrl?: string;          // base64 data URL for images
  videoUri?: string;         // streaming URI for videos
  prompt: string;
  status: "ready" | "generating" | "failed";
}

/* ── Lesson plan (Planner output) ──────────────────────────────────────── */

export interface PlannedSection {
  title: string;
  concept: string;
  modality: SectionModality;
  narrationSteps: number;
  experimentControls?: string[];
  hookQuestion?: string;
  mediaIds?: string[];       // references to MediaPrompt IDs
}

export interface LessonPlan {
  stepId: string;
  totalMinutes: number;
  sections: PlannedSection[];
  mediaPrompts: MediaPrompt[];
  assessmentType: "mcq" | "build" | "predict" | "code";
}

/* ── Lesson content (Generator output) ─────────────────────────────────── */

export interface NarrationStep {
  text: string;
  action?: string;           // JS function name to call in the iframe
  mediaRef?: string;         // MediaAsset ID to display during this step
}

export interface ExperimentControl {
  id: string;
  label: string;
  type: "slider" | "toggle" | "select" | "color";
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  defaultValue: number | string | boolean;
}

/**
 * When a section's sandbox is also an evaluation device (e.g. a guitar fretboard
 * where the learner plays a chord), this describes the challenge + how to grade
 * the submission the sandbox emits via emit('submission', {...}).
 */
export interface InteractiveEvaluation {
  challenge: string;            // what to ask the learner to do ("Play a C major chord")
  successCriteria: string;      // what a correct submission looks like (for the grader)
  submissionShape: string;      // human description of the data the sandbox emits
  skill: string;                // skill being assessed (for mastery tagging)
}

export interface LessonSection {
  title: string;
  hookQuestion?: string;
  narration: NarrationStep[];
  interactiveCode?: string;  // self-contained HTML+JS+CSS for iframe rendering
  mediaRefs?: string[];      // MediaAsset IDs used in this section
  experimentControls: ExperimentControl[];
  evaluation?: InteractiveEvaluation; // present when the sandbox grades the learner
  /** Model used to generate this section's interactive code (telemetry). */
  generatedBy?: string;
  /** Verifier verdict for this section's code (telemetry / debugging). */
  verified?: boolean;
}

export interface LessonExercise {
  type: "mcq" | "build" | "predict" | "code";
  prompt: string;
  options?: string[];
  correctIndex?: number;
  explanation: string;
  hints?: string[];
}

export interface LessonContent {
  plan: LessonPlan;
  sections: LessonSection[];
  media: MediaAsset[];
  exercise: LessonExercise;
  summary: string;
}

/* ── Source fidelity (document-grounded lessons) ───────────────────────────
 * When a journey is built from an uploaded document, we carry the ACTUAL
 * content of each section (and its figures) so lessons teach EXACTLY what the
 * document says — faithfully, proportionally, and reproducing its figures —
 * instead of the model inventing extra or stretched-out material.
 */

export type FigureKind = "diagram" | "chart" | "equation" | "table" | "photo";

export interface SourceFigure {
  /** Classification drives how faithfully we can reproduce it (see FigureKind). */
  kind: FigureKind;
  /** The figure's caption/label in the document, if any. */
  caption?: string;
  /** A precise, redraw-ready description: geometry, parts, arrows, relationships. */
  description: string;
  /** Every text label that appears in/around the figure (kept verbatim). */
  labels?: string[];
  /** Numeric values / data points (for charts, graphs, tables). */
  values?: string;
}

export interface SourceSection {
  heading: string;
  /** Document numbering/path if present, e.g. "4.3" or "Chapter 2 › 2.1". */
  path?: string;
  /** Faithful, compact rendering of the section's real substance. */
  content: string;
  figures?: SourceFigure[];
}

/** The full dossier stored per document-sourced aspiration. */
export interface AspirationSource {
  title: string;
  sections: SourceSection[];
}

/** What the content engine receives for ONE step when it is document-grounded. */
export interface LessonSource {
  /** The matched section's faithful content — teach exactly this. */
  excerpt: string;
  figures?: SourceFigure[];
  /** Always true when present — signals FAITHFUL mode to planner + generator. */
  faithful: true;
}

/* ── Request/Response for the content API route ────────────────────────── */

export interface ContentRequest {
  step: {
    id: string;
    title: string;
    summary: string;
    kind: string;
    minutes: number;
    difficulty: number;
  };
  aspiration: {
    title: string;
    area: string;
  };
  profileSummary?: string;
  teachingStyle?: Record<string, unknown>;
  memoryContext?: string;
  /** Present only for document-sourced steps — grounds the lesson in the PDF. */
  source?: LessonSource;
}
