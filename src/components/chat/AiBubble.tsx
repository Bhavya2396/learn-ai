"use client";

import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { BookOpen, Beaker, Brain, MessageCircle } from "lucide-react";
import type { ChatMessage, CanvasAction } from "@/lib/types";
import { useAppStore, type ContentCard } from "@/lib/store";
import { useVoiceOutput } from "@/hooks/useVoice";
import { getVoiceManager } from "@/lib/voiceManager";
import { splitIntoCards, type ChunkType } from "@/lib/splitChunks";

import InlineQuiz from "@/components/inline/InlineQuiz";
import InlineFlashcards from "@/components/inline/InlineFlashcards";
import InlineContent from "@/components/inline/InlineContent";
import InlineDemo from "@/components/inline/InlineDemo";
import InlineMastery from "@/components/inline/InlineMastery";
import InlineTopicList from "@/components/inline/InlineTopicList";

const EASE = [0.25, 0.1, 0.25, 1.0] as const;

const CHUNK_STYLES: Record<ChunkType, { border: string; bg: string; icon: string }> = {
  question: { border: "border-amber-500/30", bg: "bg-amber-500/[0.04]", icon: "🤔" },
  explanation: { border: "border-blue-400/20", bg: "bg-blue-400/[0.03]", icon: "📖" },
  keypoints: { border: "border-emerald-400/25", bg: "bg-emerald-400/[0.04]", icon: "💡" },
  formula: { border: "border-purple-400/25", bg: "bg-purple-400/[0.04]", icon: "📐" },
  hint: { border: "border-cyan-400/25", bg: "bg-cyan-400/[0.04]", icon: "💡" },
  text: { border: "border-transparent", bg: "", icon: "" },
};

// ── Waveform animation ──

