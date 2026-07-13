"use client";

import { useRouter } from "next/navigation";
import { Keyboard, Mic, Square } from "lucide-react";
import ZoeOrb from "./ZoeOrb";
import type { Mood } from "@/lib/zoe/ambience";

/**
 * The ask-dock: a single floating companion bar (no tab bar), mirroring the
 * reference. Left = the living orb, center = a live status / prompt, right =
 * keyboard + mic. Used two ways:
 *  - navigational (Home/Journey): tapping anything opens the Ask surface.
 *  - interactive (Ask surface): live handlers + status (Listening/Thinking/Speaking).
 */
export default function AskDock({
  placeholder = "Ask ZOE anything…",
  status,
  active = false,
  micActive = false,
  mood,
  onOrb,
  onType,
  onMic,
}: {
  placeholder?: string;
  status?: string;
  active?: boolean;
  micActive?: boolean;
  mood?: Mood;
  onOrb?: () => void;
  onType?: () => void;
  onMic?: () => void;
}) {
  const router = useRouter();
  const goAsk = () => router.push("/ask");
  const goListen = () => router.push("/ask?listen=1");

  const handleOrb = onOrb ?? goAsk;
  const handleType = onType ?? goAsk;
  const handleMic = onMic ?? goListen;

  return (
    <div className="ask-dock" role="region" aria-label="Ask ZOE">
      <span className="ask-glow" data-on={active} aria-hidden />
      <button onClick={handleOrb} aria-label="ZOE" className="zoe-haptic flex-shrink-0">
        <ZoeOrb size={34} mood={mood} sparks={false} />
      </button>
      <button onClick={handleType} className="ask-dock-status text-left zoe-haptic" aria-label="Type a question">
        {status ?? placeholder}
      </button>
      <button onClick={handleType} aria-label="Type" className="ask-dock-icon zoe-haptic">
        <Keyboard className="w-[18px] h-[18px]" />
      </button>
      <button onClick={handleMic} aria-label={micActive ? "Stop listening" : "Speak"} className="ask-dock-mic zoe-haptic">
        {micActive ? <Square className="w-4 h-4" /> : <Mic className="w-5 h-5" />}
      </button>
    </div>
  );
}
