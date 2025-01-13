'use client';

import Layout from "@/components/layout/Layout";
import Loader from "@/components/layout/Loader";
import { SceneContainer } from "@/components/botr/SceneContainer";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function Home() {
  const { alreadyEntered } = useGlobalState();

  return (
    <div className="fixed h-full w-full overflow-hidden">
      {!alreadyEntered ? 
        <Loader />
        : 
        <Layout>
          <SceneContainer />
        </Layout>
      }
    </div>
  );
}