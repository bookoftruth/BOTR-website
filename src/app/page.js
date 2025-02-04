'use client';

import Layout from "@/components/layout/Layout";
import Loader from "@/components/layout/Loader";
import { SceneContainer } from "@/components/pages/home/SceneContainer";
import { useGlobalState } from "@/utils/GlobalStateContext";
import { useEffect } from "react";

export default function Home() {
  const { alreadyEntered } = useGlobalState();

  useEffect(() => {
    if (!alreadyEntered) {
      document.body.classList.add("bg-white-body");
    } else {
      document.body.classList.remove("bg-white-body");
    }

    return () => {
      document.body.classList.remove("bg-white-body");
    };
  }, [alreadyEntered]);

  return (
    <>
      {!alreadyEntered ? <Loader /> : null}
      <div
        className={`transition-opacity duration-1000 ${
          !alreadyEntered ? "opacity-0" : "opacity-100"
        }`}
      >
        <Layout>
          <SceneContainer />
        </Layout>
      </div>
    </>
  );
}