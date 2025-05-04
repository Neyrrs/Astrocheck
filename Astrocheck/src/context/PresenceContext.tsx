// context/PresenceContext.js
"use client";
import { createContext, useContext, useState } from "react";

const PresenceContext = createContext();

export const PresenceProvider = ({ children }) => {
  const [selectedPresence, setSelectedPresence] = useState(null);
  return (
    <PresenceContext.Provider value={{ selectedPresence, setSelectedPresence }}>
      {children}
    </PresenceContext.Provider>
  );
};

export const usePresenceContext = () => useContext(PresenceContext);