function WaveformBars() {
  return (
    <div className="flex items-center gap-[3px] h-4">
      {[1, 1.8, 1.2, 2, 0.9, 1.6, 1.1].map((scale, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ background: "var(--accent)" }}
          animate={{ scaleY: [0.4 * scale, scale, 0.4 * scale] }}
          transition={{ repeat: Infinity, duration: 0.7 + i * 0.08, delay: i * 0.06, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Rich blocks (demo, quiz, etc.) ──

function RichBlock({ action }: { action: CanvasAction }) {
  switch (action.type) {
    case "welcome":
    case "mastery":
      return <InlineMastery subjects={action.data.subjects} />;
    case "content":
      return <InlineContent concept={action.data.concept} />;
    case "quiz":
      return <InlineQuiz questions={action.data.questions} conceptName={action.data.conceptName} />;
    case "flashcards":
      return <InlineFlashcards cards={action.data.cards} conceptName={action.data.conceptName} initialLang={action.data.lang} />;
    case "demo":
      return <InlineDemo url={action.data.url} title={action.data.title} />;
    case "topic_list":
      return <InlineTopicList subjectName={action.data.subjectName} subjectIcon={action.data.subjectIcon} color={action.data.color} chapters={action.data.chapters} />;
    default:
      return null;
  }
}

// ═══════════════════════════════════════════════
// CompactCard — small, muted, for past / already-revealed cards
// ═══════════════════════════════════════════════

function CompactCard({ card }: { card: ContentCard }) {
  const style = CHUNK_STYLES[card.type];
  const isPlain = card.type === "text";

  if (isPlain) {
    return (
      <div className="msg-md text-[14px] sm:text-[15px] opacity-90">
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {card.content}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border px-3 py-2 ${style.border} ${style.bg} opacity-90`}>
      {style.icon && <span className="text-xs mr-1 inline-block">{style.icon}</span>}
      <div className="msg-md inline text-[14px] sm:text-[15px]">
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {card.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// SpotlightCard — the currently presenting card (large, glowing)
// ═══════════════════════════════════════════════

function SpotlightCard({
  card,
  isSpeaking,
  onClick,
}: {
  card: ContentCard;
  isSpeaking: boolean;
  onClick: () => void;
}) {
  const style = CHUNK_STYLES[card.type];
  const isPlain = card.type === "text";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      onClick={onClick}
      className={`relative cursor-pointer rounded-xl border px-5 py-4 spotlight-glow ${
        isPlain ? "border-border/50" : `${style.border} ${style.bg}`
      }`}
    >
      {isSpeaking && (
        <div className="absolute top-3 right-3">
          <WaveformBars />
        </div>
      )}
      {!isPlain && style.icon && (
        <span className="text-sm mr-1.5 inline-block -mt-0.5">{style.icon}</span>
      )}
      <div className="msg-md">
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {card.content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════
// ActionBar — pill buttons shown after all cards are revealed
// ═══════════════════════════════════════════════

interface QuickAction {
  key: string;
  label: string;
  icon: typeof BookOpen;
  message: string;
  needsDemo?: boolean;
}

const QUICK_ACTIONS: QuickAction[] = [
  { key: "explain", label: "Explain differently", icon: BookOpen, message: "Can you explain this in a different way?" },
  { key: "demo", label: "Show demo", icon: Beaker, message: "Show me an interactive demo to understand this better.", needsDemo: true },
  { key: "quiz", label: "Quiz me", icon: Brain, message: "Test my understanding with a quiz question." },
  { key: "question", label: "Ask a question", icon: MessageCircle, message: "" },
];

function ActionBar() {
  const { sendQuickAction, getActiveContext } = useAppStore();
  const ctx = getActiveContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [askMode, setAskMode] = useState(false);

  const hasDemos = !!(
    ctx?.topic.contentPath ||
    (ctx?.topic.subtopics || []).some((s) => s.contentPath)
  );

  const handleAction = (action: QuickAction) => {
    if (action.key === "question") {
      setAskMode(true);
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }
    sendQuickAction(action.message);
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputRef.current?.value.trim();
    if (val) {
      sendQuickAction(val);
      setAskMode(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
      className="mt-4 space-y-3"
    >
      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.filter((a) => !a.needsDemo || hasDemos).map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.35, ease: EASE }}
              onClick={() => handleAction(action)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 glass-card hover:scale-[1.03] active:scale-[0.98]"
              style={{ color: "var(--text-secondary)" }}
            >
              <Icon className="w-3.5 h-3.5" />
              {action.label}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {askMode && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAskSubmit}
            className="overflow-hidden"
          >
            <div className="flex gap-2 pt-1">
              <input
                ref={inputRef}
                placeholder="Type your question..."
                className="flex-1 rounded-xl px-3 py-2 text-sm bg-transparent outline-none"
                style={{ border: "1px solid var(--input-border)", color: "var(--text)" }}
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl text-sm font-medium"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
              >
                Ask
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════
// CardLoadingIndicator — shown while waiting for audio to cache
// ═══════════════════════════════════════════════

function CardLoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center py-6 gap-1.5"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: "var(--accent)" }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════
// CardPresenter — holds each card until its audio is ready,
// then reveals card + plays audio in perfect sync
// ═══════════════════════════════════════════════

function CardPresenter({ message }: { message: ChatMessage }) {
  const { getActiveChat, advanceCard, autoSpeak } = useAppStore();
  const chat = getActiveChat();
  const { isSpeaking, speak, stop } = useVoiceOutput(message.id);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [spotlightReady, setSpotlightReady] = useState(false);

  const pendingCards = chat?.pendingCards ?? [];
  const revealIndex = chat?.revealIndex ?? 0;
  const allRevealed = chat?.allRevealed ?? true;
  const hasUserMessages = (chat?.messages ?? []).some((m) => m.role === "user");

  useEffect(() => {
    if (allRevealed) return;
    const card = pendingCards[revealIndex];
    if (!card) return;

    setSpotlightReady(false);
    let cancelled = false;

    const manager = getVoiceManager();

    // While waiting for current card, start fetching the one after next
    // (current + next were already primed in applyCards)
    const cardAfterNext = pendingCards[revealIndex + 2];
    if (cardAfterNext) {
      manager.prime(card.content, cardAfterNext.content);
    }

    if (autoSpeak) {
      const reveal = () => {
        if (cancelled) return;
        setSpotlightReady(true);
        speak(card.content, () => advanceCard());
      };

      // Hard timeout so card never gets stuck waiting forever
      const timeout = setTimeout(reveal, 3000);

      manager.whenReady(card.content).then(() => {
        clearTimeout(timeout);
        reveal();
      });

      return () => {
        cancelled = true;
        clearTimeout(timeout);
      };
    }

    setSpotlightReady(true);
    const words = card.content.split(/\s+/).length;
    const delay = Math.max(1500, Math.min(words * 200, 5000));
    timerRef.current = setTimeout(() => advanceCard(), delay);

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [revealIndex, allRevealed, autoSpeak, pendingCards, speak, advanceCard]);

  const handleCardTap = useCallback(() => {
    if (allRevealed) return;
    stop();
    if (timerRef.current) clearTimeout(timerRef.current);
    advanceCard();
  }, [allRevealed, stop, advanceCard]);

  if (pendingCards.length === 0) {
    return (
      <div className="msg-md">
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {message.content}
        </ReactMarkdown>
      </div>
    );
  }

  const compactCards = pendingCards.slice(0, allRevealed ? pendingCards.length : revealIndex);
  const spotlightCard = allRevealed ? null : pendingCards[revealIndex];

  return (
    <div className="space-y-2.5">
      {compactCards.map((card) => (
        <motion.div
          key={card.id}
          layout
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <CompactCard card={card} />
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {spotlightCard && !spotlightReady && (
          <CardLoadingIndicator key="loading" />
        )}
        {spotlightCard && spotlightReady && (
          <SpotlightCard
            key={spotlightCard.id}
            card={spotlightCard}
            isSpeaking={isSpeaking}
            onClick={handleCardTap}
          />
        )}
      </AnimatePresence>

      {allRevealed && message.canvasAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
          className="mt-3"
        >
          <RichBlock action={message.canvasAction} />
        </motion.div>
      )}

      {allRevealed && hasUserMessages && <ActionBar />}
    </div>
  );
}

// ═══════════════════════════════════════════════
// CompactBubble — for past (non-latest) messages
// ═══════════════════════════════════════════════

function CompactBubble({ message }: { message: ChatMessage }) {
  const { isSpeaking, speak, stop } = useVoiceOutput(message.id);
  const cards = useMemo(() => splitIntoCards(message.content), [message.content]);

  return (
    <div>
      <div className="space-y-1.5">
        {cards.map((card) => (
          <CompactCard key={card.id} card={card} />
        ))}
      </div>

      {message.canvasAction && (
        <div className="mt-2">
          <RichBlock action={message.canvasAction} />
        </div>
      )}

      {!message.isStreaming && message.content.length > 20 && (
        <div className="mt-1.5 flex items-center gap-2">
          <AnimatePresence mode="wait">
            {isSpeaking ? (
              <motion.button
                key="speaking"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={stop}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all"
                style={{
                  borderColor: "var(--accent)",
                  background: "var(--accent-soft)",
                  color: "var(--accent-warm)",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                <WaveformBars />
                <span>Stop</span>
              </motion.button>
            ) : (
              <motion.button
                key="listen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                className="group-hover:!opacity-100 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
                onClick={() => speak(message.content)}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                Listen
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// Main AiBubble — delegates based on isLatest
// ═══════════════════════════════════════════════

interface AiBubbleProps {
  message: ChatMessage;
  isLatest?: boolean;
}

export default function AiBubble({ message, isLatest }: AiBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mb-6 sm:mb-8 group"
    >
      {isLatest && !message.isStreaming ? (
        <CardPresenter message={message} />
      ) : (
        <CompactBubble message={message} />
      )}
    </motion.div>
  );
}
