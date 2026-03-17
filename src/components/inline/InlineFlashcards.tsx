"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flashcard } from "@/lib/types";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";

interface InlineFlashcardsProps {
  cards: Flashcard[];
  conceptName: string;
  initialLang?: string;
}

export default function InlineFlashcards({
  cards,
  conceptName,
  initialLang = "en",
}: InlineFlashcardsProps) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">(initialLang as "en" | "hi");
  const [dir, setDir] = useState(0);

  const card = cards[idx];
  const getText = (ml: { en: string; hi?: string }) =>
    lang === "hi" && ml.hi ? ml.hi : ml.en;

  const isAnswer = flipped;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: isAnswer
          ? "linear-gradient(145deg, rgba(100,210,255,0.07) 0%, rgba(255,255,255,0.04) 100%)"
          : "linear-gradient(145deg, rgba(175,130,255,0.07) 0%, rgba(255,255,255,0.04) 100%)",
        border: `1px solid ${isAnswer ? "rgba(100,210,255,0.14)" : "rgba(175,130,255,0.14)"}`,
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      {/* Header */}
      <div
        className="px-5 sm:px-6 py-3.5 flex items-center justify-between"
        style={{
          borderBottom: `1px solid ${isAnswer ? "rgba(100,210,255,0.10)" : "rgba(175,130,255,0.10)"}`,
        }}
      >
        <span className="text-[14px] sm:text-[15px] font-semibold" style={{ color: isAnswer ? "#64d2ff" : "#af82ff" }}>
          {conceptName}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-medium text-[#86868b]">
            {idx + 1}/{cards.length}
          </span>
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] sm:text-[13px] font-medium transition-all hover:brightness-125"
            style={{ background: "rgba(255,255,255,0.07)", color: "#86868b" }}
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "हिंदी" : "EN"}
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 sm:p-6">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={`${idx}-${flipped}`}
            custom={dir}
            initial={{ opacity: 0, x: dir * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -30 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setFlipped(!flipped)}
              className="w-full text-left rounded-2xl p-6 sm:p-8 transition-all cursor-pointer"
              style={{
                minHeight: 160,
                background: isAnswer
                  ? "linear-gradient(135deg, rgba(100,210,255,0.12) 0%, rgba(100,210,255,0.04) 100%)"
                  : "linear-gradient(135deg, rgba(175,130,255,0.12) 0%, rgba(175,130,255,0.04) 100%)",
                border: `1px solid ${isAnswer ? "rgba(100,210,255,0.18)" : "rgba(175,130,255,0.18)"}`,
              }}
            >
              <p
                className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] mb-4 font-bold"
                style={{ color: isAnswer ? "#64d2ff" : "#af82ff", opacity: 0.7 }}
              >
                {isAnswer ? "Answer" : "Question"}
              </p>
              <p className="text-[16px] sm:text-[18px] leading-[1.6] text-[#f5f5f7]">
                {isAnswer ? getText(card.back) : getText(card.front)}
              </p>
              <p className="text-[12px] sm:text-[13px] mt-6 text-[#6e6e73]">
                Tap to {isAnswer ? "see question" : "reveal answer"}
              </p>
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 mt-5">
          <button
            onClick={() => {
              if (idx > 0) { setDir(-1); setFlipped(false); setIdx(idx - 1); }
            }}
            disabled={idx === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-20"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <ChevronLeft className="w-5 h-5 text-[#a1a1a6]" />
          </button>
          <div className="flex gap-2">
            {cards.map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  background: i === idx
                    ? (isAnswer ? "#64d2ff" : "#af82ff")
                    : "rgba(255,255,255,0.10)",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => {
              if (idx < cards.length - 1) { setDir(1); setFlipped(false); setIdx(idx + 1); }
            }}
            disabled={idx === cards.length - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-20"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <ChevronRight className="w-5 h-5 text-[#a1a1a6]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
