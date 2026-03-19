"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import { getCurriculum } from "@/lib/curriculum";
import { studentProfile } from "@/lib/mock-data";

const SplineScene = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full border-2 border-border border-t-accent"
        style={{ animation: "spin 1s linear infinite" }}
      />
    </div>
  ),
});

// Suppress Spline runtime noise (fires on every animation tick)
function useSplineSilencer() {
  useEffect(() => {
    const orig = console.error;
    console.error = (...args: Parameters<typeof console.error>) => {
      if (typeof args[0] === "string" && args[0].includes("Missing property")) return;
      orig.apply(console, args);
    };
    return () => { console.error = orig; };
  }, []);
}

const EASE = [0.25, 0.1, 0.25, 1.0] as const;

function useGreeting(): string {
  const [greeting, setGreeting] = useState("Hello");
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);
  return greeting;
}

export default function WelcomeScreen() {
  useSplineSilencer();
  const { selectedClass, openTopic } = useAppStore();
  const greeting = useGreeting();
  const subjects = getCurriculum(selectedClass);

  const quickTopics = subjects.flatMap((subject) =>
    subject.chapters.flatMap((chapter) =>
      chapter.topics.slice(0, 2).map((topic) => ({
        topicId: topic.id,
        topicName: topic.name,
        chapterName: chapter.name,
        subjectName: subject.name,
        icon: subject.icon,
        color: subject.color,
        hasContent: !!topic.contentPath,
      }))
    )
  ).slice(0, 8);

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-5 sm:px-6" style={{ paddingBottom: 80 }}>
      {/* Spline robot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px]"
      >
        <SplineScene scene="https://prod.spline.design/cEOu-E4HXG9X9LHS/scene.splinecode" />
      </motion.div>

      {/* Greeting */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
        className="text-center font-bold mt-1 text-[28px] sm:text-[38px] text-foreground"
        style={{ letterSpacing: "-0.03em", lineHeight: 1.08 }}
      >
        {greeting}, {studentProfile.name}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.6, ease: EASE }}
        className="text-center mt-2.5 sm:mt-3 text-[14px] sm:text-[17px] text-muted-foreground"
        style={{ letterSpacing: "-0.01em", lineHeight: 1.35 }}
      >
        Pick a topic from the sidebar, or start with one below
      </motion.p>

      {/* Quick topic grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full mt-8 sm:mt-10 max-w-[600px]"
      >
        {quickTopics.map((t, i) => (
          <motion.button
            key={t.topicId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.05, duration: 0.4, ease: EASE }}
            onClick={() => openTopic(t.topicId)}
            className="glass-card flex flex-col items-start p-3.5 sm:p-4 cursor-pointer group text-left"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-lg mb-1.5">{t.icon}</span>
            <span className="text-[12px] sm:text-[13px] font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-accent transition-colors">
              {t.topicName}
            </span>
            <span className="text-[10px] text-muted-foreground mt-1 truncate w-full">
              {t.chapterName}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
