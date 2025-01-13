'use client';

import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [alreadyEntered, setAlreadyEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ isMuted, setIsMuted, alreadyEntered, setAlreadyEntered, isPlaying, setIsPlaying }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  return context;
};