"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Bot, ArrowRight, Sparkles, BookOpen, Brain, Zap, Star } from "lucide-react";

const CLASSES = [6, 7, 8, 9, 10, 11, 12];

const FEATURES = [
  { icon: Brain, text: "AI understands what you know — and what you don't", color: "#f59e0b" },
  { icon: BookOpen, text: "NCERT content with flashcards, quizzes & demos", color: "#3b82f6" },
  { icon: Zap, text: "Adaptive questions that match your level", color: "#10b981" },
  { icon: Star, text: "Track mastery across every chapter & concept", color: "#8b5cf6" },
];

export default function LoginPage() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleStart = () => {
    if (!name.trim() || !grade) return;
    router.push("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background glow */}
      <div
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(245, 158, 11, 0.08), transparent 70%)",
        }}
      />

      <motion.div
        className="relative w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative"
            style={{
              background: "var(--ai-gradient)",
              boxShadow: "0 0 40px rgba(245, 158, 11, 0.25)",
            }}
          >
            <Bot className="w-8 h-8 text-white" />
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ border: "2px solid rgba(245, 158, 11, 0.4)" }}
              animate={{ scale: [1, 1.2, 1.5], opacity: [0.6, 0.3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            LearnAI <Sparkles className="w-5 h-5 text-amber-400" />
          </h1>
          <p className="text-sm text-white/40 mt-1">Your NCERT AI Tutor</p>
        </motion.div>

        {/* Card */}
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{
            background: "var(--surface-1)",
            border: "1px solid var(--border-subtle)",
            backdropFilter: "blur(20px)",
          }}
        >
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs text-white/40 font-medium block mb-2">What&apos;s your name?</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bhavya"
                    className="w-full bg-transparent rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
                    style={{ border: "1px solid var(--border-medium)" }}
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && name.trim() && setStep(1)}
                  />
                </div>

                <button
                  onClick={() => name.trim() && setStep(1)}
                  disabled={!name.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-30"
                  style={{ background: "var(--ai-gradient)" }}
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs text-white/40 font-medium block mb-2">
                    Which class are you in, {name}?
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {CLASSES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setGrade(c)}
                        className="py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                        style={{
                          background: grade === c ? "var(--ai-gradient)" : "var(--surface-2)",
                          color: grade === c ? "white" : "var(--text-secondary)",
                          border: `1px solid ${grade === c ? "transparent" : "var(--border-subtle)"}`,
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleStart}
                  disabled={!grade}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-30"
                  style={{ background: "var(--ai-gradient)" }}
                >
                  Start Learning <Sparkles className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Features */}
        <div className="mt-8 space-y-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-3 px-2"
            >
              <f.icon className="w-4 h-4 shrink-0" style={{ color: f.color }} />
              <p className="text-xs text-white/40">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
