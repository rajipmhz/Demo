import { useEffect, useRef, useState } from "react";
import SpeechWrapper from "./type/SpeechWapper";
import { useSpeechSynthesis } from "react-speech-kit";
import { getTextByLanguage } from "./i18n/i18n";

const subtitles = [
  { start: 1, end: 4, text: "Welcome to our website" },
  { start: 4, end: 7, text: "This video explains accessibility" },
];

export default function VideoWithSubtitles() {
    
const { speak, cancel, voices } = useSpeechSynthesis();

  const handleHover = (text: string) => {
    cancel();

    speak({
      text,
      voice: voices?.[0],
      rate: 1,
      pitch: 1,
    });
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentSubtitle, setCurrentSubtitle] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;

      const activeSubtitle = subtitles.find(
        (subtitle) =>
          currentTime >= subtitle.start && currentTime <= subtitle.end
      );

      setCurrentSubtitle(activeSubtitle?.text || "");
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <SpeechWrapper>
        <h2 className="text-2xl font-semibold">{getTextByLanguage("Video","भिडियो")}</h2>
      </SpeechWrapper>

      <div className="relative w-full max-w-3xl mt-6 rounded-xl overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          controls
          className="w-full rounded-xl"
          onMouseEnter={()=>handleHover("Click video to play")}
          onMouseLeave={cancel}
        >
          <source
            src="https://www.w3schools.com/html/movie.mp4"
            type="video/mp4"
          />
        </video>

        {currentSubtitle && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-md text-lg font-semibold shadow-md">
            {currentSubtitle}
          </div>
        )}
      </div>
    </div>
  );
}