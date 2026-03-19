export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: string;
  chapters: Chapter[];
  overallMastery: number;
}

export interface Chapter {
  id: string;
  name: string;
  chapterNumber: number;
  concepts: Concept[];
  estimatedTimeMinutes: number;
  summary: string;
}

export interface Concept {
  id: string;
  name: string;
  ncertSection: string;
  chapterId: string;
  difficulty: "basic" | "intermediate" | "advanced";
  keyFormulas: string[];
  keyTerms: string[];
  summary: string;
  contentMd: string;
  revisionSummary: string;
  flashcards: Flashcard[];
  mastery: number;
  attempts: number;
  estimatedTimeMinutes: number;
  imageDir?: string;
}

export interface Flashcard {
  front: MultiLang;
  back: MultiLang;
}

export interface MultiLang {
  en: string;
  hi?: string;
  as?: string;
}

export interface Exercise {
  id: string;
  conceptId: string;
  type: "in_text_question" | "example" | "chapter_exercise";
  questionText: string;
  answerHint: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctOption: string;
  linkedIndicator: string;
  conceptId: string;
  difficulty: "easy" | "medium" | "hard";
  explanation: string;
  isPrerequisite: boolean;
}

export interface MasteryEntry {
  indicatorId: string;
  mastery: number;
  attempts: number;
}

export type CanvasAction =
  | { type: "welcome"; data: { subjects: SubjectSummary[] } }
  | { type: "content"; data: { conceptId: string; concept: Concept; images?: string[] } }
  | { type: "quiz"; data: { questions: QuizQuestion[]; conceptName: string; conceptId: string } }
  | { type: "flashcards"; data: { cards: Flashcard[]; conceptName: string; lang: string } }
  | { type: "mastery"; data: { subjects: SubjectSummary[] } }
  | { type: "demo"; data: { url: string; title: string; sectionIndex?: number } }
  | { type: "generated_demo"; data: { html: string; title: string } }
  | { type: "exercise"; data: { exercise: Exercise; concept: Concept } }
  | { type: "quiz_result"; data: { score: number; total: number; results: QuizResultItem[]; conceptName: string } }
  | { type: "topic_list"; data: { subjectName: string; subjectIcon: string; color: string; chapters: { name: string; mastery: number; conceptCount: number }[] } };

export interface QuizResultItem {
  questionId: number;
  correct: boolean;
  selectedOption: string;
  correctOption: string;
  explanation: string;
}

export interface SubjectSummary {
  id: string;
  name: string;
  color: string;
  icon: string;
  mastery: number;
  totalConcepts: number;
  completedConcepts: number;
  chapters: { name: string; mastery: number; conceptCount: number }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  canvasAction?: CanvasAction;
  isStreaming?: boolean;
}

export interface StudentProfile {
  name: string;
  grade: number;
  lastActive: Date;
  totalStudyMinutes: number;
  streakDays: number;
  weakAreas: string[];
  strongAreas: string[];
}
