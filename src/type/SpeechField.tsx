
import { useRef, type ReactNode } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

type SpeechFieldProps = {
  label: string;
  speechText?: string;
  children: ReactNode;
};

function SpeechField({
  label,
  speechText,
  children,
}:SpeechFieldProps) {
  const { speak, cancel, voices } = useSpeechSynthesis();
 const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  const handleSpeak = () => {
        if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      cancel();
   speak({
      text: speechText || label,
      voice: voices?.[0],
      rate: 1,
      pitch: 1,
    });
    }, 200);
   
  };

  return (
    <div
      onMouseEnter={handleSpeak}
      onMouseLeave={cancel}
      style={{ marginBottom: "20px" }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "6px",
          fontWeight: "bold",
        }}
      >
        {label}
      </label>

      {children}
    </div>
  );
}

export default SpeechField;