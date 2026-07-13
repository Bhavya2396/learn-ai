/**
 * ZOE narration — the voice that paces a lesson.
 *
 * The delivery model is beat-synced: the player speaks one beat at a time and
 * the visual reveals itself in sync (see LessonPlayer + IframeCanvas). This
 * module owns the *voice*. It is deliberately abstracted behind `Narrator` so a
 * premium cloud TTS (Google/ElevenLabs/OpenAI) can drop in later without
 * touching the player — swap `createNarrator()` and everything else keeps working.
 *
 * The default implementation uses the browser's built-in SpeechSynthesis:
 * zero cost, zero keys, on-device. Its one quirk (utterances resolving oddly on
 * some engines) is handled with a watchdog so a beat never hangs the lesson.
 */

export interface SpeakOptions {
  /** 0..1 — relative rate around the narrator's base. */
  rate?: number;
  /** Called once audio actually starts (drives the "speaking" indicator). */
  onStart?: () => void;
}

export interface Narrator {
  /** Speak one beat. Resolves when it finishes, is cancelled, or is skipped. */
  speak(text: string, opts?: SpeakOptions): Promise<void>;
  pause(): void;
  resume(): void;
  /** Stop the current utterance immediately (does not reject the promise). */
  cancel(): void;
  /** Toggle silent mode — beats still pace correctly, just without audio. */
  setMuted(muted: boolean): void;
  isMuted(): boolean;
  /** Whether real audio is available (false → we time beats instead). */
  readonly canSpeak: boolean;
  destroy(): void;
}

/** Rough spoken duration for a line — used for muted pacing + as a watchdog. */
export function estimateSpeechMs(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  // ~2.8 words/sec conversational, with a floor so short beats still breathe.
  return Math.max(1600, Math.round((words / 2.8) * 1000) + 350);
}

/* ── Browser SpeechSynthesis narrator ─────────────────────────────────────── */

class BrowserNarrator implements Narrator {
  readonly canSpeak: boolean;
  private muted = false;
  private paused = false;
  private voice: SpeechSynthesisVoice | null = null;
  private current: SpeechSynthesisUtterance | null = null;
  private resolveCurrent: (() => void) | null = null;
  private watchdog: ReturnType<typeof setTimeout> | null = null;
  private mutedTimer: ReturnType<typeof setTimeout> | null = null;
  private mutedResolve: (() => void) | null = null;
  private mutedDeadline = 0;   // performance-clock ms when the muted beat should end
  private mutedRemaining = 0;  // frozen remaining ms while paused
  private destroyed = false;

  constructor() {
    this.canSpeak =
      typeof window !== "undefined" &&
      typeof window.speechSynthesis !== "undefined" &&
      typeof window.SpeechSynthesisUtterance !== "undefined";
    if (this.canSpeak) {
      this.pickVoice();
      // Voice list is async on Chrome — re-pick when it arrives.
      try {
        window.speechSynthesis.onvoiceschanged = () => this.pickVoice();
      } catch { /* ignore */ }
    }
  }

  private pickVoice() {
    try {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      // Prefer a warm, natural English voice; fall back gracefully.
      const prefer = [
        "Google UK English Female", "Google US English", "Samantha",
        "Karen", "Daniel", "Serena", "Moira",
      ];
      for (const name of prefer) {
        const v = voices.find((x) => x.name === name);
        if (v) { this.voice = v; return; }
      }
      this.voice =
        voices.find((v) => /en[-_]/i.test(v.lang) && /female|samantha|karen|serena/i.test(v.name)) ||
        voices.find((v) => /en[-_]/i.test(v.lang)) ||
        voices[0];
    } catch { /* ignore */ }
  }

  private clearTimers() {
    if (this.watchdog) { clearTimeout(this.watchdog); this.watchdog = null; }
    if (this.mutedTimer) { clearTimeout(this.mutedTimer); this.mutedTimer = null; }
  }

  speak(text: string, opts?: SpeakOptions): Promise<void> {
    if (this.destroyed) return Promise.resolve();
    this.cancel();
    const clean = (text || "").trim();
    const durMs = estimateSpeechMs(clean);

    // Muted (or no audio available): pace on a timer so the visual still flows.
    if (this.muted || !this.canSpeak || !clean) {
      const wait = this.muted && clean ? durMs : Math.min(durMs, 900);
      return new Promise<void>((resolve) => {
        this.mutedResolve = resolve;
        opts?.onStart?.();
        this.startMutedTimer(wait);
      });
    }

    return new Promise<void>((resolve) => {
      const u = new SpeechSynthesisUtterance(clean);
      if (this.voice) u.voice = this.voice;
      u.rate = 0.96 * (opts?.rate ?? 1);
      u.pitch = 1.0;
      u.volume = 1.0;
      this.current = u;
      this.resolveCurrent = resolve;

      const finish = () => {
        if (this.resolveCurrent !== resolve) return; // superseded
        this.clearTimers();
        this.current = null;
        this.resolveCurrent = null;
        resolve();
      };
      u.onstart = () => opts?.onStart?.();
      u.onend = finish;
      u.onerror = finish;

      try {
        window.speechSynthesis.speak(u);
      } catch {
        finish();
        return;
      }

      // Watchdog: if onend never fires (known engine flakiness), resolve anyway
      // a bit after the estimated duration so the lesson never stalls.
      this.watchdog = setTimeout(finish, durMs + 4000);
    });
  }

  private now() {
    return (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
  }

  private startMutedTimer(ms: number) {
    if (this.mutedTimer) { clearTimeout(this.mutedTimer); this.mutedTimer = null; }
    this.mutedDeadline = this.now() + ms;
    this.mutedTimer = setTimeout(() => {
      this.mutedTimer = null;
      if (this.mutedResolve) { const r = this.mutedResolve; this.mutedResolve = null; r(); }
    }, ms);
  }

  pause() {
    if (this.paused) return;
    this.paused = true;
    // Freeze a running muted timer.
    if (this.mutedTimer) {
      clearTimeout(this.mutedTimer); this.mutedTimer = null;
      this.mutedRemaining = Math.max(0, this.mutedDeadline - this.now());
    }
    if (this.canSpeak) { try { window.speechSynthesis.pause(); } catch { /* ignore */ } }
  }

  resume() {
    if (!this.paused) return;
    this.paused = false;
    if (this.mutedResolve && this.mutedRemaining > 0) {
      this.startMutedTimer(this.mutedRemaining);
      this.mutedRemaining = 0;
    }
    if (this.canSpeak) { try { window.speechSynthesis.resume(); } catch { /* ignore */ } }
  }

  cancel() {
    this.paused = false;
    this.mutedRemaining = 0;
    this.clearTimers();
    if (this.mutedResolve) { const r = this.mutedResolve; this.mutedResolve = null; r(); }
    if (this.canSpeak) {
      try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
    }
    if (this.resolveCurrent) { const r = this.resolveCurrent; this.resolveCurrent = null; r(); }
    this.current = null;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (muted) this.cancel();
  }

  isMuted() { return this.muted; }

  destroy() {
    this.destroyed = true;
    this.cancel();
    if (this.canSpeak) {
      try { window.speechSynthesis.onvoiceschanged = null; } catch { /* ignore */ }
    }
  }
}

/**
 * Factory — returns the active narrator implementation.
 * Swap the body here to introduce premium TTS later (keep the interface).
 */
export function createNarrator(): Narrator {
  return new BrowserNarrator();
}
