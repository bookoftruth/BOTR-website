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

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        videoTexture: { value: videoTexture },
        contrast: { value: 1.0 }, // Default contrast
        whiteBalance: { value: new THREE.Vector3(1.0, 1.0, 1.0) } // Default white balance
      },
      fragmentShader: `
        uniform sampler2D videoTexture;
        uniform float contrast;
        uniform vec3 whiteBalance;
        
        varying vec2 vUv;

        void main() {
          vec4 color = texture2D(videoTexture, vUv);
          color.rgb = (color.rgb - 0.5) * contrast + 0.5; // Apply contrast
          color.rgb *= whiteBalance; // Apply white balance
          gl_FragColor = color;
        }
      `,
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `
    });

    model.scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;

        if (object.name === 'bookoftruth') {
          object.material = shaderMaterial;
        }
      }
    });
  }, [model]);

  return <primitive object={model.scene} scale={4} rotation={[-Math.PI / 4, 0, 0]} />
};

export default Botr;