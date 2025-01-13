'use client';

import Layout from "@/components/layout/Layout";
import Loader from "@/components/layout/Loader";
import { SceneContainer } from "@/components/botr/SceneContainer";
import { useState } from "react";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [enterButton, setEnterButton] = useState(false);
  const { alreadyEntered, setAlreadyEntered, isMuted, setIsMuted } = useGlobalState();

  return (
    <>
      {loading && !alreadyEntered ? 
        <Loader
          setLoading={setLoading}
          alreadyEntered={alreadyEntered} 
          setAlreadyEntered={setAlreadyEntered}  
          enterButton={enterButton} 
          setEnterButton={setEnterButton} 
          setIsMuted={setIsMuted}
        />
        : 
        <Layout isMuted={isMuted} setIsMuted={setIsMuted}>
          <SceneContainer />
        </Layout>
      }
    </>
  );
}