export type ChunkType = "question" | "explanation" | "keypoints" | "formula" | "hint" | "text";

export interface ContentCard {
  id: string;
  type: ChunkType;
  content: string;
}

function classifyChunk(text: string): ChunkType {
  const lower = text.toLowerCase();
  if (
    lower.includes("🤔") ||
    lower.includes("think about") ||
    lower.includes("what do you") ||
    lower.includes("can you guess") ||
    lower.includes("why do you think")
  )
    return "question";
  if (
    lower.startsWith("- ") ||
    lower.startsWith("• ") ||
    (lower.match(/^[-•]\s/gm) || []).length >= 2
  )
    return "keypoints";
  if (text.includes("$$") || (text.match(/\$[^$]+\$/g) || []).length >= 2)
    return "formula";
  if (lower.includes("hint") || lower.includes("💡") || lower.includes("tip"))
    return "hint";
  return "text";
}

let cardSeq = 0;

export function splitIntoCards(markdown: string): ContentCard[] {
  if (!markdown || markdown.length < 30) {
    return [{ id: `c-${++cardSeq}`, type: "text", content: markdown }];
  }

  const rawBlocks = markdown
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  if (rawBlocks.length <= 1) {
    return [{ id: `c-${++cardSeq}`, type: classifyChunk(markdown), content: markdown }];
  }

  const cards: ContentCard[] = [];
  let accumulator = "";

  for (const block of rawBlocks) {
    const type = classifyChunk(block);

    if (type !== "text" || block.startsWith("#")) {
      if (accumulator) {
        cards.push({ id: `c-${++cardSeq}`, type: classifyChunk(accumulator), content: accumulator });
        accumulator = "";
      }
      cards.push({ id: `c-${++cardSeq}`, type, content: block });
      continue;
    }

    accumulator += (accumulator ? "\n\n" : "") + block;
    if (accumulator.length > 300) {
      cards.push({ id: `c-${++cardSeq}`, type: "text", content: accumulator });
      accumulator = "";
    }
  }
  if (accumulator) {
    cards.push({ id: `c-${++cardSeq}`, type: classifyChunk(accumulator), content: accumulator });
  }

  return cards;
}
