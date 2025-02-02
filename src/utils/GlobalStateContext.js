'use client';

import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [alreadyEntered, setAlreadyEntered] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ alreadyEntered, setAlreadyEntered, musicPlaying, setMusicPlaying }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  return context;
};