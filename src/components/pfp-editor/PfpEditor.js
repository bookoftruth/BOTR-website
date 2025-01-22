'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

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

      {!profilePicture && (
        <div
          className={`drag-upload border-4 border-dashed ${
            dragging ? "border-blue-500 bg-blue-500/10" : "border-white/50"
          }`}
        >
            <label
              htmlFor="fileUpload"
              className="text-black text-shadow-white-2 flex text-center items-center justify-center h-full select-none"
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

      {profilePicture && (
          <Image
            src={profilePicture}
            alt="Profile"
            width={3464}
            height={3464}
            className="profile-picture"
          />
      )}
    </div>
  );
};

const Paint = () => {
  const [isBlack, setIsBlack] = useState(false);
  return (
    <div className="relative p-24 flex flex-col items-center justify-center h-screen w-screen top-1/2 font-windows">
      <div className="relative border-4 border-white w-1/2 h-1/2 items-center justify-center flex">
        <div className="absolute top-0 w-full h-5 bg-[#060087] z-10 items-center flex flex-row gap-1">
          <Image
            src="/img/pfp-editor/icons/paint.png"
            alt="Paint Logo"
            width={250}
            height={250}
            className="h-4 w-auto ml-0.5"
          />
          <div className="text-white">untitled - Paint</div>
          <Image
            src="/img/pfp-editor/window-controls.png"
            alt="Window Controls"
            width={1701}
            height={527}
            className="h-full w-auto ml-auto"
          />
        </div>
        <Image
          src="/img/pfp-editor/png.png"
          alt="PNG Background"
          fill
          className="pointer-events-none object-cover"
        />
        <button
          onClick={() => setIsBlack(!isBlack)}
          className="p-2 bg-blue-500 text-white rounded-lg z-10"
        >
          Toggle Image
        </button>
        <ProfilePicture isBlack={isBlack} />
      </div>
    </div>
  )
}

const Window = ({ fullScreen, toggleFullScreen, index }) => (
  <>
    <div
      className={clsx(
        "fixed w-screen border-4 border-white bg-black z-50",
        fullScreen ? "top-0 bottom-10 w-screen" : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2"
      )}
    >
      <button
        className="absolute left-1/2 top-1/2 text-white text-2xl"
        onClick={() => toggleFullScreen(index)}
      >
        Toggle Fullscreen
      </button>
    </div>
  </>
);

const PfpEditor = () => {
  const [windows, setWindows] = useState([
    { id: 1, fullScreen: false },
    // { id: 2, fullScreen: false },
  ]);

  const toggleFullScreen = (index) => {
    setWindows((prevWindows) =>
      prevWindows.map((window, i) =>
        i === index ? { ...window, fullScreen: !window.fullScreen } : window
      )
    );
  };

  return (
    <>
      {windows.map((window, index) => (
        <Window
          key={window.id}
          fullScreen={window.fullScreen}
          toggleFullScreen={toggleFullScreen}
          index={index}
        />
      ))}

      {/* <Paint /> */}
    </>
  );
};

export default PfpEditor;