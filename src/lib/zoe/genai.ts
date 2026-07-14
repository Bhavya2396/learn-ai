/**
 * Unified generation wrapper for ZOE's Content Engine.
 *
 *   genText()  – structured text/JSON. Base model: Claude Sonnet 4.6 (via OpenRouter).
 *                Pass model="reasoning" to use Claude Opus 4.8 for labs / interactive code.
 *   genImage() – image generation via Nano Banana (gemini-2.5-flash-image, native Gemini SDK)
 *   genVideo() – video generation via Veo 3.1 (native Gemini SDK, async with polling)
 */

import { GoogleGenAI } from "@google/genai";
import { orChat, hasOpenRouterKey } from "./openrouter";
import { runMistralOcr, ocrToMarkdown, hasMistralKey } from "./mistral-ocr";
import type { SourceSection } from "./content-types";

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
 * OpenRouter parses the uploaded document with the Mistral OCR engine (scanned
 * and image PDFs included; figures captured as descriptions), then Claude maps
 * it into a structure that mirrors the document EXACTLY — its own title,
 * whether it ships a table of contents, and a nested outline in reading order.
 * We do NOT invent or summarise here; fidelity is the whole point (the learning
 * path must follow the document without deviation).
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
  /**
   * The nested topic→subtopic structure (topic = phase, subtopic = step). The
   * journey is built DIRECTLY from this in code — no separate architect call —
   * so step count stays faithful to what was extracted (no padding).
   */
  topics?: ExtractedTopic[];
}

// Descriptions are meant to be full/context-complete, so this cap is generous;
// it exists only as a safety bound, not to trim real teaching content.
const MAX_SECTION_CONTENT = 12000;
const MAX_SECTIONS = 60;

/* ── Topic extraction tuning (see the "portable recipe") ───────────────────
 * The core fix for "every line becomes a topic": we do NOT ask the model to
 * faithfully list every heading. Instead we chunk the OCR text and run an
 * anti-padding extraction where the topic count is a CEILING, not a target,
 * then merge/dedupe/cap across chunks.
 */
const CHUNK_CHAR_LIMIT = 40000;        // paragraph-bounded chunk size
const CHUNK_OVERLAP_CHARS = 2000;      // carry the tail of each chunk into the next
const MAX_TOPICS_PER_DOCUMENT = 8;     // global target (matches the recipe)
const TOPIC_OVERSHOOT_TOLERANCE = 2;   // allow slight overshoot vs truncating good topics

const MAX_SUBTOPICS_PER_TOPIC = 3;   // ceiling; most topics need just 1

/** A concrete sub-part of a topic — becomes one journey STEP. */
export interface ExtractedSubtopic {
  title: string;
  description: string;
}

/**
 * One extracted teachable topic. `description` is the full teaching substance
 * (also used as section content). `subtopics` are its concrete sub-parts — the
 * topic becomes a journey PHASE and each subtopic a STEP.
 */
export interface ExtractedTopic {
  title: string;
  description: string;
  subtopics: ExtractedSubtopic[];
}

