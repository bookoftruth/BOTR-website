'use client';

import { useCallback, useEffect, useState } from "react";
import { useGlobalState } from "@/utils/GlobalStateContext";
import clsx from "clsx";

const Loader = () => {
  const { alreadyEntered, setAlreadyEntered, setIsMuted, setIsPlaying } = useGlobalState();
  const [loading, setLoading] = useState(true);
  const [zoomingIn, setZoomingIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setLoading]);
  
  const handleEnter = useCallback(() => {
    setZoomingIn(true);
    setTimeout(() => {
      setAlreadyEntered(true);
      setIsMuted(false);
      setIsPlaying(true);
    }, 1000);
  }, [setAlreadyEntered, setIsMuted, setIsPlaying]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!loading && (event.key === 'Enter' || event.key === ' ')) {
        handleEnter();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [loading, handleEnter]);


  return (
    <button
      className={clsx(
        "h-full w-full flex flex-col gap-6 items-center justify-center relative z-10",
        loading && "pointer-events-none"
      )}
      onClick={!loading ? handleEnter : null}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className={clsx(
          "absolute left-1/2 top-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 object-cover pointer-events-none z-0 transition-transform duration-1000 ease-in-out",
          zoomingIn ? "scale-[30] -translate-y-[900%]" : "-translate-y-1/2"
        )}
      >
        <source src="/videos/loading.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {loading && !alreadyEntered && (
        <div className="flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}

      {!loading && !alreadyEntered && (
        <div className="text-white text-shadow-black text-xl xxs:text-2xl xs:text-3xl sm:text-4xl font-bold fade-in-out">
          Start your quest
        </div>
      )}
    </button>
  );
};

export default Loader;