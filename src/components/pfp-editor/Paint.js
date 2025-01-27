'use client';

import { useState } from 'react';
import ProfilePicture from './ProfilePicture';

const Paint = () => {
  const [isBlack, setIsBlack] = useState(false);

  return (
    <div
      className="relative border-4 w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url("/img/pfp-editor/png.png")',
        backgroundRepeat: 'repeat',
        backgroundSize: '20px 20px',
      }}
    >
      <button
        onClick={() => setIsBlack(!isBlack)}
        className="p-2 bg-blue-500 text-white rounded-lg z-10"
      >
        Toggle Image
      </button>

      <ProfilePicture isBlack={isBlack} />
    </div>
  );
};

export default Paint;