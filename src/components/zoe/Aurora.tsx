"use client";

/**
 * Drifting warm aurora glow — ZOE's recoloring of the dark/visionOS reference look.
 * Render once near the top of a `.zoe-night` screen.
 */
export default function Aurora({ variant = "warm" }: { variant?: "warm" | "cool" | "violet" }) {
  const palettes: Record<string, string[]> = {
    warm: ["#F5A524", "#FF6B5B", "#E0892B", "#8E7BA3"],
    cool: ["#5BB98C", "#15C2A5", "#2E9BFF", "#F5A524"],
    violet: ["#8E7BA3", "#7C5CFF", "#FF5DA2", "#F5A524"],
  };
  const c = palettes[variant];
  return (
    <div className="aurora aurora-grain" aria-hidden>
      <div className="aurora-blob aurora-a" style={{ width: "55vw", height: "55vw", top: "-12%", left: "-8%", background: c[0] }} />
      <div className="aurora-blob aurora-b" style={{ width: "48vw", height: "48vw", top: "8%", right: "-12%", background: c[1] }} />
      <div className="aurora-blob aurora-c" style={{ width: "46vw", height: "46vw", bottom: "-18%", left: "18%", background: c[2] }} />
      <div className="aurora-blob aurora-a" style={{ width: "32vw", height: "32vw", bottom: "-6%", right: "6%", background: c[3], opacity: 0.4 }} />
      {/* vignette so glass reads cleanly */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 0%, transparent 40%, rgba(11,10,8,0.7) 100%)" }} />
    </div>
  );
}
