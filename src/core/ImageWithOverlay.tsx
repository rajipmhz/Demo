import { useSpeechSynthesis } from "react-speech-kit";
import SpeechWrapper from "../type/SpeechWapper";

export default function ImageWithOverlay() {
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

  const cards = [
    {
      title: "Mountain View",
      desc: "Beautiful snow-covered mountain landscape",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
      speech: "Beautiful snow-covered mountain landscape",
    },
    {
      title: "Earth View",
      desc: "Beautiful Earth",
      img: "https://plus.unsplash.com/premium_photo-1776951033151-95fe24fcd49a?w=500&auto=format&fit=crop&q=60",
      speech: "Beautiful Earth View",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 font-sans">

      <SpeechWrapper>
        <h2 className="text-2xl font-semibold">Images</h2>
      </SpeechWrapper>


      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative w-[320px] aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md"
            onMouseEnter={() => handleHover(card.speech)}
            onMouseLeave={cancel}
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/50 text-white flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-sm text-gray-200">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}