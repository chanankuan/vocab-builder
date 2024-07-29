import { useContext } from 'react';
import { WordsContext } from '@/context/words-context';

export const useWordsContext = () => {
  const context = useContext(WordsContext);
  if (!context) {
    throw new Error('useWordsContext must be used within a WordsProvider');
  }
  return context;
};
