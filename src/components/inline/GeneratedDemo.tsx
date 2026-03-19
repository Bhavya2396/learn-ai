"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, Maximize2, Minimize2, Code2 } from "lucide-react";

interface GeneratedDemoProps {
  html: string;
  title: string;
}

export default function GeneratedDemo({ html, title }: GeneratedDemoProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = useCallback(() => setExpanded((v) => !v), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
        border: "1px solid var(--glass-border)",
        width: "min(1360px, calc(100vw - 2rem))",
        marginLeft: "calc((min(1360px, calc(100vw - 2rem)) - 100%) / -2)",
      }}
    >
      <div
        className="px-5 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Code2 className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
          <span className="text-[13px] sm:text-[14px] font-semibold truncate" style={{ color: "var(--accent)" }}>
            {title}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-muted-foreground font-medium">
            AI Generated
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-3">
          <button
            onClick={toggleExpand}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            {expanded ? (
              <Minimize2 className="w-3.5 h-3.5 text-[#6e6e73]" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-[#6e6e73]" />
            )}
          </button>
        </div>
      </div>
      <div
        style={{ height: expanded ? "90vh" : "480px" }}
        className="transition-all duration-300"
      >
        <iframe
          srcDoc={html}
          className="w-full h-full border-0"
          title={title}
          sandbox="allow-scripts"
          style={{ background: "#0f172a" }}
        />
      </div>
    </motion.div>
  );
}
