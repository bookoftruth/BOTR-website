'use client';

import { useRef, useEffect } from 'react';
import { useGlobalState } from "@/context/GlobalStateContext";

const AudioPlayer = () => {
  const { isMuted } = useGlobalState();
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return <audio ref={audioRef} src="/music/music.mp3" autoPlay loop />;
};

export default AudioPlayer;