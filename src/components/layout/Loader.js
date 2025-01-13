'use client';

import { useEffect, useState } from "react";

const Loader = ({ loading, setLoading, setAlreadyEntered, setIsMuted }) => {
  const [zoomingIn, setZoomingIn] = useState(false);
  const [zoomComplete, setZoomComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  const handleEnter = () => {
    setZoomingIn(true);
    setIsMuted(false);

    setTimeout(() => {
      setZoomComplete(true);
    }, 1000);
  };

  useEffect(() => {
    if (zoomComplete) {
      setAlreadyEntered(true);
    }
  }, [zoomComplete, setAlreadyEntered]);

  return (
    <button
      className={`h-full w-full flex flex-col gap-6 items-center justify-center relative ${loading ? 'pointer-events-none' : ''}`}
      onClick={!loading ? handleEnter : null}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className={`absolute left-1/2 top-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 object-cover pointer-events-none z-0 transition-transform duration-1000 ease-in-out ${zoomingIn ? 'scale-[30] -translate-y-[900%]' : '-translate-y-1/2'}`}
      >
        <source src="/videos/loading.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Spinner while loading */}
      {loading && !zoomComplete && (
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Text after loading finishes */}
      {!loading && !zoomComplete && (
        <div className="text-white text-shadow-black text-xl xxs:text-2xl xs:text-3xl sm:text-4xl font-bold fade-in-out">
          Start your quest
        </div>
      )}

      {/* This will cover the screen with white after zoom is complete */}
      {zoomComplete && (
        <div className="absolute inset-0 bg-white z-10"></div>
      )}
    </button>
  );
};

export default Loader;