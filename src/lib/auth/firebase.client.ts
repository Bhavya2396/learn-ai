"use client";

/**
 * Firebase client SDK — browser only.
 *
 * Initializes the Firebase app + Auth from the public NEXT_PUBLIC_FIREBASE_*
 * env vars (these are public identifiers, not secrets). Exposes Google
 * sign-in / sign-out and a helper to grab the current ID token to send to our
 * API (which verifies it server-side with firebase-admin).
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut,
  type Auth, type User,
} from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

/** True when the public config is present (lets the UI show a helpful message). */
export const firebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

/** Lazily init the Firebase app (safe against Next hot-reload double-init). */
export function getFirebaseAuth(): Auth {
  if (_auth) return _auth;
  _app = getApps().length ? getApp() : initializeApp(config);
  _auth = getAuth(_app);
  return _auth;
}

/** Sign in with Google (popup). Resolves to the signed-in user. */
export async function signInWithGoogle(): Promise<User> {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const cred = await signInWithPopup(auth, provider);
  return cred.user;
}

/** Sign out of Firebase. */
export async function signOut(): Promise<void> {
  await fbSignOut(getFirebaseAuth());
}

/**
 * Current user's Firebase ID token, or null if signed out. Send it as
 * `Authorization: Bearer <token>` on API calls. `forceRefresh` re-mints a token
 * that's about to expire.
 */
export async function getIdToken(forceRefresh = false): Promise<string | null> {
  const user = getFirebaseAuth().currentUser;
  if (!user) return null;
  return user.getIdToken(forceRefresh);
}
