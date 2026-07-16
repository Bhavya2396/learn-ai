"use client";

/**
 * App-wide save-failure banner. When any server write fails (brain or lesson),
 * useSyncStatus flips to "error" and this shows a fixed, non-blocking notice so
 * the user KNOWS their progress isn't saving — instead of the app silently
 * pretending it worked. Dismissable; reappears on the next failure.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useSyncStatus } from "@/lib/zoe/sync-status";

export default function SyncBanner() {
  const state = useSyncStatus((s) => s.state);
  const message = useSyncStatus((s) => s.message);
  const [dismissed, setDismissed] = useState(false);

  const show = state === "error" && !dismissed;
  // Re-arm the banner whenever we leave the error state.
  if (state !== "error" && dismissed) setDismissed(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="fixed top-3 left-1/2 -translate-x-1/2 z-[200] w-[min(92vw,440px)]"
          role="alert"
        >
          <div
            className="flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-lg"
            style={{ background: "#3a1512", border: "1.5px solid #a33", color: "#ffd9d2" }}
          >
            <AlertTriangle className="w-4.5 h-4.5 flex-shrink-0" style={{ color: "#ff8b7a" }} />
            <span className="flex-1 text-[13px] font-semibold leading-snug">
              {message || "Something went wrong. Please try again later."}
            </span>
            <button
              onClick={() => setDismissed(true)}
              className="flex-shrink-0 w-6 h-6 grid place-items-center rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }}
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
