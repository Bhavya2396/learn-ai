"use client";

import { useSyncExternalStore, useCallback, useState, useRef } from "react";
import { getVoiceManager } from "@/lib/voiceManager";

// ── Voice output hook (singleton-backed) ─────────────────────────────────────
// All components share ONE VoiceManager — only one audio ever plays at a time.

export function useVoiceOutput(messageId?: string) {
  const manager = getVoiceManager();

  const snapshot = useSyncExternalStore(
    manager.subscribe,
    manager.getSnapshot,
    () => ({ isSpeaking: false, activeId: null }) // SSR
  );

  const isSpeaking =
    snapshot.isSpeaking && snapshot.activeId === (messageId ?? null);

  const speak = useCallback(
    (text: string, onFinished?: () => void) => manager.speak(text, messageId, onFinished),
    [manager, messageId]
  );
  const stop = useCallback(() => manager.stop(), [manager]);

  return {
    isSpeaking,
    anyoneSpeaking: snapshot.isSpeaking,
    speak,
    stop,
  };
}

// ── Voice input hook (Web Speech API for STT) ─────────────────────────────────

interface SpeechRecognitionResult {
  [index: number]: { transcript: string };
  isFinal: boolean;
}
interface SpeechRecognitionEvent extends Event {
  results: { [index: number]: SpeechRecognitionResult; length: number };
  resultIndex: number;
}
interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((ev: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recRef = useRef<SpeechRecognitionInstance | null>(null);

  const startListening = useCallback((onResult: (text: string) => void) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = "en-IN";

    rec.onresult = (e: SpeechRecognitionEvent) => {
      let finalText = "";
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      setTranscript(finalText || interim);
      if (finalText) onResult(finalText.trim());
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => { setIsListening(false); setTranscript(""); };

    recRef.current = rec;
    rec.start();
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    recRef.current?.stop();
    setIsListening(false);
  }, []);

  return { isListening, transcript, startListening, stopListening };
}
