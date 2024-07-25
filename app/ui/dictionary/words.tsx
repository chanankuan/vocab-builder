'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import cookie from 'js-cookie';

import { getOwnWords } from '@/app/api/words';
import { useWordsContext } from '@/context/words-context';
import { removeEmpty, showToast } from '@/app/lib/utils';

import WordsTable from '../words-table/words-table';
import WordsPagination from '../words-table/words-pagination';
import { PaginationSkeleton, WordsTableSkeleton } from '../skeletons';

export default function WordsData() {
  const { words, setWords, shouldFetch } = useWordsContext();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setSetTotalPages] = useState<number | null>(null);

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
        const data = await getOwnWords(nonEmptySearchParams, access_token);
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
  }, [searchParams, shouldFetch]);

  return (
    <>
      <div className="mb-8 md:mb-7">
        {isLoading ? (
          <WordsTableSkeleton page="dictionary" />
        ) : (
          <WordsTable words={words} />
        )}
      </div>

      <div className="flex justify-center">
        {totalPages ? (
          <WordsPagination totalPages={totalPages} />
        ) : (
          <PaginationSkeleton />
        )}
      </div>
    </>
  );
}
