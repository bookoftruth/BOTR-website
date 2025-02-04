'use client';

import Image from "next/image";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import AudioButton from "@/components/layout/Audio/AudioButton";
import NavBar from "@/components/layout/TopBar/NavLinks/NavBar";
import { useGlobalState } from "@/utils/GlobalStateContext";
import SocialLinks from "@/components/layout/Footer/SocialLinks";

const BottomBar = ({ theme, windows, activateWindow }) => {
  const { setAlreadyEntered } = useGlobalState();

  const [startOpen, setStartOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const startRefs = useRef([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours} : ${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        startRefs.current.every((ref) => ref && !ref.contains(event.target))
      ) {
        setStartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="fixed bottom-0 left-0 flex bg-windows-primary pl-2 w-full h-10 items-center border border-t-2 border-t-white font-windows z-10">
        <button
          ref={(el) => (startRefs.current[1] = el)}
          onClick={() => setStartOpen(!startOpen)}
        >
          <Image
            src={`/img/image-editor/icons/${startOpen ? "start-opened" : "start"}.png`}
            alt="Start"
            width={111}
            height={43}
            className="h-8 w-auto"
          />
        </button>

        <div className="hidden lg:flex flex-row gap-1 m-1 w-full font-black items-center">
          {windows
            .map((window, index) => ({ ...window, originalIndex: index }))
            .filter((window) => !window.closed)
            .sort((a, b) => a.openingOrder - b.openingOrder)
            .map((window) => (
              <button
                key={window.originalIndex}
                onClick={() => activateWindow(window.originalIndex)}
                className={clsx(
                  "flex flex-row gap-2 border-2 p-1 w-64 h-8 items-center",
                  window.active
                    ? "bg-[#D8D8D8] border-t-black border-l-black border-b-white border-r-white"
                    : "bg-windows-primary border-t-white border-l-white border-b-black border-r-black"
                )}
              >
                <Image
                  src={window.icon}
                  alt={window.title}
                  width={24}
                  height={24}
                />
                {window.title}
              </button>
            ))}
        </div>

        <div className="flex text-xl text-black flex-row gap-1 items-center ml-auto mr-0.5 pr-2 pl-1 h-8 w-28 border-2 border-t-black border-l-black border-b-white border-r-white whitespace-nowrap">
          <AudioButton theme={theme} />
          <div className="ml-auto flex mt-0.5">{currentTime}</div>
        </div>
      </div>

      <div
        ref={(el) => (startRefs.current[0] = el)}
        className={clsx(
          "fixed bg-windows-primary z-50 h-96 w-64 bottom-8 left-1 shadow-lg flex flex-row border-4 border-t-white border-l-white border-b-black border-r-black",
          startOpen ? "block" : "hidden"
        )}
      >
        <div className="bg-windows-secondary w-10 flex-shrink-0"></div>
        <div className="text-white text-4xl font-sans-serif font-thin h-10 w-full absolute bottom-2 left-[2.7rem] origin-bottom-left -rotate-90">
          <span className="text-windows-primary font-black">Windows</span>95
        </div>
        <div
          onClick={() => setStartOpen(false)}
          className="overflow-auto scrollbar-hide font-windows w-full"
        >
          <NavBar
            theme={theme}
            setAlreadyEntered={setAlreadyEntered}
            activateWindow={activateWindow}
            setMenuOpen={undefined}
            bottomBar
          />
          <div className="bg-windows-secondary w-full h-0.5 border-b border-b-white"></div>
          <SocialLinks theme={theme} bottomBar />
        </div>
      </div>
    </>
  );
};

export default BottomBar;