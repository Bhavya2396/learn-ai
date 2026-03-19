"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppStore } from "@/lib/store";
import { useProgressStore } from "@/lib/progressStore";
import type { CurriculumSubject } from "@/lib/curriculum";
import { cn } from "@/lib/utils";

function ProgressRing({ percent, size = 16 }: { percent: number; size?: number }) {
  const r = (size - 3) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (percent / 100) * circ;

  if (percent === 0) return null;

  return (
    <svg width={size} height={size} className="flex-shrink-0 -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--border)"
        strokeWidth={2}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

interface SubjectItemProps {
  subject: CurriculumSubject;
}

export default function SubjectItem({ subject }: SubjectItemProps) {
  const { activeTopicId, openTopic, setSidebarOpen, selectedClass } = useAppStore();
  const getMastery = useProgressStore((s) => s.getMastery);
  const getSubjectMastery = useProgressStore((s) => s.getSubjectMastery);

  const handleTopicClick = (topicId: string) => {
    openTopic(topicId);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const topicCount = subject.chapters.reduce((sum, ch) => sum + ch.topics.length, 0);
  const subjectMastery = getSubjectMastery(subject.id, selectedClass);

  return (
    <AccordionItem value={subject.id} className="border-none">
      <AccordionTrigger
        className={cn(
          "px-3 py-2.5 rounded-xl hover:no-underline transition-all duration-200 group",
          "hover:bg-secondary/80"
        )}
      >
        <div className="flex items-center gap-3 w-full min-w-0">
          <span className="text-lg flex-shrink-0">{subject.icon}</span>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] font-bold tracking-tight truncate text-foreground transition-colors duration-200">
                {subject.name}
              </span>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {subjectMastery > 0 && (
                  <span
                    className="text-[10px] font-bold tabular-nums"
                    style={{ color: "var(--accent)" }}
                  >
                    {subjectMastery}%
                  </span>
                )}
                <span className="text-[10px] text-muted-foreground/60 tabular-nums">
                  {topicCount} topics
                </span>
              </div>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-0.5 pb-1 pl-1">
        <div className="space-y-0.5">
          {subject.chapters.map((chapter) => (
            <div key={chapter.id}>
              <div className="flex items-center gap-2 px-3 py-1.5">
                <span className="text-xs">{chapter.icon}</span>
                <span
                  className="text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: chapter.color, opacity: 1 }}
                >
                  {chapter.name}
                </span>
              </div>
              <div className="space-y-px">
                {chapter.topics.map((topic) => {
                  const isActive = activeTopicId === topic.id;
                  const hasContent = !!topic.contentPath || (topic.subtopics && topic.subtopics.length > 0);
                  const mastery = getMastery(topic.id);
                  return (
                    <motion.button
                      key={topic.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTopicClick(topic.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-all duration-200",
                        "hover:bg-secondary/60 group/topic",
                        isActive && "bg-secondary"
                      )}
                      style={isActive ? { borderLeft: `2px solid ${subject.color}` } : undefined}
                    >
                      {mastery > 0 ? (
                        <ProgressRing percent={mastery} />
                      ) : (
                        <div
                          className={cn(
                            "w-1.5 h-1.5 rounded-full flex-shrink-0",
                            isActive ? "bg-foreground" : "bg-muted-foreground/30"
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "text-[12px] truncate flex-1 transition-colors",
                          isActive
                            ? "text-foreground font-semibold"
                            : "text-foreground/70 font-medium group-hover/topic:text-foreground"
                        )}
                      >
                        {topic.name}
                      </span>
                      {mastery > 0 && (
                        <span className="text-[9px] font-bold tabular-nums text-muted-foreground/50 flex-shrink-0">
                          {mastery}%
                        </span>
                      )}
                      {hasContent && mastery === 0 && (
                        <FileText
                          className="w-3 h-3 flex-shrink-0 text-muted-foreground/30"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
