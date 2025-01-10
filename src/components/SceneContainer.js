'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stats } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import Botr from './Botr';
import Lights from './Lights';

export function SceneContainer() {
    // const [isEntered, setIsEntered] = useState(false);
    // const handleEnterClick = () => {
    //   setIsEntered(true); // User clicked "Enter", start the scene
    // };

  const testing = false;


  const botrRef = useRef();
  const isDraggingRef = useRef(false);
  const lastPointerPositionRef = useRef([0, 0]);

  const handlePointerDown = (event) => {
    isDraggingRef.current = true;
    lastPointerPositionRef.current = [event.clientX, event.clientY];
  };

  const handlePointerMove = (event) => {
    if (isDraggingRef.current && botrRef.current) {
      const [lastX, lastY] = lastPointerPositionRef.current;
      const deltaX = (event.clientX - lastX) * 0.01;
      const deltaY = (event.clientY - lastY) * 0.01;

      botrRef.current.rotation.y += deltaX;
      botrRef.current.rotation.x += deltaY;

      lastPointerPositionRef.current = [event.clientX, event.clientY];
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className="fixed h-screen w-screen"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* {!isEntered && (
        <div className="flex justify-center items-center h-full bg-gray-800">
          <button
            onClick={handleEnterClick}
            className="text-white text-xl p-4 bg-blue-500 hover:bg-blue-700 rounded-md"
          >
            Enter
          </button>
        </div>
      )} */}
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 3, 5] }}
      >
        <Suspense fallback={null}>
          {testing && <Stats />}
          {testing && <axesHelper args={[2]} />}
          {testing && <gridHelper args={[10, 10]} />}

          <Lights isTesting={testing} />

          <Float speed={1} rotationIntensity={1} floatIntensity={1}>
            <group ref={botrRef}>
              <Botr />
            </group>
          </Float>

          <OrbitControls
            enablePan={false}
            enableRotate={false}
            enableZoom={true}
            zoomSpeed={0.5}
            minDistance={3.5}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}