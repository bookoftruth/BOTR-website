'use client';

import { useRef, useState, useEffect } from 'react';
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

const Window = ({ fullScreen, toggleFullScreen, index, children, title, icon, alt }) => {
  const getInitialPosition = () => {
    return {
      width: window.innerWidth * 0.5,
      height: window.innerHeight * 0.5,
      top: window.innerHeight * 0.25,
      left: window.innerWidth * 0.25,
    };
  };

  const [dimensions, setDimensions] = useState(() => getInitialPosition());

  const containerRef = useRef(null);
  const topBarRef = useRef(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const isResizing = useRef(false);
  const resizeDirection = useRef('');

  const resetPosition = () => {
    setDimensions(getInitialPosition());
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions((prev) => {
        const newWidth = Math.min(prev.width, window.innerWidth);
        const newHeight = Math.min(prev.height, window.innerHeight);
        const newTop = Math.min(prev.top, window.innerHeight - newHeight);
        const newLeft = Math.min(prev.left, window.innerWidth - newWidth);

        return {
          ...prev,
          width: newWidth,
          height: newHeight,
          top: newTop >= 0 ? newTop : 0,
          left: newLeft >= 0 ? newLeft : 0,
        };
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDragStart = (e) => {
    if (fullScreen) return;
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - dimensions.left,
      y: e.clientY - dimensions.top,
    };
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const remToPx = (rem) => parseFloat(getComputedStyle(document.documentElement).fontSize) * rem;

  const handleDrag = (e) => {
    if (!isDragging.current) return;

    const bottomBarHeight = remToPx(2.5);

    setDimensions((prev) => {
      const newTop = Math.max(
        0,
        Math.min(
          e.clientY - dragOffset.current.y,
          window.innerHeight - prev.height - bottomBarHeight
        )
      );

      const newLeft = Math.max(
        0,
        Math.min(
          e.clientX - dragOffset.current.x,
          window.innerWidth - prev.width
        )
      );

      return {
        ...prev,
        top: newTop,
        left: newLeft,
      };
    });
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const handleMouseDown = (e, direction) => {
    e.preventDefault();
    isResizing.current = true;
    resizeDirection.current = direction;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;

    setDimensions((prev) => {
      const newDimensions = { ...prev };

      if (resizeDirection.current === 'right') {
        const newWidth = e.clientX - containerRef.current.getBoundingClientRect().left;
        newDimensions.width = Math.max(newWidth, 100);
      }

      if (resizeDirection.current === 'bottom') {
        const newHeight = e.clientY - containerRef.current.getBoundingClientRect().top;
        newDimensions.height = Math.max(newHeight, 100);
      }

      if (resizeDirection.current === 'bottom-right') {
        const newWidth = e.clientX - containerRef.current.getBoundingClientRect().left;
        const newHeight = e.clientY - containerRef.current.getBoundingClientRect().top;
        newDimensions.width = Math.max(newWidth, 100);
        newDimensions.height = Math.max(newHeight, 100);
      }

      return newDimensions;
    });
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        "shadow-lg z-50 font-windows",
        fullScreen ? "fixed" : "absolute overflow-auto"
      )}
      style={{
        width: fullScreen ? "100%" : `${dimensions.width}px`,
        height: fullScreen ? "100%" : `${dimensions.height}px`,
        top: `${fullScreen ? 0 : dimensions.top}px`,
        left: `${fullScreen ? 0 : dimensions.left}px`,
        minWidth: "300px",
        minHeight: "200px",
        maxHeight: `calc(100vh - 2.5rem - ${fullScreen ? 0 : dimensions.top}px)`,
        maxWidth: `calc(100vw - ${fullScreen ? 0 : dimensions.left}px)`,
      }}
    >
      <div className="h-full w-full flex flex-col">
        <div
          ref={topBarRef}
          className={clsx("w-full h-6 bg-[#060087] z-10 items-center flex flex-row gap-1 cursor-move",
            !fullScreen && "cursor-move"
          )}
          onMouseDown={handleDragStart}
        >
          <Image
            src={icon}
            alt={alt}
            width={250}
            height={250}
            className="h-4 w-auto ml-0.5"
          />
          <div className="text-white">{title}</div>

          <div className="flex ml-auto h-full w-auto">
            <button className="h-full w-auto">
              <Image
                src="/img/pfp-editor/minimize.png"
                alt="Minimize Window Control"
                width={597}
                height={528}
                className="h-full w-auto"
              />
            </button>

            <button
              className="h-full w-auto"
              onClick={() => toggleFullScreen(index)}
            >
              <Image
                src="/img/pfp-editor/fullscreen.png"
                alt="Full Window Control"
                width={536}
                height={528}
                className="h-full w-auto"
              />
            </button>

            <button className="h-full w-auto">
              <Image
                src="/img/pfp-editor/close.png"
                alt="Close Window Control"
                width={536}
                height={528}
                className="h-full w-auto"
              />
            </button>
          </div>
        </div>

        {children}
      </div>

      <div
        className="absolute top-0 right-0 h-full w-2 cursor-hor-resize"
        onMouseDown={(e) => handleMouseDown(e, "right")}
      ></div>

      <div
        className="absolute bottom-0 left-0 w-full h-2 cursor-vert-resize"
        onMouseDown={(e) => handleMouseDown(e, "bottom")}
      ></div>

      <div
        className="absolute bottom-0 right-0 h-4 w-4 bg-transparent cursor-diag-right-resize"
        onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
      ></div>
    </div>
  );
};

const PfpEditor = () => {
  const [windows, setWindows] = useState([
    {
      id: 1,
      fullScreen: false,
      title: "untitled - Paint",
      icon: "/img/pfp-editor/icons/paint.png",
    },
    // {
    //   id: 2,
    //   fullScreen: false,
    //   title: "untitled - Paint",
    //   icon: "/img/pfp-editor/icons/paint.png",
    // },
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
          title={window.title}
          icon={window.icon}
        >
          <Paint />
        </Window>
      ))}
    </>
  );
};

export default PfpEditor;