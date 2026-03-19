"use client";

import { motion } from "framer-motion";
import { PanelLeftClose, Sparkles, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppStore } from "@/lib/store";
import { studentProfile } from "@/lib/mock-data";
import { formatTime } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import SubjectNav from "./SubjectNav";

export default function Sidebar() {
  const { toggleSidebar } = useAppStore();

  return (
    <motion.aside
      className="h-full flex flex-col border-r border-sidebar-border"
      style={{
        background: "var(--sidebar)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
      }}
      initial={false}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-[15px] font-extrabold tracking-tight text-foreground">
            LearnAI
          </span>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                />
              }
            >
              <PanelLeftClose className="h-[18px] w-[18px]" />
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Close sidebar
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Separator className="opacity-50" />

      {/* Subject Navigation — scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        <SubjectNav />
      </div>

      <Separator className="opacity-50" />

      {/* Student Profile Card */}
      <div className="p-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-accent">
              {studentProfile.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-foreground truncate">
              {studentProfile.name}
            </p>
            <p className="text-[11px] font-medium text-foreground/60">
              Class {studentProfile.grade}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[11px] font-semibold text-orange-400 tabular-nums">
              {studentProfile.streakDays}
            </span>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-3 text-[10px] text-muted-foreground">
          <span>{formatTime(studentProfile.totalStudyMinutes)} studied</span>
          <span className="text-border">|</span>
          <span>{studentProfile.strongAreas.length} strong areas</span>
        </div>
      </div>
    </motion.aside>
  );
}
