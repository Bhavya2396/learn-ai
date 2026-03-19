/**
 * BKT + Weighted ELO Hybrid Mastery Rating System
 * Ported from ratings.py
 *
 * Formula:
 *   new_score = old_score + learning_rate × difficulty_weight × result_delta × confidence_decay
 *   new_score = clamp(new_score, 0, 100)
 *
 * Components:
 *   learning_rate     = BASE_RATE / (1 + λ × attempts)
 *   difficulty_weight = 0.6 (easy) | 1.0 (medium) | 1.4 (hard)
 *   result_delta      = +1.0 (correct) | -1.0 (incorrect) | 0.0 (skipped)
 *   confidence_decay  = 1 - (score/100) if correct  |  score/100 if incorrect
 */

import { create } from "zustand";
import { getCurriculum } from "./curriculum";

// ── Constants ────────────────────────────────────────────────────────────────

const BASE_RATE     = 10.0;
const LAMBDA        = 0.15;
const WEIGHT_EASY   = 0.6;
const WEIGHT_MEDIUM = 1.0;
const WEIGHT_HARD   = 1.4;
const SCORE_MIN     = 0.0;
const SCORE_MAX     = 100.0;
const STARTING_SCORE = 0.0;

export interface QuizAttempt {
  correct: boolean;
  difficulty: "easy" | "medium" | "hard";
  skipped?: boolean;
}

export interface MasteryLevel {
  label: string;
  color: string;
}

const MASTERY_LEVELS: [number, MasteryLevel][] = [
  [95, { label: "Mastered",   color: "#7bb8a0" }],  // sage green
  [80, { label: "Advanced",   color: "#9b7bbd" }],  // lavender
  [60, { label: "Proficient", color: "#c58b6e" }],  // warm coral
  [40, { label: "Developing", color: "#d4a574" }],  // peach
  [0,  { label: "Beginner",   color: "#c4a0a0" }],  // dusty rose
];

export function getMasteryLevel(score: number): MasteryLevel {
  for (const [threshold, level] of MASTERY_LEVELS) {
    if (score >= threshold) return level;
  }
  return MASTERY_LEVELS[MASTERY_LEVELS.length - 1][1];
}

// ── BKT + ELO core ───────────────────────────────────────────────────────────

function intrinsicDiff(difficulty: "easy" | "medium" | "hard"): number {
  if (difficulty === "easy")   return 0.2;
  if (difficulty === "hard")   return 0.8;
  return 0.5;
}

function difficultyWeight(intrinsic: number): number {
  if (intrinsic <= 0.33) return WEIGHT_EASY;
  if (intrinsic <= 0.66) return WEIGHT_MEDIUM;
  return WEIGHT_HARD;
}

function learningRate(attempts: number): number {
  return BASE_RATE / (1.0 + LAMBDA * Math.max(0, attempts));
}

function confidenceDecay(score: number, correct: boolean): number {
  const s = score / 100.0;
  return correct ? (1.0 - s) : s;
}

export function updateIndicator(
  oldScore: number,
  attempts: number,
  difficulty: "easy" | "medium" | "hard",
  correct: boolean,
  skipped = false,
  rankMultiplier = 1.0,
): { newScore: number; delta: number } {
  if (skipped) return { newScore: oldScore, delta: 0 };

  const intrinsic = intrinsicDiff(difficulty);
  const dw = difficultyWeight(intrinsic);
  const lr = learningRate(attempts);
  const cd = confidenceDecay(oldScore, correct);
  const rd = correct ? 1.0 : -1.0;

  const change = lr * dw * rd * cd * rankMultiplier;
  const newScore = Math.max(SCORE_MIN, Math.min(SCORE_MAX, oldScore + change));

  return {
    newScore: Math.round(newScore * 100) / 100,
    delta:    Math.round((newScore - oldScore) * 100) / 100,
  };
}

// ── Progress data model ──────────────────────────────────────────────────────

export interface TopicProgress {
  topicId: string;
  classLevel: string;

  // BKT+ELO quiz indicator
  bktScore: number;      // running score 0-100
  bktAttempts: number;   // total questions answered

  // Engagement signals
  engagedSubtopics: string[];
  completedCycles: number;
  expectedCycles: number;
  demosViewed: string[];
  demosAvailable: number;

  lastActivity: number;
}

// Composite mastery: BKT/ELO handles quiz quality; other signals track engagement
function computeMastery(p: TopicProgress): number {
  const coverage = p.expectedCycles > 0
    ? Math.min(p.engagedSubtopics.length / p.expectedCycles, 1)
    : 0;

  const depth = p.expectedCycles > 0
    ? Math.min(p.completedCycles / p.expectedCycles, 1)
    : 0;

  const demoEng = p.demosAvailable > 0
    ? Math.min(p.demosViewed.length / p.demosAvailable, 1)
    : 0;

  const hasQuiz = p.bktAttempts > 0;
  const quizNorm = p.bktScore / 100; // BKT score already 0-100

  let mastery: number;
  if (hasQuiz) {
    mastery = 0.25 * quizNorm + 0.30 * coverage + 0.30 * depth + 0.15 * demoEng;
  } else {
    mastery = 0.40 * coverage + 0.40 * depth + 0.20 * demoEng;
  }

  return Math.round(Math.min(mastery, 1) * 100);
}

