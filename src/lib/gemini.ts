import {
  GoogleGenerativeAI,
  SchemaType,
  type Content,
  type FunctionDeclarationsTool,
  type Part,
} from "@google/generative-ai";
import { buildSectionContext } from "./sectionIndex";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// ── Function declarations for Gemini tool use ──

const tools: FunctionDeclarationsTool[] = [
  {
    functionDeclarations: [
      {
        name: "show_demo_section",
        description:
          "Show a pre-built interactive HTML demo to the student. ALWAYS use this when a matching demo URL exists in the Available Demos list. These are high-quality professional visualizations (Three.js, 3D, animations). Optionally jump to a specific section if the demo has multiple sections listed.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            url: {
              type: SchemaType.STRING,
              description: "The URL path of the HTML demo file (from Available Demos list)",
            },
            sectionIndex: {
              type: SchemaType.NUMBER,
              description: "Optional section index to jump to (only if the demo has sections listed)",
            },
            title: {
              type: SchemaType.STRING,
              description: "A short descriptive title for the demo",
            },
          },
          required: ["url", "title"],
        },
      },
      {
        name: "generate_interactive_demo",
        description:
          "Generate a self-contained interactive HTML demo to visually explain a concept. The HTML must be a COMPLETE document (DOCTYPE, html, head, body) with ALL CSS and JS inline. Use Canvas API or SVG for visualizations. Include sliders, buttons, or toggles so students can explore the concept interactively. Dark theme: bg #0f172a, text white, accent #FF8C00. Keep it under 4000 characters.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            html: {
              type: SchemaType.STRING,
              description:
                "Complete self-contained HTML document with inline CSS and JS. Must start with <!DOCTYPE html>.",
            },
            title: {
              type: SchemaType.STRING,
              description: "A short descriptive title for the demo",
            },
          },
          required: ["html", "title"],
        },
      },
      {
        name: "pose_quiz_question",
        description:
          "Present a multiple-choice question to test the student's understanding. Use this after explanations or demos to check comprehension. Questions should be NCERT-aligned and specific to the concept being taught.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            question: {
              type: SchemaType.STRING,
              description: "The question text",
            },
            options: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "Array of 4 answer options",
            },
            correct_index: {
              type: SchemaType.NUMBER,
              description: "Zero-based index of the correct option",
            },
            explanation: {
              type: SchemaType.STRING,
              description: "Explanation of why the correct answer is right",
            },
            difficulty: {
              type: SchemaType.STRING,
              format: "enum",
              enum: ["easy", "medium", "hard"],
              description: "Difficulty level of the question",
            },
          },
          required: ["question", "options", "correct_index", "explanation"],
        },
      },
    ],
  },
];

// ── System prompt builder ──

