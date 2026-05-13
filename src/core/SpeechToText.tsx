import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function SpeechDemo() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "ne-NP",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(transcript);

    utterance.lang = "HI-in";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
      Speech to Text
      </h1>

      <p className="mb-4">
        Mic:{" "}
        <strong
          className={
            listening ? "text-green-600" : "text-red-600"
          }
        >
          {listening ? "Listening..." : "Stopped"}
        </strong>
      </p>

      <div className="flex flex-wrap gap-3 mb-5">
        <button
          onClick={startListening}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Start Listening
        </button>

        <button
          onClick={stopListening}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Stop Listening
        </button>

        <button
          onClick={speakText}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Read Text
        </button>

        <button
          onClick={stopSpeaking}
          className="px-4 py-2 bg-yellow-600 text-white rounded"
        >
          Stop Reading
        </button>

        <button
          onClick={resetTranscript}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Reset
        </button>
      </div>

      <div className="border rounded p-4 min-h-[150px] bg-gray-50">
        {transcript ? (
          <p className="text-lg">{transcript}</p>
        ) : (
          <span className="text-gray-400">
            नेपाली आवाज यहाँ देखिन्छ...
          </span>
        )}
      </div>
    </div>
  );
}