'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const getInitialPosition = () => {
    return {
      width: window.innerWidth * 0.5,
      height: window.innerHeight * 0.5,
      top: window.innerHeight * 0.25,
      left: window.innerWidth * 0.25,
    };
  };
  

const Window = ({ zIndex, fullScreen, toggleFullScreen, closed, closeWindow, hidden, hideWindow, active, activateWindow, index, children, title, icon, description }) => {
    const [dimensionsDefined, setDimensionsDefined] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, top: 0, left: 0 });
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setDimensions(getInitialPosition());
        setDimensionsDefined(true);
      } else {
        return null;
      }
    }, []);
  
    const windowRef = useRef(null);
    const topBarRef = useRef(null);
    const hideButtonRef = useRef(null);
    const closeButtonRef = useRef(null);
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
          const newWidth = e.clientX - windowRef.current.getBoundingClientRect().left;
          newDimensions.width = Math.max(newWidth, 100);
        }
  
        if (resizeDirection.current === 'bottom') {
          const newHeight = e.clientY - windowRef.current.getBoundingClientRect().top;
          newDimensions.height = Math.max(newHeight, 100);
        }
  
        if (resizeDirection.current === 'bottom-right') {
          const newWidth = e.clientX - windowRef.current.getBoundingClientRect().left;
          const newHeight = e.clientY - windowRef.current.getBoundingClientRect().top;
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
        ref={windowRef}
        className={clsx(
          "shadow-lg font-windows border-4 border-t-white border-l-white border-b-black border-r-black px-0.5 bg-windows-primary",
          fullScreen ? "fixed" : "absolute",
          (closed || hidden) && "hidden"
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
          opacity: dimensionsDefined ? 1 : 0,
          transition: "opacity 0.1s ease-in",
          zIndex: zIndex,
        }}
        onMouseDown={(e) => {
          if (
            hideButtonRef.current &&
            closeButtonRef.current &&
            !hideButtonRef.current.contains(e.target) &&
            !closeButtonRef.current.contains(e.target)
          ) {
            activateWindow(index);
          }
        }}
      >
        <div className="h-full w-full flex flex-col">
          <div
            ref={topBarRef}
            className={clsx(
              "w-full h-6 z-10 items-center flex flex-row gap-1 cursor-move",
              active ? "bg-[#060087]" : "bg-[#808080]",
              !fullScreen && "cursor-move"
            )}
            onMouseDown={handleDragStart}
          >
            <Image
              src={icon}
              alt={title}
              width={250}
              height={250}
              className="h-4 w-auto ml-0.5"
            />
            <div className="text-white">{title}</div>

            <div className="flex ml-auto h-full w-auto">
              <button
                ref={hideButtonRef}
                className="h-full w-auto"
                onClick={() => hideWindow(index)}
              >
                <Image
                  src="/img/image-editor/minimize.png"
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
                  src="/img/image-editor/fullscreen.png"
                  alt="Full Window Control"
                  width={536}
                  height={528}
                  className="h-full w-auto"
                />
              </button>

              <button
                ref={closeButtonRef}
                className="h-full w-auto"
                onClick={() => {
                  closeWindow(index);
                  resetPosition();
                }}
              >
                <Image
                  src="/img/image-editor/close.png"
                  alt="Close Window Control"
                  width={536}
                  height={528}
                  className="h-full w-auto"
                />
              </button>
            </div>
          </div>

          <div className="w-full h-8 flex flex-row gap-4 pl-2 items-end">
            <button>
              <span className="underline">F</span>ile
            </button>
            <button>
              <span className="underline">E</span>dit
            </button>
            <button>
              <span className="underline">V</span>iew
            </button>
            {index === 0 && (
              <>
                <button>
                  <span className="underline">I</span>mage
                </button>
                <button>
                  <span className="underline">O</span>ptions
                </button>
              </>
            )}
            <button>
              <span className="underline">H</span>elp
            </button>
          </div>

          <div className="h-full w-full overflow-auto border-2 border-t-black border-l-black border-b-white border-r-white bg-[#D8D8D8]">
            {children}
          </div>

          <div className="w-full h-8 mt-auto flex flex-row items-center gap-0.5">
            <div className="h-5/6 w-3/4 flex items-start justify-start pl-0.5 bg-windows-primary border border-t-black border-l-black border-b-white border-r-white">
              {dimensions.width > 400 && description}
            </div>
            <div className="h-5/6 w-2/12 flex items-center justify-center bg-windows-primary border border-t-black border-l-black border-b-white border-r-white"></div>
            <div className="h-5/6 w-1/12 relative bg-windows-primary">
              <div className="absolute w-full h-full border border-t-black border-l-black border-b-white border-r-white"></div>
              <Image
                src="/img/image-editor/resize-corner.svg"
                alt='Resize Window Control'
                width={14}
                height={14}
                className="absolute bottom-0 right-0"
              />
            </div>
          </div>
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

  export default Window;