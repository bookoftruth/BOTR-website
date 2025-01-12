'use client';

import App from "@/components/App";
import Loader from "@/components/Loader";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [enterButton, setEnterButton] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="fixed h-screen w-screen overflow-hidden font-terminal">
      {loading ? 
        <Loader
          setLoading={setLoading} 
          enterButton={enterButton} 
          setEnterButton={setEnterButton} 
          setIsMuted={setIsMuted}
        />
        : 
        <App 
          isMuted={isMuted} 
          setIsMuted={setIsMuted}
        />
      }
    </div>
  );
}