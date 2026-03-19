import { ChatMessage, CanvasAction } from "./types";
import { findTopic, getTopicContentPaths } from "./curriculum";
import { generateId } from "./utils";

interface OrchestratorResponse {
  message: string;
  canvasAction?: CanvasAction;
}

/**
 * Each topic follows a pedagogical cycle:
 *   1. QUESTION  — pose a thought-provoking question to activate thinking
 *   2. EXPLAIN   — teach the concept step-by-step
 *   3. DEMO      — show the interactive HTML lesson (iframe)
 *   4. EXERCISE  — test understanding with a question
 *   5. REFLECT   — summarise, then advance to the next subtopic or wrap up
 *
 * The step is inferred from conversation history so it works statelessly.
 */
type PedagogicalStep = "question" | "explain" | "demo" | "exercise" | "reflect" | "free";

function inferStep(history: ChatMessage[]): PedagogicalStep {
  const assistantMsgs = history.filter((m) => m.role === "assistant");
  const lastAssistant = assistantMsgs[assistantMsgs.length - 1];
  if (!lastAssistant) return "question";

  const c = lastAssistant.content.toLowerCase();

  if (lastAssistant.canvasAction?.type === "demo") return "exercise";
  if (lastAssistant.canvasAction?.type === "quiz") return "reflect";

  if (c.includes("think about") || c.includes("what do you think") || c.includes("why do you think") || c.includes("can you guess")) return "explain";
  if (c.includes("now let me explain") || c.includes("here's how") || c.includes("the key idea") || c.includes("let me break")) return "demo";
  if (c.includes("interactive") || c.includes("demo")) return "exercise";
  if (c.includes("well done") || c.includes("great job") || c.includes("correct") || c.includes("that's right")) return "reflect";

  return "free";
}

function getSubtopicIndex(history: ChatMessage[], totalSubtopics: number): number {
  let idx = 0;
  for (const msg of history) {
    if (msg.role === "assistant" && msg.content.includes("✅")) {
      idx++;
    }
  }
  return Math.min(idx, totalSubtopics - 1);
}

export function buildOpeningMessage(
  topicName: string,
  chapterName: string,
  subjectName: string,
  subtopicNames: string[]
): string {
  const overview = subtopicNames.length > 0
    ? `We'll cover: ${subtopicNames.slice(0, 4).map((n) => `**${n}**`).join(", ")}${subtopicNames.length > 4 ? ` and ${subtopicNames.length - 4} more` : ""}.`
    : "";

  return `## ${topicName}\n*${chapterName} • ${subjectName}*\n\n${overview}\n\nLet's begin! 🤔\n\n**Think about this:** What do you already know about ${topicName.toLowerCase()}? What comes to mind when you hear this term?\n\nTake a moment and share your thoughts — there's no wrong answer.`;
}

export function processUserMessage(
  userMessage: string,
  conversationHistory: ChatMessage[],
  topicId?: string,
  classLevel?: string
): OrchestratorResponse {
  const msg = userMessage.toLowerCase().trim();
  const topicCtx = topicId && classLevel ? findTopic(topicId, classLevel) : null;
  const contentPaths = topicId && classLevel ? getTopicContentPaths(topicId, classLevel) : [];
  const topicName = topicCtx?.topic.name || "this topic";
  const subtopics = topicCtx?.topic.subtopics || [];
  const step = inferStep(conversationHistory);

  // ── Explicit user overrides (they can always request these) ──
  if (msg.includes("show me") || msg.includes("demo") || msg.includes("interactive") || msg.includes("visual") || msg.includes("simulation")) {
    if (contentPaths.length > 0) {
      const stIdx = getSubtopicIndex(conversationHistory, contentPaths.length);
      const path = contentPaths[Math.min(stIdx, contentPaths.length - 1)];
      const label = subtopics[stIdx]?.name || topicName;
      return {
        message: `Here's the interactive lesson on **${label}**. Explore it — play with the controls, interact with the visuals. When you're done, I'll test you with a question!`,
        canvasAction: { type: "demo", data: { url: path, title: label } },
      };
    }
    return { message: `No interactive demo for **${topicName}** yet. Let me explain it instead.\n\n${buildExplanation(topicName, topicCtx?.chapter.name)}` };
  }

  if (msg.includes("quiz") || msg.includes("test me") || msg.includes("mcq") || msg.includes("exercise")) {
    return buildExerciseResponse(topicName, topicId);
  }

  if (msg.includes("skip") || msg.includes("next") || msg.includes("continue") || msg.includes("move on")) {
    return advanceFlow(conversationHistory, topicName, contentPaths, subtopics, topicId, topicCtx?.chapter.name);
  }

  if (msg.includes("subtopic") || msg.includes("what's covered") || msg.includes("contents") || msg.includes("outline")) {
    if (subtopics.length > 0) {
      const list = subtopics.map((st, i) => `${i + 1}. **${st.name}**`).join("\n");
      return { message: `Here's what we'll cover in **${topicName}**:\n\n${list}\n\nWe'll go through each one with questions, explanations, and demos. Ready to start?` };
    }
    return { message: `**${topicName}** is a focused topic. Let's dive straight in! What would you like to explore?` };
  }

  // ── Pedagogical flow (auto-advance based on inferred step) ──
  switch (step) {
    case "question":
      return { message: `That's a great start! Let me build on that.\n\n${buildExplanation(topicName, topicCtx?.chapter.name)}` };

    case "explain":
      return { message: `Good thinking! 👏\n\nNow let me explain the concept properly.\n\n${buildExplanation(topicName, topicCtx?.chapter.name)}` };

    case "demo":
      if (contentPaths.length > 0) {
        const stIdx = getSubtopicIndex(conversationHistory, contentPaths.length);
        const path = contentPaths[Math.min(stIdx, contentPaths.length - 1)];
        const label = subtopics[stIdx]?.name || topicName;
        return {
          message: `Now let's see this in action! Here's an interactive lesson on **${label}**. Take your time — interact with the 3D visualizations and controls.\n\nWhen you're ready, let me know and I'll test your understanding! 🎯`,
          canvasAction: { type: "demo", data: { url: path, title: label } },
        };
      }
      return buildExerciseResponse(topicName, topicId);

    case "exercise":
      return buildExerciseResponse(topicName, topicId);

    case "reflect":
      return advanceFlow(conversationHistory, topicName, contentPaths, subtopics, topicId, topicCtx?.chapter.name);

    default:
      break;
  }

  // ── General / free conversation ──
  if (msg.includes("explain") || msg.includes("what is") || msg.includes("how does") || msg.includes("tell me") || msg.includes("teach")) {
    return { message: buildExplanation(topicName, topicCtx?.chapter.name) };
  }

  if (msg.includes("thank") || msg.includes("great") || msg.includes("nice") || msg.includes("cool") || msg.includes("ok") || msg.includes("yes") || msg.includes("sure") || msg.includes("ready")) {
    return advanceFlow(conversationHistory, topicName, contentPaths, subtopics, topicId, topicCtx?.chapter.name);
  }

  const hasContent = contentPaths.length > 0;
  return {
    message: `I'm your tutor for **${topicName}**. Here's how I teach:\n\n1. 🤔 I'll ask you a question to get you thinking\n2. 📖 Then explain the concept step-by-step\n3. 🔬 Show you an interactive demo to explore\n4. ✍️ Test you with an exercise\n\n${hasContent ? 'Say **"let\'s start"** to begin, or ask me anything!' : "Ask me anything about this topic!"}`,
  };
}

