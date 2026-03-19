"use client";

import { motion } from "framer-motion";
import { ChevronRight, FileText } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppStore } from "@/lib/store";
import type { CurriculumSubject } from "@/lib/curriculum";
import { cn } from "@/lib/utils";

interface SubjectItemProps {
  subject: CurriculumSubject;
}

export default function SubjectItem({ subject }: SubjectItemProps) {
  const { activeTopicId, openTopic, setSidebarOpen } = useAppStore();

  const handleTopicClick = (topicId: string) => {
    openTopic(topicId);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const topicCount = subject.chapters.reduce((sum, ch) => sum + ch.topics.length, 0);

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
              <span className="text-[13px] font-semibold tracking-tight truncate text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {subject.name}
              </span>
              <span className="text-[10px] text-muted-foreground/60 flex-shrink-0 tabular-nums">
                {topicCount} topics
              </span>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-0.5 pb-1 pl-1">
        <div className="space-y-0.5">
          {subject.chapters.map((chapter) => (
            <div key={chapter.id}>
              {/* Chapter label */}
              <div className="flex items-center gap-2 px-3 py-1.5">
                <span className="text-xs">{chapter.icon}</span>
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: chapter.color, opacity: 0.8 }}
                >
                  {chapter.name}
                </span>
              </div>
              {/* Topics */}
              <div className="space-y-px">
                {chapter.topics.map((topic) => {
                  const isActive = activeTopicId === topic.id;
                  const hasContent = !!topic.contentPath || (topic.subtopics && topic.subtopics.length > 0);
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
                      <ChevronRight
                        className={cn(
                          "w-3 h-3 flex-shrink-0 transition-colors",
                          isActive ? "text-foreground" : "text-muted-foreground/40"
                        )}
                      />
                      <span
                        className={cn(
                          "text-[12px] truncate flex-1 transition-colors",
                          isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground group-hover/topic:text-foreground"
                        )}
                      >
                        {topic.name}
                      </span>
                      {hasContent && (
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
