import Navbar from "./Navbar";
import Footer from "./Footer";

const Background = () => (
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

const Layout = ({ children, isMuted, setIsMuted }) => (
  <>
    <Navbar isMuted={isMuted} setIsMuted={setIsMuted} />
    <Background />
    <main className="relative z-10">{children}</main>
    <Footer />
  </>
);

export default Layout;