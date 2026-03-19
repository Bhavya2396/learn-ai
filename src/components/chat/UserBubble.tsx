"use client";

import { motion } from "framer-motion";
import type { ChatMessage } from "@/lib/types";

const EASE = [0.25, 0.1, 0.25, 1.0] as const;

interface UserBubbleProps {
  message: ChatMessage;
}

export default function UserBubble({ message }: UserBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex justify-end mb-6 sm:mb-7"
    >
      <div
        className="rounded-[22px] rounded-br-md max-w-[85%] sm:max-w-[80%] px-[18px] py-[12px]"
        style={{
          background: "var(--bubble-user)",
          border: "1px solid var(--bubble-user-border)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <p className="text-[15px] sm:text-[16px] leading-[1.5]" style={{ color: "var(--bubble-user-text)" }}>
          {message.content}
        </p>
      </div>
    </motion.div>
  );
}
