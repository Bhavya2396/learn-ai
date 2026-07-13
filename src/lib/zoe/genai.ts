/**
 * Unified generation wrapper for ZOE's Content Engine.
 *
 *   genText()  – structured text/JSON. Base model: Claude Sonnet 4.6 (via OpenRouter).
 *                Pass model="reasoning" to use Claude Opus 4.8 for labs / interactive code.
 *   genImage() – image generation via Nano Banana (gemini-2.5-flash-image, native Gemini SDK)
 *   genVideo() – video generation via Veo 3.1 (native Gemini SDK, async with polling)
 */

import { GoogleGenAI } from "@google/genai";
import { orChat, orDocument, hasOpenRouterKey } from "./openrouter";
import type { SourceSection, SourceFigure, FigureKind } from "./content-types";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || "" });

/** Image/video (Gemini) availability. */
export const hasKey = () => !!process.env.GOOGLE_API_KEY;
/** Text generation availability — Claude via OpenRouter (with Gemini fallback). */
export const hasTextKey = () => hasOpenRouterKey() || !!process.env.GOOGLE_API_KEY;

/* ── ZOE's shared identity ─────────────────────────────────────────────── */
export const ZOE_IDENTITY = `You are ZOE — a lifelong companion whose single promise is: "you can become whatever you want to be."
People come to you to BECOME someone — a founder, a calmer person, a guitarist, a leader, financially free,
an artist, healthier, anything. You support every area of life (career, craft, health, mindset, money,
entrepreneurship, sustainability, knowledge). You are NOT a school, a course catalogue, or a textbook.
Voice: warm, sharp, human, growth-framed, never condescending or clinical. You adapt to each person and
remember them. When memory about the person is provided, use it naturally to feel continuous and alive.`;

/* ── Text generation — Claude Sonnet 4.6 base (OpenRouter) ─────────────── */

/**
 * `model` accepts a tier ("base" | "reasoning" | "fast" | "vision") or an
 * explicit OpenRouter slug. Legacy Gemini names map to the Claude base model.
 */
export async function genText(
  system: string,
  user: string,
  model = "base",
  temperature = 0.8,
  maxOutputTokens?: number,
): Promise<string> {
  // Prefer Claude via OpenRouter (the configured base for everything)
  if (hasOpenRouterKey()) {
    try {
      return await orChat({
        system: `${ZOE_IDENTITY}\n\n${system}\n\nRespond with VALID JSON only — no prose, no markdown fences.`,
        user,
        model,
        temperature,
        maxTokens: maxOutputTokens ?? 8192,
        json: true,
      });
    } catch (e) {
      // OpenRouter present but failing (rejected key, outage, rate limit).
      // Don't let that break the app — fall through to native Gemini if we can.
      console.error("[genText] OpenRouter failed, falling back to Gemini:", e);
      if (!process.env.GOOGLE_API_KEY) throw e;
    }
  }

  // Fallback: native Gemini (OpenRouter not configured OR it just failed)
  if (process.env.GOOGLE_API_KEY) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: user,
      config: {
        systemInstruction: `${ZOE_IDENTITY}\n\n${system}`,
        temperature,
        responseMimeType: "application/json",
        ...(maxOutputTokens ? { maxOutputTokens } : {}),
      },
    });
    return response.text ?? "";
  }

  return "";
}

/* ── Document extraction (PDF → faithful outline) ──────────────────────────
 * Gemini reads the uploaded document natively (PDFs, and any format the
 * multimodal model accepts) and returns a structure that mirrors the document
 * EXACTLY — its own title, whether it ships a table of contents, and a nested
 * outline in reading order. We do NOT invent or summarise here; fidelity is the
 * whole point (the learning path must follow the document without deviation).
 */

export interface ExtractedDocument {
  /** The document's own title (from the cover/first heading), never invented. */
  title: string;
  /** True when the document itself contains a table of contents / index. */
  hasIndex: boolean;
  /**
   * A nested markdown outline that faithfully mirrors the document structure in
   * order: "# Part", "## Chapter", "### Section". Every unit that appears in the
   * document appears here, none added.
   */
  outline: string;
  /** Rough count of leaf topics detected (used only for UI copy). */
  topicCount: number;
  /**
   * Faithful, per-section content + figures. This is what lessons are taught
   * FROM — so ZOE reproduces exactly what the document says (and its figures)
   * rather than inventing or stretching material.
   */
  sections?: SourceSection[];
}

