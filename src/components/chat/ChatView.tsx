"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ArrowLeft, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppStore } from "@/lib/store";
import { useProgressStore, getMasteryLevel } from "@/lib/progressStore";
import WelcomeScreen from "./WelcomeScreen";
import MessageStream from "./MessageStream";
import InputBar from "./InputBar";
import ProgressSheet from "./ProgressSheet";

const EASE = [0.25, 0.1, 0.25, 1.0] as const;

export default function ChatView() {
  const { activeTopicId, getActiveChat, resetActiveChat, closeTopic } = useAppStore();
  const activeChat = getActiveChat();
  const hasActiveTopic = !!activeTopicId && !!activeChat;
  const [showProgress, setShowProgress] = useState(false);

  const mastery = useProgressStore((s) => activeTopicId ? s.getMastery(activeTopicId) : 0);
  const level = getMasteryLevel(mastery);

  return (
    <div className="flex flex-col h-full relative">
      {/* Topic header + mastery */}
      <AnimatePresence>
        {hasActiveTopic && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2.5"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.30) 60%, transparent)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {/* Left: back + topic name */}
            <div className="flex items-center gap-2 min-w-0">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeTopic}
                      className="h-8 w-8 rounded-lg text-foreground/60 hover:text-foreground hover:bg-black/10 transition-all duration-200 flex-shrink-0"
                    />
                  }
                >
                  <ArrowLeft className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent className="text-xs">Back</TooltipContent>
              </Tooltip>
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: activeChat.subjectColor }}
                />
                <span className="text-[13px] font-bold text-foreground truncate">
                  {activeChat.topicName}
                </span>
              </div>
            </div>

            {/* Right: mastery + progress + reset */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Mastery pill — clickable to open progress */}
              {mastery > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setShowProgress(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: `${level.color}20`,
                    border: `1px solid ${level.color}30`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: level.color }}
                  />
                  <span className="text-[11px] font-extrabold tabular-nums" style={{ color: level.color }}>
                    {mastery}
                  </span>
                  <span className="text-[10px] font-bold" style={{ color: level.color }}>
                    {level.label}
                  </span>
                </motion.button>
              )}

              {/* Progress detail button */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowProgress(true)}
                      className="h-8 w-8 rounded-lg text-foreground/50 hover:text-foreground hover:bg-black/10 transition-all duration-200"
                    />
                  }
                >
                  <BarChart2 className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent className="text-xs">My progress</TooltipContent>
              </Tooltip>

              {/* Reset */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={resetActiveChat}
                      className="h-8 w-8 rounded-lg text-foreground/50 hover:text-foreground hover:bg-black/10 transition-all duration-200"
                    />
                  }
                >
                  <Plus className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent className="text-xs">Reset chat</TooltipContent>
              </Tooltip>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {!hasActiveTopic ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="h-full overflow-y-auto"
            >
              <WelcomeScreen />
            </motion.div>
          ) : (
            <motion.div
              key={`chat-${activeTopicId}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="h-full flex flex-col pt-12"
            >
              <MessageStream />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      {hasActiveTopic && <InputBar />}

      {/* Progress sheet overlay */}
      <AnimatePresence>
        {showProgress && hasActiveTopic && (
          <ProgressSheet
            topicId={activeTopicId!}
            topicName={activeChat.topicName}
            subjectColor={activeChat.subjectColor}
            onClose={() => setShowProgress(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
