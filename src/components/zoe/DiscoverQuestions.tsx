"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Waveform } from "./ZoeGraphics";
import type { DiscoverResponse, DiscoverNode, DiscoverOption, QA } from "@/lib/zoe/hats-types";

/**
 * Adaptive goal-discovery MCQ. Fetches a pregenerated branching question tree
 * for a goal, walks it (single-choice), and lets the user type a CUSTOM answer
 * on any question — which regenerates the rest of the path. Collects QA[] and
 * hands them back so the caller can feed them to the Architect.
 *
 * Shared by the dashboard "create goal" flow and onboarding.
 */

const DISCOVER_MAX = 5; // must match server DISCOVER_MAX_DEPTH

export default function DiscoverQuestions({
  title,
  area,
  memoryContext,
  onComplete,
  onSkip,
}: {
  title: string;
  area: string;
  memoryContext?: string;
  /** Called with the collected answers when the question path ends. */
  onComplete: (answers: QA[]) => void;
  /** Called when there are no useful questions (or discovery fails). */
  onSkip: () => void;
}) {
  const [node, setNode] = useState<DiscoverNode | null>(null);
  const [answers, setAnswers] = useState<QA[]>([]);
  const [loading, setLoading] = useState(true);   // initial tree fetch
  const [regen, setRegen] = useState(false);      // regenerating after a custom answer
  const [customOpen, setCustomOpen] = useState(false);
  const [customText, setCustomText] = useState("");
  const started = useRef(false);

  const post = (body: Record<string, unknown>) =>
    fetch("/api/zoe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then((r) => r.json() as Promise<DiscoverResponse>);

  // Fetch the initial tree once.
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    (async () => {
      try {
        const data = await post({ hat: "discover", aspiration: { title, area }, memoryContext });
        if (data.root) { setNode(data.root); setLoading(false); }
        else onSkip();
      } catch {
        onSkip();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => { setCustomOpen(false); setCustomText(""); };

  const advance = async (all: QA[], next: DiscoverNode | null, wasCustom: boolean) => {
    reset();
    if (next) { setAnswers(all); setNode(next); return; }
    // No pregenerated branch. Custom answer + budget left → regenerate the rest.
    if (wasCustom && all.length < DISCOVER_MAX) {
      setRegen(true);
      try {
        const data = await post({
          hat: "discover", aspiration: { title, area },
          answered: all, remaining: DISCOVER_MAX - all.length, memoryContext,
        });
        setRegen(false);
        if (data.root) { setAnswers(all); setNode(data.root); return; }
      } catch { setRegen(false); }
    }
    onComplete(all); // path ended (or budget spent)
  };

  const pick = (opt: DiscoverOption) => {
    if (!node) return;
    void advance([...answers, { id: node.id, question: node.question, answer: opt.label }], opt.next ?? null, false);
  };

  const submitCustom = () => {
    if (!node || !customText.trim()) return;
    void advance([...answers, { id: node.id, question: node.question, answer: customText.trim() }], null, true);
  };

  if (loading || regen || !node) {
    return (
      <div className="min-h-[100svh] flex flex-col items-center justify-center px-7 text-center">
        <Waveform bars={5} size={48} className="mb-4" />
        <p className="text-[15px] font-semibold" style={{ color: "var(--z-ink-2)" }}>
          {regen ? "Thinking about that…" : "Getting to know your goal…"}
        </p>
      </div>
    );
  }

  return (
    <motion.div key={node.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="min-h-[100svh] flex flex-col items-center justify-center px-7 text-center">
      <span className="z-eyebrow mb-4">A couple of quick things</span>
      <h1 className="zoe-display text-[clamp(1.6rem,5.5vw,2.5rem)] leading-[1.15] max-w-md" style={{ color: "var(--z-ink)" }}>
        {node.question}
      </h1>
      <div className="mt-8 w-full max-w-sm flex flex-col gap-2.5">
        {node.options.map((opt, i) => (
          <button key={i} onClick={() => pick(opt)}
            className="w-full text-left rounded-2xl px-5 py-4 text-[15px] font-bold transition-transform duration-150 active:translate-y-0.5"
            style={{ background: "var(--z-surface)", color: "var(--z-ink)", border: "1.5px solid var(--z-line-2)", boxShadow: "0 3px 0 var(--z-line-2)" }}>
            {opt.label}
          </button>
        ))}

        {!customOpen ? (
          <button onClick={() => setCustomOpen(true)}
            className="w-full text-left rounded-2xl px-5 py-4 text-[15px] font-bold transition-transform duration-150 active:translate-y-0.5"
            style={{ background: "transparent", color: "var(--z-ink-2)", border: "1.5px dashed var(--z-line-2)" }}>
            + Something else…
          </button>
        ) : (
          <div className="flex flex-col gap-2.5">
            <textarea autoFocus value={customText} onChange={(e) => setCustomText(e.target.value)} rows={2}
              placeholder="Type your own answer…"
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitCustom(); } }}
              className="z-center-input !h-auto w-full resize-none text-left !px-5 !py-3.5"
              style={{ color: "var(--z-ink)" }} />
            <button onClick={submitCustom} disabled={!customText.trim()} className="z-btn z-btn-brand justify-center !py-3.5">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
