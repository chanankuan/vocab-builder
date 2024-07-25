import { Metadata } from 'next';

import Dashboard from '../ui/dashboard/dashboard';
import Words from '../ui/recommend/words';

export const metadata: Metadata = {
  title: 'Recommend Page',
};

export default function Recommend() {
  return (
    <main>
      <div className="container">
        <Dashboard />

        <Words />
      </div>
    </main>
  );
}
