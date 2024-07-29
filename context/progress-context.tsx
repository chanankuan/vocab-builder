'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ProgressContextType = {
  progress: number;
  setProgress: (value: number) => void;
};

export const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}
