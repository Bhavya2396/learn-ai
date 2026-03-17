"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { ChatMessage, CanvasAction } from "@/lib/types";
import {
  processUserMessage,
  createAssistantMessage,
} from "@/lib/ai-orchestrator";
import { generateId } from "@/lib/utils";
import { studentProfile, subjectSummaries } from "@/lib/mock-data";
import { ArrowUp, Plus } from "lucide-react";

import InlineQuiz from "@/components/inline/InlineQuiz";
import InlineFlashcards from "@/components/inline/InlineFlashcards";
import InlineContent from "@/components/inline/InlineContent";
import InlineDemo from "@/components/inline/InlineDemo";
import InlineMastery from "@/components/inline/InlineMastery";
import InlineTopicList from "@/components/inline/InlineTopicList";

const SplineScene = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full border-2 border-white/10 border-t-amber-400"
        style={{ animation: "spin 1s linear infinite" }}
      />
    </div>
  ),
});

if (typeof window !== "undefined") {
  const _err = console.error;
  console.error = (...a: Parameters<typeof console.error>) => {
    if (typeof a[0] === "string" && a[0].includes("Missing property")) return;
    _err.apply(console, a);
  };
}

const EASE = [0.25, 0.1, 0.25, 1.0] as const;

const SUBJECT_GLOW: Record<string, string> = {
  physics:
    "radial-gradient(ellipse 90% 50% at 50% 90%, rgba(245,158,11,0.22) 0%, transparent 65%)",
  chemistry:
    "radial-gradient(ellipse 90% 50% at 50% 90%, rgba(16,185,129,0.22) 0%, transparent 65%)",
  biology:
    "radial-gradient(ellipse 90% 50% at 50% 90%, rgba(139,92,246,0.22) 0%, transparent 65%)",
  mathematics:
    "radial-gradient(ellipse 90% 50% at 50% 90%, rgba(59,130,246,0.22) 0%, transparent 65%)",
  "social-science":
    "radial-gradient(ellipse 90% 50% at 50% 90%, rgba(239,68,68,0.20) 0%, transparent 65%)",
  hindi:
    "radial-gradient(ellipse 90% 50% at 50% 90%, rgba(6,182,212,0.22) 0%, transparent 65%)",
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function RichBlock({ action }: { action: CanvasAction }) {
  switch (action.type) {
    case "welcome":
    case "mastery":
      return <InlineMastery subjects={action.data.subjects} />;
    case "content":
      return <InlineContent concept={action.data.concept} />;
    case "quiz":
      return (
        <InlineQuiz
          questions={action.data.questions}
          conceptName={action.data.conceptName}
        />
      );
    case "flashcards":
      return (
        <InlineFlashcards
          cards={action.data.cards}
          conceptName={action.data.conceptName}
          initialLang={action.data.lang}
        />
      );
    case "demo":
      return <InlineDemo url={action.data.url} title={action.data.title} />;
    case "topic_list":
      return (
        <InlineTopicList
          subjectName={action.data.subjectName}
          subjectIcon={action.data.subjectIcon}
          color={action.data.color}
          chapters={action.data.chapters}
        />
      );
    default:
      return null;
  }
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[5px] h-[5px] rounded-full animate-pulse-dot"
          style={{
            background: "#6e6e73",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasMessages = messages.length > 0;
  const glowId = hoveredSubject || activeSubjectId;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };
      setMessages((p) => [...p, userMsg]);
      setInput("");
      setIsTyping(true);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.style.height = "auto";
      }, 0);
      setTimeout(() => {
        const res = processUserMessage(text, [...messages, userMsg]);
        setMessages((p) => [
          ...p,
          createAssistantMessage(res.message, res.canvasAction),
        ]);
        setIsTyping(false);
      }, 500 + Math.random() * 600);
    },
    [messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setIsTyping(false);
    setActiveSubjectId(null);
    setHoveredSubject(null);
  };

  return (
    <div className="h-screen flex flex-col relative overflow-hidden bg-black">
      {/* ── Ambient subject glow ── */}
      {subjectSummaries.map((s) => (
        <div
          key={s.id}
          className="fixed inset-0 pointer-events-none transition-opacity duration-[900ms]"
          style={{
            background: SUBJECT_GLOW[s.id] || "transparent",
            opacity: glowId === s.id ? 1 : 0,
          }}
        />
      ))}

      {/* ── New chat (conversation only) ── */}
      <AnimatePresence>
        {hasMessages && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={resetChat}
            className="fixed top-4 right-4 sm:top-5 sm:right-6 z-30 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Plus className="w-[18px] h-[18px] text-[#a1a1a6]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Scrollable area ── */}
      <main ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!hasMessages ? (
            /* ═══════════ WELCOME ═══════════ */
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="min-h-full flex flex-col items-center justify-center px-5 sm:px-6"
              style={{ paddingBottom: 100 }}
            >
              {/* Spline hero */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px]"
              >
                <SplineScene scene="https://prod.spline.design/cEOu-E4HXG9X9LHS/scene.splinecode" />
              </motion.div>

              {/* Greeting */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
                className="text-center font-bold mt-1 text-[32px] sm:text-[42px]"
                style={{
                  letterSpacing: "-0.03em",
                  lineHeight: 1.08,
                  color: "#f5f5f7",
                }}
              >
                {getGreeting()}, {studentProfile.name}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.6, ease: EASE }}
                className="text-center mt-2.5 sm:mt-3 text-[16px] sm:text-[19px]"
                style={{
                  color: "#86868b",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.35,
                }}
              >
                What would you like to study today?
              </motion.p>

              {/* Subject grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full mt-10 sm:mt-14 max-w-[320px] sm:max-w-[460px]"
              >
                {subjectSummaries.map((s, i) => {
                  const hovered = hoveredSubject === s.id;
                  return (
                    <motion.button
                      key={s.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.6 + i * 0.07,
                        duration: 0.5,
                        ease: EASE,
                      }}
                      onMouseEnter={() => setHoveredSubject(s.id)}
                      onMouseLeave={() => setHoveredSubject(null)}
                      onClick={() => {
                        setActiveSubjectId(s.id);
                        handleSend(s.name);
                      }}
                      className="relative flex flex-col items-center rounded-2xl sm:rounded-[20px] cursor-pointer transition-all duration-300 overflow-hidden"
                      style={{
                        padding: "22px 10px 18px",
                        background: hovered
                          ? `linear-gradient(135deg, ${s.color}18 0%, ${s.color}08 100%)`
                          : "rgba(255,255,255,0.04)",
                        border: `1px solid ${hovered ? s.color + "30" : "rgba(255,255,255,0.06)"}`,
                        boxShadow: hovered
                          ? `0 8px 40px ${s.color}18`
                          : "none",
                      }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span
                        className="block transition-transform duration-300"
                        style={{
                          fontSize: 32,
                          transform: hovered ? "scale(1.12)" : "scale(1)",
                        }}
                      >
                        {s.icon}
                      </span>
                      <span
                        className="block mt-2 font-semibold text-[13px] sm:text-[14px] transition-colors duration-300"
                        style={{
                          letterSpacing: "-0.01em",
                          color: hovered ? s.color : "#a1a1a6",
                        }}
                      >
                        {s.name}
                      </span>
                      {/* Progress bar */}
                      <div className="w-full mt-2.5 px-2">
                        <div
                          className="h-[3px] rounded-full overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${s.mastery}%`,
                              background: s.color,
                              opacity: hovered ? 1 : 0.6,
                            }}
                          />
                        </div>
                      </div>
                      <span
                        className="block mt-1.5 text-[12px] font-medium tabular-nums transition-colors duration-300"
                        style={{
                          color: hovered ? s.color : "#6e6e73",
                          opacity: hovered ? 1 : 0.7,
                        }}
                      >
                        {s.mastery}%
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          ) : (
            /* ═══════════ CONVERSATION ═══════════ */
            <motion.div
              key="conversation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="w-full max-w-[640px] mx-auto px-4 sm:px-6 pt-5 sm:pt-6 pb-6"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {msg.role === "user" ? (
                    <div className="flex justify-end mb-6 sm:mb-7">
                      <div
                        className="rounded-[20px] rounded-br-md max-w-[85%] sm:max-w-[80%]"
                        style={{
                          padding: "11px 18px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <p className="text-[15px] sm:text-[16px] leading-[1.5] text-[#f5f5f7]">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-8 sm:mb-10">
                      <div className="msg-md">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                      {msg.canvasAction && (
                        <div className="mt-4">
                          <RichBlock action={msg.canvasAction} />
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && <TypingDots />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Input bar ── */}
      <footer
        className="relative z-20 shrink-0 px-4 sm:px-6 pb-4 sm:pb-6 pt-2"
        style={{
          background: "linear-gradient(to top, #000 60%, transparent)",
        }}
      >
        <div className="w-full max-w-[640px] mx-auto">
          <div
            className="relative flex items-end rounded-2xl transition-colors duration-200"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 150) + "px";
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                hasMessages ? "Message LearnAI..." : "Or ask me anything..."
              }
              rows={1}
              className="flex-1 bg-transparent resize-none outline-none text-[15px] sm:text-[16px]"
              style={{
                lineHeight: 1.5,
                color: "#f5f5f7",
                padding: "13px 52px 13px 18px",
                maxHeight: 150,
              }}
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="absolute right-2.5 bottom-2.5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-15"
              style={{
                background: input.trim()
                  ? "#fbbf24"
                  : "rgba(255,255,255,0.06)",
              }}
            >
              <ArrowUp
                className="w-[18px] h-[18px]"
                style={{
                  color: input.trim() ? "#000" : "#6e6e73",
                  strokeWidth: 2.5,
                }}
              />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
