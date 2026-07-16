import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth/firebase.admin";
import {
  deleteLessonForUser, getLessonForUser, storeLessonForUser,
} from "@/lib/db/lessons.repo";
import type { LessonContent } from "@/lib/zoe/content-types";

/**
 * Durable per-user lesson store in Postgres (replaces browser IndexedDB),
 * scoped per Firebase uid. Lessons persist indefinitely — no TTL.
 *
 *   GET    /api/lessons?stepId=…   → { lesson: LessonContent | null }
 *   POST   /api/lessons            → { stepId, content } → store, { ok }
 *   DELETE /api/lessons?stepId=…   → invalidate
 */

// Auth + DB touching — always run at request time, never statically collected.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const stepId = req.nextUrl.searchParams.get("stepId");
  if (!stepId) return NextResponse.json({ error: "stepId required" }, { status: 400 });

  try {
    const lesson = await getLessonForUser(user.uid, stepId);
    return NextResponse.json({ lesson });
  } catch (e) {
    console.error("lessons GET failed", e);
    return NextResponse.json({ error: "load failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: { stepId?: string; content?: LessonContent };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  if (!body.stepId || !body.content) {
    return NextResponse.json({ error: "stepId and content required" }, { status: 400 });
  }

  try {
    await storeLessonForUser(user.uid, body.stepId, body.content);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("lessons POST failed", e);
    return NextResponse.json({ error: "save failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const stepId = req.nextUrl.searchParams.get("stepId");
  if (!stepId) return NextResponse.json({ error: "stepId required" }, { status: 400 });

  try {
    await deleteLessonForUser(user.uid, stepId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("lessons DELETE failed", e);
    return NextResponse.json({ error: "delete failed" }, { status: 500 });
  }
}
