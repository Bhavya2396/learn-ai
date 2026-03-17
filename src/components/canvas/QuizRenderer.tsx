"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion } from "@/lib/types";
import { CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw } from "lucide-react";

interface QuizRendererProps {
  questions: QuizQuestion[];
  conceptName: string;
  onComplete?: (score: number, total: number) => void;
}

export default function QuizRenderer({ questions, conceptName, onComplete }: QuizRendererProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [results, setResults] = useState<{ correct: boolean; selected: string }[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentIdx];

  const handleSelect = (option: string) => {
    if (isRevealed) return;
    setSelectedAnswer(option);
  };

  const handleCheck = () => {
    if (!selectedAnswer) return;
    setIsRevealed(true);
  };

  const handleNext = () => {
    const correct = selectedAnswer?.[0] === question.correctOption;
    const newResults = [...results, { correct: !!correct, selected: selectedAnswer || "" }];
    setResults(newResults);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
    } else {
      setIsComplete(true);
      const score = newResults.filter((r) => r.correct).length;
      onComplete?.(score, questions.length);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsRevealed(false);
    setResults([]);
    setIsComplete(false);
  };

  if (isComplete) {
    const score = results.filter((r) => r.correct).length;
    const pct = Math.round((score / questions.length) * 100);

    return (
      <div className="h-full flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div
            className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
            style={{
              background: pct >= 70 ? "rgba(34, 197, 94, 0.15)" : "rgba(245, 158, 11, 0.15)",
              border: `2px solid ${pct >= 70 ? "#22c55e" : "#f59e0b"}`,
            }}
          >
            <Trophy className="w-9 h-9" style={{ color: pct >= 70 ? "#22c55e" : "#f59e0b" }} />
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">
            {score}/{questions.length}
          </h2>
          <p className="text-sm text-white/50 mb-1">{conceptName}</p>
          <p className="text-xs text-white/30 mb-6">
            {pct >= 70 ? "Great job! Your mastery is improving." : "Keep practicing — you're getting there!"}
          </p>

          {/* Question results */}
          <div className="flex justify-center gap-2 mb-6">
            {results.map((r, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: r.correct ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
                  color: r.correct ? "#22c55e" : "#ef4444",
                }}
              >
                Q{i + 1}
              </div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 mx-auto px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
            style={{ background: "var(--surface-2)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  const isCorrect = selectedAnswer?.[0] === question.correctOption;

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-white/40 mb-1">{conceptName}</p>
          <p className="text-sm font-semibold text-white/80">
            Question {currentIdx + 1} of {questions.length}
          </p>
        </div>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background:
                  i < results.length
                    ? results[i].correct
                      ? "#22c55e"
                      : "#ef4444"
                    : i === currentIdx
                    ? "#f59e0b"
                    : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="rounded-xl p-5 mb-6"
            style={{ background: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded"
                style={{
                  background:
                    question.difficulty === "easy"
                      ? "rgba(34, 197, 94, 0.15)"
                      : question.difficulty === "medium"
                      ? "rgba(245, 158, 11, 0.15)"
                      : "rgba(239, 68, 68, 0.15)",
                  color:
                    question.difficulty === "easy"
                      ? "#22c55e"
                      : question.difficulty === "medium"
                      ? "#f59e0b"
                      : "#ef4444",
                }}
              >
                {question.difficulty.toUpperCase()}
              </span>
            </div>
            <p className="text-[15px] font-medium text-white/90 leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5 mb-6">
            {question.options.map((option) => {
              const optionLetter = option[0];
              const isSelected = selectedAnswer === option;
              const isCorrectOption = optionLetter === question.correctOption;

              let borderColor = "var(--border-subtle)";
              let bgColor = "var(--surface-1)";

              if (isRevealed) {
                if (isCorrectOption) {
                  borderColor = "#22c55e";
                  bgColor = "rgba(34, 197, 94, 0.1)";
                } else if (isSelected && !isCorrectOption) {
                  borderColor = "#ef4444";
                  bgColor = "rgba(239, 68, 68, 0.1)";
                }
              } else if (isSelected) {
                borderColor = "#3b82f6";
                bgColor = "rgba(59, 130, 246, 0.1)";
              }

              return (
                <motion.button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="w-full text-left rounded-xl px-4 py-3 transition-all"
                  style={{ background: bgColor, border: `1px solid ${borderColor}` }}
                  whileHover={!isRevealed ? { scale: 1.01 } : {}}
                  whileTap={!isRevealed ? { scale: 0.99 } : {}}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white/80">{option}</span>
                    {isRevealed && isCorrectOption && <CheckCircle className="w-4 h-4 text-emerald-400 ml-auto shrink-0" />}
                    {isRevealed && isSelected && !isCorrectOption && <XCircle className="w-4 h-4 text-red-400 ml-auto shrink-0" />}
                  </div>
                </motion.button>
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
                className="rounded-xl p-4 mb-4"
                style={{
                  background: isCorrect ? "rgba(34, 197, 94, 0.05)" : "rgba(245, 158, 11, 0.05)",
                  border: `1px solid ${isCorrect ? "rgba(34, 197, 94, 0.15)" : "rgba(245, 158, 11, 0.15)"}`,
                }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: isCorrect ? "#22c55e" : "#f59e0b" }}>
                  {isCorrect ? "Correct!" : "Not quite — here's why:"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed">{question.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex justify-end">
            {!isRevealed ? (
              <button
                onClick={handleCheck}
                disabled={!selectedAnswer}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-30"
                style={{ background: "var(--ai-gradient)" }}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "var(--ai-gradient)" }}
              >
                {currentIdx < questions.length - 1 ? (
                  <>Next <ArrowRight className="w-4 h-4" /></>
                ) : (
                  "See Results"
                )}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
