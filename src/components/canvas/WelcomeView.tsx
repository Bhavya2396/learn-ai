"use client";

import { motion } from "framer-motion";
import { SubjectSummary } from "@/lib/types";
import { masteryColor } from "@/lib/utils";
import { BookOpen, TrendingUp, Clock, Zap } from "lucide-react";
import { studentProfile } from "@/lib/mock-data";

interface WelcomeViewProps {
  subjects: SubjectSummary[];
}

export default function WelcomeView({ subjects }: WelcomeViewProps) {
  const totalMastery = Math.round(subjects.reduce((a, s) => a + s.mastery, 0) / subjects.length);

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden p-6"
        style={{
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(249, 115, 22, 0.05))",
          border: "1px solid rgba(245, 158, 11, 0.15)",
        }}
      >
        <div className="relative z-10">
          <p className="text-xs text-amber-400/80 font-medium mb-1">Welcome back</p>
          <h1 className="text-2xl font-bold text-white mb-2">
            Hey {studentProfile.name} 👋
          </h1>
          <p className="text-sm text-white/50 max-w-lg">
            You&apos;re on a {studentProfile.streakDays}-day learning streak. Your overall mastery is {totalMastery}% across {subjects.length} subjects. Let&apos;s keep building.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex gap-4 mt-5">
          {[
            { icon: TrendingUp, label: "Overall", value: `${totalMastery}%`, color: masteryColor(totalMastery) },
            { icon: BookOpen, label: "Concepts", value: `${subjects.reduce((a, s) => a + s.completedConcepts, 0)}/${subjects.reduce((a, s) => a + s.totalConcepts, 0)}`, color: "#3b82f6" },
            { icon: Clock, label: "Study Time", value: "20.6h", color: "#8b5cf6" },
            { icon: Zap, label: "Streak", value: `${studentProfile.streakDays} days`, color: "#f59e0b" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}
            >
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              <div>
                <p className="text-[10px] text-white/40">{stat.label}</p>
                <p className="text-sm font-semibold text-white/90">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Subject Cards */}
      <div>
        <h2 className="text-sm font-semibold text-white/60 mb-3 px-1">Your Subjects</h2>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
          {subjects.map((subject, i) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.02] group"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{subject.icon}</span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    color: masteryColor(subject.mastery),
                    background: `${masteryColor(subject.mastery)}15`,
                  }}
                >
                  {subject.mastery}%
                </span>
              </div>

              <h3 className="text-sm font-semibold text-white/90 mb-1">{subject.name}</h3>
              <p className="text-[11px] text-white/40 mb-3">
                {subject.completedConcepts}/{subject.totalConcepts} concepts · {subject.chapters.length} chapters
              </p>

              {/* Mastery bar */}
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: subject.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.mastery}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
                />
              </div>

              {/* Chapter pills */}
              <div className="flex flex-wrap gap-1 mt-3">
                {subject.chapters.slice(0, 3).map((ch) => (
                  <span
                    key={ch.name}
                    className="text-[9px] px-1.5 py-0.5 rounded"
                    style={{
                      background: "var(--surface-2)",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {ch.name.length > 20 ? ch.name.slice(0, 20) + "…" : ch.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weak areas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl p-4"
        style={{
          background: "rgba(239, 68, 68, 0.05)",
          border: "1px solid rgba(239, 68, 68, 0.1)",
        }}
      >
        <h3 className="text-xs font-semibold text-rose-400/80 mb-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" /> Focus Areas
        </h3>
        <p className="text-xs text-white/40 leading-relaxed">
          Based on your mastery scores, these need the most attention:{" "}
          {studentProfile.weakAreas.map((area, i) => (
            <span key={area}>
              <strong className="text-white/60">{area}</strong>
              {i < studentProfile.weakAreas.length - 1 ? ", " : ""}
            </span>
          ))}
          . Ask me to explain any of these!
        </p>
      </motion.div>
    </div>
  );
}
