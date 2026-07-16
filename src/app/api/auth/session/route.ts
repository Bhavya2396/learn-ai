import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth/firebase.admin";
import { ensureUser } from "@/lib/db/brain.repo";

/**
 * Called right after Firebase sign-in. Verifies the ID token and upserts the
 * users row (uid → users.id) with the Google profile + last_login_at. This
 * guarantees a users row exists before the brain tries to load/save.
 */

// Auth + DB touching — always run at request time, never statically collected.
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    await ensureUser(user.uid, {
      email: user.email ?? null,
      displayName: user.name ?? null,
      photoUrl: user.picture ?? null,
      provider: user.provider ?? null,
    });
    return NextResponse.json({ uid: user.uid });
  } catch (e) {
    console.error("session ensureUser failed", e);
    return NextResponse.json({ error: "session failed" }, { status: 500 });
  }
}
