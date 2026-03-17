"use client";

import { useState, useRef, useCallback } from "react";
import { Send, Mic } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  return (
    <div className="p-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
      <div
        className="flex items-end gap-2 rounded-2xl px-4 py-2"
        style={{ background: "var(--surface-2)", border: "1px solid var(--border-subtle)" }}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Ask me anything about your studies..."}
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent text-sm text-white/90 placeholder:text-white/30 resize-none focus:outline-none py-1.5"
          style={{ minHeight: 24, maxHeight: 120 }}
        />

        <button
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            color: "var(--text-tertiary)",
          }}
          title="Voice input (coming soon)"
        >
          <Mic className="w-4 h-4" />
        </button>

        <motion.button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
          style={{
            background: value.trim() ? "var(--ai-gradient)" : "var(--surface-2)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send className="w-4 h-4 text-white" />
        </motion.button>
      </div>

      <div className="flex items-center gap-3 mt-2 px-1">
        {["Explain a topic", "Test me", "Show flashcards", "My progress"].map((chip) => (
          <button
            key={chip}
            onClick={() => onSend(chip)}
            className="text-[11px] px-2.5 py-1 rounded-full transition-all hover:scale-105"
            style={{
              background: "var(--surface-1)",
              color: "var(--text-tertiary)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
