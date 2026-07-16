"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth/AuthProvider";
import LivingBackground from "./LivingBackground";
import ZoeOrb from "./ZoeOrb";

/** Google-only sign-in. Redirects to `?next=` (or /home) once authenticated. */
export default function Login() {
  const { user, loading, configured, signInWithGoogle } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/home";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already signed in → bounce to the target.
  useEffect(() => {
    if (!loading && user) router.replace(next);
  }, [loading, user, next, router]);

  const handleSignIn = async () => {
    setError(null);
    setBusy(true);
    try {
      await signInWithGoogle();
      // AuthProvider's onAuthStateChanged handles the redirect via the effect.
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div className="zoe zoe-warm relative min-h-screen flex flex-col items-center justify-center px-7 text-center">
      <LivingBackground />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <ZoeOrb size={72} mood="calm" />
        <h1 className="mt-7 zoe-display text-[clamp(1.9rem,7vw,2.7rem)] leading-[1.1]" style={{ color: "var(--z-ink)" }}>
          Welcome to ZOE
        </h1>
        <p className="mt-3 text-[15.5px] font-medium max-w-xs" style={{ color: "var(--z-ink-2)" }}>
          Sign in to pick up where you left off — your journey lives with your account, on every device.
        </p>

        {!configured ? (
          <p className="mt-8 text-[13.5px] font-semibold max-w-xs" style={{ color: "var(--z-warn, #b45309)" }}>
            Sign-in isn&apos;t configured yet. Add the NEXT_PUBLIC_FIREBASE_* keys to your environment.
          </p>
        ) : (
          <>
            <button
              onClick={handleSignIn}
              disabled={busy}
              className="mt-9 inline-flex items-center gap-3 rounded-2xl px-6 py-4 text-[15px] font-bold transition-transform duration-150 active:translate-y-0.5 disabled:opacity-60"
              style={{ background: "var(--z-surface)", color: "var(--z-ink)", border: "1.5px solid var(--z-line-2)", boxShadow: "0 3px 0 var(--z-line-2)" }}
            >
              <GoogleMark />
              {busy ? "Signing in…" : "Continue with Google"}
            </button>
            {error && (
              <p className="mt-4 text-[13px] font-semibold max-w-xs" style={{ color: "var(--z-warn, #b45309)" }}>
                {error}
              </p>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}
