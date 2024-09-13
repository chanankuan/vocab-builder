import { Metadata } from 'next';

import { WordsProvider } from '@/context/words-context';
import WordsData from '../ui/words-data';
import Dashboard from '../ui/dashboard/dashboard';

export const metadata: Metadata = {
  title: 'Recommend Page',
};

export default function Recommend() {
  return (
    <WordsProvider>
      <main>
        <div className="container py-8 md:py-20">
          <Dashboard />
          <WordsData />
        </div>
      </main>
    </WordsProvider>
  );
}
