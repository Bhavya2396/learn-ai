import { ChatMessage, CanvasAction } from "./types";
import {
  subjectSummaries,
  sampleConcept,
  sampleQuiz,
  studentProfile,
} from "./mock-data";
import { generateId } from "./utils";

interface OrchestratorResponse {
  message: string;
  canvasAction?: CanvasAction;
}

function getSubjectSummary(id: string) {
  return subjectSummaries.find((s) => s.id === id);
}

export function processUserMessage(
  userMessage: string,
  conversationHistory: ChatMessage[]
): OrchestratorResponse {
  const msg = userMessage.toLowerCase().trim();
  const userMsgCount = conversationHistory.filter((m) => m.role === "user").length;

  if (userMsgCount === 0 || msg === "hello" || msg === "hi" || msg === "hey") {
    return {
      message: `Hey ${studentProfile.name}! You're on a **${studentProfile.streakDays}-day streak**. Last time we were working on Electricity — your Ohm's Law mastery is at 45%.\n\nPick up where you left off, or choose a subject to explore.`,
      canvasAction: { type: "mastery", data: { subjects: subjectSummaries } },
    };
  }

  // ── Subject routing ──

  if (msg.includes("physics") || msg === "physics") {
    const subject = getSubjectSummary("physics")!;
    return {
      message: `**Physics** — here's where you stand. Magnetic Effects needs the most work (45%). I'd suggest continuing with **Ohm's Law** since you were last working on it.\n\nSay **"start ohm's law"** to begin, or pick any chapter below.`,
      canvasAction: {
        type: "topic_list",
        data: { subjectName: subject.name, subjectIcon: subject.icon, color: subject.color, chapters: subject.chapters },
      },
    };
  }

  if (msg.includes("chemistry") || msg === "chemistry") {
    const subject = getSubjectSummary("chemistry")!;
    return {
      message: `**Chemistry** — you're at 42% overall. Metals & Non-Metals (35%) needs the most attention, followed by Carbon Compounds.\n\nWant to start with a **quick quiz** to test what you know, or dive into a lesson?`,
      canvasAction: {
        type: "topic_list",
        data: { subjectName: subject.name, subjectIcon: subject.icon, color: subject.color, chapters: subject.chapters },
      },
    };
  }

  if (msg.includes("biology") || msg === "biology") {
    const subject = getSubjectSummary("biology")!;
    return {
      message: `**Biology** is your strongest science at 65%! Control & Coordination (60%) has room to grow — tricky MCQs from this chapter appear often in boards.\n\nWant to revise with **flashcards** or start a lesson?`,
      canvasAction: {
        type: "topic_list",
        data: { subjectName: subject.name, subjectIcon: subject.icon, color: subject.color, chapters: subject.chapters },
      },
    };
  }

  if (msg.includes("math") || msg === "mathematics") {
    const subject = getSubjectSummary("mathematics")!;
    return {
      message: `**Mathematics** — Triangles (40%) and Linear Equations (45%) need work. Both are high-weightage in boards.\n\nI have an interactive demo for **Real Numbers** — want to try it, or start with Triangles?`,
      canvasAction: {
        type: "topic_list",
        data: { subjectName: subject.name, subjectIcon: subject.icon, color: subject.color, chapters: subject.chapters },
      },
    };
  }

  if (msg.includes("social") || msg === "social science") {
    const subject = getSubjectSummary("social-science")!;
    return {
      message: `**Social Science** — Power Sharing (42%) and Development (45%) need the most focus. These are frequently asked in boards.\n\nShall I start with Power Sharing notes, or a quick recap?`,
      canvasAction: {
        type: "topic_list",
        data: { subjectName: subject.name, subjectIcon: subject.icon, color: subject.color, chapters: subject.chapters },
      },
    };
  }

  if (msg.includes("hindi") || msg.includes("हिंदी")) {
    const subject = getSubjectSummary("hindi")!;
    return {
      message: `**Hindi** — you're at 60%, Grammar (65%) is your strongest. Here are some flashcards for revision — you can flip between Hindi and English.`,
      canvasAction: {
        type: "flashcards",
        data: { cards: sampleConcept.flashcards, conceptName: "Hindi Grammar — Revision", lang: "hi" },
      },
    };
  }

  // ── Lesson start triggers ──

  if (msg.includes("start ohm") || msg.includes("ohm's law") || msg.includes("ohm")) {
    return {
      message: `Let's start **Ohm's Law**! Here's the core concept — read the summary, and expand for the full lesson with worked examples.`,
      canvasAction: {
        type: "content",
        data: { conceptId: sampleConcept.id, concept: sampleConcept },
      },
    };
  }

  if (msg.includes("start electric") || msg.includes("electricity")) {
    return {
      message: `Here's an interactive lesson on **Electric Current**. Explore the demo — adjust the values and observe how current flows. Tell me when you're ready for a quiz!`,
      canvasAction: {
        type: "demo",
        data: { url: "/lessons/electricity-part1.html", title: "Electric Current — Interactive Lesson" },
      },
    };
  }

  if (msg.includes("real number") || msg.includes("hcf") || msg.includes("lcm")) {
    return {
      message: `Here's an interactive demo on **HCF and LCM using the Fundamental Theorem of Arithmetic**. Try working through the examples!`,
      canvasAction: {
        type: "demo",
        data: { url: "/lessons/real-numbers-hcf-lcm.html", title: "Real Numbers — HCF & LCM" },
      },
    };
  }

  // ── Action triggers ──

  if (msg.includes("quiz") || msg.includes("test me") || msg.includes("mcq")) {
    return {
      message: `Let's test your understanding of **Ohm's Law** — 3 questions, adapted to your level.`,
      canvasAction: {
        type: "quiz",
        data: { questions: sampleQuiz, conceptName: "Ohm's Law", conceptId: sampleConcept.id },
      },
    };
  }

  if (msg.includes("flashcard") || msg.includes("revise") || msg.includes("review") || msg.includes("recap")) {
    return {
      message: `Here are your flashcards for **Ohm's Law** — tap to flip. Switch to Hindi if that helps you remember better.`,
      canvasAction: {
        type: "flashcards",
        data: { cards: sampleConcept.flashcards, conceptName: "Ohm's Law", lang: "en" },
      },
    };
  }

  if (msg.includes("demo") || msg.includes("interactive") || msg.includes("simulation") || msg.includes("show me") || msg.includes("visual")) {
    return {
      message: `Here's the interactive **Ohm's Law demo** — adjust voltage and resistance with the sliders and watch what happens to current. Notice how the V-I graph updates in real-time!`,
      canvasAction: {
        type: "demo",
        data: { url: "/lessons/ohms-law.html", title: "Ohm's Law — Interactive Demo" },
      },
    };
  }

  if (msg.includes("progress") || msg.includes("mastery") || msg.includes("dashboard") || msg.includes("how am i doing")) {
    return {
      message: `Here's your overall progress. Strongest: **Biology (65%)**, weakest: **Chemistry (42%)**. Total study time: **20.6 hours**.`,
      canvasAction: { type: "mastery", data: { subjects: subjectSummaries } },
    };
  }

  // ── Conversational triggers ──

  if (msg.includes("explain") || msg.includes("what is") || msg.includes("how does") || msg.includes("teach me")) {
    return {
      message: `**Ohm's Law** (V = IR) — think of it like water in a pipe:\n\n- **Voltage** = water pressure\n- **Current** = flow rate\n- **Resistance** = how narrow the pipe is\n\nMore pressure → more flow. Narrower pipe → less flow.\n\nExpand the lesson below for worked NCERT examples.`,
      canvasAction: {
        type: "content",
        data: { conceptId: sampleConcept.id, concept: sampleConcept },
      },
    };
  }

  if (msg.includes("weak") || msg.includes("improve") || msg.includes("need help") || msg.includes("difficult")) {
    return {
      message: `Your weakest areas:\n\n1. **Metals & Non-Metals** (Chem) — 35%\n2. **Resistance Factors** (Physics) — 38%\n3. **Triangles** (Maths) — 40%\n4. **Power Sharing** (Soc. Sci.) — 42%\n\nI'd start with **Resistance** — it builds directly on Ohm's Law. Want to begin?`,
      canvasAction: { type: "mastery", data: { subjects: subjectSummaries } },
    };
  }

  if (msg.includes("board") || msg.includes("exam") || msg.includes("important") || msg.includes("prepare")) {
    return {
      message: `**High-weightage topics for CBSE boards:**\n\n- Physics: Electricity numericals **(5 marks)**\n- Chemistry: Carbon Compounds **(5 marks)**\n- Biology: Life Processes **(5 marks)**\n- Maths: Triangles **(5 marks)**\n\nBased on your mastery, focus on **Electricity numericals** and **Carbon Compounds** first.`,
    };
  }

  if (msg.includes("home") || msg.includes("back") || msg.includes("start") || msg.includes("menu")) {
    return {
      message: `Here's your dashboard — pick any subject to continue.`,
      canvasAction: { type: "mastery", data: { subjects: subjectSummaries } },
    };
  }

  if (msg.includes("thank") || msg.includes("good") || msg.includes("nice") || msg.includes("great") || msg.includes("yes")) {
    return {
      message: `Happy to help! Your ${studentProfile.streakDays}-day streak is proof you're putting in the work. What's next — continue the lesson, take a quiz, or switch subjects?`,
    };
  }

  return {
    message: `I can help with that! Here's what I can do:\n\n- **Any subject name** — Jump in\n- **"Test me"** — Adaptive quiz\n- **"Flashcards"** — Quick revision\n- **"Show me a demo"** — Interactive simulation\n- **"My progress"** — See your mastery\n\nOr just ask me anything about your NCERT syllabus!`,
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
