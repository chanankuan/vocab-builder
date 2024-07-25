'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import cookie from 'js-cookie';

import type { Word } from '@/app/lib/definitions';
import { getAllWords } from '@/app/api/words';
import { removeEmpty, showToast } from '@/app/lib/utils';

import WordsTable from '@/app/ui/words-table/words-table';
import WordsPagination from '@/app/ui/words-table/words-pagination';
import { WordsTableSkeleton } from '../skeletons';

export default function Words() {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setSetTotalPages] = useState<number | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const access_token = cookie.get('access_token') ?? '';

    const obj = {
      keyword: searchParams.get('keyword') ?? '',
      category: searchParams.get('category') ?? '',
      isIrregular: searchParams.get('isIrregular') ?? '',
      page: searchParams.get('page') ?? '',
    };

    const nonEmptySearchParams = removeEmpty(obj);

    async function fetchOwnWords() {
      try {
        const data = await getAllWords(nonEmptySearchParams, access_token);
        setWords(data.results);
        setSetTotalPages(data.totalPages);
      } catch (error) {
        if (error instanceof Error) {
          showToast('error', <p>{error.message}</p>);
        } else {
          showToast(
            'error',
            <p>An unknown error occured. Please try later.</p>
          );
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchOwnWords();
  }, [searchParams, shouldRender]);

  return (
    <>
      <div className="mb-8 md:mb-7">
        {isLoading ? (
          <WordsTableSkeleton page="recommend" />
        ) : (
          <WordsTable words={words} />
        )}
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <div className="flex justify-center">
          {totalPages && <WordsPagination totalPages={totalPages} />}
        </div>
      </Suspense>
    </>
  );
}
