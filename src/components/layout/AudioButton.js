"use client";

import { useGlobalState } from "@/utils/GlobalStateContext";
import Image from "next/image";
import clsx from "clsx";

const AudioButton = ({ theme }) => {
  const { musicPlaying, setMusicPlaying } = useGlobalState();

  return (
    <button
      onClick={() => setMusicPlaying(!musicPlaying)}
      className={clsx(
        theme !== "editor" && 
          "p-1 bg-white text-black rounded-lg shadow-md border border-black hover:bg-gray-200 transition-colors z-20"
      )}
    >
      <Image
        src={`/img/${theme !== "editor" ? "" : "image-editor/"}icons/${musicPlaying ? "sound" : "mute"}.png`}
        alt={musicPlaying ? "Sound" : "Mute"}
        width={theme === "editor" ? 65 : 16}
        height={theme === "editor" ? 63 : 16}
        className={clsx(theme === "editor" && "h-6 w-auto")}
      />
    </button>
  );
};

export default AudioButton;