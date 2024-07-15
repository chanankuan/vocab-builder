import { Suspense } from 'react';

import { mockedWords } from '@/public/mockupData';
import WordsTable from '../ui/dictionary/words-table';
import WordsPagination from '../ui/dictionary/words-pagination';
import Filters from '../ui/dictionary/filters';
import Actions from '../ui/dictionary/actions';

export default async function Dictionary() {
  const response = mockedWords;

  return (
    <main>
      <div className="container">
        <section className="pt-8">
          <Filters />
          <p className="text-sm text-gray-main font-medium flex items-center gap-2 mb-2">
            To study: <span className="text-lg text-mainFont">20</span>
          </p>
          <Actions />
          <div className="mb-8 md:mb-7">
            <WordsTable words={response.results} />
          </div>
          <div className="flex justify-center">
            <Suspense fallback={<p>Loading...</p>}>
              <WordsPagination totalPages={10} />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}
