"use client";

import { useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useProgressStore, getMasteryLevel } from "@/lib/progressStore";
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

function MasteryBar() {
  const chat = useAppStore((s) => s.getActiveChat());
  const getMastery = useProgressStore((s) => s.getMastery);
  const getBktScore = useProgressStore((s) => s.getBktScore);

  if (!chat) return null;

  const mastery = getMastery(chat.topicId);
  const bktScore = getBktScore(chat.topicId);
  const level = getMasteryLevel(mastery);

  return (
    <div className="w-full max-w-[680px] mx-auto px-4 sm:px-6 pt-3 pb-1">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] font-semibold text-foreground truncate">
          {chat.topicName}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {mastery > 0 && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
              style={{
                background: `${level.color}22`,
                color: level.color,
              }}
            >
              {level.label}
            </span>
          )}
          {bktScore > 0 && (
            <span className="text-[10px] text-muted-foreground font-medium tabular-nums">
              BKT {Math.round(bktScore)}
            </span>
          )}
          <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface)" }}>
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${mastery}%`,
                background: level.color,
              }}
            />
          </div>
          <span
            className="text-[11px] font-bold tabular-nums"
            style={{
              color: level.color,
            }}
          >
            {mastery}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MessageStream() {
  const { getActiveChat } = useAppStore();
  const chat = getActiveChat();
  const endRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll within the container, not the whole page
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [chat?.messages, chat?.isTyping, chat?.revealIndex, chat?.allRevealed]);

  if (!chat) return null;

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto">
      <MasteryBar />
      <div className="w-full max-w-[680px] mx-auto px-4 sm:px-6 pt-2 pb-6">
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