// ── Store ────────────────────────────────────────────────────────────────────

interface ProgressState {
  progress: Record<string, TopicProgress>;

  initTopic: (topicId: string, classLevel: string, subtopicCount: number, demosAvailable: number) => void;
  markSubtopicEngaged: (topicId: string, subtopicId: string) => void;
  recordQuizAttempts: (topicId: string, attempts: QuizAttempt[]) => void;
  incrementCycle: (topicId: string) => void;
  markDemoViewed: (topicId: string, subtopicIdOrUrl: string) => void;

  getMastery: (topicId: string) => number;
  getMasteryLevel: (topicId: string) => MasteryLevel;
  getBktScore: (topicId: string) => number;
  getChapterMastery: (chapterId: string, classLevel: string) => number;
  getSubjectMastery: (subjectId: string, classLevel: string) => number;
}

function emptyTopic(topicId: string, classLevel = "9th"): TopicProgress {
  return {
    topicId,
    classLevel,
    bktScore: STARTING_SCORE,
    bktAttempts: 0,
    engagedSubtopics: [],
    completedCycles: 0,
    expectedCycles: 1,
    demosViewed: [],
    demosAvailable: 0,
    lastActivity: Date.now(),
  };
}

function ensureTopic(state: ProgressState, topicId: string): TopicProgress {
  return state.progress[topicId] ?? emptyTopic(topicId);
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: {},

  initTopic: (topicId, classLevel, subtopicCount, demosAvailable) => {
    const state = get();
    if (state.progress[topicId]) return;
    set({
      progress: {
        ...state.progress,
        [topicId]: {
          ...emptyTopic(topicId, classLevel),
          expectedCycles: Math.max(subtopicCount, 1),
          demosAvailable,
        },
      },
    });
  },

  markSubtopicEngaged: (topicId, subtopicId) => {
    const state = get();
    const p = ensureTopic(state, topicId);
    if (p.engagedSubtopics.includes(subtopicId)) return;
    set({
      progress: {
        ...state.progress,
        [topicId]: {
          ...p,
          engagedSubtopics: [...p.engagedSubtopics, subtopicId],
          lastActivity: Date.now(),
        },
      },
    });
  },

  /**
   * Apply per-question quiz results using BKT+ELO formula.
   * Each question updates the running bktScore based on difficulty and correctness.
   */
  recordQuizAttempts: (topicId, attempts) => {
    if (attempts.length === 0) return;
    const state = get();
    const p = ensureTopic(state, topicId);

    let score    = p.bktScore;
    let totalAtt = p.bktAttempts;

    for (const attempt of attempts) {
      const { newScore } = updateIndicator(
        score,
        totalAtt,
        attempt.difficulty,
        attempt.correct,
        attempt.skipped ?? false,
      );
      score = newScore;
      totalAtt++;
    }

    set({
      progress: {
        ...state.progress,
        [topicId]: {
          ...p,
          bktScore: Math.round(score * 100) / 100,
          bktAttempts: totalAtt,
          lastActivity: Date.now(),
        },
      },
    });
  },

  incrementCycle: (topicId) => {
    const state = get();
    const p = ensureTopic(state, topicId);
    set({
      progress: {
        ...state.progress,
        [topicId]: {
          ...p,
          completedCycles: Math.min(p.completedCycles + 1, p.expectedCycles),
          lastActivity: Date.now(),
        },
      },
    });
  },

  markDemoViewed: (topicId, subtopicIdOrUrl) => {
    const state = get();
    const p = ensureTopic(state, topicId);
    if (p.demosViewed.includes(subtopicIdOrUrl)) return;
    set({
      progress: {
        ...state.progress,
        [topicId]: {
          ...p,
          demosViewed: [...p.demosViewed, subtopicIdOrUrl],
          lastActivity: Date.now(),
        },
      },
    });
  },

  getMastery: (topicId) => {
    const p = get().progress[topicId];
    if (!p) return 0;
    return computeMastery(p);
  },

  getMasteryLevel: (topicId) => {
    const p = get().progress[topicId];
    return getMasteryLevel(p ? computeMastery(p) : 0);
  },

  getBktScore: (topicId) => {
    return get().progress[topicId]?.bktScore ?? 0;
  },

  getChapterMastery: (chapterId, classLevel) => {
    const subjects = getCurriculum(classLevel);
    const state = get();
    for (const subj of subjects) {
      for (const ch of subj.chapters) {
        if (ch.id === chapterId) {
          if (ch.topics.length === 0) return 0;
          const total = ch.topics.reduce((sum, t) => {
            const p = state.progress[t.id];
            return sum + (p ? computeMastery(p) : 0);
          }, 0);
          return Math.round(total / ch.topics.length);
        }
      }
    }
    return 0;
  },

  getSubjectMastery: (subjectId, classLevel) => {
    const subjects = getCurriculum(classLevel);
    const state = get();
    const subj = subjects.find((s) => s.id === subjectId);
    if (!subj) return 0;

    let topicCount = 0;
    let totalMastery = 0;
    for (const ch of subj.chapters) {
      for (const t of ch.topics) {
        topicCount++;
        const p = state.progress[t.id];
        totalMastery += p ? computeMastery(p) : 0;
      }
    }
    return topicCount > 0 ? Math.round(totalMastery / topicCount) : 0;
  },
}));
