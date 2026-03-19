"use client";

import { useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import UserBubble from "./UserBubble";
import AiBubble from "./AiBubble";

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[5px] h-[5px] rounded-full bg-muted-foreground animate-pulse-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

export default function MessageStream() {
  const { getActiveChat } = useAppStore();
  const chat = getActiveChat();
  const endRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages, chat?.isTyping, chat?.revealIndex, chat?.allRevealed]);

  if (!chat) return null;

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto">
      <div className="w-full max-w-[680px] mx-auto px-4 sm:px-6 pt-4 pb-6">
        {chat.messages.map((msg, idx) => {
          const isLatest =
            idx === chat.messages.length - 1 && msg.role === "assistant";
          return msg.role === "user" ? (
            <UserBubble key={msg.id} message={msg} />
          ) : (
            <AiBubble key={msg.id} message={msg} isLatest={isLatest} />
          );
        })}
        {chat.isTyping && <TypingDots />}
        <div ref={endRef} />
      </div>
    </div>
  );
}
