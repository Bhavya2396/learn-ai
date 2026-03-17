"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { ChatMessage } from "@/lib/types";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { studentProfile } from "@/lib/mock-data";

interface ChatPanelProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  isTyping: boolean;
}

export default function ChatPanel({ messages, onSend, isTyping }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-subtle)",
      }}
    >
      {/* Header */}
      <div
        className="shrink-0 px-4 py-3 flex items-center gap-3"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center relative"
          style={{ background: "var(--ai-gradient)", boxShadow: "0 0 16px rgba(245, 158, 11, 0.25)" }}
        >
          <Bot className="w-5 h-5 text-white" />
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ border: "2px solid rgba(245, 158, 11, 0.4)" }}
            animate={{ scale: [1, 1.15, 1.3], opacity: [0.5, 0.25, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-semibold text-white">LearnAI</h2>
            <Sparkles className="w-3 h-3 text-amber-400" />
          </div>
          <p className="text-[11px] text-white/40 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Your NCERT AI Tutor
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-[11px] font-medium text-white/50">{studentProfile.name}</p>
          <p className="text-[10px] text-white/30">Class {studentProfile.grade} · {studentProfile.streakDays}🔥</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-center px-4"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "var(--ai-gradient)", boxShadow: "0 0 30px rgba(245, 158, 11, 0.2)" }}
            >
              <Bot className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-base font-semibold text-white/80 mb-1">
              Hey {studentProfile.name}!
            </h3>
            <p className="text-xs text-white/40 max-w-xs leading-relaxed">
              I&apos;m your AI tutor for NCERT Class {studentProfile.grade}. Ask me anything — 
              I can explain concepts, test you, show flashcards, or load interactive demos.
            </p>
          </motion.div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <MessageBubble
            message={{
              id: "typing",
              role: "assistant",
              content: "",
              timestamp: new Date(),
              isStreaming: true,
            }}
          />
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} disabled={isTyping} />
    </div>
  );
}
