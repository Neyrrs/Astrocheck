// context/PresenceContext.js
"use client";
import { createContext, useContext, useState } from "react";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <ItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);
