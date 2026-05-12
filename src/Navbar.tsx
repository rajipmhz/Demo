import { useContext, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechWrapper from "./type/SpeechWapper";
import { LanguageSwitcher } from "./components/core/LanguageSwitcher.tsx/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { ToggleContext } from "./provider/ToggleLanguage";
import { getTextByLanguage } from "./i18n/i18n";
import { ModeToggle } from "./components/core/ThemeProvider/ThemeProvider";

const Navbar = () => {
  const { i18n } = useTranslation();
  const { toggleLanguage } = useContext(ToggleContext);

  const { speak, cancel } = useSpeechSynthesis();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSpeak = (text: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      cancel();
      speak({ text, rate: 1 });
    }, 200);
  };

  const handleCancel = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    cancel();
  };

  const links = [
    { label: "Home", speak: "Home page", href: "#home" },
    { label: "About", speak: "About us section", href: "#about" },
    { label: "Services", speak: "Our services", href: "#services" },
    { label: "Contact", speak: "Contact page", href: "#contact" },
  ];

  return (
    <div>
      <nav className="bg-white text-black dark:bg-black dark:text-white px-6 py-3 flex gap-6 items-center shadow-md transition-colors duration-300">
        
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="text-lg hover:text-blue-500 dark:hover:text-blue-400 focus:text-blue-500 transition-colors outline-none"
            onMouseEnter={() => handleSpeak(link.speak)}
            onMouseLeave={handleCancel}
            onFocus={() => handleSpeak(link.speak)}
            onBlur={handleCancel}
          >
            {link.label}
          </a>
        ))}

        <div className="ml-auto flex items-center gap-4">
          <LanguageSwitcher
            i18n={i18n}
            toggleLanguage={toggleLanguage}
            getTextByLanguage={getTextByLanguage}
          />

          <ModeToggle />
        </div>
      </nav>

      <SpeechWrapper>
        <p className="text-gray-700 dark:text-gray-300 mt-4 text-2xl text-center px-4 transition-colors duration-300">
          {/* Demo website for react-speech-kit */}
        </p>

        <p></p>
      </SpeechWrapper>
    </div>
  );
};

export default Navbar;