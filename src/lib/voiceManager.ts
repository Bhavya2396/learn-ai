"use client";

/**
 * Global singleton VoiceManager — Web Speech API only.
 *
 * Key technique: sentence-level chained playback.
 * Instead of feeding a whole paragraph as one utterance (which goes monotone),
 * split into individual sentences and speak each as a fresh utterance with a
 * micro-pause. Each sentence gets proper stress, rhythm, and falling/rising
 * intonation — same quality Google Translate uses.
 *
 * Languages auto-detected from script:
 *  - English  (Latin)
 *  - Hindi    (Devanagari \u0900-\u097F)
 *  - Assamese (Bengali script \u0980-\u09FF)
 */

type Lang = "en" | "hi" | "as";
type Snapshot = { isSpeaking: boolean; activeId: string | null };

function latexToSpeech(latex: string): string {
  return latex
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1 over $2")
    .replace(/\\sqrt\{([^}]+)\}/g, "square root of $1")
    .replace(/\\sqrt/g, "square root of")
    .replace(/\^2/g, " squared")
    .replace(/\^3/g, " cubed")
    .replace(/\^\{([^}]+)\}/g, " to the power of $1")
    .replace(/\^(\w)/g, " to the power of $1")
    .replace(/_\{([^}]+)\}/g, " sub $1")
    .replace(/_(\w)/g, " sub $1")
    .replace(/\\times/g, " times ")
    .replace(/\\cdot/g, " times ")
    .replace(/\\div/g, " divided by ")
    .replace(/\\pm/g, " plus or minus ")
    .replace(/\\approx/g, " approximately equals ")
    .replace(/\\neq/g, " not equal to ")
    .replace(/\\leq/g, " less than or equal to ")
    .replace(/\\geq/g, " greater than or equal to ")
    .replace(/\\rightarrow/g, " implies ")
    .replace(/\\Delta/g, "delta ")
    .replace(/\\alpha/g, "alpha")
    .replace(/\\beta/g, "beta")
    .replace(/\\gamma/g, "gamma")
    .replace(/\\mu/g, "mu")
    .replace(/\\lambda/g, "lambda")
    .replace(/\\omega/g, "omega")
    .replace(/\\pi/g, "pi")
    .replace(/\\rho/g, "rho")
    .replace(/\\sigma/g, "sigma")
    .replace(/\\theta/g, "theta")
    .replace(/\{|\}/g, " ")
    .replace(/\\/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function cleanTextForTTS(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/#{1,6}\s+/g, "")
    .replace(/`[^`]+`/g, "")
    // Convert LaTeX formulas to readable speech instead of just saying "formula"
    .replace(/\$\$([^$]+)\$\$/g, (_, eq) => latexToSpeech(eq))
    .replace(/\$([^$\n]+)\$/g, (_, eq) => latexToSpeech(eq))
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[_~*]/g, "")
    // Strip all emoji (Unicode emoji ranges)
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, "")
    .replace(/[\u{2600}-\u{27BF}]/gu, "")
    .replace(/[\u{FE00}-\u{FEFF}]/gu, "")
    .replace(/\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function detectLang(text: string): Lang {
  const len = text.length || 1;
  if ((text.match(/[\u0900-\u097F]/g) || []).length / len > 0.15) return "hi";
  if ((text.match(/[\u0980-\u09FF]/g) || []).length / len > 0.15) return "as";
  return "en";
}

/**
 * Assamese browser voices are usually weak or unavailable, while Hindi voices
 * are much better. So for Assamese we transliterate into Devanagari and feed
 * that to the Hindi engine. This sounds noticeably more natural in practice.
 *
 * A few important phonetic choices:
 * - Assamese স/শ/ষ are often pronounced closer to /x/, so "ह" is a better
 *   approximation than "स/श" for browser Hindi TTS.
 * - Assamese ৰ maps cleanly to "र"
 * - Assamese ৱ maps best to "व"
 * - Standalone অ becomes "ऑ" to better approximate Assamese /ɔ/
 */
function transliterateAssameseForHindiTTS(text: string): string {
  const directMap: Record<string, string> = {
    "অ": "ऑ", "আ": "आ", "ই": "इ", "ঈ": "ई", "উ": "उ", "ঊ": "ऊ",
    "ঋ": "ऋ", "এ": "ए", "ঐ": "ऐ", "ও": "ओ", "ঔ": "औ",
    "া": "ा", "ি": "ि", "ী": "ी", "ু": "ु", "ূ": "ू",
    "ৃ": "ृ", "ে": "े", "ৈ": "ै", "ো": "ो", "ৌ": "ौ",
    "্": "्", "ং": "ं", "ঃ": "ः", "ঁ": "ँ", "়": "",
    "ক": "क", "খ": "ख", "গ": "ग", "ঘ": "घ", "ঙ": "ङ",
    "চ": "च", "ছ": "छ", "জ": "ज", "ঝ": "झ", "ঞ": "ञ",
    "ট": "ट", "ঠ": "ठ", "ড": "ड", "ঢ": "ढ", "ণ": "ण",
    "ত": "त", "থ": "थ", "দ": "द", "ধ": "ध", "ন": "न",
    "প": "प", "ফ": "फ", "ব": "ब", "ভ": "भ", "ম": "म",
    "য": "ज़", "য়": "य", "য়": "य", "র": "र", "ৰ": "र",
    "ল": "ल", "ৱ": "व", "শ": "ह", "ষ": "ह", "স": "ह",
    "হ": "ह", "ড়": "ड़", "ঢ়": "ঢ়", "ৎ": "त", "।": "।",
  };

  return text
    .replace(/ক্ষ/g, "ख")
    .replace(/জ্ঞ/g, "ग्य")
    .replace(/ঞ্জ/g, "न्ज")
    .replace(/ঙ্গ/g, "ङ्ग")
    .split("")
    .map((ch) => directMap[ch] ?? ch)
    .join("");
}

/**
 * Split text into sentences for chained playback.
 * Handles Devanagari purna viram (।), Bengali danda, and Latin punctuation.
 */
function splitSentences(text: string): string[] {
  // Match sentences ending with common terminators including Indic danda (।)
  const parts = text.match(/[^.!?।\u0964]+[.!?।\u0964]+[\s)"]*/g);
  if (!parts) return [text.trim()].filter(Boolean);

  const sentences: string[] = [];
  let remainder = text;

  for (const p of parts) {
    const trimmed = p.trim();
    if (trimmed) sentences.push(trimmed);
    remainder = remainder.slice(p.length);
  }
  // Catch any trailing text after the last punctuation
  const leftover = remainder.trim();
  if (leftover) sentences.push(leftover);

  return sentences.filter((s) => s.length > 1);
}

function pickBestVoice(lang: Lang): { voice: SpeechSynthesisVoice | null; bcp47: string } {
  const voices = window.speechSynthesis.getVoices();

  const find = (names: string[]) => {
    for (const n of names) {
      const v = voices.find((v) => v.name.includes(n));
      if (v) return v;
    }
    return null;
  };

  if (lang === "as") {
    const v =
      find(["Google हिन्दी", "Microsoft Swara Online (Natural)", "Microsoft Swara",
            "Microsoft Hemant", "Microsoft Kalpana", "Google Hindi"]) ||
      voices.find((v) => v.lang === "hi-IN") ||
      voices.find((v) => v.lang.startsWith("hi")) ||
      find(["Google অসমীয়া"]) ||
      voices.find((v) => v.lang === "as-IN") ||
      find(["Google বাংলা", "Microsoft Bashkar", "Microsoft Avishkar"]) ||
      voices.find((v) => v.lang === "bn-IN") ||
      voices.find((v) => v.lang.startsWith("bn")) ||
      voices.find((v) => v.lang === "en-IN") ||
      (voices.length ? voices[0] : null);
    return { voice: v, bcp47: v?.lang ?? "hi-IN" };
  }

  if (lang === "hi") {
    const v =
      find(["Google हिन्दी", "Microsoft Swara Online (Natural)", "Microsoft Swara",
            "Microsoft Hemant", "Microsoft Kalpana", "Google Hindi"]) ||
      voices.find((v) => v.lang === "hi-IN") ||
      voices.find((v) => v.lang.startsWith("hi")) ||
      voices.find((v) => v.lang === "en-IN") ||
      (voices.length ? voices[0] : null);
    return { voice: v, bcp47: v?.lang ?? "hi-IN" };
  }

  const v =
    find(["Google UK English Female", "Microsoft Aria Online (Natural)",
          "Microsoft Jenny Online (Natural)", "Microsoft Sonia Online (Natural)",
          "Google US English", "Samantha", "Karen", "Daniel"]) ||
    voices.find((v) => v.lang === "en-IN") ||
    voices.find((v) => v.lang.startsWith("en-GB")) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    (voices.length ? voices[0] : null);
  return { voice: v, bcp47: v?.lang ?? "en-IN" };
}

const LANG_CONFIG: Record<Lang, { rate: number; pitch: number; pauseMs: number }> = {
  en: { rate: 0.92, pitch: 1.05, pauseMs: 120 },
  hi: { rate: 0.88, pitch: 1.00, pauseMs: 140 },
  as: { rate: 0.87, pitch: 1.00, pauseMs: 150 },
};

class VoiceManager {
  private genId = 0;
  private state: Snapshot = { isSpeaking: false, activeId: null };
  private listeners = new Set<() => void>();
  private keepAlive: ReturnType<typeof setInterval> | undefined;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): Snapshot => this.state;

  private setState(partial: Partial<Snapshot>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((l) => l());
  }

  stop = () => {
    this.genId++;
    clearInterval(this.keepAlive);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.setState({ isSpeaking: false, activeId: null });
  };

  prime         = (_text: string, _next?: string) => {};
  clearPipeline = () => {};
  whenReady     = (_text: string): Promise<void> => Promise.resolve();

  speak = (text: string, id?: string, onFinished?: () => void) => {
    this.stop();

    const clean = cleanTextForTTS(text);
    if (!clean || clean.length < 3) {
      onFinished?.();
      return;
    }

    const myGen = ++this.genId;
    this.setState({ isSpeaking: true, activeId: id ?? null });

    const lang = detectLang(clean);
    const prepared = lang === "as" ? transliterateAssameseForHindiTTS(clean) : clean;

    const sentences = splitSentences(prepared);
    if (sentences.length === 0) {
      onFinished?.();
      this.setState({ isSpeaking: false, activeId: null });
      return;
    }

    this.chainSpeak(sentences, lang, myGen, onFinished);
  };

  /**
   * Speak sentences one by one, each as a fresh utterance.
   * This gives the engine clean prosody boundaries — proper rising/falling
   * intonation, natural stress patterns, and no monotone drift.
   */
  private chainSpeak(
    sentences: string[],
    lang: Lang,
    gen: number,
    onFinished?: () => void,
    index = 0
  ) {
    const synth = window.speechSynthesis;
    const cfg   = LANG_CONFIG[lang];

    const doSpeak = () => {
      if (gen !== this.genId) return;
      if (index >= sentences.length) {
        clearInterval(this.keepAlive);
        this.setState({ isSpeaking: false, activeId: null });
        onFinished?.();
        return;
      }

      const { voice, bcp47 } = pickBestVoice(lang);

      const utt    = new SpeechSynthesisUtterance(sentences[index]);
      utt.lang     = bcp47;
      utt.rate     = cfg.rate;
      utt.pitch    = cfg.pitch;
      utt.volume   = 1;
      if (voice) utt.voice = voice;

      utt.onend = () => {
        if (gen !== this.genId) return;
        // Micro-pause between sentences — gives a natural breathing cadence
        setTimeout(() => {
          this.chainSpeak(sentences, lang, gen, onFinished, index + 1);
        }, cfg.pauseMs);
      };

      utt.onerror = (e) => {
        if (e.error === "interrupted" || e.error === "canceled") return;
        if (gen !== this.genId) return;
        // Skip failed sentence, continue with next
        setTimeout(() => {
          this.chainSpeak(sentences, lang, gen, onFinished, index + 1);
        }, cfg.pauseMs);
      };

      synth.speak(utt);
    };

    // Chrome freeze fix: prod the engine awake periodically
    if (index === 0) {
      clearInterval(this.keepAlive);
      this.keepAlive = setInterval(() => {
        if (!synth.speaking) { clearInterval(this.keepAlive); return; }
        synth.pause();
        synth.resume();
      }, 8000);
    }

    if (synth.getVoices().length > 0) {
      doSpeak();
    } else {
      synth.onvoiceschanged = () => {
        synth.onvoiceschanged = null;
        doSpeak();
      };
      setTimeout(doSpeak, 400);
    }
  }
}

const voiceManager = typeof window !== "undefined" ? new VoiceManager() : null;

const stub = {
  subscribe:     () => () => {},
  getSnapshot:   () => ({ isSpeaking: false, activeId: null }),
  stop:          () => {},
  speak:         () => {},
  prime:         () => {},
  clearPipeline: () => {},
  whenReady:     () => Promise.resolve(),
} as unknown as VoiceManager;

export const getVoiceManager = (): VoiceManager => voiceManager ?? stub;
