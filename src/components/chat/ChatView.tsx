"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppStore } from "@/lib/store";
import WelcomeScreen from "./WelcomeScreen";
import MessageStream from "./MessageStream";
import InputBar from "./InputBar";

const EASE = [0.25, 0.1, 0.25, 1.0] as const;

export default function ChatView() {
  const { activeTopicId, getActiveChat, resetActiveChat, closeTopic } = useAppStore();
  const activeChat = getActiveChat();
  const hasActiveTopic = !!activeTopicId && !!activeChat;

  return (
    <div className="flex flex-col h-full relative">
      {/* Topic header + actions */}
      <AnimatePresence>
        {hasActiveTopic && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2.5"
            style={{
              background: "linear-gradient(to bottom, var(--background) 70%, transparent)",
            }}
          >
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeTopic}
                      className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                    />
                  }
                >
                  <ArrowLeft className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent className="text-xs">Back to home</TooltipContent>
              </Tooltip>
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: activeChat.subjectColor }}
                />
                <span className="text-[13px] font-semibold text-foreground truncate">
                  {activeChat.topicName}
                </span>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetActiveChat}
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                  />
                }
              >
                <Plus className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="text-xs">Reset chat</TooltipContent>
            </Tooltip>
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

      {/* Input bar — only when a topic is active */}
      {hasActiveTopic && <InputBar />}
    </div>
  );
}
