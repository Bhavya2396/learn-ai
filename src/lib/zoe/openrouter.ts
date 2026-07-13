/**
 * OpenRouter client — unified gateway to the best model for each job.
 *
 * ZOE's model strategy:
 *   • BASE (everything)        → Claude Sonnet 4.6  — narration, hats, planning, reasoning
 *   • REASONING (labs/code)    → Claude Opus 4.8    — interactive sandboxes, 3D, complex visuals
 *   • FAST (cheap/quick)       → Claude Haiku 4.5   — short utility calls
 *   • VISION (image/sketch)    → Claude Sonnet 4.6  — multimodal evaluation
 *
 * Images (Nano Banana) and video (Veo) stay on the native Gemini SDK in genai.ts.
 */

const OR_URL = "https://openrouter.ai/api/v1/chat/completions";

export const hasOpenRouterKey = () => !!process.env.OPENROUTER_API_KEY;

/* ── Model registry ─────────────────────────────────────────────────────── */

export const OR_MODELS = {
  base: "anthropic/claude-sonnet-4.6",       // default for ALL text generation
  reasoning: "anthropic/claude-opus-4.8",    // interactive code / labs / hard visuals
  fast: "anthropic/claude-haiku-4.5",        // quick, cheap utility calls
  vision: "anthropic/claude-sonnet-4.6",     // image + sketch evaluation (multimodal)
} as const;

export type OrTier = keyof typeof OR_MODELS;

/** Resolve a tier name or pass through an explicit OpenRouter slug. */
export function resolveModel(modelOrTier?: string): string {
  if (!modelOrTier) return OR_MODELS.base;
  if (modelOrTier in OR_MODELS) return OR_MODELS[modelOrTier as OrTier];
  // Map any legacy Gemini text-model names → Claude base (single source of truth)
  if (modelOrTier.startsWith("gemini")) return OR_MODELS.base;
  return modelOrTier; // already an OpenRouter slug
}

/* ── Message types (OpenAI-compatible) ──────────────────────────────────── */

export type OrContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } }
  | { type: "file"; file: { filename: string; file_data: string } };

/** OpenRouter plugin spec (e.g. the PDF file-parser). */
export type OrPlugin = { id: string; pdf?: { engine: "pdf-text" | "mistral-ocr" | "native" } };

export interface OrMessage {
  role: "system" | "user" | "assistant";
  content: string | OrContentPart[];
}

export interface OrChatOptions {
  system?: string;
  user?: string;
  messages?: OrMessage[];
  model?: string;          // tier name or explicit slug
  temperature?: number;
  maxTokens?: number;
  json?: boolean;          // hint that we expect JSON back
  plugins?: OrPlugin[];    // e.g. PDF file-parser
}

/* ── Core chat call ─────────────────────────────────────────────────────── */

export async function orChat(opts: OrChatOptions): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY not set");

  const model = resolveModel(opts.model);

  const messages: OrMessage[] = opts.messages
    ? [...opts.messages]
    : [];
  if (!opts.messages) {
    if (opts.system) messages.push({ role: "system", content: opts.system });
    if (opts.user) messages.push({ role: "user", content: opts.user });
  }

  const body: Record<string, unknown> = {
    model,
    messages,
    temperature: opts.temperature ?? 0.8,
    max_tokens: opts.maxTokens ?? 8192,
  };
  if (opts.json) {
    body.response_format = { type: "json_object" };
  }
  if (opts.plugins?.length) {
    body.plugins = opts.plugins;
  }

  const res = await fetch(OR_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://zoe.one",
      "X-Title": "ZOE",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OpenRouter ${res.status}: ${text.slice(0, 300)}`);
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

/* ── Vision helper — evaluate an image/sketch with text context ─────────── */

export async function orVision(opts: {
  system: string;
  text: string;
  imageDataUrl: string;     // data:image/png;base64,....
  model?: string;
  json?: boolean;
  maxTokens?: number;
}): Promise<string> {
  return orChat({
    model: opts.model ?? "vision",
    json: opts.json,
    maxTokens: opts.maxTokens,
    temperature: 0.4,
    messages: [
      { role: "system", content: opts.system },
      {
        role: "user",
        content: [
          { type: "text", text: opts.text },
          { type: "image_url", image_url: { url: opts.imageDataUrl } },
        ],
      },
    ],
  });
}

/* ── Document helper — read a PDF/text file with text context ────────────────
 * Claude reads the document natively via OpenRouter. We attach the free
 * "pdf-text" parser so text-based documents are extracted cheaply; scanned
 * PDFs degrade gracefully (little text) rather than failing.
 */
export async function orDocument(opts: {
  system: string;
  text: string;
  fileData: string;        // base64 (no prefix) OR a full data: URL
  mimeType?: string;
  fileName?: string;
  model?: string;
  json?: boolean;
  maxTokens?: number;
}): Promise<string> {
  const dataUrl = opts.fileData.startsWith("data:")
    ? opts.fileData
    : `data:${opts.mimeType || "application/pdf"};base64,${opts.fileData}`;
  return orChat({
    model: opts.model ?? "base",
    json: opts.json,
    maxTokens: opts.maxTokens,
    temperature: 0.1,
    plugins: [{ id: "file-parser", pdf: { engine: "pdf-text" } }],
    messages: [
      { role: "system", content: opts.system },
      {
        role: "user",
        content: [
          { type: "text", text: opts.text },
          { type: "file", file: { filename: opts.fileName || "document.pdf", file_data: dataUrl } },
        ],
      },
    ],
  });
}
