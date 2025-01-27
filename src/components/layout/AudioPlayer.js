'use client';

import { useRef, useEffect } from 'react';
import { useGlobalState } from "@/utils/GlobalStateContext";

const AudioPlayer = () => {
  const { isMuted, isPlaying } = useGlobalState();
  const audioRef = useRef();

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.muted = isMuted;

      if (isPlaying) {
        audioElement.play().catch((err) => {
          console.error("Autoplay blocked or other error:", err);
        });
      } else {
        audioElement.pause();
      }
    }
  }, [isMuted, isPlaying]);

  return <audio ref={audioRef} src="/music/music.mp3" loop />;
};

export default AudioPlayer;