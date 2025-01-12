'use client';

import Layout from "@/components/layout/Layout";
import Loader from "@/components/layout/Loader";
import { SceneContainer } from "@/components/botr/SceneContainer";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [enterButton, setEnterButton] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <>
      {loading ? 
        <Loader
          setLoading={setLoading} 
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