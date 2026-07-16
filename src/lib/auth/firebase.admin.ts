/**
 * Firebase Admin — server only.
 *
 * Verifies the Firebase ID tokens the client sends (Authorization: Bearer …)
 * and yields the authenticated user (uid + email + profile). The uid is the
 * identity everything in Postgres is keyed by (users.id === Firebase uid).
 *
 * Credentials come from a service account, provided EITHER as one JSON blob in
 * FIREBASE_SERVICE_ACCOUNT, OR as the three FIREBASE_* fields. Never expose
 * these to the client.
 */

import "server-only";
import {
  initializeApp, getApps, getApp, cert, type App, type ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import type { NextRequest } from "next/server";

/** The authenticated user extracted from a verified ID token. */
export interface AuthedUser {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
  provider?: string;
}

function loadServiceAccount(): ServiceAccount | null {
  const blob = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (blob) {
    try {
      const j = JSON.parse(blob);
      return {
        projectId: j.project_id ?? j.projectId,
        clientEmail: j.client_email ?? j.clientEmail,
        privateKey: (j.private_key ?? j.privateKey ?? "").replace(/\\n/g, "\n"),
      };
    } catch {
      throw new Error("FIREBASE_SERVICE_ACCOUNT is not valid JSON");
    }
  }
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (projectId && clientEmail && privateKey) {
    return { projectId, clientEmail, privateKey };
  }
  return null;
}

const globalForAdmin = globalThis as unknown as { __zoeFirebaseAdmin?: App };

function getAdminApp(): App {
  if (globalForAdmin.__zoeFirebaseAdmin) return globalForAdmin.__zoeFirebaseAdmin;
  if (getApps().length) {
    globalForAdmin.__zoeFirebaseAdmin = getApp();
    return globalForAdmin.__zoeFirebaseAdmin;
  }
  const sa = loadServiceAccount();
  if (!sa) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_SERVICE_ACCOUNT or " +
        "FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY (see .env.example).",
    );
  }
  const app = initializeApp({ credential: cert(sa) });
  globalForAdmin.__zoeFirebaseAdmin = app;
  return app;
}

/** True when server-side Firebase credentials are present. */
export function firebaseAdminConfigured(): boolean {
  return loadServiceAccount() !== null;
}

function extractBearer(req: NextRequest): string | null {
  const header = req.headers.get("authorization") ?? req.headers.get("Authorization");
  if (!header) return null;
  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token.trim();
}

/**
 * Verify the request's Firebase ID token and return the authenticated user, or
 * null if the token is missing / invalid / expired. Route handlers use this to
 * gate access and scope every DB read/write to `uid`.
 */
export async function getUserFromRequest(req: NextRequest): Promise<AuthedUser | null> {
  const token = extractBearer(req);
  if (!token) return null;
  try {
    const decoded = await getAuth(getAdminApp()).verifyIdToken(token);
    return {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name as string | undefined,
      picture: decoded.picture,
      provider: decoded.firebase?.sign_in_provider,
    };
  } catch {
    return null;
  }
}
