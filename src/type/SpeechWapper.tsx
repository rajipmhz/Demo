import type { ReactNode } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

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

  const handleSpeak = () => {
    cancel();

    const text = extractText(children);

    speak({
      text,
      rate: 1,
      pitch: 1,
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