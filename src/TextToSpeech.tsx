import { useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechWrapper from "./type/SpeechWapper";

function TextToSpeech() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  const {
    speak,
    voices,
    cancel,
    supported: synthesisSupported,
  } = useSpeechSynthesis();

  const handleSpeakHover = (msg: string) => {
    speak({ text: msg, rate: 1, pitch: 1 });
  };

  const handleStopSpeak = () => {
    cancel();
  };

  useEffect(() => {
    if (voices.length > 0) {
      setVoice(voices[0]);
    }
  }, [voices]);

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <SpeechWrapper>
        <h2 className="text-2xl font-semibold">Text to Speech</h2>
      </SpeechWrapper>

      {!synthesisSupported ? (
        <p className="text-red-500 mt-4">
          Speech synthesis not supported
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onMouseEnter={() => handleSpeakHover("Text field")}
            onMouseLeave={handleStopSpeak}
            placeholder="Type something to speak..."
            className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => speak({text,voice: voice || undefined})}
              onMouseEnter={() => handleSpeakHover("Click to Speak")}
              onMouseLeave={handleStopSpeak}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Speak
            </button>

            <button
              onClick={cancel}
              onMouseEnter={() => handleSpeakHover("Stop Speaking")}
              onMouseLeave={handleStopSpeak}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Stop Speaking
            </button>

            <button
              onClick={() => setText("")}
              onMouseEnter={() => handleSpeakHover("Reset Text")}
              onMouseLeave={handleStopSpeak}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TextToSpeech;