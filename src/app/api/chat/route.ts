import { NextRequest, NextResponse } from "next/server";
import {
  buildSystemPrompt,
  chatWithGemini,
  generateOpeningMessage,
  type GeminiMessage,
} from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      message,
      history,
      topicContext,
      isOpening,
    }: {
      message: string;
      history: { role: "user" | "assistant"; content: string }[];
      topicContext: {
        topicName: string;
        chapterName: string;
        subjectName: string;
        className: string;
        subtopics: { name: string; contentPath: string }[];
        availableDemos: { name: string; url: string }[];
        studentName: string;
      };
      isOpening?: boolean;
    } = body;

    const systemPrompt = buildSystemPrompt(topicContext);

    if (isOpening) {
      const subtopicNames = topicContext.subtopics.map((st) => st.name);
      const result = await generateOpeningMessage(
        systemPrompt,
        topicContext.topicName,
        subtopicNames
      );

      return NextResponse.json({
        text: result.text,
        action: result.functionCall
          ? mapFunctionCallToAction(result.functionCall, topicContext.topicName)
          : undefined,
      });
    }

    let adjustedHistory = [...history];
    if (adjustedHistory.length > 0 && adjustedHistory[0].role === "assistant") {
      adjustedHistory = [
        { role: "user" as const, content: `I want to learn about ${topicContext.topicName}. Let's begin!` },
        ...adjustedHistory,
      ];
    }

    const geminiHistory: GeminiMessage[] = adjustedHistory.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const result = await chatWithGemini(systemPrompt, geminiHistory, message);

    return NextResponse.json({
      text: result.text,
      action: result.functionCall
        ? mapFunctionCallToAction(result.functionCall, topicContext.topicName)
        : undefined,
    });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to get AI response", details: errMsg },
      { status: 500 }
    );
  }
}

function mapFunctionCallToAction(
  fc: { name: string; args: Record<string, unknown> },
  topicName: string
) {
  switch (fc.name) {
    case "show_interactive_demo":
      return {
        type: "demo" as const,
        data: {
          url: fc.args.url as string,
          title: (fc.args.title as string) || topicName,
        },
      };

    case "pose_quiz_question": {
      const options = fc.args.options as string[];
      const correctIndex = fc.args.correct_index as number;
      return {
        type: "quiz" as const,
        data: {
          questions: [
            {
              id: 1,
              question: fc.args.question as string,
              options,
              correctOption: options[correctIndex] || options[0],
              linkedIndicator: "gemini_q",
              conceptId: topicName,
              difficulty: (fc.args.difficulty as string) || "medium",
              explanation: fc.args.explanation as string,
              isPrerequisite: false,
            },
          ],
          conceptName: topicName,
          conceptId: topicName,
        },
      };
    }

    default:
      return undefined;
  }
}
