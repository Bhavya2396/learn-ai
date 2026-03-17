"use client";

import { motion } from "framer-motion";
import { SubjectSummary } from "@/lib/types";
import { masteryColor, masteryLabel } from "@/lib/utils";
import { TrendingUp, ChevronRight } from "lucide-react";

interface MasteryMapProps {
  subjects: SubjectSummary[];
}

export default function MasteryMap({ subjects }: MasteryMapProps) {
  const overallMastery = Math.round(subjects.reduce((a, s) => a + s.mastery, 0) / subjects.length);

  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">
      {/* Overall ring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6 rounded-xl p-5"
        style={{ background: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
      >
        <div className="relative w-20 h-20 shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            <motion.circle
              cx="18" cy="18" r="15.5" fill="none"
              stroke={masteryColor(overallMastery)}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="97.39"
              initial={{ strokeDashoffset: 97.39 }}
              animate={{ strokeDashoffset: 97.39 * (1 - overallMastery / 100) }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-white">{overallMastery}%</span>
          </div>
        </div>
        <div>
          <h2 className="text-base font-semibold text-white mb-1">Overall Mastery</h2>
          <p className="text-xs text-white/40">
            {subjects.reduce((a, s) => a + s.completedConcepts, 0)} of{" "}
            {subjects.reduce((a, s) => a + s.totalConcepts, 0)} concepts progressing across {subjects.length} subjects
          </p>
        </div>
      </motion.div>

      {/* Subject breakdown */}
      {subjects.map((subject, si) => (
        <motion.div
          key={subject.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + si * 0.05 }}
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
        >
          {/* Subject header */}
          <div className="flex items-center gap-3 p-4">
            <span className="text-lg">{subject.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white/90">{subject.name}</h3>
                <span
                  className="text-xs font-bold"
                  style={{ color: masteryColor(subject.mastery) }}
                >
                  {subject.mastery}%
                </span>
              </div>
              <div className="h-1.5 rounded-full mt-2 overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: subject.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.mastery}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + si * 0.05 }}
                />
              </div>
            </div>
          </div>

          {/* Chapters */}
          <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
            {subject.chapters.map((ch, ci) => (
              <div
                key={ch.name}
                className="flex items-center gap-3 px-4 py-2.5 transition-all hover:bg-white/[0.02] cursor-pointer"
                style={{
                  borderBottom: ci < subject.chapters.length - 1 ? "1px solid var(--border-subtle)" : "none",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: masteryColor(ch.mastery) }}
                />
                <span className="text-xs text-white/60 flex-1 truncate">{ch.name}</span>
                <span className="text-[11px] font-medium" style={{ color: masteryColor(ch.mastery) }}>
                  {ch.mastery}%
                </span>
                <span className="text-[10px] text-white/25">{ch.conceptCount} concepts</span>
                <ChevronRight className="w-3 h-3 text-white/15" />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