const EXTRACT_SYSTEM = `You are an expert educational content designer. You are given the full text (or a chunk of the full text) of an educational document — a textbook chapter, research paper, lecture notes, study material, or any structured learning resource. It is NOT restricted to any specific grade or curriculum. Figures in the text appear inline as lines like "> FIGURE (id): <description>" — treat those as part of the material.

Your job is to identify the actual independent, teachable topics that exist in this text — no more, no fewer. Each topic must be self-contained: a learner could be taught that single topic on its own.

 CRITICAL RULE — DO NOT PAD:
The number {max_topics_for_this_chunk} is a HARD CEILING, NOT A TARGET. Return ONLY the genuinely distinct topics actually taught in the text.
- A 1-page article on a single concept → usually 1 topic.
- A 2–3 page text on a single theme → usually 1–3 topics.
- A 10-page chapter covering multiple distinct concepts → 4–8 topics.
- If the text contains one teachable idea, return ONE topic. Do NOT split a single coherent topic into artificial sub-topics to fill the quota.
- Never invent topics. Never duplicate. A single line or heading is NOT a topic. Distinctness and substance matter far more than quantity.

Additional rules:
1. Topics must be DISTINCT — no near-duplicates, no alternate phrasings, no items that are sub-parts of another listed topic.
2. Each topic must include:
   - "title": a short, descriptive topic name (3–10 words). Avoid chapter/section numbers or document-specific labels.
   - "description": THE MOST IMPORTANT FIELD. This is NOT a short summary — it is the FULL, SELF-CONTAINED teaching substance of the topic, and it will be the ONLY record of this topic (the original document is discarded afterwards). So it MUST capture EVERYTHING needed to teach the topic without ever seeing the source again — DO NOT LOSE A SINGLE PIECE OF CONTEXT. Include, in the document's own order: every definition, key statement, rule, and nuance; ALL formulas/equations (readable inline math) with what each symbol means; EVERY worked example WITH its full steps and result; all conditions, exceptions, and edge cases; and a faithful description of what each figure/diagram/table shows (from the "> FIGURE (...)" lines) with its data/labels. Be thorough and long where the material is rich — length is expected and encouraged; a rich topic's description can be many paragraphs. Be faithful: capture what is actually there, never invent, never embellish, never reference "section X". Missing content is a FAILURE; a shorter description that drops detail is WRONG.
   - "subtopics": nested sub-parts of the topic. A TOPIC IS ALREADY A COMPLETE, SELF-CONTAINED LESSON — subtopics are NOT a way to "chunk" or "split up" the topic to pad the count. Decide the count from the MATERIAL, not from any target (neither high nor low):
       • INCLUDE subtopics when EITHER holds:
         (a) THE DOCUMENT ITSELF NESTS THEM. If the topic is a numbered unit like "1.2" and the source has explicit sub-units under it ("1.2.1", "1.2.2", ...), mirror exactly those sub-units — same units, same order, same names. Do NOT invent nesting the document doesn't have, but do NOT omit nesting the document clearly DOES have.
         (b) THE TOPIC IS GENUINELY TOO LARGE to teach as one unit and clearly breaks into distinct teachable parts.
       • OMIT them (return []) when the topic is a single coherent unit that neither nests in the source nor is too large.
     Let the document decide: capture the sub-units that genuinely exist — do not force splits, and do not collapse real sub-units either. Up to ${MAX_SUBTOPICS_PER_TOPIC} maximum (a hard ceiling). NEVER split one coherent idea into fake subtopics. A single line or sentence is NOT a subtopic.
     Each subtopic has: "title" (3–8 words) and "description" (a faithful, self-contained account of just that sub-part's substance — same no-context-lost standard as the topic description, scoped to this sub-part). Every subtopic's material must already be present in the topic's own description.
3. Only return topics substantively present in THIS chunk's text.

 Return STRICT JSON only (no markdown, no code fences, no prose):
{ "document_title": "<short title summarizing the document or chunk>",
  "topics": [ { "title": "<topic title>",
               "description": "<FULL, context-complete teaching substance — long where rich, missing nothing>",
               "subtopics": [ /* usually EMPTY []; include only if the document nests sub-units or the topic is too large */ ] } ] }`;

/* ── Chunking (Step 2 of the recipe) ───────────────────────────────────────
 * EQUAL-SIZED chunking. CHUNK_CHAR_LIMIT (40k) is a DIVISOR, not a chunk size:
 *   num_chunks = ceil(len / 40000);  target = ceil(len / num_chunks)
 * so a 90k doc → 3 chunks of ~30k each (NOT 40k+40k+10k). Equal-sized chunks
 * give equal-sized topic pools, which is what makes the ceil(MAX / num_chunks)
 * per-chunk budget fair.
 *
 * Then each chunk gets ~CHUNK_OVERLAP_CHARS of overlap on BOTH ends (the tail of
 * the previous chunk + the head of the next) so a topic straddling a boundary
 * keeps full context. The prompt is told about this overlap so the model does
 * not mistake overlapped material for new topics; title dedupe drops repeats.
 */

