"use client";

import Layout from "@/components/layout/Layout";
import PfpEditor from "@/components/pfp-editor/PfpEditor";
import { useState } from "react";

export default function PfpEditorPage() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <Layout isMuted={isMuted} setIsMuted={setIsMuted}>
      <PfpEditor />
    </Layout>
  );
}