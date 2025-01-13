'use client';

import Layout from "@/components/layout/Layout";
import Loader from "@/components/layout/Loader";
import { SceneContainer } from "@/components/botr/SceneContainer";
import { useState } from "react";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { alreadyEntered, setAlreadyEntered, isMuted, setIsMuted } = useGlobalState();

  return (
    <>
      {!alreadyEntered ? 
        <Loader
          loading={loading}
          setLoading={setLoading}
          setAlreadyEntered={setAlreadyEntered}
          setIsMuted={setIsMuted}
        />
        : 
        <Layout>
          <SceneContainer />
        </Layout>
      }
    </>
  );
}