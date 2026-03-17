"use client";

import { motion } from "framer-motion";
import { SubjectSummary } from "@/lib/types";
import { masteryColor } from "@/lib/utils";

interface InlineMasteryProps {
  subjects: SubjectSummary[];
}

export default function InlineMastery({ subjects }: InlineMasteryProps) {
  const overall = Math.round(
    subjects.reduce((a, s) => a + s.mastery, 0) / subjects.length
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgba(251,191,36,0.06) 0%, rgba(255,255,255,0.04) 100%)",
        border: "1px solid rgba(251,191,36,0.12)",
      }}
    >
      {/* Overall bar */}
      <div
        className="px-5 sm:px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(251,191,36,0.08)" }}
      >
        <span className="text-[14px] sm:text-[15px] font-semibold text-[#fbbf24]">
          Your Progress
        </span>
        <span className="text-[16px] sm:text-[18px] font-bold tabular-nums text-[#f5f5f7]">
          {overall}%
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-3.5 sm:space-y-4">
        {subjects.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 sm:gap-3.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${s.color}0c, transparent)`,
              border: `1px solid ${s.color}10`,
            }}
          >
            <span className="text-xl sm:text-2xl w-8 text-center shrink-0">
              {s.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[14px] sm:text-[15px] font-medium text-[#f5f5f7]">
                  {s.name}
                </span>
                <span
                  className="text-[14px] sm:text-[15px] font-bold tabular-nums"
                  style={{ color: masteryColor(s.mastery) }}
                >
                  {s.mastery}%
                </span>
              </div>
              <div
                className="h-[4px] sm:h-[5px] rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.mastery}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 + 0.2 }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}99)` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="px-5 sm:px-6 py-3 flex items-center justify-between text-[13px] sm:text-[14px]"
        style={{ borderTop: "1px solid rgba(251,191,36,0.08)", color: "#86868b" }}
      >
        <span>
          {subjects.reduce((a, s) => a + s.completedConcepts, 0)} of{" "}
          {subjects.reduce((a, s) => a + s.totalConcepts, 0)} concepts
        </span>
        <span className="font-semibold text-[#a1a1a6]">
          {subjects.reduce((a, s) => a + s.completedConcepts, 0)} mastered
        </span>
      </div>
    </motion.div>
  );
}
