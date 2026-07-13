import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { orChat, orVision, hasOpenRouterKey } from "@/lib/zoe/openrouter";

/**
 * POST /api/zoe/analyze
 *
 * Evaluates a learner's submission and returns structured feedback.
 * Routes each modality to the best-suited model:
 *   • audio        → Gemini 2.5 Flash (native audio understanding)
 *   • image/sketch → Claude Sonnet 4.6 vision (via OpenRouter)
 *   • performance  → Claude Sonnet 4.6 text (grades a structured sandbox submission)
 *
 * Body: {
 *   type: "audio"|"image"|"sketch"|"performance",
 *   data?: base64, mimeType?: string,           // for audio/image/sketch
 *   submission?: unknown, submissionLabel?: string, successCriteria?: string, // for performance
 *   context: string, question: string
 * }
 */

const SYSTEM_PROMPT = `You are ZOE's evaluation engine. You receive a learner's submission (audio, photo, sketch, or a structured action from an interactive sandbox) and evaluate their understanding/skill.

Respond ONLY with valid JSON in this schema:
{
  "transcript": string,   // audio: what they said. image/sketch: brief description. performance: restate what they did. Max 120 chars.
  "feedback": string,     // Warm, direct, 1-3 sentences. Specific about what's right and what's missing.
  "score": number,        // 0-100. Honest but encouraging.
  "tags": [string]        // 2-4 keywords (e.g. "correct-chord", "timing-off", "creative-approach")
}

Tone: warm, direct, never condescending. Celebrate what they got right before noting gaps.`;

interface AnalyzeBody {
  type: "audio" | "image" | "sketch" | "performance";
  data?: string;
  mimeType?: string;
  submission?: unknown;
  submissionLabel?: string;
  successCriteria?: string;
  context: string;
  question: string;
}

export async function POST(req: NextRequest) {
  let body: AnalyzeBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  if (!body.type) {
    return NextResponse.json({ error: "missing type" }, { status: 400 });
  }

  try {
    // ── Performance: grade a structured sandbox submission (text-only reasoning) ──
    if (body.type === "performance") {
      if (!hasOpenRouterKey() && !process.env.GOOGLE_API_KEY) return NextResponse.json(fallbackResult(body.type));
      const user = `Concept: "${body.context}"
Challenge given to the learner: "${body.question}"
Success criteria: "${body.successCriteria ?? "demonstrates understanding of the concept"}"
What the learner did: ${body.submissionLabel ? `"${body.submissionLabel}" — ` : ""}${JSON.stringify(body.submission ?? {})}

Evaluate whether the learner's action meets the success criteria. Provide JSON feedback.`;
      const raw = hasOpenRouterKey()
        ? await orChat({ system: SYSTEM_PROMPT, user, model: "base", temperature: 0.4, json: true })
        : await geminiText(user);
      return NextResponse.json(parseResult(raw, body.type));
    }

    // ── Audio: Gemini native (best at audio) ──
    if (body.type === "audio") {
      if (!body.data || !body.mimeType) return NextResponse.json({ error: "missing audio data" }, { status: 400 });
      if (!process.env.GOOGLE_API_KEY) return NextResponse.json(fallbackResult(body.type));
      const raw = await geminiMultimodal(body, "audio recording");
      return NextResponse.json(parseResult(raw, body.type));
    }

    // ── Image / sketch: Claude vision (fallback to Gemini) ──
    if (body.type === "image" || body.type === "sketch") {
      if (!body.data || !body.mimeType) return NextResponse.json({ error: "missing image data" }, { status: 400 });
      const text = `Concept context: "${body.context}"
Question asked: "${body.question}"
Evaluate the attached ${body.type === "sketch" ? "sketch drawing" : "photo"} and provide your JSON evaluation.`;

      if (hasOpenRouterKey()) {
        const raw = await orVision({
          system: SYSTEM_PROMPT,
          text,
          imageDataUrl: `data:${body.mimeType};base64,${body.data}`,
          json: true,
          maxTokens: 1024,
        });
        return NextResponse.json(parseResult(raw, body.type));
      }
      if (process.env.GOOGLE_API_KEY) {
        const raw = await geminiMultimodal(body, body.type === "sketch" ? "sketch" : "photo");
        return NextResponse.json(parseResult(raw, body.type));
      }
      return NextResponse.json(fallbackResult(body.type));
    }

    return NextResponse.json(fallbackResult(body.type));
  } catch (e) {
    console.error("[analyze] failed:", e);
    return NextResponse.json(fallbackResult(body.type));
  }
}

/* ── Gemini helpers (native multimodal) ─────────────────────────────────── */

async function geminiMultimodal(body: AnalyzeBody, mediaName: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });
  const userText = `Concept context: "${body.context}"
Question asked: "${body.question}"
Evaluate the attached ${mediaName} and provide your JSON evaluation.`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: userText }, { inlineData: { mimeType: body.mimeType!, data: body.data! } }] }],
    config: { systemInstruction: SYSTEM_PROMPT, responseMimeType: "application/json" },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

async function geminiText(user: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: user,
    config: { systemInstruction: SYSTEM_PROMPT, responseMimeType: "application/json" },
  });
  return response.text ?? "";
}

/* ── Result parsing ─────────────────────────────────────────────────────── */

function parseResult(raw: string, type: string) {
  try {
    const cleaned = raw.replace(/^```json?\s*/i, "").replace(/\s*```$/i, "").trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    const json = start !== -1 && end !== -1 ? cleaned.slice(start, end + 1) : cleaned;
    const parsed = JSON.parse(json);
    return {
      transcript: parsed.transcript ?? "",
      feedback: parsed.feedback ?? "Interesting approach! Keep exploring this concept.",
      score: typeof parsed.score === "number" ? Math.max(0, Math.min(100, parsed.score)) : null,
      tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 4) : [],
    };
  } catch {
    return fallbackResult(type);
  }
}

function fallbackResult(type: string) {
  return {
    transcript: "",
    feedback: type === "audio"
      ? "Great effort explaining this! Keep practicing to build fluency."
      : type === "sketch"
      ? "Nice sketch — your diagram shows engagement with the concept. Try adding labels next time."
      : type === "performance"
      ? "Good attempt! You're getting the hang of it — keep refining."
      : "Good visual thinking! A photo can tell a lot about how you understand a concept.",
    score: 65,
    tags: ["engaged", "in-progress"],
  };
}
