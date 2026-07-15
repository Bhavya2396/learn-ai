/**
 * Interactive test harness for the DISCOVER hat (adaptive MCQ tree).
 *
 * It calls the REAL discover() helper from src/lib/zoe/hats.ts — same prompt,
 * same Gemini 2.5 Flash call (falls back to Claude via OpenRouter if no
 * GOOGLE_API_KEY), same cleanDiscoverNode sanitizer + depth cap. Then it walks
 * the pregenerated tree in the terminal: it prints each question, you pick an
 * option, and it follows the branch until the path ends, then prints the
 * collected Q&A exactly as it would be fed to the Architect.
 *
 * Run:  npx tsx scripts/test-discover.ts
 *   or: npx tsx scripts/test-discover.ts "become a jazz guitarist" craft
 */

import "dotenv/config";
import * as readline from "node:readline";
import { discover } from "../src/lib/zoe/hats";
import type { DiscoverNode, DiscoverOption, QA } from "../src/lib/zoe/hats-types";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q: string): Promise<string> =>
  new Promise((res) => rl.question(q, (a) => res(a.trim())));

// tiny ANSI helpers (no deps)
const c = {
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
};

async function main() {
  const argTitle = process.argv[2];
  const argArea = process.argv[3];

  console.log(c.bold("\n=== DISCOVER — adaptive MCQ tree test ===\n"));
  if (!process.env.GOOGLE_API_KEY) {
    console.log(c.yellow("Note: no GOOGLE_API_KEY set → Gemini 2.5 Flash falls back to Claude via OpenRouter.\n"));
  }

  const title = argTitle || (await ask(c.cyan("What do you want to become? ")));
  const area = argArea || (await ask(c.cyan("Area (career/craft/health/mindset/money/knowledge/...) [craft]: "))) || "craft";

  console.log(c.dim(`\n→ Calling discover() for "${title}" (area: ${area}) ...\n`));
  const t0 = Date.now();
  const { root } = await discover({ hat: "discover", aspiration: { title, area } });
  console.log(c.dim(`← tree generated in ${Date.now() - t0}ms\n`));

  if (!root) {
    console.log(c.yellow("The model returned NO questions (goal already clear enough to plan). root = null."));
    console.log(c.dim("→ In the app this means: skip questions, go straight to the Architect.\n"));
    rl.close();
    return;
  }

  // ── Walk the tree exactly like AddGoal does ──
  const answers: QA[] = [];
  let node: DiscoverNode | null = root;
  let step = 0;

  while (node) {
    step++;
    console.log(c.bold(`\nQ${step}. ${node.question}`));
    node.options.forEach((o: DiscoverOption, i: number) => {
      const leads = o.next ? c.dim("  → has follow-up") : c.dim("  → ends here");
      console.log(`  ${c.cyan(String(i + 1))}) ${o.label}${leads}`);
    });

    let pick = NaN;
    while (Number.isNaN(pick) || pick < 1 || pick > node.options.length) {
      const raw = await ask(c.green(`Pick 1-${node.options.length}: `));
      pick = parseInt(raw, 10);
    }

    const chosen: DiscoverOption = node.options[pick - 1];
    answers.push({ id: node.id, question: node.question, answer: chosen.label });
    node = chosen.next ?? null;
  }

  console.log(c.bold("\n=== Path complete ===\n"));
  console.log(c.dim(`${answers.length} question(s) answered (hard cap is 5).\n`));
  console.log(c.bold("Collected Q&A (this is the `transcript` fed to the Architect):"));
  console.log(JSON.stringify(answers, null, 2));
  console.log();

  rl.close();
}

main().catch((e) => {
  console.error("\nError:", e);
  rl.close();
  process.exit(1);
});
