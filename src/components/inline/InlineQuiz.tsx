"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion } from "@/lib/types";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Trophy,
  RotateCcw,
} from "lucide-react";

interface InlineQuizProps {
  questions: QuizQuestion[];
  conceptName: string;
}

export default function InlineQuiz({
  questions,
  conceptName,
}: InlineQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [results, setResults] = useState<
    { correct: boolean; selected: string }[]
  >([]);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentIdx];
  const isCorrect = selectedAnswer?.[0] === question.correctOption;

  const handleNext = () => {
    const correct = selectedAnswer?.[0] === question.correctOption;
    const next = [
      ...results,
      { correct: !!correct, selected: selectedAnswer || "" },
    ];
    setResults(next);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    const score = results.filter((r) => r.correct).length;
    const pct = Math.round((score / questions.length) * 100);
    const won = pct >= 70;
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-center"
        style={{
          background: won
            ? "linear-gradient(145deg, rgba(48,209,88,0.10) 0%, rgba(255,255,255,0.04) 100%)"
            : "linear-gradient(145deg, rgba(251,191,36,0.10) 0%, rgba(255,255,255,0.04) 100%)",
          border: `1px solid ${won ? "rgba(48,209,88,0.18)" : "rgba(251,191,36,0.18)"}`,
        }}
      >
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          style={{
            background: won
              ? "linear-gradient(135deg, rgba(48,209,88,0.20), rgba(48,209,88,0.08))"
              : "linear-gradient(135deg, rgba(251,191,36,0.20), rgba(251,191,36,0.08))",
          }}
        >
          <Trophy
            className="w-7 h-7 sm:w-9 sm:h-9"
            style={{ color: won ? "#30d158" : "#fbbf24" }}
          />
        </div>
        <p className="text-[28px] sm:text-[34px] font-bold text-[#f5f5f7]">
          {score}/{questions.length}
        </p>
        <p className="text-[15px] sm:text-[16px] mt-2 mb-6 text-[#86868b]">
          {won
            ? "Great work! Mastery improving."
            : "Keep going — practice makes perfect."}
        </p>
        <div className="flex justify-center gap-2.5 mb-6">
          {results.map((r, i) => (
            <div
              key={i}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-[13px] sm:text-[14px] font-bold"
              style={{
                background: r.correct
                  ? "rgba(48,209,88,0.14)"
                  : "rgba(255,69,58,0.14)",
                color: r.correct ? "#30d158" : "#ff453a",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setCurrentIdx(0);
            setSelectedAnswer(null);
            setIsRevealed(false);
            setResults([]);
            setIsComplete(false);
          }}
          className="inline-flex items-center gap-2 h-10 sm:h-11 px-5 rounded-full text-[14px] font-semibold transition-all hover:brightness-125"
          style={{ background: "rgba(255,255,255,0.08)", color: "#a1a1a6" }}
        >
          <RotateCcw className="w-4 h-4" /> Retry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgba(251,191,36,0.07) 0%, rgba(255,255,255,0.04) 100%)",
        border: "1px solid rgba(251,191,36,0.14)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 sm:px-6 py-3.5 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(251,191,36,0.10)" }}
      >
        <span className="text-[14px] sm:text-[15px] font-semibold text-[#fbbf24]">
          {conceptName}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-[#86868b]">
            {currentIdx + 1}/{questions.length}
          </span>
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-colors"
                style={{
                  background:
                    i < results.length
                      ? results[i].correct
                        ? "#30d158"
                        : "#ff453a"
                      : i === currentIdx
                        ? "#fbbf24"
                        : "rgba(255,255,255,0.10)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          className="p-5 sm:p-6"
        >
          {/* Difficulty */}
          <span
            className="inline-block text-[11px] sm:text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg mb-4"
            style={{
              background:
                question.difficulty === "easy"
                  ? "rgba(48,209,88,0.14)"
                  : question.difficulty === "medium"
                    ? "rgba(251,191,36,0.14)"
                    : "rgba(255,69,58,0.14)",
              color:
                question.difficulty === "easy"
                  ? "#30d158"
                  : question.difficulty === "medium"
                    ? "#fbbf24"
                    : "#ff453a",
            }}
          >
            {question.difficulty}
          </span>

          <p className="text-[16px] sm:text-[18px] font-semibold leading-[1.5] mb-6 text-[#f5f5f7]">
            {question.question}
          </p>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((opt) => {
              const letter = opt[0];
              const sel = selectedAnswer === opt;
              const correct = letter === question.correctOption;
              let bg = "rgba(255,255,255,0.04)";
              let border = "rgba(255,255,255,0.07)";
              if (isRevealed) {
                if (correct) {
                  bg = "rgba(48,209,88,0.12)";
                  border = "rgba(48,209,88,0.35)";
                } else if (sel) {
                  bg = "rgba(255,69,58,0.12)";
                  border = "rgba(255,69,58,0.35)";
                }
              } else if (sel) {
                bg = "rgba(251,191,36,0.12)";
                border = "rgba(251,191,36,0.35)";
              }
              return (
                <button
                  key={opt}
                  onClick={() => !isRevealed && setSelectedAnswer(opt)}
                  className="w-full text-left rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 transition-all"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] sm:text-[16px] leading-snug text-[#d1d1d6]">
                      {opt}
                    </span>
                    {isRevealed && correct && (
                      <CheckCircle
                        className="w-5 h-5 ml-auto shrink-0"
                        style={{ color: "#30d158" }}
                      />
                    )}
                    {isRevealed && sel && !correct && (
                      <XCircle
                        className="w-5 h-5 ml-auto shrink-0"
                        style={{ color: "#ff453a" }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl p-4 sm:p-5 mb-5"
                style={{
                  background: isCorrect
                    ? "rgba(48,209,88,0.10)"
                    : "rgba(251,191,36,0.10)",
                  border: `1px solid ${isCorrect ? "rgba(48,209,88,0.15)" : "rgba(251,191,36,0.15)"}`,
                }}
              >
                <p
                  className="text-[14px] sm:text-[15px] font-semibold mb-1"
                  style={{
                    color: isCorrect ? "#30d158" : "#fbbf24",
                  }}
                >
                  {isCorrect ? "Correct!" : "Not quite — here's why:"}
                </p>
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#a1a1a6]">
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action */}
          <div className="flex justify-end">
            {!isRevealed ? (
              <button
                onClick={() => selectedAnswer && setIsRevealed(true)}
                disabled={!selectedAnswer}
                className="h-11 sm:h-12 px-7 sm:px-8 rounded-full text-[14px] sm:text-[15px] font-semibold transition-all disabled:opacity-20"
                style={{ background: "#fbbf24", color: "#000" }}
              >
                Check
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 h-11 sm:h-12 px-7 sm:px-8 rounded-full text-[14px] sm:text-[15px] font-semibold transition-all"
                style={{ background: "#fbbf24", color: "#000" }}
              >
                {currentIdx < questions.length - 1 ? (
                  <>
                    Next <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                ) : (
                  "See Results"
                )}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
