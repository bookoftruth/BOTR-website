"use client";

import Layout from "@/components/layout/Layout";
import Roadmap from "@/components/roadmap/Roadmap";
import { useState } from "react";

export default function RoadmapPage() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <Layout isMuted={isMuted} setIsMuted={setIsMuted}>
      <Roadmap />
    </Layout>
  );
}