import { createContext, useContext, useState } from "react";

type SpeechContextType = {
  speechEnabled: boolean;
  toggleSpeech: () => void;
};

const SpeechContext = createContext<SpeechContextType | null>(null);

type SpeechProviderProps = {
  children: React.ReactNode;
};

export function SpeechProvider({ children }: SpeechProviderProps) {
  const [speechEnabled, setSpeechEnabled] = useState(false);

  const toggleSpeech = () => setSpeechEnabled((prev) => !prev);

  return (
    <SpeechContext.Provider value={{ speechEnabled, toggleSpeech }}>
      {children}
    </SpeechContext.Provider>
  );
}

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error("useSpeech must be used within SpeechProvider");
  }
  return context;
};