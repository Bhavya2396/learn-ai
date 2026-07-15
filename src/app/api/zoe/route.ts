import { NextRequest, NextResponse } from "next/server";
import { architect, companion, discover, mentor, optimizer, profilerNext, profilerSynthesize } from "@/lib/zoe/hats";
import type {
  ArchitectRequest, CompanionRequest, DiscoverRequest, MentorRequest, OptimizerRequest, ProfilerNextRequest, ProfilerSynthesizeRequest,
} from "@/lib/zoe/hats-types";

/**
 * One endpoint, four hats. The client picks a hat (and, for the Profiler, a
 * mode); we route to the right intelligence. Every hat returns JSON and never
 * throws to the client — failures degrade to hand-written fallbacks inside hats.ts.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const hat = body.hat as string | undefined;

  try {
    switch (hat) {
      case "profiler": {
        const mode = body.mode === "synthesize" ? "synthesize" : "next";
        if (mode === "synthesize") {
          return NextResponse.json(await profilerSynthesize(body as unknown as ProfilerSynthesizeRequest));
        }
        return NextResponse.json(await profilerNext(body as unknown as ProfilerNextRequest));
      }
      case "discover":
        return NextResponse.json(await discover(body as unknown as DiscoverRequest));
      case "architect":
        return NextResponse.json(await architect(body as unknown as ArchitectRequest));
      case "mentor":
        return NextResponse.json(await mentor(body as unknown as MentorRequest));
      case "optimizer":
        return NextResponse.json(await optimizer(body as unknown as OptimizerRequest));
      case "companion":
        return NextResponse.json(await companion(body as unknown as CompanionRequest));
      default:
        return NextResponse.json({ error: `unknown hat: ${hat}` }, { status: 400 });
    }
  } catch (e) {
    console.error("zoe hat error", hat, e);
    return NextResponse.json({ error: "hat failed" }, { status: 500 });
  }
}
