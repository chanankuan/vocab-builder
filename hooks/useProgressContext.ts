import { useContext } from 'react';
import { ProgressContext } from '@/context/progress-context';

export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
