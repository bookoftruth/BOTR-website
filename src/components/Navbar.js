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
    <div>
      <audio ref={audioRef} src="/music/music.mp3" autoPlay loop />
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 p-2 bg-white text-black rounded-lg shadow-md hover:bg-gray-200 transition-colors z-20"
      >
        {isMuted ? (
          <img src="/img/icons/mute.png" alt="Mute" className="w-8 h-8" />
        ) : (
          <img src="/img/icons/sound.png" alt="Sound" className="w-8 h-8" />
        )}
      </button>
    </div>
  );
};

export default Navbar;