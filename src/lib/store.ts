import { create } from "zustand";
import { ChatMessage, CanvasAction } from "./types";
import { generateId } from "./utils";
import {
  findTopic,
  getTopicContentPaths,
  type CurriculumSubject,
  type CurriculumChapter,
  type CurriculumTopic,
} from "./curriculum";
import { studentProfile } from "./mock-data";
import { getVoiceManager } from "./voiceManager";
import { type ContentCard, splitIntoCards } from "./splitChunks";
import { useProgressStore } from "./progressStore";

export type { ContentCard };

export interface TopicChat {
  topicId: string;
  topicName: string;
  subjectColor: string;
  messages: ChatMessage[];
  isTyping: boolean;
  pendingCards: ContentCard[];
  revealIndex: number;
  allRevealed: boolean;
}

export interface TopicContext {
  subject: CurriculumSubject;
  chapter: CurriculumChapter;
  topic: CurriculumTopic;
}

interface AppState {
  chats: Record<string, TopicChat>;
  activeTopicId: string | null;
  selectedClass: string;
  sidebarOpen: boolean;
  autoSpeak: boolean;

  openTopic: (topicId: string, classLevel?: string) => void;
  sendMessage: (text: string) => void;
  resetActiveChat: () => void;
  closeTopic: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSelectedClass: (cls: string) => void;
  setAutoSpeak: (on: boolean) => void;
  advanceCard: () => void;
  sendQuickAction: (action: string) => void;

  getActiveChat: () => TopicChat | null;
  getActiveContext: () => TopicContext | null;
}

function buildTopicPayload(
  topic: CurriculumTopic,
  chapter: CurriculumChapter,
  subject: CurriculumSubject,
  classLevel: string
) {
  const subtopics = (topic.subtopics || []).map((st) => ({
    name: st.name,
    contentPath: st.contentPath,
  }));

  const availableDemos: { name: string; url: string }[] = [];
  if (topic.contentPath) {
    availableDemos.push({ name: topic.name, url: topic.contentPath });
  }
  for (const st of topic.subtopics || []) {
    if (st.contentPath) {
      availableDemos.push({ name: st.name, url: st.contentPath });
    }
  }

  return {
    topicName: topic.name,
    chapterName: chapter.name,
    subjectName: subject.name,
    className: classLevel,
    subtopics,
    availableDemos,
    studentName: studentProfile.name,
  };
}

function makeMsg(
  role: "user" | "assistant",
  content: string,
  canvasAction?: CanvasAction
): ChatMessage {
  return { id: generateId(), role, content, timestamp: new Date(), canvasAction };
}

async function callGemini(
  message: string,
  history: ChatMessage[],
  topicContext: ReturnType<typeof buildTopicPayload>,
  isOpening = false
): Promise<{ text: string; action?: CanvasAction }> {
  const apiHistory = history
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role, content: m.content }));

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      history: apiHistory,
      topicContext,
      isOpening,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "API call failed");
  }

  return res.json();
}

function applyCards(chat: TopicChat, text: string, action?: CanvasAction, msgs?: ChatMessage[]): Partial<TopicChat> {
  const cards = splitIntoCards(text);
  // Prime only first 2 cards — pipeline fetches the rest as they're needed
  try {
    const vm = getVoiceManager();
    vm.clearPipeline();
    vm.prime(cards[0]?.content ?? "", cards[1]?.content);
  } catch { /* SSR guard */ }
  return {
    messages: msgs ?? [...chat.messages, makeMsg("assistant", text, action)],
    isTyping: false,
    pendingCards: cards,
    revealIndex: 0,
    allRevealed: false,
  };
}

