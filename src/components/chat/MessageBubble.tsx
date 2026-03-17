"use client";

import { motion } from "framer-motion";
import { ChatMessage } from "@/lib/types";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
        style={{
          background: isUser ? "var(--surface-3)" : "var(--ai-gradient)",
          boxShadow: isUser ? "none" : "0 0 12px rgba(245, 158, 11, 0.2)",
        }}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-white/70" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-white" />
        )}
      </div>

      {/* Content */}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
          isUser ? "rounded-tr-sm" : "rounded-tl-sm"
        }`}
        style={{
          background: isUser
            ? "rgba(59, 130, 246, 0.15)"
            : "var(--surface-1)",
          border: `1px solid ${isUser ? "rgba(59, 130, 246, 0.2)" : "var(--border-subtle)"}`,
        }}
      >
        {message.isStreaming ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/50">Thinking</span>
            <div className="flex gap-1">
              {[0, 0.2, 0.4].map((delay) => (
                <motion.div
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full bg-amber-400/60"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-[13px] leading-relaxed text-white/85 [&_strong]:text-white [&_strong]:font-semibold [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2 [&_li]:mb-0.5 [&_code]:bg-white/5 [&_code]:px-1 [&_code]:rounded">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}

        {/* Timestamp */}
        {!message.isStreaming && (
          <p className="text-[10px] mt-1.5 text-white/25">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>
    </motion.div>
  );
}
