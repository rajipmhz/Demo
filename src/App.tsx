import VideoWithOverlay from "./core/VideoOverlay";
import ImageWithOverlay from "./core/ImageWithOverlay";
import TextToSpeech from "./core/TextToSpeech";
import SpeechToText from "./core/SpeechToText";
import Navbar from "./core/Navbar";
import Form from "./core/Form";
import { SpeechProvider } from "./provider/SpeechProvider";

function App() {

  return (
    <div>
      <SpeechProvider>
      <Navbar />
      <VideoWithOverlay />
      <TextToSpeech />
      <ImageWithOverlay />
      <SpeechToText />
      <Form />
      </SpeechProvider>
    </div>
  );
}

export default App;