function buildExplanation(topicName: string, chapterName?: string): string {
  return `**${topicName}** — here's the key idea:\n\nThis is one of the fundamental concepts in ${chapterName || "your curriculum"}. Understanding it requires grasping the core principles and seeing how they connect to real-world applications.\n\nThe key points are:\n- The basic definition and what it means intuitively\n- How it relates to other concepts you've studied\n- Why it matters in practical situations\n\nNow let's see this come alive — I'll show you an **interactive demo** where you can explore the concept visually. Ready?`;
}

function buildExerciseResponse(topicName: string, topicId?: string): OrchestratorResponse {
  return {
    message: `Time to test your understanding! 🎯\n\nHere's a question on **${topicName}**:`,
    canvasAction: {
      type: "quiz",
      data: {
        questions: [
          {
            id: 1,
            question: `Based on what you've learned about ${topicName}, which of the following best describes its core principle?`,
            options: [
              "It involves a direct proportional relationship",
              "It describes an inverse relationship",
              "It is a constant value independent of other factors",
              "It depends on the material properties only",
            ],
            correctOption: "It involves a direct proportional relationship",
            linkedIndicator: "concept_1",
            conceptId: topicId || "unknown",
            difficulty: "medium",
            explanation: `This relates to the fundamental principle of ${topicName}. Understanding the relationships between quantities is key.`,
            isPrerequisite: false,
          },
        ],
        conceptName: topicName,
        conceptId: topicId || "unknown",
      },
    },
  };
}

function advanceFlow(
  history: ChatMessage[],
  topicName: string,
  contentPaths: string[],
  subtopics: { id: string; name: string; contentPath: string }[],
  topicId?: string,
  chapterName?: string
): OrchestratorResponse {
  const stIdx = getSubtopicIndex(history, Math.max(subtopics.length, 1));

  if (subtopics.length > 0 && stIdx < subtopics.length) {
    const current = subtopics[stIdx];
    const isLast = stIdx === subtopics.length - 1;
    const progress = `${stIdx + 1}/${subtopics.length}`;

    return {
      message: `✅ Great progress! (${progress})\n\n---\n\nLet's move on to **${current.name}**.\n\n🤔 **Think about this:** What do you think "${current.name}" involves? How might it connect to what we just covered?\n\nShare your thoughts, or say **"skip"** to jump to the explanation.`,
    };
  }

  if (contentPaths.length > 0) {
    return {
      message: `Now let's see this concept in action. Here's the interactive lesson for **${topicName}**:`,
      canvasAction: {
        type: "demo",
        data: { url: contentPaths[0], title: `${topicName} — Interactive Lesson` },
      },
    };
  }

  return {
    message: `✅ You've worked through **${topicName}**! Great job! 🎉\n\nHere's what you explored:\n- The core concepts and definitions\n- Interactive demonstrations\n- Practice exercises\n\nWould you like to **review** anything, try more **questions**, or move to the next topic?`,
  };
}

export function createAssistantMessage(
  content: string,
  canvasAction?: CanvasAction
): ChatMessage {
  return {
    id: generateId(),
    role: "assistant",
    content,
    timestamp: new Date(),
    canvasAction,
  };
}
