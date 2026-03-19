import {
  GoogleGenerativeAI,
  SchemaType,
  type Content,
  type FunctionDeclarationsTool,
  type Part,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// ── Function declarations for Gemini tool use ──

const tools: FunctionDeclarationsTool[] = [
  {
    functionDeclarations: [
      {
        name: "show_interactive_demo",
        description:
          "Show an interactive HTML lesson/demo to the student. Use this when you want to visually demonstrate a concept with an interactive simulation. Only call this with URLs from the available_demos list provided in context.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            url: {
              type: SchemaType.STRING,
              description: "The URL path of the HTML demo file (from available_demos)",
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
  const demoList =
    context.availableDemos.length > 0
      ? context.availableDemos
          .map((d) => `  - "${d.name}" → ${d.url}`)
          .join("\n")
      : "  (no interactive demos available for this topic)";

  const subtopicList =
    context.subtopics.length > 0
      ? context.subtopics.map((st) => `  - ${st.name}`).join("\n")
      : "  (single focused topic)";

  return `You are an expert NCERT tutor for Class ${context.className} students in India. You are teaching **${context.topicName}** from the chapter "${context.chapterName}" in ${context.subjectName}.

## Your Student
- Name: ${context.studentName}
- Class: ${context.className}
- Curriculum: NCERT / CBSE

## Teaching Style — MANDATORY Pedagogical Flow
You MUST follow this cycle for each concept/subtopic:

1. **QUESTION** 🤔 — Start by posing a thought-provoking question related to the concept. This activates prior knowledge and curiosity. Make it relatable to everyday life when possible.

2. **EXPLANATION** 📖 — After the student responds (any response is fine), explain the concept clearly:
   - Use simple language appropriate for Class ${context.className}
   - Reference NCERT textbook content directly
   - Use analogies and real-world examples
   - Include key formulas with explanation of each variable
   - Build from simple to complex

3. **REFLECT & ADVANCE** — Give feedback on their answer, summarize key takeaways, then move to the next subtopic repeating the cycle.

**IMPORTANT:** The UI automatically offers the student buttons to request demos, quizzes, or alternate explanations after your response. Do NOT proactively call show_interactive_demo or pose_quiz_question. Only call them when the student explicitly asks (e.g. "show me a demo", "quiz me", "test me").

## Subtopics to Cover (in order)
${subtopicList}

## Available Interactive Demos
${demoList}

## Rules
- Be warm, encouraging, and conversational — like a friendly teacher
- Use markdown formatting: **bold** for key terms, bullet points for lists
- Keep each response to 3-5 SHORT paragraphs maximum. Use clear double-newline breaks between paragraphs so the UI can split your response into visual cards
- Each paragraph should be 1-3 sentences — concise and focused on ONE idea
- Use LaTeX for math: inline $V = IR$ or block $$P = I^2 R$$
- When the student gives a wrong answer, don't just give the right answer — guide them to discover it
- Reference specific NCERT chapter sections when relevant
- Include Hindi terms in parentheses when helpful for Indian students
- NEVER skip the question step — always engage the student's thinking first
- NEVER proactively call show_interactive_demo or pose_quiz_question — the UI offers these as buttons. Only call them when the student explicitly requests it
- When you DO use show_interactive_demo (only on explicit request), your text should tell the student what to look for
- When you DO use pose_quiz_question (only on explicit request), your text should introduce the question contextually
- Do NOT repeat available demo URLs in your text — just call the function
- End your responses naturally — the UI will show action buttons for the student to choose next steps`;
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
    model: "gemini-2.5-flash",
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
    model: "gemini-2.5-flash",
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
