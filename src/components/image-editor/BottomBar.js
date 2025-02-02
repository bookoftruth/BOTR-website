'use client';

import Image from "next/image";
import AudioButton from "../layout/AudioButton";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

const BottomBar = ({ theme, windows, activateWindow }) => {
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
        <div className="bg-[#808080] w-10 flex-shrink-0"></div>
        <div className="text-white text-5xl font-thin h-10 w-full absolute bottom-2 left-[2.25rem] origin-bottom-left -rotate-90">
          <span className="text-windows-primary font-black">Windows</span>95
        </div>
        <div className="overflow-auto scrollbar-hide">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Sed ut
          perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
          odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
          quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
          eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
          ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
          velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
          fugiat quo voluptas nulla pariatur?
        </div>
      </div>
    </>
  );
};

export default BottomBar;