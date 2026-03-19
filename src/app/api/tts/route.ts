import { NextRequest, NextResponse } from "next/server";

const TTS_MODEL = "gemini-2.5-flash-preview-tts";

// Detect if text is predominantly Hindi (Devanagari script)
function isHindi(text: string): boolean {
  const devanagari = (text.match(/[\u0900-\u097F]/g) || []).length;
  return devanagari / text.length > 0.15;
}

function cleanForSpeech(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/#{1,6}\s+/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/\$\$[\s\S]+?\$\$/g, "formula")
    .replace(/\$[^$\n]+\$/g, "formula")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[_~]/g, "")
    .replace(/^[-*+]\s/gm, "")
    .replace(/^\d+\.\s/gm, "")
    .replace(/\n{2,}/g, ". ")
    .replace(/\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, 3000);
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const cleanText = cleanForSpeech(text);
    if (!cleanText) {
      return NextResponse.json({ error: "Empty text" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "No API key" }, { status: 500 });
    }

    const hindi = isHindi(cleanText);

    // For Hindi: use Kore voice (warm, clear) with an explicit Hindi instruction.
    // For English: use Puck (natural, conversational British-ish).
    const voiceName = hindi ? "Kore" : "Puck";
    const prompt = hindi
      ? `इस पाठ को स्पष्ट और प्राकृतिक हिंदी में बोलें: ${cleanText}`
      : `Say exactly: ${cleanText}`;

    const body = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName } },
        },
      },
    };

    // ── Use streamGenerateContent for lower first-chunk latency ───────────
    const streamRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!streamRes.ok || !streamRes.body) {
      const err = await streamRes.text();
      console.error("Gemini TTS stream error:", err.slice(0, 300));
      return NextResponse.json({ error: "TTS failed", fallback: true }, { status: 502 });
    }

    // ── Parse SSE, extract base64 PCM chunks, stream raw bytes ───────────
    const encoder = new TextEncoder();
    const upstream = streamRes.body;

    const outStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = upstream.getReader();
        const decoder = new TextDecoder();
        let lineBuffer = "";
        let b64Residue = ""; // leftover base64 chars (must be multiples of 4)

        const flush = (b64: string, final = false) => {
          const all = b64Residue + b64;
          const alignedLen = final ? all.length : Math.floor(all.length / 4) * 4;
          if (alignedLen === 0) {
            b64Residue = all;
            return;
          }
          const toDecode = all.slice(0, alignedLen);
          b64Residue = all.slice(alignedLen);

          try {
            const raw = Buffer.from(toDecode, "base64");
            controller.enqueue(new Uint8Array(raw));
          } catch { /* malformed base64 */ }
        };

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            lineBuffer += decoder.decode(value, { stream: true });
            const lines = lineBuffer.split("\n");
            lineBuffer = lines.pop() ?? "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const jsonStr = line.slice(6).trim();
              if (!jsonStr || jsonStr === "[DONE]") continue;

              try {
                const chunk = JSON.parse(jsonStr);
                const parts: Array<{
                  inlineData?: { data: string; mimeType: string };
                }> = chunk.candidates?.[0]?.content?.parts ?? [];

                for (const part of parts) {
                  if (part.inlineData?.data) {
                    flush(part.inlineData.data);
                  }
                }
              } catch { /* parse error — skip chunk */ }
            }
          }

          // Final flush
          if (b64Residue.length > 0) flush("", true);
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(outStream, {
      headers: {
        "Content-Type": "audio/pcm",
        "X-Sample-Rate": "24000",
        "Cache-Control": "no-store",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("TTS route error:", error);
    return NextResponse.json({ error: "Internal error", fallback: true }, { status: 500 });
  }
}