const MAX_SECTION_CONTENT = 2200;   // cap per-section text so storage stays lean
const MAX_FIGURES_PER_SECTION = 6;
const MAX_SECTIONS = 60;

const EXTRACT_SYSTEM = `ROLE: FAITHFUL DOCUMENT MAPPER. You read a source document and reproduce its STRUCTURE and SUBSTANCE with total fidelity.

You do NOT teach, summarise creatively, editorialise, reorder, add, or remove anything.
Your job: reveal exactly how this document is organised AND capture what each part actually contains — in its own words, order, and figures.

STEPS:
1. Find the document's real TITLE (cover page / first major heading). Use it verbatim. Never invent one.
2. Determine whether the document itself has a TABLE OF CONTENTS / INDEX / CONTENTS page. Set "hasIndex".
   - If it HAS one: your outline MUST follow that table of contents exactly (same units, same order, same names).
   - If it does NOT: derive the outline by walking the document top-to-bottom, capturing every heading /
     chapter / section / numbered unit IN THE ORDER THEY APPEAR. Cover the WHOLE document, start to finish.
3. Produce a nested markdown "outline":
   - "# " top-level parts/chapters, "## " sections, "### " sub-sections/topics.
   - Preserve the document's own numbering and heading wording. Do not merge or skip units.
4. Produce "sections": for EACH leaf section in the outline, capture its REAL substance faithfully:
   - "heading": the section's own heading (verbatim).
   - "path": its number/path if present (e.g. "4.3").
   - "content": the section's actual teaching substance — definitions, key statements, formulas
     (write formulas in readable inline math), worked examples with their steps, rules. Be FAITHFUL and
     COMPACT: capture what's really there, do not embellish, do not pad. If a section is short in the
     document, keep it short here. Never invent content that isn't in the document.
   - "figures": EVERY figure/diagram/graph/chart/table/photo that appears in this section. For each:
       • "kind": one of "diagram" | "chart" | "equation" | "table" | "photo".
         - "diagram" = schematic/geometry/labelled drawing (circuits, geometry, biology labels, flow).
         - "chart" = plotted graph/bar/pie with data.
         - "equation" = a displayed formula shown as a figure.
         - "table" = tabular data.
         - "photo" = a real photograph or complex raster image.
       • "caption": the figure's caption/label if any (verbatim).
       • "description": a PRECISE, redraw-ready description — every shape, axis, arrow, part, relationship,
         position, and what it demonstrates. Enough that an artist could recreate it without seeing it.
       • "labels": ALL text labels appearing in/around the figure (verbatim array).
       • "values": for charts/tables, the actual numbers/data points as text.
   - Fidelity of figures matters: for diagrams/charts/equations/tables, describe them EXACTLY so they can be
     redrawn as vector graphics. For photos, describe faithfully but mark kind="photo".

Return STRICT JSON only:
{ "title": string, "hasIndex": boolean, "outline": string, "topicCount": number,
  "sections": [ { "heading": string, "path"?: string, "content": string,
                  "figures"?: [ { "kind": string, "caption"?: string, "description": string,
                                  "labels"?: [string], "values"?: string } ] } ] }`;

const FIGURE_KINDS: FigureKind[] = ["diagram", "chart", "equation", "table", "photo"];

function cleanFigure(f: unknown): SourceFigure | null {
  if (!f || typeof f !== "object") return null;
  const o = f as Record<string, unknown>;
  const description = typeof o.description === "string" ? o.description.trim() : "";
  if (!description) return null;
  const kind = FIGURE_KINDS.includes(o.kind as FigureKind) ? (o.kind as FigureKind) : "diagram";
  const labels = Array.isArray(o.labels)
    ? o.labels.filter((l): l is string => typeof l === "string").slice(0, 24)
    : undefined;
  return {
    kind,
    caption: typeof o.caption === "string" ? o.caption.trim() : undefined,
    description: description.slice(0, 700),
    labels: labels?.length ? labels : undefined,
    values: typeof o.values === "string" ? o.values.slice(0, 600) : undefined,
  };
}

function cleanSections(raw: unknown): SourceSection[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const out: SourceSection[] = [];
  for (const s of raw.slice(0, MAX_SECTIONS)) {
    if (!s || typeof s !== "object") continue;
    const o = s as Record<string, unknown>;
    const heading = typeof o.heading === "string" ? o.heading.trim() : "";
    const content = typeof o.content === "string" ? o.content.trim() : "";
    if (!heading && !content) continue;
    const figures = Array.isArray(o.figures)
      ? o.figures.map(cleanFigure).filter((f): f is SourceFigure => !!f).slice(0, MAX_FIGURES_PER_SECTION)
      : undefined;
    out.push({
      heading: heading || "Section",
      path: typeof o.path === "string" ? o.path.trim() : undefined,
      content: content.slice(0, MAX_SECTION_CONTENT),
      figures: figures?.length ? figures : undefined,
    });
  }
  return out.length ? out : undefined;
}

