import { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSpeechSynthesis } from "react-speech-kit";

import { ToggleContext } from "../provider/ToggleLanguage";
import { ModeToggle } from "../components/core/ThemeProvider/ThemeProvider";
import { useSpeech } from "../provider/SpeechProvider";
import { Button } from "../components/ui/button";
import { LanguageSwitcher } from "@/components/core/LanguageSwitcher.tsx/LanguageSwitcher";
import { getTextByLanguage } from "@/i18n/i18n";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { toggleLanguage } = useContext(ToggleContext);

  const {  cancel } = useSpeechSynthesis();
  const { speechEnabled, toggleSpeech } = useSpeech();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  const handleSpeak = (text: string) => {
  if (!speechEnabled) return;

  const utterance = new SpeechSynthesisUtterance(text);

  const voices = window.speechSynthesis.getVoices();

  const lang = i18n.language;

  if (lang === "ne") {
    utterance.lang = "hi-IN";
    utterance.voice =
      voices.find(v => v.lang.includes("hi")) || null;
  } else {
    utterance.lang = "en-US";
    utterance.voice =
      voices.find(v => v.lang.includes("en")) || null;
  }

  utterance.rate = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

  const handleCancel = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    cancel();
  };

  const links = [
    { key: "dashboard", href: "/" },
    { key: "speech", href: "/speech" },
    { key: "textSpeech", href: "/text-to-speech" },
    { key: "form", href: "/form" },
    { key: "images", href: "/images" },
    { key: "video", href: "/video" }
  ];

  return (
    <nav className="bg-white dark:bg-black text-black dark:text-white px-6 py-4 flex items-center gap-6 shadow-md">

      {links.map((link) => (
        <NavLink
          key={link.key}
          to={link.href}
          className={({ isActive }) =>
            `text-lg transition-colors hover:text-blue-500 ${
              isActive ? "text-blue-500 font-semibold" : ""
            }`
          }
          onMouseEnter={() => handleSpeak(t(link.key))}
          onMouseLeave={handleCancel}
          onFocus={() => handleSpeak(t(link.key))}
          onBlur={handleCancel}
        >
          {t(`${link.key}`)}
        </NavLink>
      ))}

      <div className="ml-auto flex items-center gap-4">

        <Button onClick={toggleSpeech}>
          {speechEnabled
            ? t("disableVoice")
            : t("enableVoice")}
        </Button>

        <LanguageSwitcher
          i18n={i18n}
          toggleLanguage={toggleLanguage}
          getTextByLanguage={getTextByLanguage}
        />

        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;