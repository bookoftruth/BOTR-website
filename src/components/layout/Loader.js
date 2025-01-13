'use client';

import { useEffect } from "react";

const Loader = ({ loading, setLoading, setAlreadyEntered, setIsMuted }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  const handleEnter = () => {
    setAlreadyEntered(true);
    setIsMuted(false);
  };

  return (
    <div className="bg-[#282023] h-full w-full flex flex-col gap-6 items-center justify-center relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className="absolute left-1/2 top-1/4 w-auto h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/4 object-cover pointer-events-none z-0"
      >
        <source src="/videos/loading.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>


      {loading && (
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && (
        <button
          onClick={handleEnter}
          className="text-white text-shadow-black text-xl xxs:text-2xl xs:text-3xl sm:text-4xl font-bold fade-in-out"
        >
          Start your quest
        </button>
      )}
    </div>
  );
};

export default Loader;