/** Split into paragraphs: blank-line boundaries, or single newlines if none. */
function splitParagraphs(text: string): string[] {
  const byBlank = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (byBlank.length > 1) return byBlank;
  return text.split(/\n/).map((p) => p.trim()).filter(Boolean);
}

/** Hard-split a paragraph larger than `target` so it can't blow out a chunk. */
function hardSplit(para: string, target: number): string[] {
  if (para.length <= target) return [para];
  const out: string[] = [];
  for (let i = 0; i < para.length; i += target) out.push(para.slice(i, i + target));
  return out;
}

/** Base (non-overlapping) equal-sized chunks. */
function baseChunks(text: string, limit = CHUNK_CHAR_LIMIT): string[] {
  const len = text.length;
  if (len <= limit) return [text];

  const numChunks = Math.ceil(len / limit);
  const target = Math.ceil(len / numChunks);

  // Paragraphs, with any oversized paragraph hard-split down to <= target.
  const paras = splitParagraphs(text).flatMap((p) => hardSplit(p, target));

  const chunks: string[] = [];
  let cur: string[] = [];
  let curLen = 0;
  for (const p of paras) {
    if (curLen + p.length + 2 > target && cur.length) {
      chunks.push(cur.join("\n\n"));
      cur = [];
      curLen = 0;
    }
    cur.push(p);
    curLen += p.length + 2;
  }
  if (cur.length) chunks.push(cur.join("\n\n"));
  return chunks.length ? chunks : [text];
}

/** Equal-sized chunks with ~overlap chars of context on both ends. */
function chunkText(text: string, limit = CHUNK_CHAR_LIMIT, overlap = CHUNK_OVERLAP_CHARS): string[] {
  const base = baseChunks(text, limit);
  if (base.length <= 1 || overlap <= 0) return base;

  return base.map((chunk, i) => {
    const before = i > 0 ? base[i - 1].slice(-overlap) : "";
    const after = i < base.length - 1 ? base[i + 1].slice(0, overlap) : "";
    return [before, chunk, after].filter(Boolean).join("\n\n");
  });
}

const normTitle = (t: string) => (t || "").trim().toLowerCase().split(/\s+/).join(" ");

/** One anti-padding extraction call over a single chunk. */
async function extractTopicsFromChunk(chunk: string, perChunkCap: number, overlapped: boolean): Promise<{ documentTitle: string; topics: ExtractedTopic[] }> {
  const overlapNote = overlapped
    ? `\n\nNOTE: This is one chunk of a larger document. It includes roughly ${CHUNK_OVERLAP_CHARS} characters of OVERLAP from the neighbouring chunks at the START and END — that material belongs to adjacent chunks. Use it only for context; extract a topic ONLY if its substance is genuinely centred in THIS chunk, not in the overlapping margins.`
    : "";
  const user = `Identify the genuinely distinct, independent teachable topics in the following text. Return ONLY as many as actually exist (could be 1, could be a few, up to a maximum of ${perChunkCap}). Do NOT pad to reach the ceiling.${overlapNote}\n\nText:\n'''${chunk}'''`;
  const raw = await orChat({
    system: EXTRACT_SYSTEM.replace("{max_topics_for_this_chunk}", String(perChunkCap)),
    user,
    model: "base",
    temperature: 0.1,
    // Descriptions are meant to be full/context-complete, so allow long output.
    maxTokens: 32000,
    json: true,
  });
  const parsed = parseJson<{ document_title?: string; topics?: unknown }>(raw);
  const topics: ExtractedTopic[] = [];
  if (parsed && Array.isArray(parsed.topics)) {
    for (const t of parsed.topics) {
      if (!t || typeof t !== "object") continue;
      const o = t as Record<string, unknown>;
      const title = typeof o.title === "string" ? o.title.trim() : "";
      if (!title) continue;
      const description = typeof o.description === "string" ? o.description.trim() : "";
      // Subtopics: anti-padding cap; fall back to the topic itself as one step.
      const subs: ExtractedSubtopic[] = [];
      if (Array.isArray(o.subtopics)) {
        for (const s of o.subtopics) {
          if (subs.length >= MAX_SUBTOPICS_PER_TOPIC) break;
          if (!s || typeof s !== "object") continue;
          const so = s as Record<string, unknown>;
          const st = typeof so.title === "string" ? so.title.trim() : "";
          if (!st) continue;
          subs.push({ title: st, description: typeof so.description === "string" ? so.description.trim() : "" });
        }
      }
      if (!subs.length) subs.push({ title, description });
      topics.push({ title, description, subtopics: subs });
    }
  }
  return { documentTitle: parsed?.document_title?.trim() || "", topics };
}

