// import { useSpeech } from "../provider/SpeechProvider";
// import type { ReactNode } from "react";
// import { useSpeechSynthesis } from "react-speech-kit";

// type SpeechWrapperProps = {
//   children: ReactNode;
// };
// function extractText(node: ReactNode): string {
//   if (typeof node === "string") return node;
//   if (Array.isArray(node)) return node.map(extractText).join(" ");
//   if (typeof node === "object" && node !== null && "props" in node) {
//     return extractText((node as any).props.children);
//   }
//   return "";
// }

// function SpeechWrapper({ children }: SpeechWrapperProps) {
//   const { speak, cancel } = useSpeechSynthesis();
//   const {speechEnabled}=useSpeech();

//   const handleSpeak = () => {
//     if(!speechEnabled) return;
//     cancel();

//     const text = extractText(children);

//     speak({
//       text,
//       rate: 1,
//       pitch: 1,
//     });
//   };

//   return (
//     <div
//       onMouseEnter={handleSpeak}
//       onMouseLeave={cancel}
//       onFocus={handleSpeak}
//       onBlur={cancel}
//       tabIndex={0}
//       style={{
//         display: "inline-block",
//         cursor: "pointer",
//         outline: "none",
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// export default SpeechWrapper;

import { useSpeech } from "../provider/SpeechProvider";
import type { ReactNode } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect, useState } from "react";

type SpeechWrapperProps = {
  children: ReactNode;
};

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join(" ");
  if (typeof node === "object" && node !== null && "props" in node) {
    return extractText((node as any).props.children);
  }
  return "";
}

function SpeechWrapper({ children }: SpeechWrapperProps) {
  const { speak, cancel } = useSpeechSynthesis();
  const { speechEnabled } = useSpeech();

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleSpeak = () => {
    if (!speechEnabled) return;

    cancel();

    const text = extractText(children);

    // 🔥 Find best available voice
    const voice =
      voices.find(v => v.lang === "hi-IN") || 
      voices.find(v => v.lang.includes("ne")) || 
      voices[0]; 

    speak({
      text,
      rate: 1,
      pitch: 1,
      voice, 
    });
  };

  return (
    <div
      onMouseEnter={handleSpeak}
      onMouseLeave={cancel}
      onFocus={handleSpeak}
      onBlur={cancel}
      tabIndex={0}
      style={{
        display: "inline-block",
        cursor: "pointer",
        outline: "none",
      }}
    >
      {children}
    </div>
  );
}

export default SpeechWrapper;