"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Concept } from "@/lib/types";
import { ChevronDown, Lightbulb, BookOpen } from "lucide-react";

interface InlineContentProps {
  concept: Concept;
}

export default function InlineContent({ concept }: InlineContentProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgba(100,210,255,0.07) 0%, rgba(255,255,255,0.04) 100%)",
        border: "1px solid rgba(100,210,255,0.14)",
      }}
    >
      <div className="p-5 sm:p-6">
        {/* Title row */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(100,210,255,0.20), rgba(100,210,255,0.06))",
            }}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#64d2ff" }} />
          </div>
          <div>
            <span
              className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider"
              style={{ color: "#64d2ff", opacity: 0.7 }}
            >
              {concept.ncertSection}
            </span>
            <h3
              className="text-[16px] sm:text-[18px] font-semibold text-[#f5f5f7]"
              style={{ letterSpacing: "-0.01em" }}
            >
              {concept.name}
            </h3>
          </div>
        </div>

        {/* Key formulas */}
        {concept.keyFormulas.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {concept.keyFormulas.map((f) => (
              <span
                key={f}
                className="text-[13px] sm:text-[14px] font-mono font-semibold px-3.5 py-1.5 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(100,210,255,0.15), rgba(100,210,255,0.06))",
                  color: "#64d2ff",
                  border: "1px solid rgba(100,210,255,0.12)",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Summary */}
        <div
          className="rounded-xl p-4 sm:p-5 mb-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.10), rgba(251,191,36,0.03))",
            border: "1px solid rgba(251,191,36,0.12)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#fbbf24" }} />
            <span
              className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider"
              style={{ color: "#fbbf24", opacity: 0.7 }}
            >
              Key Insight
            </span>
          </div>
          <p className="text-[14px] sm:text-[16px] leading-[1.65] text-[#d1d1d6]">
            {concept.revisionSummary}
          </p>
        </div>

        {/* Expand */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[13px] sm:text-[14px] font-semibold transition-colors hover:brightness-125"
          style={{ color: "#64d2ff" }}
        >
          <ChevronDown
            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform"
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
          {expanded ? "Collapse lesson" : "Read full lesson"}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 sm:px-6 pb-5 sm:pb-6 content-md"
              style={{
                borderTop: "1px solid rgba(100,210,255,0.10)",
                paddingTop: "1.25rem",
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {concept.contentMd}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
