import { useRef } from "react";

export function useSpeechSynthesis(selectedVoice: SpeechSynthesisVoice | null) {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const indexRef = useRef(0);
  const cancelRef = useRef(false);

  const speakLines = (lines: string[], onEnd?: () => void) => {
    if (!lines.length || !synth) return;

    cancelRef.current = false;
    synth.cancel(); // synth is non-null here, safe to call
    indexRef.current = 0;

    function speakNext() {
      if (cancelRef.current) {
        onEnd?.();
        return;
      }

      if (indexRef.current >= lines.length) {
        onEnd?.();
        return;
      }

      const utter = new SpeechSynthesisUtterance(lines[indexRef.current]);
      if (selectedVoice) utter.voice = selectedVoice;

      utter.onend = () => {
        indexRef.current += 1;
        speakNext();
      };

      // Check synth is non-null again before speak()
      if (synth) {
        synth.speak(utter);
      }
    }

    speakNext();
  };

  const pause = () => {
    if (synth && synth.speaking) {
      synth.pause();
    }
  };

  const resume = () => {
    if (synth && synth.paused) {
      synth.resume();
    }
  };

  const cancel = () => {
    if (synth) {
      cancelRef.current = true;
      synth.cancel();
    }
  };

  return {
    speakLines,
    cancel,
    pause,
    resume,
  };
}
