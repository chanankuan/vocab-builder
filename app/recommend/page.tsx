import { Metadata } from 'next';

import { WordsProvider } from '@/context/words-context';
import Words from '../ui/recommend/words';
import Dashboard from '../ui/dashboard/dashboard';

export const metadata: Metadata = {
  title: 'Recommend Page',
};

export default function Recommend() {
  return (
    <WordsProvider>
      <main>
        <div className="container">
          <Dashboard />

          <Words />
        </div>
      </main>
    </WordsProvider>
  );
}