/**
 * Steps 2–4: chunk → per-chunk budgeted anti-padding extraction → merge, dedupe
 * by normalized title, enforce a global cap. Returns deduped topics + a title.
 */
async function extractTopics(text: string): Promise<{ title: string; topics: ExtractedTopic[] }> {
  const chunks = chunkText(text);
  const overlapped = chunks.length > 1; // single-chunk docs carry no overlap
  // Per-chunk ceiling passed to the PROMPT (anti-padding guidance only) — it is
  // NOT used to truncate results. The prompt already keeps each chunk restrained.
  const perChunkCap = Math.max(1, Math.ceil(MAX_TOPICS_PER_DOCUMENT / chunks.length));

  console.log(`[extractTopics] ${chunks.length} chunk(s), perChunkCap=${perChunkCap}, running in parallel...`);

  // Run all chunk extractions IN PARALLEL — latency ≈ the slowest single chunk
  // rather than the sum. A failed chunk resolves to null and is skipped.
  const results = await Promise.all(
    chunks.map((chunk, i) => {
      const cs = Date.now();
      return extractTopicsFromChunk(chunk, perChunkCap, overlapped)
        .then((r) => {
          console.log(`[extractTopics] chunk ${i + 1}/${chunks.length} done in ${Date.now() - cs}ms — ${r.topics.length} topics`);
          return r;
        })
        .catch((e) => {
          console.error(`[extractTopics] chunk ${i + 1}/${chunks.length} failed in ${Date.now() - cs}ms, skipping:`, e);
          return null;
        });
    }),
  );

  // Merge EVERY chunk's topics in order — no chunk is skipped and no per-chunk
  // truncation. We only drop TRUE duplicates (same normalized title). This
  // collects the full distinct set so no document context is lost.
  const aggregated: ExtractedTopic[] = [];
  const seen = new Set<string>();
  let docTitle = "";

  for (const result of results) {
    if (!result) continue;
    if (!docTitle && result.documentTitle) docTitle = result.documentTitle;
    for (const topic of result.topics) {
      const key = normTitle(topic.title);
      if (!key || seen.has(key)) continue; // dedupe only — real duplicates
      seen.add(key);
      aggregated.push(topic);
    }
  }

  // SOFT cap: target MAX_TOPICS_PER_DOCUMENT but allow overshoot up to
  // +TOPIC_OVERSHOOT_TOLERANCE before trimming, so a topic-rich document isn't
  // cut exactly at the target. Only the tail beyond the soft ceiling is dropped.
  const softCap = MAX_TOPICS_PER_DOCUMENT + TOPIC_OVERSHOOT_TOLERANCE;
  const topics = aggregated.length > softCap ? aggregated.slice(0, softCap) : aggregated;

  return { title: docTitle, topics };
}

/**
 * Map deduped topics onto the app's existing ExtractedDocument shape WITHOUT
 * changing any fields: each topic becomes a section (title→heading,
 * description→content) and the outline is built from the topic titles. The
 * journey architect + lesson flow consume this exactly as before.
 */
