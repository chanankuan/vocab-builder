'use client';

import { createContext, useState, ReactNode, useContext } from 'react';
import type { Word } from '@/app/lib/definitions';

type WordsContextType = {
  words: Word[];
  setWords: (words: Word[]) => void;
  updateWords: () => void;
  shouldFetch: boolean;
};

export const WordsContext = createContext<WordsContextType | null>(null);

export const WordsProvider = ({ children }: { children: ReactNode }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const updateWords = () => {
    setShouldFetch(prev => !prev);
  };

  return (
    <WordsContext.Provider
      value={{ words, setWords, updateWords, shouldFetch }}
    >
      {children}
    </WordsContext.Provider>
  );
};
