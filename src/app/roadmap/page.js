"use client";

import Layout from "@/components/layout/Layout";
import Roadmap from "@/components/roadmap/Roadmap";

export default function RoadmapPage() {
  return (
    <div className="h-full w-full overflow-auto">
      <Layout theme="roadmap">
        <Roadmap />
      </Layout>
    </div>
  );
}