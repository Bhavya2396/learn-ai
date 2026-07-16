import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth/firebase.admin";
import { ensureUser, loadBrain, saveBrain } from "@/lib/db/brain.repo";
import type { ZoeBrainState } from "@/lib/zoe/types";

/**
 * The ZOE brain, server-side. Replaces the browser localStorage store.
 *
 *   GET  /api/brain  → the user's ZoeBrainState (or null if none yet)
 *   POST /api/brain  → persist the whole ZoeBrainState (atomic saveBrain)
 *
 * Both are scoped to the authenticated Firebase uid — a user can only ever
 * read/write their own brain.
 */

// Auth + DB touching — always run at request time, never statically collected.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const brain = await loadBrain(user.uid);
    return NextResponse.json({ brain });
  } catch (e) {
    console.error("brain GET failed", e);
    return NextResponse.json({ error: "load failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let state: ZoeBrainState;
  try {
    state = (await req.json()) as ZoeBrainState;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  try {
    // Make sure the users row (+ profile) exists before writing the brain.
    await ensureUser(user.uid, {
      email: user.email ?? null,
      displayName: user.name ?? null,
      photoUrl: user.picture ?? null,
      provider: user.provider ?? null,
    });
    await saveBrain(user.uid, state);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("brain POST failed", e);
    return NextResponse.json({ error: "save failed" }, { status: 500 });
  }
}
