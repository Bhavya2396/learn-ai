"use client";

import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";

interface InlineDemoProps {
  url: string;
  title: string;
}

export default function InlineDemo({ url, title }: InlineDemoProps) {
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
      }}
    >
      <div
        className="px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(48,209,88,0.10)" }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Sparkles className="w-4 h-4 shrink-0" style={{ color: "#30d158" }} />
          <span className="text-[14px] sm:text-[15px] font-semibold truncate text-[#30d158]">
            {title}
          </span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors hover:bg-white/10 ml-3"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          <ExternalLink className="w-4 h-4 text-[#6e6e73]" />
        </a>
      </div>
      <div className="h-[380px] sm:h-[500px]">
        <iframe
          src={url}
          className="w-full h-full border-0"
          title={title}
          sandbox="allow-scripts allow-same-origin allow-popups"
          style={{ background: "#fff" }}
        />
      </div>
    </motion.div>
  );
}
