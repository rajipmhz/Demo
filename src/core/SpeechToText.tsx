// import { useState } from "react";
// import {
//   useSpeechRecognition,
//   useSpeechSynthesis,
// } from "react-speech-kit";

// import SpeechWrapper from "../type/SpeechWapper";

// export default function SpeechDemo() {
//   const [text, setText] = useState("");
//   const [lastText,setLastText]=useState("");
//   const { listen, listening, stop } = useSpeechRecognition({
//   onResult: (result:any) => {
//     if(result!=lastText){
//       setText((prev)=>prev+""+result);
//       setLastText(result);
//     }
//   },
// });
//   const { speak, cancel } = useSpeechSynthesis();

//   const handleSpeakHover = (msg: string) => {
//     speak({ text: msg, rate: 1, pitch: 1 });
//   };

//   const handleStopSpeak = () => {
//     cancel();
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <SpeechWrapper>
//         <h2 className="text-2xl font-semibold">
//           Speech To Text & Text To Speech
//         </h2>
//       </SpeechWrapper>

//       <br />

//       <SpeechWrapper>
//         <p className="mt-3  mb-3 text-gray-700">
//           Status:{" "}
//           <strong className={listening ? "text-green-600" : "text-red-500"}>
//             {listening ? "Listening..." : "Stopped"}
//           </strong>
//         </p>
//       </SpeechWrapper>

//       <div className="flex flex-wrap gap-3 mb-5">
//         <button
//           onClick={() =>
//             listen({
//               lang: "ne-NP",
//             })
//           }
//           onMouseEnter={() => handleSpeakHover("Start Listening")}
//           onMouseLeave={handleStopSpeak}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//         >
//           Start Listening
//         </button>

//         <button
//           onClick={stop}
//           onMouseEnter={() => handleSpeakHover("Stop Listening")}
//           onMouseLeave={handleStopSpeak}
//           className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//         >
//           Stop Listening
//         </button>

//         <button
//           onClick={() => setText("")}
//           onMouseEnter={() => handleSpeakHover("Reset Text")}
//           onMouseLeave={handleStopSpeak}
//           className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
//         >
//           Reset
//         </button>

//         <button
//           onClick={() => speak({ text })}
//           onMouseEnter={() => handleSpeakHover("Speak Text")}
//           onMouseLeave={handleStopSpeak}
//           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//         >
//           Speak Text
//         </button>
//       </div>

//       <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[120px] shadow-sm" onMouseEnter={() => handleSpeakHover("display text")}
//         onMouseLeave={handleStopSpeak}>
//         {text ? (
//           <p className="text-gray-800">{text}</p>
//         ) : (
//           <span className="text-gray-400">
//             Speech text will appear here...
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }


// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// export default function SpeechDemo() {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   const startListening = () => {
//     SpeechRecognition.startListening({
//       continuous: true,
//       language: "ne-NP", // Nepali language
//     });
//   };

//   const stopListening = () => {
//     SpeechRecognition.stopListening();
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">
//         Nepali Speech Recognition
//       </h1>

//       <p className="mb-4">
//         Mic:{" "}
//         <strong
//           className={
//             listening ? "text-green-600" : "text-red-600"
//           }
//         >
//           {listening ? "Listening..." : "Stopped"}
//         </strong>
//       </p>

//       <div className="flex gap-3 mb-5">
//         <button
//           onClick={startListening}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Start Listening
//         </button>

//         <button
//           onClick={stopListening}
//           className="px-4 py-2 bg-red-600 text-white rounded"
//         >
//           Stop
//         </button>

//         <button
//           onClick={resetTranscript}
//           className="px-4 py-2 bg-gray-600 text-white rounded"
//         >
//           Reset
//         </button>
//       </div>

//       <div className="border rounded p-4 min-h-[150px] bg-gray-50">
//         {transcript ? (
//           <p className="text-lg">{transcript}</p>
//         ) : (
//           <span className="text-gray-400">
//             नेपाली आवाज यहाँ देखिन्छ...
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

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