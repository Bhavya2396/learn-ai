"use client";

/**
 * Ambience — the app's emotional "weather". A single mood drives both the living
 * background and the central ZoeOrb, so the whole interface visibly responds to
 * what's happening (thinking, succeeding, struggling…) while staying within
 * ZOE's warm gold/earth hues. This is what makes it feel alive.
 */

import { create } from "zustand";

export type Mood = "idle" | "thinking" | "listening" | "success" | "struggle" | "calm";

export interface MoodPalette {
  blobs: [string, string, string];
  orb: [string, string]; // [inner highlight, outer]
  glow: string;
}

// Blob palettes use chalky, low-saturation pastels — warmth from hue, not chroma.
// Each mood pairs one warm blob, one cool blob, one neutral so you feel contrast
// *within* the background without the blobs fighting the UI.
export const MOOD: Record<Mood, MoodPalette> = {
  //                    warm straw          cool sage-mint     pale blush terra
  idle:      { blobs: ["#EDD8A6", "#B4CCBE", "#DFC4B0"], orb: ["#FFF1D6", "#F2B968"], glow: "#F4C77E" },
  //                    deeper amber        cool slate-sage    warm sand
  thinking:  { blobs: ["#E4C47A", "#AABFBA", "#D4AE8C"], orb: ["#FFE8BC", "#EC9A4A"], glow: "#EDA85A" },
  //                    golden-straw        pale teal          peach
  listening: { blobs: ["#ECD49C", "#B0C8C0", "#DBBCAA"], orb: ["#FFF2D2", "#EAC078"], glow: "#EECB84" },
  //                    sage-green          pale gold          soft moss
  success:   { blobs: ["#C0D4A4", "#E2CE8C", "#B4C8A4"], orb: ["#FFF3D4", "#AFC58E"], glow: "#CBBE7E" },
  //                    pale terra          blush-rose         warm sand
  struggle:  { blobs: ["#E4B89C", "#CCA8A4", "#D4AE90"], orb: ["#FFD8AE", "#D07E4A"], glow: "#D58A56" },
  //                    soft cream-gold     sage-slate         pale linen
  calm:      { blobs: ["#E8D8B0", "#B8CCBC", "#DCC8B4"], orb: ["#FFF8E6", "#F0CE84"], glow: "#F2D79A" },
};

interface AmbienceState {
  mood: Mood;
  base: Mood;
  setMood: (m: Mood) => void;
  /** Set a base mood the app settles back to. */
  setBase: (m: Mood) => void;
  /** Flash a mood for `ms`, then ease back to the base mood. */
  pulse: (m: Mood, ms?: number) => void;
}

let pulseTimer: ReturnType<typeof setTimeout> | null = null;

export const useAmbience = create<AmbienceState>((set, get) => ({
  mood: "idle",
  base: "idle",
  setMood: (m) => {
    if (pulseTimer) { clearTimeout(pulseTimer); pulseTimer = null; }
    set({ mood: m });
  },
  setBase: (m) => set({ base: m, mood: m }),
  pulse: (m, ms = 2600) => {
    if (pulseTimer) clearTimeout(pulseTimer);
    set({ mood: m });
    pulseTimer = setTimeout(() => { set({ mood: get().base }); pulseTimer = null; }, ms);
  },
}));