function topicsToExtracted(title: string, topics: ExtractedTopic[]): ExtractedDocument | null {
  if (!topics.length) return null;

  // One section PER SUBTOPIC (steps are taught from these), so lesson-source
  // matching works at step granularity. Heading carries "Topic › Subtopic" for
  // faithful matching; content is the subtopic's own substance.
  const sections: SourceSection[] = [];
  const outlineLines: string[] = [];
  for (const t of topics) {
    outlineLines.push(`# ${t.title}`);
    for (const s of t.subtopics) {
      outlineLines.push(`## ${s.title}`);
      if (sections.length >= MAX_SECTIONS) continue;
      const singleton = t.subtopics.length === 1 && normTitle(s.title) === normTitle(t.title);
      sections.push({
        heading: singleton ? t.title : `${t.title} › ${s.title}`,
        content: (s.description || t.description).slice(0, MAX_SECTION_CONTENT),
      });
    }
  }

  return {
    title: title || "Untitled document",
    hasIndex: false,
    outline: outlineLines.join("\n"),
    topicCount: topics.length,
    sections,
    topics,
  };
}

export async function extractDocument(
  base64: string,
  mimeType: string,
): Promise<ExtractedDocument | null> {
  // Two-stage, two-provider pipeline:
  //   1. Mistral OCR (direct API) reads the document — page markdown PLUS a
  //      vision-model description of every figure (bbox_annotation). Handles
  //      scanned/image PDFs and actually "sees" the figures.
  //   2. Claude (via OpenRouter) structures that clean OCR text into the app's
  //      faithful outline + per-section schema. It works from text only, so no
  //      images are re-sent and no PDF is re-processed downstream.
  if (!hasMistralKey()) {
    console.error("[extractDocument] MISTRAL_API_KEY not set — cannot OCR document");
    return null;
  }
  if (!hasOpenRouterKey()) {
    console.error("[extractDocument] OPENROUTER_API_KEY not set — cannot structure document");
    return null;
  }

  const t0 = Date.now();
  console.log(`[extractDocument] START — ${(base64.length / 1024).toFixed(0)}KB base64, mime=${mimeType || "application/pdf"}`);

  // ── Stage 1: OCR + figure descriptions ──
  let ocrMarkdown: string;
  try {
    const ocrStart = Date.now();
    const ocr = await runMistralOcr(base64, mimeType || "application/pdf");
    if (!ocr) {
      console.error("[extractDocument] Mistral OCR returned no pages");
      return null;
    }
    ocrMarkdown = ocrToMarkdown(ocr);
    console.log(
      `[extractDocument] OCR done in ${Date.now() - ocrStart}ms — ` +
      `${ocr.pagesProcessed} pages, ${ocrMarkdown.length} chars of markdown`,
    );
    if (!ocrMarkdown.trim()) {
      console.error("[extractDocument] OCR produced empty text");
      return null;
    }
  } catch (e) {
    console.error("[extractDocument] Mistral OCR failed:", e);
    return null;
  }

  // ── Stage 2: chunk → anti-padding topic extraction → merge/dedupe/cap ──
  // This is the fix for over-splitting: instead of asking Claude to faithfully
  // list every heading (which turned single lines into topics), we extract only
  // genuinely distinct, teachable topics with a hard per-chunk/global ceiling.
  try {
    const extractStart = Date.now();
    const { title, topics } = await extractTopics(ocrMarkdown);
    console.log(
      `[extractDocument] topic extraction done in ${Date.now() - extractStart}ms — ` +
      `${topics.length} topics, ${topics.reduce((n, t) => n + t.subtopics.length, 0)} subtopics total`,
    );
    const ok = topicsToExtracted(title, topics);
    if (!ok) console.error("[extractDocument] extraction returned no topics");
    console.log(`[extractDocument] TOTAL ${Date.now() - t0}ms`);
    return ok;
  } catch (e) {
    console.error("[extractDocument] topic extraction failed:", e);
    return null;
  }
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
