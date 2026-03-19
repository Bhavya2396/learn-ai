"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Zap, Eye, MessageSquare, TrendingUp } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useProgressStore, getMasteryLevel, type TopicProgress } from "@/lib/progressStore";
import { getCurriculum } from "@/lib/curriculum";

const EASE = [0.25, 0.1, 0.25, 1.0] as const;

function RadialScore({ score, size = 80 }: { score: number; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const level = getMasteryLevel(score);

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={6} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={level.color} strokeWidth={6}
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[15px] font-extrabold" style={{ color: level.color }}>{score}</span>
        <span className="text-[8px] font-bold text-foreground/40 uppercase tracking-wider">pts</span>
      </div>
    </div>
  );
}

function SignalRow({ icon: Icon, label, value, color }: { icon: typeof BookOpen; label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
        <Icon className="w-3.5 h-3.5" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-semibold text-foreground/70">{label}</span>
          <span className="text-[11px] font-bold" style={{ color }}>{value}%</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          />
        </div>
      </div>
    </div>
  );
}

interface ProgressSheetProps {
  topicId: string;
  topicName: string;
  subjectColor: string;
  onClose: () => void;
}

export default function ProgressSheet({ topicId, topicName, subjectColor, onClose }: ProgressSheetProps) {
  const progressStore = useProgressStore();
  const { selectedClass } = useAppStore();
  const p: TopicProgress | undefined = progressStore.progress[topicId];
  const mastery = progressStore.getMastery(topicId);
  const bktScore = progressStore.getBktScore(topicId);
  const level = getMasteryLevel(mastery);

  // Compute individual signal percentages for display
  const coverage = p
    ? Math.round(Math.min((p.engagedSubtopics.length / Math.max(p.expectedCycles, 1)), 1) * 100)
    : 0;
  const depth = p
    ? Math.round(Math.min((p.completedCycles / Math.max(p.expectedCycles, 1)), 1) * 100)
    : 0;
  const demoEng = p
    ? (p.demosAvailable > 0 ? Math.round(Math.min(p.demosViewed.length / p.demosAvailable, 1) * 100) : 0)
    : 0;
  const quizScore = Math.round(bktScore);

  // Next milestone
  const nextLevel = mastery < 40 ? { label: "Developing", threshold: 40 }
    : mastery < 60 ? { label: "Proficient", threshold: 60 }
    : mastery < 80 ? { label: "Advanced", threshold: 80 }
    : mastery < 95 ? { label: "Mastered", threshold: 95 }
    : null;

  const tips: string[] = [];
  if (coverage < 80) tips.push("Open and engage with more subtopics to build coverage");
  if (depth < 60) tips.push("Answer more questions during the conversation to deepen understanding");
  if (demoEng < 50 && p && p.demosAvailable > 0) tips.push("Try the interactive demos to see concepts in action");
  if (p && p.bktAttempts === 0) tips.push("Take a quiz to get a knowledge score on this topic");
  else if (quizScore < 50) tips.push("Practice more quiz questions — focus on medium and hard difficulty");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="w-full max-w-sm rounded-3xl overflow-hidden dark:text-white"
        style={{
          background: "var(--popover)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid var(--glass-border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: subjectColor }} />
                <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/40">Progress Report</span>
              </div>
              <h2 className="text-[17px] font-extrabold text-foreground leading-tight truncate">{topicName}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-black/10 flex-shrink-0"
            >
              <X className="w-4 h-4 text-foreground/50" />
            </button>
          </div>
        </div>

        {/* Mastery summary */}
        <div className="px-5 pb-4 flex items-center gap-4">
          <RadialScore score={mastery} size={80} />
          <div className="flex-1 min-w-0">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-1"
              style={{ background: `${level.color}20`, color: level.color }}
            >
              <TrendingUp className="w-3 h-3" />
              <span className="text-[11px] font-extrabold">{level.label}</span>
            </div>
            <p className="text-[12px] text-foreground/60 leading-snug">
              {p?.bktAttempts ? `${p.bktAttempts} question${p.bktAttempts !== 1 ? "s" : ""} answered` : "No quiz attempts yet"}
            </p>
            {nextLevel && (
              <p className="text-[11px] text-foreground/40 mt-0.5">
                {nextLevel.threshold - mastery}pts to <span className="font-bold">{nextLevel.label}</span>
              </p>
            )}
          </div>
        </div>

        {/* Signals */}
        <div
          className="mx-4 rounded-2xl p-4 space-y-3 mb-4"
          style={{ background: "var(--surface)" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2">Score Breakdown</p>
          {p?.bktAttempts ? (
            <SignalRow icon={Zap} label="Quiz (BKT+ELO)" value={quizScore} color="#9b7bbd" />
          ) : (
            <div className="flex items-center gap-2 opacity-50">
              <Zap className="w-3.5 h-3.5 text-foreground/30" />
              <span className="text-[11px] text-foreground/40">No quiz score yet — take a quiz!</span>
            </div>
          )}
          <SignalRow icon={BookOpen} label="Subtopic Coverage" value={coverage} color="#c58b6e" />
          <SignalRow icon={MessageSquare} label="Conversation Depth" value={depth} color="#7bb8a0" />
          {p && p.demosAvailable > 0 && (
            <SignalRow icon={Eye} label="Demo Engagement" value={demoEng} color="#60a5fa" />
          )}
        </div>

        {/* Tips */}
        {tips.length > 0 && (
          <div className="px-5 pb-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2">How to improve</p>
            <div className="space-y-1.5">
              {tips.slice(0, 3).map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: subjectColor }} />
                  <p className="text-[12px] text-foreground/60 leading-snug">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
