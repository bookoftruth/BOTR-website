"use client";

import { useGlobalState } from "@/context/GlobalStateContext";
import Image from "next/image";
import clsx from "clsx";

const AudioButton = ({ theme }) => {
  const { isMuted, setIsMuted } = useGlobalState();

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className={clsx(
        theme !== "editor" && 
          "p-1 bg-white text-black rounded-lg shadow-md border border-black hover:bg-gray-200 transition-colors z-20"
      )}
    >
      <Image
        src={`/img/${theme !== "editor" ? "" : "pfp-editor/"}icons/${isMuted ? "mute" : "sound"}.png`}
        alt={isMuted ? "Mute" : "Sound"}
        width={16}
        height={16}
        className={clsx(theme === "editor" && "h-8 w-auto")}
      />
    </button>
  );
};

export default AudioButton;