'use client';

import { useRef, useEffect } from 'react';
import { useGlobalState } from "@/utils/GlobalStateContext";

const AudioPlayer = () => {
  const { musicPlaying } = useGlobalState();
  const audioRef = useRef();

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      if (musicPlaying) {
        audioElement.play().catch((err) => {
          console.error("Autoplay blocked or other error:", err);
        });
      } else {
        audioElement.pause();
      }
    }
  }, [musicPlaying]);

  return <audio ref={audioRef} src="/music/music.mp3" loop />;
};

export default AudioPlayer;