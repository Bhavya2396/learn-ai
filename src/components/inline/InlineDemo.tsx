"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, Maximize2, Minimize2 } from "lucide-react";

interface InlineDemoProps {
  url: string;
  title: string;
}

export default function InlineDemo({ url, title }: InlineDemoProps) {
  const [expanded, setExpanded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const encodedUrl = encodeURI(decodeURI(url));

  const toggleExpand = useCallback(() => setExpanded((v) => !v), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgba(48,209,88,0.07) 0%, rgba(255,255,255,0.04) 100%)",
        border: "1px solid rgba(48,209,88,0.14)",
        // Break out of the 680px chat column — extend to ~1360px centered
        width: "min(1360px, calc(100vw - 2rem))",
        marginLeft: "calc((min(1360px, calc(100vw - 2rem)) - 100%) / -2)",
      }}
    >
      <div
        className="px-5 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(48,209,88,0.10)" }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Sparkles className="w-4 h-4 shrink-0" style={{ color: "#30d158" }} />
          <span className="text-[13px] sm:text-[14px] font-semibold truncate text-[#30d158]">
            {title}
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
          <a
            href={encodedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#6e6e73]" />
          </a>
        </div>
      </div>
      <div
        style={{ height: expanded ? "90vh" : "580px" }}
        className="transition-all duration-300"
      >
        <iframe
          ref={iframeRef}
          src={encodedUrl}
          className="w-full h-full border-0"
          title={title}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
          allow="autoplay; fullscreen"
          style={{ background: "#0f172a" }}
        />
      </div>
    </motion.div>
  );
}
