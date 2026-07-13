"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Load the Spline runtime client-side only — the /next variant is an async
// Server Component and cannot be used inside a "use client" module.
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

const SCENE = "https://prod.spline.design/zM7blprDtPoKjlcg/scene.splinecode";

interface SplineOrbProps {
  className?: string;
  /**
   * Fixed pixel size for the orb container.
   * If omitted the orb fills its parent — the parent must have explicit dimensions.
   */
  size?: number;
}

/**
 * Renders the live Spline 3D orb scene.
 * Shows a soft pulsing gold glow while the scene loads, then fades it out.
 */
export default function SplineOrb({ className = "", size }: SplineOrbProps) {
  const [loaded, setLoaded] = useState(false);

  const rootStyle: React.CSSProperties = size
    ? { width: size, height: size }
    : { width: "100%", height: "100%" };

  return (
    <div className={`relative overflow-hidden ${className}`} style={rootStyle}>
      {/* Soft glow placeholder while the Spline runtime loads */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="spline-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-1/2 h-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, var(--z-accent) 0%, transparent 70%)",
                filter: "blur(22px)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spline canvas — fades in once the scene is ready */}
      <motion.div
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Spline
          scene={SCENE}
          onLoad={() => setLoaded(true)}
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>
    </div>
  );
}
