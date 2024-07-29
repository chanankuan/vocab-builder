import { Metadata } from 'next';

import Dashboard from '../ui/dashboard/dashboard';
import WordsData from '../ui/words-data';
import { WordsProvider } from '@/context/words-context';

export const metadata: Metadata = {
  title: 'Dictionary Page',
  description:
    'VocabBuilder is a vocabulary-building app for Ukrainians learning English. It features tailored word lists, engaging quizzes, and interactive flashcards to enhance vocabulary retention. With usage examples and progress tracking, VocabBuilder offers an effective and enjoyable learning experience for both beginners and advanced learners.',
};

export default async function Dictionary() {
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
