"use client";

import Layout from "@/components/layout/Layout";
import Reader from "@/components/reader/Reader";
import { useState } from "react";

export default function ReaderPage() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <Layout isMuted={isMuted} setIsMuted={setIsMuted}>
      <Reader />
    </Layout>
  );
}