import type { Metadata } from 'next';
import { macpaw } from '@/styles/fonts';
import './globals.css';

import Header from './ui/header/header';

export const metadata: Metadata = {
  title: 'Vocab Builder App',
  description:
    'VocabBuilder is a vocabulary-building app for Ukrainians learning English. It features tailored word lists, engaging quizzes, and interactive flashcards to enhance vocabulary retention. With usage examples and progress tracking, VocabBuilder offers an effective and enjoyable learning experience for both beginners and advanced learners.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${macpaw.className} relative`}
        suppressHydrationWarning={true}
      >
        <Header />

        {children}
      </body>
    </html>
  );
}
