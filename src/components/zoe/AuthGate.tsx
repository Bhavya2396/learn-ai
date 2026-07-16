"use client";

/**
 * Wraps a protected page. While Firebase resolves auth state it shows a quiet
 * loader; if the user is signed out it redirects to /login; once signed in (and
 * the brain has hydrated from Postgres) it renders the page.
 *
 * Put this at the top of any page that needs a user (home, start, journey,
 * profile, ask).
 */

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useZoeBrain } from "@/lib/zoe/brain";
import LivingBackground from "./LivingBackground";
import ZoeOrb from "./ZoeOrb";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, configured } = useAuth();
  const hydrated = useZoeBrain((s) => s.hydrated);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${next}`);
    }
  }, [loading, user, router, pathname]);

  // Auth not configured — let the page render so local dev without Firebase
  // still works; the login page explains what's missing.
  if (!configured) return <>{children}</>;

  // Still resolving auth, redirecting, or brain not yet loaded → quiet loader.
  if (loading || !user || !hydrated) {
    return (
      <div className="zoe zoe-warm relative min-h-screen flex items-center justify-center">
        <LivingBackground />
        <ZoeOrb size={48} mood="calm" className="relative z-10" />
      </div>
    );
  }

  return <>{children}</>;
}