export const useAppStore = create<AppState>((set, get) => ({
  chats: {},
  activeTopicId: null,
  selectedClass: "9th",
  sidebarOpen: true,
  autoSpeak: true,

  openTopic: (topicId: string, classLevel?: string) => {
    const state = get();
    const cls = classLevel || state.selectedClass;
    const result = findTopic(topicId, cls);
    if (!result) return;

    const { subject, chapter, topic } = result;

    if (state.chats[topicId]) {
      set({ activeTopicId: topicId });
      return;
    }

    // Init progress tracking for this topic
    const subtopicCount = (topic.subtopics || []).length || 1;
    const demosAvailable = (topic.subtopics || []).filter((s) => s.contentPath).length
      + (topic.contentPath ? 1 : 0);
    useProgressStore.getState().initTopic(topicId, cls, subtopicCount, demosAvailable);

    const loadingMsg = makeMsg("assistant", `Loading **${topic.name}**...`);
    loadingMsg.isStreaming = true;

    set({
      activeTopicId: topicId,
      chats: {
        ...state.chats,
        [topicId]: {
          topicId,
          topicName: topic.name,
          subjectColor: subject.color,
          messages: [loadingMsg],
          isTyping: true,
          pendingCards: [],
          revealIndex: 0,
          allRevealed: true,
        },
      },
    });

    const payload = buildTopicPayload(topic, chapter, subject, cls);

    callGemini("", [], payload, true)
      .then(({ text, action }) => {
        const current = get();
        const chat = current.chats[topicId];
        if (!chat) return;

        set({
          chats: {
            ...current.chats,
            [topicId]: {
              ...chat,
              ...applyCards(chat, text, action, [makeMsg("assistant", text, action)]),
            },
          },
        });
      })
      .catch((err) => {
        console.error("Gemini opening error:", err);
        const current = get();
        const chat = current.chats[topicId];
        if (!chat) return;

        const fallback = `## ${topic.name}\n*${chapter.name} • ${subject.name}*\n\nLet's begin!\n\n**Think about this:** What do you already know about ${topic.name.toLowerCase()}? Share your thoughts — there's no wrong answer.`;
        set({
          chats: {
            ...current.chats,
            [topicId]: {
              ...chat,
              ...applyCards(chat, fallback, undefined, [makeMsg("assistant", fallback)]),
            },
          },
        });
      });
  },

  sendMessage: (text: string) => {
    if (!text.trim()) return;
    try { getVoiceManager().stop(); } catch { /* SSR guard */ }
    const state = get();
    const { activeTopicId, chats, selectedClass } = state;
    if (!activeTopicId) return;

    const chat = chats[activeTopicId];
    if (!chat) return;

    const result = findTopic(activeTopicId, selectedClass);
    if (!result) return;

    const userMsg = makeMsg("user", text.trim());
    const updatedMessages = [...chat.messages, userMsg];

    // Signal: subtopic engaged (user sent a message in this topic)
    useProgressStore.getState().markSubtopicEngaged(activeTopicId, activeTopicId);

    set({
      chats: {
        ...chats,
        [activeTopicId]: {
          ...chat,
          messages: updatedMessages,
          isTyping: true,
          pendingCards: [],
          revealIndex: 0,
          allRevealed: true,
        },
      },
    });

    const payload = buildTopicPayload(
      result.topic,
      result.chapter,
      result.subject,
      selectedClass
    );

    callGemini(text, updatedMessages, payload)
      .then(({ text: responseText, action }) => {
        const current = get();
        const currentChat = current.chats[activeTopicId];
        if (!currentChat) return;

        // Signal: cycle completed (AI responded to user's message = Q->A->E)
        const ps = useProgressStore.getState();
        ps.incrementCycle(activeTopicId);

        // Signal: demo viewed if response includes a demo action
        if (action && (action.type === "demo" || action.type === "generated_demo")) {
          ps.markDemoViewed(activeTopicId, action.type === "demo" ? action.data.url : "generated");
        }

        set({
          chats: {
            ...current.chats,
            [activeTopicId]: {
              ...currentChat,
              ...applyCards(currentChat, responseText, action),
            },
          },
        });
      })
      .catch((err) => {
        console.error("Gemini message error:", err);
        const current = get();
        const currentChat = current.chats[activeTopicId];
        if (!currentChat) return;

        const fallback = "Sorry, I had trouble processing that. Could you try again?";
        set({
          chats: {
            ...current.chats,
            [activeTopicId]: {
              ...currentChat,
              ...applyCards(currentChat, fallback),
            },
          },
        });
      });
  },

  advanceCard: () => {
    const { activeTopicId, chats } = get();
    if (!activeTopicId) return;
    const chat = chats[activeTopicId];
    if (!chat || chat.allRevealed) return;

    const next = chat.revealIndex + 1;
    const done = next >= chat.pendingCards.length;

    set({
      chats: {
        ...chats,
        [activeTopicId]: {
          ...chat,
          revealIndex: next,
          allRevealed: done,
        },
      },
    });
  },

  sendQuickAction: (action: string) => {
    get().sendMessage(action);
  },

  resetActiveChat: () => {
    const state = get();
    const { activeTopicId, chats, selectedClass } = state;
    if (!activeTopicId || !chats[activeTopicId]) return;

    const chat = chats[activeTopicId];
    const result = findTopic(activeTopicId, selectedClass);

    set({
      chats: {
        ...chats,
        [activeTopicId]: {
          ...chat,
          messages: [],
          isTyping: true,
          pendingCards: [],
          revealIndex: 0,
          allRevealed: true,
        },
      },
    });

    if (result) {
      const payload = buildTopicPayload(
        result.topic,
        result.chapter,
        result.subject,
        selectedClass
      );

      callGemini("", [], payload, true)
        .then(({ text, action }) => {
          const current = get();
          const currentChat = current.chats[activeTopicId];
          if (!currentChat) return;

          set({
            chats: {
              ...current.chats,
              [activeTopicId]: {
                ...currentChat,
                ...applyCards(currentChat, text, action, [makeMsg("assistant", text, action)]),
              },
            },
          });
        })
        .catch(() => {
          const current = get();
          const currentChat = current.chats[activeTopicId];
          if (!currentChat) return;

          const fallback = `Fresh start on **${chat.topicName}**! What would you like to explore?`;
          set({
            chats: {
              ...current.chats,
              [activeTopicId]: {
                ...currentChat,
                ...applyCards(currentChat, fallback, undefined, [makeMsg("assistant", fallback)]),
              },
            },
          });
        });
    }
  },

  closeTopic: () => set({ activeTopicId: null }),

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSelectedClass: (cls) => set({ selectedClass: cls }),
  setAutoSpeak: (on) => set({ autoSpeak: on }),

  getActiveChat: () => {
    const { activeTopicId, chats } = get();
    if (!activeTopicId) return null;
    return chats[activeTopicId] || null;
  },

  getActiveContext: () => {
    const { activeTopicId, selectedClass } = get();
    if (!activeTopicId) return null;
    return findTopic(activeTopicId, selectedClass) || null;
  },
}));
