/**
 * Lesson verifier — the "is everything in place to present?" checker.
 *
 * Runs BEFORE a lesson is sent to the client. It statically inspects each
 * section's generated interactive code for the patterns that cause blank /
 * black screens, and reports actionable issues. The content engine uses this
 * to either (a) auto-repair via a follow-up model call, or (b) drop broken
 * code so the section degrades gracefully to narration + media instead of a
 * black box.
 */

import type { LessonContent, LessonSection } from "./content-types";

export interface CodeIssue {
  severity: "fatal" | "warn";
  code: string;       // machine code, e.g. "ES_MODULE"
  message: string;    // human description (also used to instruct the repair model)
}

export interface SectionVerdict {
  index: number;
  ok: boolean;        // false if any fatal issue
  issues: CodeIssue[];
}

export interface LessonVerdict {
  ok: boolean;
  sections: SectionVerdict[];
  summary: string;
}

/* ── Static code checks ─────────────────────────────────────────────────── */

export function verifyInteractiveCode(code: string): CodeIssue[] {
  const issues: CodeIssue[] = [];
  const c = code.trim();

  if (c.length < 400) {
    issues.push({ severity: "fatal", code: "TOO_SHORT", message: "Code is too short to be a working interactive visual (likely a stub)." });
    return issues; // no point checking further
  }

  // ES module syntax breaks the classic <script> sandbox (THREE won't be global)
  if (/\bimport\s+[\w*{].*\bfrom\s+['"]/.test(c) || /\bexport\s+(default|const|function|class)\b/.test(c)) {
    issues.push({ severity: "fatal", code: "ES_MODULE", message: "Uses ES module import/export. Must use only classic <script> tags so globals like THREE work." });
  }

  // Three.js module build (vs the classic global build)
  if (/three@[\d.]+\/build\/three\.module/.test(c) || /three\.module\.(min\.)?js/.test(c)) {
    issues.push({ severity: "fatal", code: "THREE_MODULE", message: "Loads the Three.js MODULE build. Use the classic global build: https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" });
  }

  // Uses THREE but never loads it
  if (/\bTHREE\./.test(c) && !/three(\.min)?\.js/.test(c) && !/cdnjs.*three/.test(c)) {
    issues.push({ severity: "fatal", code: "THREE_MISSING", message: "References THREE but never includes a Three.js <script> tag." });
  }

  // No script at all → nothing will run
  if (!/<script/i.test(c)) {
    issues.push({ severity: "fatal", code: "NO_SCRIPT", message: "No <script> tag — there is nothing to render." });
  }

  // No canvas and no visible body content → likely blank
  if (!/<canvas/i.test(c) && !/<svg/i.test(c) && !/getElementById|querySelector|createElement|innerHTML/.test(c)) {
    issues.push({ severity: "warn", code: "NO_VISUAL_TARGET", message: "No <canvas>/<svg> and no DOM manipulation — the view may be empty." });
  }

  // Should signal ready (we have a backup, but explicit is better)
  if (!/emit\(\s*['"]ready['"]/.test(c)) {
    issues.push({ severity: "warn", code: "NO_READY", message: "Does not call emit('ready'). Add it at the end of init." });
  }

  // Balanced script tags
  const opens = (c.match(/<script/gi) || []).length;
  const closes = (c.match(/<\/script>/gi) || []).length;
  if (opens !== closes) {
    issues.push({ severity: "fatal", code: "UNBALANCED_SCRIPT", message: `Unbalanced <script> tags (${opens} open, ${closes} close).` });
  }

  // Obvious truncation (model ran out of tokens mid-code)
  if (/[^>}\s;)]$/.test(c) && !/<\/html>\s*$/i.test(c)) {
    issues.push({ severity: "warn", code: "MAYBE_TRUNCATED", message: "Code may be truncated (does not end cleanly with </html> or a statement)." });
  }

  return issues;
}

/* ── Whole-lesson verdict ───────────────────────────────────────────────── */

export function verifyLesson(lesson: LessonContent): LessonVerdict {
  const sections: SectionVerdict[] = lesson.sections.map((s, index) => {
    if (!s.interactiveCode) {
      // No code is fine — section may be media/text only. Verify it has *something*.
      const hasContent = (s.narration?.length ?? 0) > 0 || (s.mediaRefs?.length ?? 0) > 0;
      return {
        index,
        ok: hasContent,
        issues: hasContent ? [] : [{ severity: "fatal" as const, code: "EMPTY_SECTION", message: "Section has no code, media, or narration." }],
      };
    }
    const issues = verifyInteractiveCode(s.interactiveCode);
    return { index, ok: !issues.some((i) => i.severity === "fatal"), issues };
  });

  const ok = sections.every((s) => s.ok);
  const fatalCount = sections.reduce((n, s) => n + s.issues.filter((i) => i.severity === "fatal").length, 0);
  const warnCount = sections.reduce((n, s) => n + s.issues.filter((i) => i.severity === "warn").length, 0);

  return {
    ok,
    sections,
    summary: ok
      ? `All ${sections.length} sections ready${warnCount ? ` (${warnCount} minor note${warnCount !== 1 ? "s" : ""})` : ""}.`
      : `${fatalCount} blocking issue${fatalCount !== 1 ? "s" : ""} across ${sections.filter((s) => !s.ok).length} section(s).`,
  };
}

/** Build a focused instruction for the repair model from a section's issues. */
export function buildRepairInstruction(section: LessonSection, issues: CodeIssue[]): string {
  const fatal = issues.filter((i) => i.severity === "fatal");
  const list = (fatal.length ? fatal : issues).map((i) => `- [${i.code}] ${i.message}`).join("\n");
  return `The interactive code for section "${section.title}" has problems that will cause a blank screen:
${list}

Return ONLY the corrected, complete, self-contained HTML document (<!DOCTYPE html> … </html>).
Keep the same concept and visuals, but fix every issue above. Use ONLY classic <script> tags
(no import/export). If using Three.js, load the classic global build from
https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js and use the global THREE.
End with emit('ready').`;
}
