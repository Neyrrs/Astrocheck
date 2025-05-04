"use client";
import React, { createContext, useContext, useState } from "react";

// Buat tipe (optional)
interface DashboardContextType {
  activeContent: string;
  setActiveContent: (value: string) => void;
  selectedPresence: any;
  setSelectedPresence: (data: any) => void;
}

// Buat context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider
export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeContent, setActiveContent] = useState("Dasbor");
  const [selectedPresence, setSelectedPresence] = useState(null);

  return (
    <DashboardContext.Provider
      value={{ activeContent, setActiveContent, selectedPresence, setSelectedPresence }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Hook untuk akses context
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboardContext must be used within DashboardProvider");
  return context;
};
