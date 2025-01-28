'use client';

import { useState } from 'react';
import ProfilePicture from './ProfilePicture';
import clsx from 'clsx';

const Paint = ({fullScreen}) => {
  const [isBlack, setIsBlack] = useState(false);

  return (
    <div className='h-full w-full overflow-auto border-2 border-t-black border-l-black border-b-white border-r-white'>
      <div
        className={clsx("relative border-4 flex items-start justify-start",
          fullScreen ? "w-full h-full" : "w-screen h-screen"
        )}
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
    </div>
  );
};

export default Paint;