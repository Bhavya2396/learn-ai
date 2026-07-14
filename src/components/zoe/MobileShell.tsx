"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import LivingBackground from "./LivingBackground";
import ZoeOrb from "./ZoeOrb";
import AskDock from "./AskDock";
import { useZoeBrain } from "@/lib/zoe/brain";
import { useAmbience } from "@/lib/zoe/ambience";

/**
 * The mobile-native frame: a living background, a centered phone-width column,
 * and the single ask-dock at the bottom (mirroring the reference — no tab bar).
 */
export default function MobileShell({
  children,
  right,
  topTitle,
  dock = true,
  header = true,
}: {
  children: React.ReactNode;
  right?: React.ReactNode;
  topTitle?: React.ReactNode;
  dock?: boolean;
  header?: boolean;
}) {
  const ledger = useZoeBrain((s) => s.ledger);
  const totalZot = useMemo(() => ledger.reduce((sum, e) => sum + e.amount, 0), [ledger]);
  const mood = useAmbience((s) => s.mood);

  return (
    <div className="zoe zoe-warm relative min-h-screen">
      <LivingBackground />

      <div className="zoe-app">
        {header && (
        <header className="zoe-topbar">
          <Link href="/" className="flex items-center gap-2.5 zoe-haptic">
            <ZoeOrb size={30} mood={mood} sparks={false} />
            <span className="text-[16px] font-extrabold tracking-tight" style={{ color: "var(--z-ink)" }}>
              {topTitle ?? "ZOE"}
            </span>
          </Link>
          <div className="flex items-center gap-2.5">
            {/* ZOT balance chip — always visible in the topbar */}
            {totalZot > 0 && (
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{ background: "var(--z-accent-soft)", color: "var(--z-brand-deep)" }}
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span className="text-[12px] font-extrabold tracking-tight">{totalZot}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">ZOT</span>
              </div>
            )}
            {right}
          </div>
        </header>
        )}

        {children}
      </div>

      {dock && <AskDock />}
    </div>
  );
}
