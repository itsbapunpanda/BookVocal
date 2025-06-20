import { useEffect, useRef, useState } from "react";

interface Props {
  lines: string[];
  voice: SpeechSynthesisVoice | null;
  onComplete?: () => void;
}

export default function TextReader({ lines, voice, onComplete }: Props) {
  const [currentLine, setCurrentLine] = useState(0);
  const synthRef = useRef(
    typeof window !== "undefined" ? window.speechSynthesis : null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lines.length || !synthRef.current) return;

    let cancelled = false;

    const speakLine = (index: number) => {
      if (cancelled) {
        onComplete?.();
        return;
      }

      if (index >= lines.length) {
        onComplete?.();
        return;
      }

      synthRef.current!.cancel(); // Cancel before speaking new utterance

      const utter = new SpeechSynthesisUtterance(lines[index]);
      if (voice) utter.voice = voice;
      utter.rate = 1;

      utter.onend = () => {
        if (cancelled) {
          onComplete?.();
          return;
        }
        setTimeout(() => {
          setCurrentLine(index + 1);
          speakLine(index + 1);
        }, 100);
      };

      setCurrentLine(index);
      synthRef.current!.speak(utter);
    };

    speakLine(0);

    return () => {
      cancelled = true;
      synthRef.current!.cancel();
    };
  }, [lines, voice, onComplete]);

  useEffect(() => {
    const activeLine = containerRef.current?.querySelector(".highlight");
    activeLine?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentLine]);

  return (
    <div
      ref={containerRef}
      className="h-[80vh] overflow-y-auto border rounded p-4 bg-white dark:bg-gray-800 space-y-2"
    >
      {lines.map((line, idx) => (
        <p
          key={idx}
          className={`transition-all px-2 py-1 rounded ${
            idx === currentLine
              ? "bg-yellow-300 dark:bg-yellow-500 font-semibold highlight"
              : ""
          }`}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
