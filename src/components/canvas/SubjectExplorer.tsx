"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SubjectSummary } from "@/lib/types";
import { masteryColor } from "@/lib/utils";
import { ChevronDown, BookOpen, MessageCircle } from "lucide-react";

interface SubjectExplorerProps {
  subjects: SubjectSummary[];
  onSelectTopic?: (topic: string) => void;
}

export default function SubjectExplorer({ subjects, onSelectTopic }: SubjectExplorerProps) {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  return (
    <div className="h-full overflow-y-auto p-6 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-amber-400" />
        <h2 className="text-sm font-semibold text-white/70">All Subjects — Class 10</h2>
      </div>

      {subjects.map((subject, si) => (
        <motion.div
          key={subject.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.04 }}
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
        >
          <button
            onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}
            className="w-full flex items-center gap-3 p-4 text-left transition-all hover:bg-white/[0.02]"
          >
            <span className="text-lg">{subject.icon}</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white/90">{subject.name}</h3>
              <p className="text-[11px] text-white/40">
                {subject.chapters.length} chapters · {subject.totalConcepts} concepts
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold" style={{ color: masteryColor(subject.mastery) }}>
                {subject.mastery}%
              </span>
              <motion.div
                animate={{ rotate: expandedSubject === subject.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-white/30" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {expandedSubject === subject.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ borderTop: "1px solid var(--border-subtle)" }}
              >
                {subject.chapters.map((ch) => (
                  <div
                    key={ch.name}
                    className="flex items-center gap-3 px-4 py-3 transition-all hover:bg-white/[0.02] cursor-pointer group"
                    style={{ borderBottom: "1px solid var(--border-subtle)" }}
                    onClick={() => onSelectTopic?.(ch.name)}
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: masteryColor(ch.mastery) }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/70 truncate">{ch.name}</p>
                      <p className="text-[10px] text-white/30">{ch.conceptCount} concepts</p>
                    </div>

                    {/* Mastery bar */}
                    <div className="w-16 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${ch.mastery}%`, background: subject.color }}
                      />
                    </div>

                    <span className="text-[10px] font-medium w-8 text-right" style={{ color: masteryColor(ch.mastery) }}>
                      {ch.mastery}%
                    </span>

                    <MessageCircle className="w-3.5 h-3.5 text-white/10 group-hover:text-amber-400/50 transition-colors" />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
