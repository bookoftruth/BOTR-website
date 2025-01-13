"use client";

import Layout from "@/components/layout/Layout";
import PfpEditor from "@/components/pfp-editor/PfpEditor";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function PfpEditorPage() {
  const { isMuted, setIsMuted } = useGlobalState();

  return (
    <Layout isMuted={isMuted} setIsMuted={setIsMuted}>
      <PfpEditor />
    </Layout>
  );
}