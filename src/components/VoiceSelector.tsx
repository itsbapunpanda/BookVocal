// src/components/VoiceSelector.tsx
import { useEffect, useState } from "react";

interface VoiceSelectorProps {
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
}

export default function VoiceSelector({ selectedVoice, setSelectedVoice }: VoiceSelectorProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const synth = window.speechSynthesis;

    function loadVoices() {
      const availableVoices = synth.getVoices();

      // ✅ Filter out all Google voices
      const filteredVoices = availableVoices.filter(
        (voice) => !voice.name.toLowerCase().includes("google")
      );

      setVoices(filteredVoices);

      if (!selectedVoice && filteredVoices.length > 0) {
        setSelectedVoice(filteredVoices[0]);
      }
    }

    // Load initially
    loadVoices();

    // Load again if voices change
    synth.onvoiceschanged = loadVoices;

    // Clean up listener
    return () => {
      synth.onvoiceschanged = null;
    };
  }, [selectedVoice, setSelectedVoice]);

  return (
    <select
      value={selectedVoice?.name || ""}
      onChange={(e) => {
        const voice = voices.find((v) => v.name === e.target.value);
        if (voice) setSelectedVoice(voice);
      }}
      className="border rounded px-2 py-1 w-full bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
    >
      {voices.map((voice) => (
        <option key={voice.name} value={voice.name}>
          {voice.name} ({voice.lang})
        </option>
      ))}
    </select>
  );
}
