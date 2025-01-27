"use client";

import Layout from "@/components/layout/Layout";
import PfpEditor from "@/components/pfp-editor/PfpEditor";
import { windowsConfig } from "@/utils/utils";
import { useState } from "react";

export default function PfpEditorPage() {
  const [windows, setWindows] = useState(windowsConfig);

  const openWindow = (index) => {
    setWindows((prevWindows) =>
      prevWindows.map((window, i) =>
        i === index ? { ...window, closed: false } : window
      )
    );
  };

  const showWindow = (index) => {
    setWindows((prevWindows) =>
      prevWindows.map((window, i) =>
        i === index ? { ...window, hidden: false } : window
      )
    );
  };

  return (
    <Layout
      theme="editor"
      openWindow={openWindow}
      showWindow={showWindow}
    >
      <PfpEditor
        windows={windows}
        setWindows={setWindows}
      />
    </Layout>
  );
}