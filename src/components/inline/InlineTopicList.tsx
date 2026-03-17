"use client";

import { motion } from "framer-motion";
import { masteryColor } from "@/lib/utils";

interface InlineTopicListProps {
  subjectName: string;
  subjectIcon: string;
  color: string;
  chapters: { name: string; mastery: number; conceptCount: number }[];
}

export default function InlineTopicList({
  subjectName,
  subjectIcon,
  color,
  chapters,
}: InlineTopicListProps) {
  const lowest = chapters.reduce(
    (min, ch) => (ch.mastery < min.mastery ? ch : min),
    chapters[0]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${color}0c 0%, rgba(255,255,255,0.04) 100%)`,
        border: `1px solid ${color}18`,
      }}
    >
      {/* Header */}
      <div
        className="px-5 sm:px-6 py-4 flex items-center gap-3"
        style={{ borderBottom: `1px solid ${color}12` }}
      >
        <span className="text-2xl">{subjectIcon}</span>
        <div>
          <span
            className="text-[15px] sm:text-[17px] font-bold"
            style={{ color, letterSpacing: "-0.01em" }}
          >
            {subjectName}
          </span>
          <span className="text-[12px] sm:text-[13px] font-medium text-[#6e6e73] ml-2.5">
            {chapters.length} chapters
          </span>
        </div>
      </div>

      <div className="p-3.5 sm:p-5 space-y-2.5 sm:space-y-3">
        {chapters.map((ch, i) => {
          const weak = ch === lowest;
          return (
            <motion.div
              key={ch.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 sm:gap-4 px-4 py-3 sm:py-3.5 rounded-xl transition-colors"
              style={{
                background: weak
                  ? `linear-gradient(135deg, ${color}12, ${color}06)`
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${weak ? color + "22" : "rgba(255,255,255,0.04)"}`,
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[14px] sm:text-[15px] font-medium truncate"
                    style={{ color: weak ? color : "#d1d1d6" }}
                  >
                    {ch.name}
                    {weak && (
                      <span
                        className="ml-2 text-[11px] sm:text-[12px] font-bold"
                        style={{ color, opacity: 0.8 }}
                      >
                        ← focus here
                      </span>
                    )}
                  </span>
                  <span
                    className="text-[14px] sm:text-[15px] font-bold tabular-nums ml-3"
                    style={{ color: masteryColor(ch.mastery) }}
                  >
                    {ch.mastery}%
                  </span>
                </div>
                <div
                  className="h-[4px] rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ch.mastery}%` }}
                    transition={{ duration: 0.5, delay: i * 0.06 + 0.15 }}
                    className="h-full rounded-full"
                    style={{ background: masteryColor(ch.mastery) }}
                  />
                </div>
              </div>
              <span
                className="text-[12px] sm:text-[13px] font-medium shrink-0 text-[#6e6e73]"
              >
                {ch.conceptCount} topics
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
