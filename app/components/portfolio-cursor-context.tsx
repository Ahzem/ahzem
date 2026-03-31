"use client";

import { createContext, useContext, type ReactNode } from "react";

export type PortfolioCursorApi = {
  setCursor: (label: string, scale?: number) => void;
  resetCursor: () => void;
};

const PortfolioCursorContext = createContext<PortfolioCursorApi | null>(null);

export function PortfolioCursorProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: PortfolioCursorApi;
}) {
  return (
    <PortfolioCursorContext.Provider value={value}>
      {children}
    </PortfolioCursorContext.Provider>
  );
}

export function usePortfolioCursor(): PortfolioCursorApi {
  const ctx = useContext(PortfolioCursorContext);
  if (!ctx) {
    throw new Error(
      "usePortfolioCursor must be used within PortfolioCursorProvider",
    );
  }
  return ctx;
}

/** Optional hook for leaf components that may render outside provider in tests */
export function usePortfolioCursorOptional(): PortfolioCursorApi | null {
  return useContext(PortfolioCursorContext);
}
