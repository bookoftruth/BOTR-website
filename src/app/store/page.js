"use client";

import Layout from "@/components/layout/Layout";
import Store from "@/components/store/Store";
import { useState } from "react";

export default function StorePage() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <Layout isMuted={isMuted} setIsMuted={setIsMuted}>
      <Store />
    </Layout>
  );
}