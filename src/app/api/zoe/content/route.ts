import { NextRequest, NextResponse } from "next/server";
import { planLesson, generateMedia, generateLesson, verifyAndRepairLesson } from "@/lib/zoe/content-engine";
import type { ContentRequest } from "@/lib/zoe/content-types";

/**
 * POST /api/zoe/content
 *
 * Generates a rich, multimodal lesson on demand.
 * Streams progress updates as newline-delimited JSON so the client
 * can show which stage is active (planning → media → generating).
 *
 * Final line is the full LessonContent.
 */
export async function POST(req: NextRequest) {
  let body: ContentRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (!body.step?.id || !body.aspiration?.title) {
    return NextResponse.json({ error: "missing step or aspiration" }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
      };

      try {
        // Stage 1: Plan
        send({ stage: "planning", message: "Understanding the best way to teach this..." });
        const plan = await planLesson(body);
        send({ stage: "planned", sections: plan.sections.length, hasMedia: plan.mediaPrompts.length > 0 });

        // Stages 2 + 3 in PARALLEL — media (Gemini) and lesson code (Opus) both
        // depend only on the plan, so we don't pay for them sequentially.
        if (plan.mediaPrompts.length > 0) {
          send({ stage: "media", message: `Generating ${plan.mediaPrompts.length} visual${plan.mediaPrompts.length > 1 ? "s" : ""} + building experience...` });
        } else {
          send({ stage: "generating", message: "Crafting your lesson experience..." });
        }

        const [media, draft] = await Promise.all([
          generateMedia(plan.mediaPrompts),
          generateLesson(plan, [], body),
        ]);
        const ready = media.filter((m) => m.status === "ready").length;
        if (plan.mediaPrompts.length > 0) {
          send({ stage: "media_done", ready, total: plan.mediaPrompts.length });
        }

        // Stage 3.5: Verify everything is in place to present (catches blank screens)
        send({ stage: "verifying", message: "Checking everything renders correctly..." });
        const { lesson, summary, repaired, dropped } = await verifyAndRepairLesson({ ...draft, media });
        send({ stage: "verified", message: summary, repaired, dropped });

        send({ stage: "done", lesson });
      } catch (e) {
        console.error("[content-engine] pipeline failed:", e);
        send({ stage: "error", message: "Content generation failed" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "Transfer-Encoding": "chunked",
    },
  });
}
