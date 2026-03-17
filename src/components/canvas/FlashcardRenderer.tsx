"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flashcard } from "@/lib/types";
import { ChevronLeft, ChevronRight, RotateCcw, Languages } from "lucide-react";

interface FlashcardRendererProps {
  cards: Flashcard[];
  conceptName: string;
  initialLang?: string;
}

export default function FlashcardRenderer({ cards, conceptName, initialLang = "en" }: FlashcardRendererProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">(initialLang as "en" | "hi");
  const [direction, setDirection] = useState(0);

  const card = cards[currentIdx];

  const getText = (ml: { en: string; hi?: string; as?: string }) => {
    if (lang === "hi" && ml.hi) return ml.hi;
    return ml.en;
  };

  const goNext = () => {
    if (currentIdx < cards.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setCurrentIdx(currentIdx + 1);
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-lg mb-6">
        <div>
          <p className="text-xs text-white/40">{conceptName}</p>
          <p className="text-sm font-semibold text-white/70">
            Flashcard {currentIdx + 1} of {cards.length}
          </p>
        </div>
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
        >
          <Languages className="w-3.5 h-3.5" />
          {lang === "en" ? "हिंदी" : "English"}
        </button>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg" style={{ perspective: "1200px" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${currentIdx}-${isFlipped}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full rounded-2xl cursor-pointer relative overflow-hidden"
              style={{ minHeight: 260 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {!isFlipped ? (
                <div
                  className="p-8 flex flex-col justify-center items-center text-center"
                  style={{
                    minHeight: 260,
                    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(249, 115, 22, 0.06))",
                    border: "1px solid rgba(245, 158, 11, 0.2)",
                    borderRadius: 16,
                  }}
                >
                  <p className="text-[10px] uppercase tracking-widest text-amber-400/60 mb-4">Question</p>
                  <p className="text-lg font-semibold text-white/90 leading-relaxed">
                    {getText(card.front)}
                  </p>
                  <p className="text-[11px] text-white/30 mt-6">Tap to reveal answer</p>
                </div>
              ) : (
                <div
                  className="p-8 flex flex-col justify-center items-center text-center"
                  style={{
                    minHeight: 260,
                    background: "var(--surface-1)",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: 16,
                  }}
                >
                  <p className="text-[10px] uppercase tracking-widest text-blue-400/60 mb-4">Answer</p>
                  <p className="text-[15px] text-white/80 leading-relaxed">
                    {getText(card.back)}
                  </p>
                  <p className="text-[11px] text-white/30 mt-6">Tap to see question</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={goPrev}
          disabled={currentIdx === 0}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-20"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border-subtle)" }}
        >
          <ChevronLeft className="w-5 h-5 text-white/60" />
        </button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIdx(i); setIsFlipped(false); setDirection(i > currentIdx ? 1 : -1); }}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: i === currentIdx ? "#f59e0b" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={currentIdx === cards.length - 1}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-20"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border-subtle)" }}
        >
          <ChevronRight className="w-5 h-5 text-white/60" />
        </button>
      </div>
    </div>
  );
}
