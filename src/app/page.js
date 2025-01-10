'use client';

import { SceneContainer } from "@/components/SceneContainer";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setLoading(false);
  };

  return (
    <div className="fixed h-screen w-screen overflow-hidden">
      {loading ? (
        <div className="bg-[#282023] h-full w-full flex items-center justify-center relative">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="max-w-[80%] max-h-[80%] shadow-lg rounded-md pointer-events-none"
          >
            <source src="/videos/loading.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-[#00000020] to-[#ffffff10] pointer-events-none"></div>

          {!showButton && (
            <div className="absolute bottom-8 flex items-center justify-center">
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {showButton && (
            <button
              onClick={handleEnter}
              className="absolute bottom-8 px-6 py-3 bg-white text-[#282023] font-bold rounded-lg shadow-md hover:bg-gray-200 transition-opacity duration-500 fade-in"
            >
              Enter the Site
            </button>
          )}
        </div>
      ) : (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
          >
            <source src="/videos/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <SceneContainer />
        </>
      )}
    </div>
  );
}