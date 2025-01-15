'use client';

import { useState } from 'react';
import Image from 'next/image';

const ProfilePicture = ({isBlack}) => {
  const [dragging, setDragging] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  return (
    <div
      className="relative flex items-center justify-center size-book"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Image
        src={
          isBlack
            ? "/img/pfp-editor/botr-black.png"
            : "/img/pfp-editor/botr-white.png"
        }
        alt="Book Cover"
        width={3464}
        height={3464}
        className="absolute z-10 w-full h-auto"
        draggable={false}
      />

      {profilePicture ? null : (
        <div
          className={`absolute w-[69%] h-[76.5%] left-[--positionDragX] top-[--positionDragY] border-4 border-dashed ${
            dragging ? "border-blue-500 bg-blue-500/10" : "border-white/50"
          }`}
        >
            <label
              htmlFor="fileUpload"
              className="text-white flex text-center items-center justify-center h-full select-none"
            >
              Drag or click to upload
            </label>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
        </div>
      )}

      {profilePicture ? (
          <Image
            src={profilePicture}
            alt="Profile"
            width={3464}
            height={3464}
            className="absolute w-[70%] h-[80%] left-[--positionImageX] top-[--positionImageY] object-cover"
          />
      ) : null}
    </div>
  );
};

const PfpEditor = () => {
  const [isBlack, setIsBlack] = useState(false);

  return (
      <div className='relative p-24 flex flex-col items-center justify-center h-screen w-screen top-1/2'>
        <button
        onClick={() => setIsBlack(!isBlack)}
        className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Toggle Image
        </button>
        <div>

        <ProfilePicture isBlack={isBlack} />
        </div>

      </div>
  );
};

export default PfpEditor;