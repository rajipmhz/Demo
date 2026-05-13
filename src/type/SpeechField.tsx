import { useRef, type ReactNode } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSpeech } from "../provider/SpeechProvider";

type SpeechFieldProps = {
  label: string;
  speechText?: string;
  children: ReactNode;
};

function SpeechField({
  label,
  speechText,
  children,
}: SpeechFieldProps) {
  const { speak, cancel, voices } = useSpeechSynthesis();
  const { speechEnabled } = useSpeech();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSpeak = () => {
    if (!speechEnabled) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      cancel();

      const voice =
        voices.find((v) => v.lang.includes("ne")) ||
        voices.find((v) => v.lang === "hi-IN") ||
        voices[0];

      speak({
        text: speechText || label,
        voice,
        rate: 1,
        pitch: 1,
      });
    }, 200);
  };

  return (
    <div
      onMouseEnter={handleSpeak}
      onMouseLeave={cancel}
      className="space-y-2"
    >
      <label className="font-semibold block">
        {label}
      </label>

      {children}
    </div>
  );
}

export default SpeechField;