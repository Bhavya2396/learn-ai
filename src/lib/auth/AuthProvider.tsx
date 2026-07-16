"use client";

/**
 * Auth context — the single source of truth for "who is signed in" on the
 * client. Wraps the app (in layout.tsx), listens to Firebase auth state, and
 * exposes the current user + sign-in/out.
 *
 * On sign-in it also POSTs the user to /api/auth/session so a users row exists
 * in Postgres (uid → users.id) before the brain tries to load/save.
 *
 * IMPORTANT: nothing about the user is persisted to the browser here — Firebase
 * keeps its own auth session; all app DATA lives in Postgres, fetched per uid.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
  firebaseConfigured, getFirebaseAuth, getIdToken,
  signInWithGoogle as fbSignInWithGoogle, signOut as fbSignOut,
} from "./firebase.client";
import {
  clearBrain, hydrateBrainFromServer, startBrainAutosync,
} from "@/lib/zoe/brain-sync";

interface AuthContextValue {
  /** Firebase user, or null when signed out. */
  user: User | null;
  /** True until the first auth-state resolution (avoids UI flicker/redirect races). */
  loading: boolean;
  /** True when Firebase public config is present. */
  configured: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  /** Current ID token for API calls, or null. */
  getToken: (forceRefresh?: boolean) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // When Firebase isn't configured there's no auth to resolve — start "done".
  const [loading, setLoading] = useState(firebaseConfigured);

  useEffect(() => {
    if (!firebaseConfigured) return;
    const unsub = onAuthStateChanged(getFirebaseAuth(), async (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        // Ensure a Postgres users row exists for this uid (idempotent upsert),
        // then hydrate the brain from the server and start autosync.
        try {
          const token = await u.getIdToken();
          await fetch("/api/auth/session", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch {
          /* non-fatal — the brain POST ensures the user too */
        }
        await hydrateBrainFromServer();
        startBrainAutosync();
      } else {
        // Signed out — drop all in-memory brain state.
        clearBrain();
      }
    });
    return () => unsub();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await fbSignInWithGoogle();
  }, []);

  const signOut = useCallback(async () => {
    await fbSignOut();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured: firebaseConfigured,
      signInWithGoogle,
      signOut,
      getToken: getIdToken,
    }),
    [user, loading, signInWithGoogle, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
