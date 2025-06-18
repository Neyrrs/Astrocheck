"use client";

import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext<{
  activeContent: string;
  setActiveContent: (value: string) => void;
  selectedPresence: { [key: string]: unknown } | null;
  setSelectedPresence: (data: { [key: string]: unknown } | null) => void;
} | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeContent, setActiveContent] = useState("Dasbor");

  const [selectedPresence, setSelectedPresence] = useState<{ [key: string]: unknown } | null>(null);

  return (
    <DashboardContext.Provider
      value={{ activeContent, setActiveContent, selectedPresence, setSelectedPresence }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within DashboardProvider");
  }
  return context;
};
