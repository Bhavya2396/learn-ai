"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppStore } from "@/lib/store";
import Sidebar from "./Sidebar";
import ChatView from "@/components/chat/ChatView";

const SIDEBAR_WIDTH = 280;
const EASE = [0.25, 0.1, 0.25, 1.0] as const;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export default function AppShell() {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile, setSidebarOpen]);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Desktop sidebar */}
      {!isMobile && (
        <motion.div
          className="flex-shrink-0 overflow-hidden"
          animate={{ width: sidebarOpen ? SIDEBAR_WIDTH : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{ minWidth: 0 }}
        >
          <div style={{ width: SIDEBAR_WIDTH }} className="h-full">
            <Sidebar />
          </div>
        </motion.div>
      )}

      {/* Mobile sidebar (sheet/drawer) */}
      {isMobile && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-[280px] p-0 border-r-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}

      {/* Main area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Collapsed sidebar toggle */}
        <AnimatePresence>
          {!sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 left-3 z-30"
            >
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
                  <PanelLeft className="h-[18px] w-[18px]" />
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">
                  Open sidebar
                </TooltipContent>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>

        <ChatView />
      </main>
    </div>
  );
}
