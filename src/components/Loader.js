'use client';

import { useEffect } from "react";

const Loader = ({ setLoading, enterButton, setEnterButton, setIsMuted }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setEnterButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setEnterButton]);

  const handleEnter = () => {
    setLoading(false);
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
        className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none z-0"
      >
        <source src="/videos/loading.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>


      {!enterButton && (
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {enterButton && (
        <button
          onClick={handleEnter}
          className="px-6 py-3 bg-white text-white border border-black text-shadow-black text-xl lg:text-3xl font-bold rounded-lg shadow-md hover:bg-gray-200 transition-opacity duration-500 fade-in"
        >
          Start your quest
        </button>
      )}
    </div>
  );
};

export default Loader;