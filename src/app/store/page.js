"use client";

import Layout from "@/components/layout/Layout";
import Store from "@/components/store/Store";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function StorePage() {
  const { isMuted, setIsMuted } = useGlobalState();
  return (
    <Layout isMuted={isMuted} setIsMuted={setIsMuted}>
      <Store />
    </Layout>
  );
}