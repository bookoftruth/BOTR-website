'use client';

import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Botr = () => {
  const model = useGLTF('/models/botr.glb');
  const videoRef = useRef();

  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/videos/bookoftruth.mp4';
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.play();
    videoRef.current = video;

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.encoding = THREE.sRGBEncoding;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    model.scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }

      if (object.isMesh && object.name === 'bookoftruth') {
        object.material.map = videoTexture;
        object.material.needsUpdate = true;
      }
    });
  }, [model]);

  return <primitive object={model.scene} scale={4} rotation={[-Math.PI / 4, 0, 0]} />
};

export default Botr;