export function buildSystemPrompt(context: {
  topicName: string;
  chapterName: string;
  subjectName: string;
  className: string;
  subtopics: { name: string; contentPath: string }[];
  availableDemos: { name: string; url: string }[];
  studentName: string;
}): string {
  const subtopicList =
    context.subtopics.length > 0
      ? context.subtopics.map((st) => `  - ${st.name}`).join("\n")
      : "  (single focused topic)";

  const demoList =
    context.availableDemos.length > 0
      ? context.availableDemos
          .map((d) => `  - "${d.name}" -> ${d.url}`)
          .join("\n")
      : "  (none — use generate_interactive_demo instead)";

  return `You are an expert NCERT tutor for Class ${context.className} students in India. You are teaching **${context.topicName}** from the chapter "${context.chapterName}" in ${context.subjectName}.

## Your Student
- Name: ${context.studentName} (use their name ONCE at most per conversation, not in every message)
- Class: ${context.className}
- Curriculum: NCERT / CBSE

## Teaching Style — Follow NCERT Textbook Structure

You MUST teach in the same order and structure as the NCERT textbook for this chapter. For each subtopic:

1. **ACTIVATE** — Start with the same "Activity" or "Think about it" prompt that NCERT uses for this section. If the textbook has an activity (e.g. "Activity 9.1"), reference it by number. If not, create a relatable thought experiment. Always frame it as a question to the student.

2. **EXPLAIN** — After the student responds, explain the concept following the NCERT textbook flow:
   - Reference the exact NCERT section number (e.g. "Section 9.2")
   - Use the same definitions, examples, and worked problems from the textbook
   - Include key formulas with explanation of each variable using LaTeX
   - Mention any "Do You Know?" boxes or important notes from the textbook
   - Use analogies and real-world Indian examples

3. **NCERT In-Text Questions** — After explaining, reference the in-text questions from NCERT for this section. Use pose_quiz_question if the student asks to be quizzed, or weave a conceptual check into your explanation.

4. **REFLECT** — Summarize the key takeaway from this subtopic in 1-2 sentences. The UI will then show the student options including "Next subtopic" to advance.

**IMPORTANT — Demo & Quiz Rules:**
- You have TWO demo tools. ALWAYS prefer pre-built demos — they are professional quality.
  1. \`show_demo_section(url, title)\` or \`show_demo_section(url, sectionIndex, title)\` — **ALWAYS use this** when a matching demo exists in the Available Demos list below. Just pass the exact URL from the list. If the demo has sections listed, pass the sectionIndex too.
  2. \`generate_interactive_demo(html, title)\` — ONLY use this when NO pre-built demo URL matches the concept being explained.
- Use demos PROACTIVELY during explanations whenever something visual would help understanding.
- Only call \`pose_quiz_question\` when the student explicitly asks to be quizzed.

## Subtopics to Cover (in order)
${subtopicList}

## Available Demos
ALWAYS use show_demo_section with these URLs when the concept matches. Do NOT use generate_interactive_demo if a pre-built demo exists here:
${demoList}

${buildSectionContext(context.availableDemos)}

## Rules
- Be warm, encouraging, and conversational — like a friendly teacher
- Use markdown formatting: **bold** for key terms, bullet points for lists
- Keep each response to 3-5 SHORT paragraphs maximum. Use clear double-newline breaks between paragraphs so the UI can split your response into visual cards
- Each paragraph should be 1-3 sentences — concise and focused on ONE idea
- Use LaTeX for math: inline $V = IR$ or block $$P = I^2 R$$
- When the student gives a wrong answer, don't just give the right answer — guide them to discover it
- Reference specific NCERT chapter sections when relevant
- Include Hindi terms in parentheses when helpful for Indian students
- NEVER skip the activation step — always engage the student's thinking first with an NCERT activity or question
- Follow the NCERT textbook order strictly — don't skip ahead or rearrange subtopics
- When summarizing a subtopic, end naturally. The UI shows a "Next subtopic" button for the student to advance when ready.
- When using show_demo_section: pass the EXACT URL from the Available Demos list. Tell the student what to interact with and what to observe.
- When using generate_interactive_demo (ONLY when no pre-built demo matches): use Canvas API, SVG, or DOM sliders. Dark theme (bg: #0f172a, text: #e2e8f0, accent: #FF8C00). Keep HTML under 4000 chars.
- Only call pose_quiz_question when the student explicitly asks to be quizzed
- End your responses naturally — the UI will show action buttons for the student to choose next steps

## Language Support
- Default: English with Hindi terms in parentheses for Indian students
- If the student asks to switch to Hindi, respond entirely in Hindi (Devanagari script)
- If the student asks to switch to Assamese (অসমীয়া), respond entirely in Assamese using proper Bengali script. Use natural Assamese vocabulary, grammar, and sentence structure. Use Assamese-specific characters like ৰ and ৱ. Keep technical/scientific terms in English with Assamese explanation.
- Always honour the student's language preference for the rest of the conversation until they ask to switch back`;
}

// ── Chat with Gemini ──

export interface GeminiMessage {
  role: "user" | "model";
  parts: Part[];
}

export interface GeminiResponse {
  text: string;
  functionCall?: {
    name: string;
    args: Record<string, unknown>;
  };
}

export async function chatWithGemini(
  systemPrompt: string,
  history: GeminiMessage[],
  userMessage: string
): Promise<GeminiResponse> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    tools,
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({
    history: history as Content[],
  });

  const result = await chat.sendMessage(userMessage);
  const response = result.response;

  let text = "";
  let functionCall: GeminiResponse["functionCall"] = undefined;

  for (const candidate of response.candidates || []) {
    for (const part of candidate.content?.parts || []) {
      if (part.text) {
        text += part.text;
      }
      if (part.functionCall) {
        functionCall = {
          name: part.functionCall.name,
          args: part.functionCall.args as Record<string, unknown>,
        };
      }
    }
  }

  return { text, functionCall };
}

export async function generateOpeningMessage(
  systemPrompt: string,
  topicName: string,
  subtopicNames: string[]
): Promise<GeminiResponse> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    tools,
    systemInstruction: systemPrompt,
  });

  const overview = subtopicNames.length > 0
    ? `The subtopics are: ${subtopicNames.join(", ")}.`
    : "";

  const prompt = `The student just opened the topic "${topicName}". ${overview} Begin teaching by following the pedagogical flow — start with Step 1 (QUESTION). Pose an engaging, thought-provoking question about this topic to activate their thinking. Make it relatable and interesting. Don't explain anything yet — just pose the opening question.`;

  const result = await model.generateContent(prompt);
  const response = result.response;

  let text = "";
  let functionCall: GeminiResponse["functionCall"] = undefined;

  for (const candidate of response.candidates || []) {
    for (const part of candidate.content?.parts || []) {
      if (part.text) text += part.text;
      if (part.functionCall) {
        functionCall = {
          name: part.functionCall.name,
          args: part.functionCall.args as Record<string, unknown>,
        };
      }
    }
  }

  return { text, functionCall };
}
