import VideoWithOverlay from "./VideoOverlay";
import ImageWithOverlay from "./ImageWithOverlay";
import TextToSpeech from "./TextToSpeech";
import SpeechToText from "./SpeechToText";
import Navbar from "./Navbar";
import Form from "./Form";

function App() {

  return (
    <div>
      <Navbar />
      <VideoWithOverlay />
      <TextToSpeech />
      <ImageWithOverlay />
      <SpeechToText />
      <Form />
    </div>
  );
}

export default App;