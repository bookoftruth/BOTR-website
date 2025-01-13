"use client";

import Layout from "@/components/layout/Layout";
import Roadmap from "@/components/roadmap/Roadmap";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function RoadmapPage() {
  const { isMuted, setIsMuted } = useGlobalState();

  return (
    <Layout isMuted={isMuted} setIsMuted={setIsMuted}>
      <Roadmap />
    </Layout>
  );
}