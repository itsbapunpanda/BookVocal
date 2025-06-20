import { useState } from "react";
import PDFUploader from "../components/PDFUploader";
import PageRangeSelector from "../components/PageRangeSelector";
import VoiceSelector from "../components/VoiceSelector";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { extractTextFromPDF } from "../utils/PDFReader";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import TextReader from "../components/TextReader";

export default function ReaderPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState({ start: 1, end: 1 });
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [lines, setLines] = useState<string[]>([]);

  const { speakLines, cancel, pause, resume } = useSpeechSynthesis(voice);

  const handleRead = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF file first.");
      return;
    }
    setIsReading(true);
    const extracted = await extractTextFromPDF(pdfFile, pageRange.start, pageRange.end);
    setLines(extracted);
    speakLines(extracted, () => setIsReading(false));
  };

  const handleStop = () => {
    cancel();
    setIsReading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen dark:bg-gray-900 dark:text-white transition-all">
      {/* Left Panel: Controls */}
      <div className="lg:w-1/3 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg space-y-6 flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">📚 BookVocal</h1>

        {/* Control Box */}
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner space-y-6 flex-grow flex flex-col">
          <PDFUploader onFileSelect={setPdfFile} />
          <PageRangeSelector pageRange={pageRange} setPageRange={setPageRange} />
          <VoiceSelector selectedVoice={voice} setSelectedVoice={setVoice} />

          <div className="space-y-3 mt-auto">
            <button
              onClick={handleRead}
              disabled={isReading}
              className={`w-full py-3 rounded font-semibold transition-colors ${
                isReading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              {isReading ? "Reading..." : "Read Book 🎧"}
            </button>

            {isReading && (
              <div className="flex flex-col space-y-3">
                <button
                  onClick={pause}
                  className="w-full py-3 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                >
                  Pause ⏸
                </button>
                <button
                  onClick={resume}
                  className="w-full py-3 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold"
                >
                  Resume ▶️
                </button>
                <button
                  onClick={handleStop}
                  className="w-full py-3 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
                >
                  Stop 🛑
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => signOut(auth)}
          className="w-full mt-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
        >
          Logout
        </button>
      </div>

      {/* Right Panel: Reader */}
      <div className="lg:w-2/3 p-12 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
        {isReading && lines.length > 0 ? (
          <TextReader
            lines={lines}
            voice={voice}
            onComplete={() => setIsReading(false)}
          />
        ) : (
          <div className="text-gray-500 dark:text-gray-400 text-center mt-20 text-lg">
            📄 Uploaded content will appear here for reading.
          </div>
        )}
      </div>
    </div>
  );
}
