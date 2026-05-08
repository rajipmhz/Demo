import { useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechWrapper from "./type/SpeechWapper";

const Navbar = () => {
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
      <nav className="bg-black text-white px-6 py-3 flex gap-6 items-center shadow-md">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="text-lg hover:text-blue-400 focus:text-blue-400 transition-colors outline-none"
            onMouseEnter={() => handleSpeak(link.speak)}
            onMouseLeave={handleCancel}
            onFocus={() => handleSpeak(link.speak)}
            onBlur={handleCancel}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <SpeechWrapper>
        <p className="text-gray-700 mt-4 text-2xl text-center px-4">
          Demo website for the practice of react-speech-kit and react-speech-recognition.
        </p>
      </SpeechWrapper>
    </div>
  );
};

export default Navbar;