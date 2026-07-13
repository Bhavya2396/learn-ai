"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Check,
  Flame, Wind, Sparkles, Heart,
  Clock, Timer, Infinity, Shuffle,
  Eye, Wrench, BookOpen, MessageCircle,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Flame, Wind, Sparkles, Heart,
  Clock, Timer, Infinity, Shuffle,
  Eye, Wrench, BookOpen, MessageCircle,
};

function OptionIcon({ name }: { name?: string }) {
  if (!name) return null;
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return (
    <span className="z-opt-ico w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: "var(--z-accent-soft)", color: "var(--z-brand-deep)" }}>
      <Icon className="w-4 h-4" />
    </span>
  );
}
import type { DynamicQuestion } from "@/lib/zoe/hats-types";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function QuestionCard({
  question,
  onAnswer,
}: {
  question: DynamicQuestion;
  onAnswer: (answer: string) => void;
}) {
  const [multi, setMulti] = useState<string[]>([]);
  const [scaleVal, setScaleVal] = useState<number | null>(null);
  const [text, setText] = useState("");

  const toggleMulti = (label: string) =>
    setMulti((m) => (m.includes(label) ? m.filter((x) => x !== label) : [...m, label]));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {question.rationale && (
        <span className="block text-[13px] font-semibold" style={{ color: "var(--z-ink-3)" }}>{question.rationale}</span>
      )}
      <h2 className="mt-2 zoe-display text-[clamp(1.7rem,5vw,2.4rem)]" style={{ color: "var(--z-ink)" }}>
        {question.prompt}
      </h2>

      {/* SINGLE */}
      {question.type === "single" && (
        <div className="mt-7 grid gap-3">
          {question.options?.map((o, i) => (
            <motion.button
              key={o.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, ease: EASE }}
              onClick={() => onAnswer(o.label)}
              className="z-opt"
            >
              <OptionIcon name={o.icon} />
              <span className="font-bold text-[16px] flex-1" style={{ color: "var(--z-ink)" }}>{o.label}</span>
              <ArrowRight className="w-4.5 h-4.5 flex-shrink-0" style={{ color: "var(--z-ink-3)" }} />
            </motion.button>
          ))}
        </div>
      )}

      {/* MULTI */}
      {question.type === "multi" && (
        <div className="mt-7">
          <div className="grid gap-3">
            {question.options?.map((o) => {
              const on = multi.includes(o.label);
              return (
                <button key={o.label} onClick={() => toggleMulti(o.label)} className="z-opt" data-on={on}>
                  <OptionIcon name={o.icon} />
                  <span className="font-bold text-[16px] flex-1" style={{ color: "var(--z-ink)" }}>{o.label}</span>
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: on ? "var(--z-accent)" : "transparent", border: on ? "none" : "2px solid var(--z-line-2)" }}>
                    {on && <Check className="w-4 h-4" style={{ color: "var(--z-on-brand)" }} strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
          <ContinueBtn disabled={multi.length === 0} onClick={() => onAnswer(multi.join(", "))} />
        </div>
      )}

      {/* SCALE */}
      {question.type === "scale" && question.scale && (
        <div className="mt-8">
          <div className="flex items-center justify-between gap-2">
            {Array.from({ length: question.scale.max - question.scale.min + 1 }).map((_, i) => {
              const v = question.scale!.min + i;
              const on = scaleVal === v;
              return (
                <button
                  key={v}
                  onClick={() => setScaleVal(v)}
                  className="flex-1 aspect-square max-w-[64px] rounded-2xl font-extrabold text-lg transition-all"
                  style={{
                    border: on ? "2px solid var(--z-accent)" : "2px solid var(--z-line)",
                    background: on ? "var(--z-accent)" : "var(--z-surface)",
                    color: on ? "var(--z-on-brand)" : "var(--z-ink)",
                    boxShadow: on ? "0 3px 0 var(--z-accent-edge)" : "0 3px 0 rgba(42,34,20,0.07)",
                  }}
                >
                  {v}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between mt-3 text-[13px] font-semibold" style={{ color: "var(--z-ink-3)" }}>
            <span>{question.scale.minLabel}</span>
            <span>{question.scale.maxLabel}</span>
          </div>
          <ContinueBtn disabled={scaleVal === null} onClick={() => onAnswer(`${scaleVal} (${question.scale!.minLabel} → ${question.scale!.maxLabel})`)} />
        </div>
      )}

      {/* TEXT */}
      {question.type === "text" && (
        <div className="mt-7">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={question.placeholder || "Type your answer…"}
            rows={3}
            className="w-full glass-soft rounded-2xl p-4 text-[16px] font-medium resize-none outline-none focus:border-[var(--z-accent)]"
            style={{ color: "var(--z-ink)" }}
          />
          <ContinueBtn disabled={text.trim().length === 0} onClick={() => onAnswer(text.trim())} />
        </div>
      )}
    </motion.div>
  );
}

function ContinueBtn({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={disabled} className="z-btn z-btn-brand w-full mt-6 !py-4 !text-[16px]">
      Continue <ArrowRight className="w-4 h-4" />
    </button>
  );
}
