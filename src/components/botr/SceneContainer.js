'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Stats } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Botr from './Botr';
import Lights from './Lights';
import { useGlobalState } from '@/utils/GlobalStateContext';

const ResponsiveCanvas = () => {
  const { camera, gl } = useThree();
  const { alreadyEntered } = useGlobalState();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      gl.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [camera, gl]);

  useEffect(() => {
    if (alreadyEntered) {
      gsap.to(camera.position, {
        duration: 2,
        x: 0,
        y: 3,
        z: 5,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        },
      });
    }
  }, [camera, alreadyEntered]);


  return null;
};

export function SceneContainer() {
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
      className="fixed top-0 left-0 flex items-center justify-center h-full w-full"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 3, 10] }}
      >
        <Suspense fallback={null}>
          {testing && <Stats />}
          {testing && <axesHelper args={[2]} />}
          {testing && <gridHelper args={[10, 10]} />}

          <Lights />

          <ResponsiveCanvas />

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