import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function masteryColor(mastery: number): string {
  if (mastery >= 80) return "#22c55e";
  if (mastery >= 60) return "#3b82f6";
  if (mastery >= 40) return "#f59e0b";
  if (mastery >= 20) return "#f97316";
  return "#ef4444";
}

export function masteryLabel(mastery: number): string {
  if (mastery >= 80) return "Strong";
  if (mastery >= 60) return "Proficient";
  if (mastery >= 40) return "Developing";
  if (mastery >= 20) return "Beginner";
  return "Not Started";
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
