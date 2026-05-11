import { useState } from "react";
import {
  useSpeechRecognition,
  useSpeechSynthesis,
} from "react-speech-kit";

import SpeechWrapper from "./type/SpeechWapper";

export default function SpeechDemo() {
  const [text, setText] = useState("");

  const { listen, listening, stop } = useSpeechRecognition({
  onResult: (result:any) => {
    setText(result);
  },
});
  const { speak, cancel } = useSpeechSynthesis();

  const handleSpeakHover = (msg: string) => {
    speak({ text: msg, rate: 1, pitch: 1 });
  };

  const handleStopSpeak = () => {
    cancel();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <SpeechWrapper>
        <h2 className="text-2xl font-semibold">
          Speech To Text & Text To Speech
        </h2>
      </SpeechWrapper>

      <br />

      <SpeechWrapper>
        <p className="mt-3  mb-3 text-gray-700">
          Status:{" "}
          <strong className={listening ? "text-green-600" : "text-red-500"}>
            {listening ? "Listening..." : "Stopped"}
          </strong>
        </p>
      </SpeechWrapper>

      <div className="flex flex-wrap gap-3 mb-5">
        <button
          onClick={() =>
            listen({
              lang: "en-US",
            })
          }
          onMouseEnter={() => handleSpeakHover("Start Listening")}
          onMouseLeave={handleStopSpeak}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Start Listening
        </button>

        <button
          onClick={stop}
          onMouseEnter={() => handleSpeakHover("Stop Listening")}
          onMouseLeave={handleStopSpeak}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Stop Listening
        </button>

        <button
          onClick={() => setText("")}
          onMouseEnter={() => handleSpeakHover("Reset Text")}
          onMouseLeave={handleStopSpeak}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Reset
        </button>

        <button
          onClick={() => speak({ text })}
          onMouseEnter={() => handleSpeakHover("Speak Text")}
          onMouseLeave={handleStopSpeak}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Speak Text
        </button>
      </div>

      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[120px] shadow-sm" onMouseEnter={() => handleSpeakHover("display text")}
        onMouseLeave={handleStopSpeak}>
        {text ? (
          <p className="text-gray-800">{text}</p>
        ) : (
          <span className="text-gray-400">
            Speech text will appear here...
          </span>
        )}
      </div>
    </div>
  );
}