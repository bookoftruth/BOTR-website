'use client';

import { SceneContainer } from "@/components/SceneContainer";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useRef, useState } from "react";

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
    const textRef = useRef(null);
    const [animationDuration, setAnimationDuration] = useState(5);
  
    useEffect(() => {
      const calculateAnimationDuration = () => {
        if (textRef.current) {
          const textWidth = textRef.current.offsetWidth;
          const viewportWidth = window.innerWidth;

          const speed = 300;
          const totalDistance = textWidth + viewportWidth;
          setAnimationDuration(totalDistance / speed);
        }
      };

      calculateAnimationDuration();

      window.addEventListener("resize", calculateAnimationDuration);
      return () =>
        window.removeEventListener("resize", calculateAnimationDuration);
    }, []);

  return (
    <>
      <Navbar isMuted={isMuted} setIsMuted={setIsMuted}/>
      <Background />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="relative w-full overflow-hidden z-0">
          <p
            ref={textRef}
            className="whitespace-nowrap text-[12rem] font-gothic select-none pointer-events-none hidden xl:block"
            style={{
              animation: `scroll ${animationDuration}s linear infinite`,
            }}
          >
            Book of Truth
          </p>
        </div>
        <SceneContainer />
        <div className="absolute w-full bottom-24 max-w-[1350px]">
          <p className="text-center text-5xl xxs:text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-gothic xl:hidden">
            Book of Truth
          </p>
          <div className="flex flex-row justify-around w-full">
            <a href="https://x.com/bookoftruth_/" target="blank">
              <img
                src="/img/icons/x.png"
                alt="x-icon"
                className="w-12 h-12 md:w-24 md:h-24 transition-transform duration-200 hover:scale-110"
              />
            </a>
            <a href="https://t.me/bookoftruthcto" target="blank">
              <img
                src="/img/icons/telegram.png"
                alt="telegram-icon"
                className="w-12 h-12 md:w-24 md:h-24 transition-transform duration-200 hover:scale-110"
              />
            </a>
            <a href="https://dexscreener.com/solana/9cnj6rr7chvtertvnfbyckqnkfwnrpbi7djznybdv5pz" target="blank">
              <img
                src="/img/icons/dexscreener.png"
                alt="dexscreener-icon"
                className="w-12 h-12 md:w-24 md:h-24 transition-transform duration-200 hover:scale-110"
              />
            </a>
            <a href="https://raydium.io/swap/?inputMint=sol&outputMint=73242b77KLvkkUNRQRT3CYNbNFq28dFoy8F2tF6apump" target="blank">
              <img
                src="/img/icons/raydium.png"
                alt="raydium-icon"
                className="w-12 h-12 md:w-24 md:h-24 transition-transform duration-200 hover:scale-110"
              />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;