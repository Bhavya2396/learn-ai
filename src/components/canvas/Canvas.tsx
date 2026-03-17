"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasAction } from "@/lib/types";
import WelcomeView from "./WelcomeView";
import ContentRenderer from "./ContentRenderer";
import QuizRenderer from "./QuizRenderer";
import FlashcardRenderer from "./FlashcardRenderer";
import MasteryMap from "./MasteryMap";
import DemoRenderer from "./DemoRenderer";
import { Sparkles } from "lucide-react";

interface CanvasProps {
  action: CanvasAction | null;
}

export default function Canvas({ action }: CanvasProps) {
  if (!action) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(249, 115, 22, 0.05))",
              border: "1px solid rgba(245, 158, 11, 0.1)",
            }}
          >
            <Sparkles className="w-7 h-7 text-amber-400/50" />
          </div>
          <h2 className="text-base font-semibold text-white/40 mb-1">Your Learning Canvas</h2>
          <p className="text-xs text-white/20 max-w-xs">
            Start a conversation with your AI tutor and content will appear here — 
            lessons, quizzes, flashcards, and demos.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={action.type + JSON.stringify(action.data).slice(0, 50)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        {action.type === "welcome" && <WelcomeView subjects={action.data.subjects} />}
        {action.type === "content" && <ContentRenderer concept={action.data.concept} />}
        {action.type === "quiz" && (
          <QuizRenderer
            questions={action.data.questions}
            conceptName={action.data.conceptName}
          />
        )}
        {action.type === "flashcards" && (
          <FlashcardRenderer
            cards={action.data.cards}
            conceptName={action.data.conceptName}
            initialLang={action.data.lang}
          />
        )}
        {action.type === "mastery" && <MasteryMap subjects={action.data.subjects} />}
        {action.type === "demo" && <DemoRenderer url={action.data.url} title={action.data.title} />}
      </motion.div>
    </AnimatePresence>
  );
}
