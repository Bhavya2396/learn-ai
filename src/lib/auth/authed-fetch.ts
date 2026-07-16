"use client";

/**
 * fetch() wrapper that attaches the current Firebase ID token as a bearer
 * header. Use for any API call that must be scoped to the signed-in user
 * (brain, lesson cache). Returns the raw Response; callers handle status.
 *
 * If there is no signed-in user, the request is still sent (without a token)
 * and the server will answer 401 — callers can treat that as "not signed in".
 */

import { getIdToken } from "./firebase.client";

export async function authedFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const token = await getIdToken();
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetch(input, { ...init, headers });
}

/** True when a Firebase user is currently signed in. */
export async function hasAuthedUser(): Promise<boolean> {
  return (await getIdToken()) !== null;
}
