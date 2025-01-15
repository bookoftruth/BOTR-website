"use client";

import Layout from "@/components/layout/Layout";
import PfpEditor from "@/components/pfp-editor/PfpEditor";

export default function PfpEditorPage() {
  return (
    <Layout backgroundType="editor">
      <PfpEditor />
    </Layout>
  );
}