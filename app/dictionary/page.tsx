import { mockedWords } from '@/public/mockupData';
import WordsTable from '../ui/dictionary/words-table';
import ProgressBar from '../ui/dictionary/progress-bar';

export default async function Dictionary() {
  const response = mockedWords;

  return (
    <main>
      <div className="container">
        <h1>Dictionary Page</h1>

        <WordsTable words={response.results} />
      </div>
    </main>
  );
}
