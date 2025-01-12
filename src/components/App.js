import { SceneContainer } from "@/components/SceneContainer";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Background = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      controls={false}
      className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none z-0"
    >
      <source src="/videos/background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

const App = ({ isMuted, setIsMuted }) => {
  return (
    <>
      <Navbar isMuted={isMuted} setIsMuted={setIsMuted} />
      <Background />
      <SceneContainer />
      <Footer />
    </>
  );
}

export default App;