'use client';

import { useRef, useEffect } from 'react';

const Navbar = ({ isMuted, setIsMuted }) => {
  const audioRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="fixed top-0 h-24 w-full z-20 flex items-center px-4">
      <a
        href="/"
        className="text-start font-gothic text-black text-shadow-white text-5xl flex-shrink-0"
      >
        Book of Truth
      </a>

      <div className="absolute left-1/2 transform -translate-x-1/2 hidden xl:flex justify-center items-center text-3xl text-white text-shadow-black gap-12">
        <a href="#roadmap">Roadmap</a>
        <a href="#reader">The Reader</a>
        <a href="#editor">PFP Editor</a>
      </div>

      <div className="ml-auto flex items-center">
        <audio ref={audioRef} src="/music/music.mp3" autoPlay loop />

        <div className='hidden xl:block'>
          <button
            onClick={toggleMute}
            className="p-1 bg-white text-black rounded-lg shadow-md border border-black hover:bg-gray-200 transition-colors z-20"
          >
            {isMuted ? (
              <img src="/img/icons/mute.png" alt="Mute" className="w-6 h-6" />
            ) : (
              <img src="/img/icons/sound.png" alt="Sound" className="w-6 h-6" />
            )}
          </button>
        </div>

        <a className='xl:hidden'>
          <img src="/img/icons/menu.png" alt="menu" className="w-12 h-12" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;