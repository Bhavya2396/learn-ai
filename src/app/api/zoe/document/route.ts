import { NextRequest, NextResponse } from "next/server";
import { extractDocument } from "@/lib/zoe/genai";
import { architectFromDocument } from "@/lib/zoe/hats";
import { journeyFromTopics } from "@/lib/zoe/journey";

/**
 * Document-first entry point. Two shapes:
 *
 *   1. EXTRACT + BUILD (first pass)
 *      { fileData: base64, mimeType, fileName }
 *      → reads the document (OCR + topic/subtopic extraction), then builds the
 *        journey DIRECTLY from the extracted topics (topic = phase, subtopic =
 *        step). No architect LLM call — step count stays faithful, no padding.
 *      → returns { journey, title, area, hasIndex, outline, topicCount, sections }
 *
 *   2. RE-ARCHITECT (preview tweak — no re-upload)
 *      { outline, title, hasIndex?, area?, tweak }
 *      → rebuilds the path from the already-extracted outline (# topic /
 *        ## subtopic), honouring the tweak.
 *      → returns { journey, title, area, hasIndex, outline }
 *
 * Never throws to the client — degrades to a hand-written fallback.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

const DEFAULT_AREA = "knowledge";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const area = (typeof body.area === "string" && body.area) || DEFAULT_AREA;
  const tweak = typeof body.tweak === "string" ? body.tweak : undefined;

  try {
    // ── Path 2: re-architect from an existing outline (preview tweak) ──
    if (typeof body.outline === "string" && body.outline.trim()) {
      const title = (typeof body.title === "string" && body.title) || "Untitled document";
      const hasIndex = !!body.hasIndex;
      const { journey } = await architectFromDocument({ title, outline: body.outline, hasIndex, area, tweak });
      return NextResponse.json({ journey, title, area, hasIndex, outline: body.outline });
    }

    // ── Path 1: extract the document, then architect from it ──
    const fileData = typeof body.fileData === "string" ? body.fileData : "";
    const mimeType = typeof body.mimeType === "string" ? body.mimeType : "application/pdf";
    const fileName = typeof body.fileName === "string" ? body.fileName : "";
    if (!fileData) {
      return NextResponse.json({ error: "no document provided" }, { status: 400 });
    }

    const doc = await extractDocument(fileData, mimeType);
    if (!doc) {
      return NextResponse.json({ error: "could not read document" }, { status: 422 });
    }

    const title = doc.title && doc.title !== "Untitled document"
      ? doc.title
      : fileName.replace(/\.[^.]+$/, "") || doc.title;

    // Build the journey directly from the extracted topic→subtopic structure.
    // Fall back to the LLM architect only if topics are somehow absent.
    const journey = doc.topics?.length
      ? journeyFromTopics(title, doc.topics)
      : (await architectFromDocument({ title, outline: doc.outline, hasIndex: doc.hasIndex, area, tweak })).journey;

    return NextResponse.json({
      journey,
      title,
      area,
      hasIndex: doc.hasIndex,
      outline: doc.outline,
      topicCount: doc.topicCount,
      sections: doc.sections ?? [],
    });
  } catch (e) {
    console.error("zoe document error", e);
    return NextResponse.json({ error: "document processing failed" }, { status: 500 });
  }
}
