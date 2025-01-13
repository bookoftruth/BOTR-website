"use client";

import Layout from "@/components/layout/Layout";
import Reader from "@/components/reader/Reader";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function ReaderPage() {
  const { isMuted, setIsMuted } = useGlobalState();

  return (
    <Layout isMuted={isMuted} setIsMuted={setIsMuted}>
      <Reader />
    </Layout>
  );
}