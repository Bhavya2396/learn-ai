"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Concept } from "@/lib/types";
import { masteryColor, masteryLabel, formatTime } from "@/lib/utils";
import { BookOpen, Clock, BarChart3, Award, Lightbulb } from "lucide-react";

interface ContentRendererProps {
  concept: Concept;
}

export default function ContentRenderer({ concept }: ContentRendererProps) {
  return (
    <div className="h-full overflow-y-auto">
      {/* Concept Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 px-6 py-3 backdrop-blur-xl"
        style={{
          background: "rgba(10, 14, 26, 0.85)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}
            >
              {concept.ncertSection}
            </span>
            <h1 className="text-base font-semibold text-white">{concept.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" style={{ color: masteryColor(concept.mastery) }} />
              <span className="text-xs font-medium" style={{ color: masteryColor(concept.mastery) }}>
                {concept.mastery}% {masteryLabel(concept.mastery)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-white/30">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{formatTime(concept.estimatedTimeMinutes)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-6 py-5 max-w-3xl mx-auto">
        {/* Key Formulas */}
        {concept.keyFormulas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-5"
          >
            {concept.keyFormulas.map((formula) => (
              <span
                key={formula}
                className="text-sm font-mono font-semibold px-3 py-1.5 rounded-lg"
                style={{
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  color: "#60a5fa",
                }}
              >
                {formula}
              </span>
            ))}
          </motion.div>
        )}

        {/* Revision Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl p-4 mb-6"
          style={{
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(249, 115, 22, 0.03))",
            border: "1px solid rgba(245, 158, 11, 0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400/80 uppercase tracking-wide">Quick Summary</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">{concept.revisionSummary}</p>
        </motion.div>

        {/* Key Terms */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-1.5 mb-6"
        >
          {concept.keyTerms.map((term) => (
            <span
              key={term}
              className="text-[11px] px-2 py-0.5 rounded-full"
              style={{ background: "var(--surface-2)", color: "var(--text-tertiary)" }}
            >
              {term}
            </span>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="content-md"
        >
          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {concept.contentMd}
          </ReactMarkdown>
        </motion.div>
      </div>
    </div>
  );
}
