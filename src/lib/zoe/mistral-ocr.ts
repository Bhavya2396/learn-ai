/**
 * Mistral OCR — direct API client.
 *
 * Calls Mistral's OCR endpoint (https://api.mistral.ai/v1/ocr) directly, using
 * MISTRAL_API_KEY. This does two things in ONE pass that OpenRouter's file
 * parser cannot:
 *   1. OCR — page-by-page markdown (scanned/image PDFs included).
 *   2. Image descriptions — with `bbox_annotation_format`, Mistral runs a
 *      vision model over each extracted figure and returns structured
 *      annotations (image_type, short_description, summary).
 *
 * The output is plain JSON (markdown + annotated figures) that the rest of the
 * pipeline (Claude via OpenRouter) consumes — no PDF re-processing downstream.
 */

const OCR_URL = "https://api.mistral.ai/v1/ocr";
const OCR_MODEL = "mistral-ocr-latest";

export const hasMistralKey = () => !!process.env.MISTRAL_API_KEY;

/** Per-figure annotation Mistral returns when bbox_annotation is requested. */
export interface OcrImageAnnotation {
  image_type?: string;
  short_description?: string;
  summary?: string;
}

/** One extracted figure with its position and (optional) description. */
export interface OcrImage {
  id: string;
  annotation?: OcrImageAnnotation;
}

/** One OCR'd page: its markdown text plus any figures found on it. */
export interface OcrPage {
  index: number;
  markdown: string;
  images: OcrImage[];
}

export interface OcrResult {
  pages: OcrPage[];
  pagesProcessed: number;
}

/**
 * JSON schema handed to Mistral so each figure comes back with a usable,
 * redraw-oriented description rather than a raw crop we'd have to describe
 * ourselves later.
 */
const BBOX_SCHEMA = {
  type: "json_schema",
  json_schema: {
    name: "figure_annotation",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        image_type: {
          type: "string",
          description: "One of: diagram, chart, equation, table, photo.",
        },
        short_description: {
          type: "string",
          description: "A one-line caption of what the figure shows.",
        },
        summary: {
          type: "string",
          description:
            "A precise, redraw-ready description: every shape, axis, arrow, part, label, relationship, and what it demonstrates. Include any numeric values or data points.",
        },
      },
      required: ["image_type", "short_description", "summary"],
    },
  },
} as const;

interface RawOcrImage {
  id?: string;
  image_annotation?: string | OcrImageAnnotation;
}
interface RawOcrPage {
  index?: number;
  markdown?: string;
  images?: RawOcrImage[];
}

/** Mistral returns image_annotation as a JSON *string* — parse it defensively. */
function parseAnnotation(a: RawOcrImage["image_annotation"]): OcrImageAnnotation | undefined {
  if (!a) return undefined;
  if (typeof a === "object") return a;
  try {
    return JSON.parse(a) as OcrImageAnnotation;
  } catch {
    return { summary: a };
  }
}

/**
 * Run OCR on a base64-encoded document. Requests per-figure annotations so the
 * result already contains image descriptions.
 *
 * @param base64   Raw base64 (no prefix) OR a full data: URL.
 * @param mimeType e.g. "application/pdf".
 */
export async function runMistralOcr(
  base64: string,
  mimeType = "application/pdf",
): Promise<OcrResult | null> {
  const key = process.env.MISTRAL_API_KEY;
  if (!key) throw new Error("MISTRAL_API_KEY not set");

  const dataUrl = base64.startsWith("data:")
    ? base64
    : `data:${mimeType};base64,${base64}`;

  // Images (mimeType image/*) use an image_url chunk; everything else is a
  // document_url chunk (covers PDFs).
  const isImage = mimeType.startsWith("image/");
  const document = isImage
    ? { type: "image_url", image_url: dataUrl }
    : { type: "document_url", document_url: dataUrl };

  const res = await fetch(OCR_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OCR_MODEL,
      document,
      include_image_base64: false, // we only need the annotations, not the crops
      bbox_annotation_format: BBOX_SCHEMA,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Mistral OCR ${res.status}: ${text.slice(0, 300)}`);
  }

  const data = (await res.json()) as { pages?: RawOcrPage[]; usage_info?: { pages_processed?: number } };
  const rawPages = Array.isArray(data.pages) ? data.pages : [];

  const pages: OcrPage[] = rawPages.map((p, i) => ({
    index: typeof p.index === "number" ? p.index : i,
    markdown: typeof p.markdown === "string" ? p.markdown : "",
    images: Array.isArray(p.images)
      ? p.images.map((img, j) => ({
          id: img.id || `img-${i}-${j}`,
          annotation: parseAnnotation(img.image_annotation),
        }))
      : [],
  }));

  if (!pages.length) return null;
  return { pages, pagesProcessed: data.usage_info?.pages_processed ?? pages.length };
}

/**
 * Flatten an OcrResult into a single markdown string with figure descriptions
 * inlined where they appear — the clean text handed to Claude for structuring.
 */
export function ocrToMarkdown(result: OcrResult): string {
  const parts: string[] = [];
  for (const page of result.pages) {
    if (page.markdown.trim()) parts.push(page.markdown.trim());
    for (const img of page.images) {
      const a = img.annotation;
      if (!a) continue;
      const kind = a.image_type ? `[${a.image_type}] ` : "";
      const cap = a.short_description ? `${a.short_description}. ` : "";
      const sum = a.summary ?? "";
      const line = `${kind}${cap}${sum}`.trim();
      if (line) parts.push(`\n> FIGURE (${img.id}): ${line}\n`);
    }
  }
  return parts.join("\n\n");
}
