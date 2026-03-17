"use client";

import { motion } from "framer-motion";
import { ExternalLink, Maximize2 } from "lucide-react";

interface DemoRendererProps {
  url: string;
  title: string;
}

export default function DemoRenderer({ url, title }: DemoRendererProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="shrink-0 px-5 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div>
          <p className="text-xs text-amber-400/70 font-medium">Interactive Demo</p>
          <h2 className="text-sm font-semibold text-white/80">{title}</h2>
        </div>
        <div className="flex gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-105"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border-subtle)" }}
            title="Open in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-white/50" />
          </a>
        </div>
      </motion.div>

      {/* Iframe */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 relative"
      >
        <iframe
          src={url}
          className="w-full h-full border-0"
          title={title}
          sandbox="allow-scripts allow-same-origin allow-popups"
          style={{ background: "#fff" }}
        />
      </motion.div>
    </div>
  );
}
