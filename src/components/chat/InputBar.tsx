"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppStore } from "@/lib/store";
import { useVoiceInput, useVoiceOutput } from "@/hooks/useVoice";

export default function InputBar() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, getActiveChat, autoSpeak, setAutoSpeak } = useAppStore();
  const chat = getActiveChat();
  const { isListening, transcript, startListening, stopListening } = useVoiceInput();
  const { anyoneSpeaking, stop: stopVoice } = useVoiceOutput();

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  }, [input, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      // Stop any TTS narration before listening so voices don't overlap
      if (anyoneSpeaking) stopVoice();
      startListening((text) => {
        setInput(text);
        setTimeout(() => {
          sendMessage(text);
          setInput("");
        }, 300);
      });
    }
  };

  const topicName = chat?.topicName || "this topic";
  const displayText = isListening && transcript ? transcript : input;

  return (
    <footer
      className="relative z-20 shrink-0 px-4 sm:px-6 pb-4 sm:pb-6 pt-3"
      style={{
        background: `linear-gradient(to top, var(--fade-gradient) 60%, transparent)`,
      }}
    >
      <div className="w-full max-w-[680px] mx-auto">
        {/* Voice listening indicator */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center justify-center gap-2 py-2 mb-2"
            >
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-accent"
                    animate={{ height: [8, 20, 8] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <span className="text-[12px] text-muted-foreground ml-2">
                {transcript || "Listening..."}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="relative flex items-end rounded-2xl transition-colors duration-200 glass-surface"
          style={{
            background: "var(--input-bg)",
            border: isListening
              ? "1px solid var(--accent)"
              : "1px solid var(--input-border)",
          }}
        >
          <textarea
            ref={inputRef}
            value={displayText}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
            }}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${topicName}...`}
            rows={1}
            disabled={isListening}
            className="flex-1 bg-transparent resize-none outline-none text-[15px] sm:text-[16px] text-foreground placeholder:text-muted-foreground disabled:opacity-60"
            style={{
              lineHeight: 1.5,
              padding: "13px 132px 13px 18px",
              maxHeight: 150,
            }}
          />
          <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5">
            {/* Auto-speak toggle */}
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (autoSpeak) stopVoice(); // stop when turning off
                      setAutoSpeak(!autoSpeak);
                    }}
                    className={`h-9 w-9 rounded-xl transition-all duration-200 ${
                      autoSpeak
                        ? "text-accent bg-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                  />
                }
              >
                <Volume2 className="h-[18px] w-[18px]" />
              </TooltipTrigger>
              <TooltipContent className="text-xs">
                {autoSpeak ? "Voice on — click to mute" : "Read responses aloud"}
              </TooltipContent>
            </Tooltip>

            {/* Voice input */}
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleVoiceToggle}
                    className={`h-9 w-9 rounded-xl transition-all duration-200 ${
                      isListening
                        ? "text-red-400 bg-red-400/10 animate-pulse"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                  />
                }
              >
                {isListening ? (
                  <MicOff className="h-[18px] w-[18px]" />
                ) : (
                  <Mic className="h-[18px] w-[18px]" />
                )}
              </TooltipTrigger>
              <TooltipContent className="text-xs">
                {isListening ? "Stop listening" : "Voice input"}
              </TooltipContent>
            </Tooltip>

            {/* Send */}
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isListening}
              className="h-9 w-9 rounded-full transition-all duration-200 disabled:opacity-20"
              style={{
                background: input.trim() ? "#2d2a28" : "var(--secondary)",
                color: input.trim() ? "#ffffff" : "var(--muted-foreground)",
              }}
            >
              <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
