'use client';

import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [alreadyEntered, setAlreadyEntered] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ isMuted, setIsMuted, alreadyEntered, setAlreadyEntered }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  return context;
};