function normalizeExtracted(parsed: ExtractedDocument | null): ExtractedDocument | null {
  if (!parsed || !parsed.outline?.trim()) return null;
  return {
    title: parsed.title?.trim() || "Untitled document",
    hasIndex: !!parsed.hasIndex,
    outline: parsed.outline.trim(),
    topicCount: typeof parsed.topicCount === "number" ? parsed.topicCount : 0,
    sections: cleanSections(parsed.sections),
  };
}

export async function extractDocument(
  base64: string,
  mimeType: string,
): Promise<ExtractedDocument | null> {
  const instruction = `${EXTRACT_SYSTEM}\n\nMap this document now. Remember: total fidelity, whole document, its own order. Respond with VALID JSON only.`;

  // Prefer Claude Sonnet via OpenRouter (the configured base — reads PDFs natively).
  if (hasOpenRouterKey()) {
    try {
      const raw = await orDocument({
        system: EXTRACT_SYSTEM,
        text: "Map this document now. Remember: total fidelity, whole document, its own order. Respond with VALID JSON only.",
        fileData: base64,
        mimeType: mimeType || "application/pdf",
        fileName: "document.pdf",
        model: "base",
        json: true,
        maxTokens: 32000,
      });
      const ok = normalizeExtracted(parseJson<ExtractedDocument>(raw));
      if (ok) return ok;
      console.error("[extractDocument] OpenRouter returned no usable outline, trying Gemini");
    } catch (e) {
      console.error("[extractDocument] OpenRouter failed, trying Gemini:", e);
    }
  }

  // Fallback: native Gemini multimodal (requires GOOGLE_API_KEY + credit).
  if (process.env.GOOGLE_API_KEY) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { inlineData: { data: base64, mimeType: mimeType || "application/pdf" } },
          { text: instruction },
        ],
        config: {
          temperature: 0.1,
          responseMimeType: "application/json",
          maxOutputTokens: 32000,
        },
      });
      return normalizeExtracted(parseJson<ExtractedDocument>(response.text ?? ""));
    } catch (e) {
      console.error("[extractDocument] Gemini failed:", e);
    }
  }

  return null;
}

/* ── JSON parsing helper ───────────────────────────────────────────────── */
export function parseJson<T>(raw: string): T | null {
  if (!raw) return null;
  let s = raw.trim().replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start !== -1 && end !== -1) s = s.slice(start, end + 1);
  try { return JSON.parse(s) as T; } catch { return null; }
}

/* ── Image generation (Nano Banana) ────────────────────────────────────── */

export interface GeneratedImage {
  base64: string;
  mimeType: string;
}

export async function genImage(
  prompt: string,
  style?: string,
): Promise<GeneratedImage | null> {
  if (!hasKey()) return null;
  try {
    const fullPrompt = style ? `${style} style: ${prompt}` : prompt;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: fullPrompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          return {
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType ?? "image/png",
          };
        }
      }
    }
    return null;
  } catch (e) {
    console.error("[genImage] failed:", e);
    return null;
  }
}

/* ── Video generation (Veo 3.1) ────────────────────────────────────────── */

export interface GeneratedVideo {
  uri: string;
}

const VIDEO_POLL_INTERVAL = 8_000;
const VIDEO_MAX_POLLS = 8; // ~64s budget — runs in parallel with lesson generation

export async function genVideo(prompt: string): Promise<GeneratedVideo | null> {
  if (!hasKey()) return null;
  try {
    let operation = await ai.models.generateVideos({
      model: "veo-3.1-generate-preview",
      prompt,
      config: {
        numberOfVideos: 1,
        durationSeconds: 8,
        aspectRatio: "16:9",
      },
    });

    let polls = 0;
    while (!operation.done && polls < VIDEO_MAX_POLLS) {
      await new Promise((r) => setTimeout(r, VIDEO_POLL_INTERVAL));
      operation = await ai.operations.getVideosOperation({ operation });
      polls++;
    }

    const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
    return uri ? { uri } : null;
  } catch (e) {
    console.error("[genVideo] failed:", e);
    return null;
  }
}
