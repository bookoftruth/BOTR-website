'use client';

import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const createShaderMaterial = (videoTexture) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      videoTexture: { value: videoTexture },
      contrast: { value: 2 },
      whiteBalance: { value: new THREE.Vector3(1.2, 1.2, 1.2) }
    },
    fragmentShader: `
      uniform sampler2D videoTexture;
      uniform float contrast;
      uniform vec3 whiteBalance;
      
      varying vec2 vUv;

      void main() {
        vec4 color = texture2D(videoTexture, vUv);
        color.rgb = (color.rgb - 0.2) * contrast + 0.2;
        color.rgb *= whiteBalance;
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
};

const Botr = () => {
  const model = useGLTF('/models/botr.glb');
  const videoRef = useRef();
  const videoBackRef = useRef();
  const [scale, setScale] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) {
        setScale(3);
      } else {
        setScale(4);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/videos/bookoftruth.mp4';
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.controls = false; 
    video.play();
    videoRef.current = video;

    const videoTexture = new THREE.VideoTexture(video);
    const shaderMaterial = createShaderMaterial(videoTexture);

    const videoBack = document.createElement('video');
    videoBack.src = '/videos/BOTR_back.mp4';
    videoBack.crossOrigin = 'anonymous';
    videoBack.loop = true;
    videoBack.muted = true;
    videoBack.playsInline = true;
    videoBack.controls = false; 
    videoBack.play();
    videoBackRef.current = videoBack;

    const videoBackTexture = new THREE.VideoTexture(videoBack);
    const shaderMaterialBack = createShaderMaterial(videoBackTexture);

    model.scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;

        if (object.name === 'bookoftruth') {
          object.material = shaderMaterial;
          object.userData.pointerEvents = 'none';
        }

        if (object.name === 'BOTR_back') {
          object.material = shaderMaterialBack;
          object.userData.pointerEvents = 'none';
        }
      }
    });
  }, [model]);

  return <primitive object={model.scene} scale={scale} rotation={[-Math.PI / 4, 0, 0]} />
}

export default Botr;