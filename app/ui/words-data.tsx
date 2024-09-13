'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import cookie from 'js-cookie';

import type { Word } from '@/app/lib/definitions';
import { getAllWords, getOwnWords } from '@/app/api/words';
import { removeEmpty, showToast } from '@/app/lib/utils';
import { useWordsContext } from '@/hooks';

import WordsTable from '@/app/ui/words-table/words-table';
import WordsPagination from '@/app/ui/words-table/words-pagination';
import { PaginationSkeleton, WordsTableSkeleton } from './skeletons';
import NoResult from './no-result';

export default function WordsData() {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setSetTotalPages] = useState<number | null>(null);
  const { shouldFetch } = useWordsContext();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isDictionaryPath = pathname.includes('/dictionary') && shouldFetch;

  useEffect(() => {
    const access_token = cookie.get('access_token') ?? '';

    const obj = {
      keyword: searchParams.get('keyword') ?? '',
      category: searchParams.get('category') ?? '',
      isIrregular: searchParams.get('isIrregular') ?? '',
      page: searchParams.get('page') ?? '',
    };

    const nonEmptySearchParams = removeEmpty(obj);

    async function fetchWords() {
      try {
        const data = pathname.includes('/dictionary')
          ? await getOwnWords(nonEmptySearchParams, access_token)
          : await getAllWords(nonEmptySearchParams, access_token);
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

    fetchWords();
  }, [searchParams, pathname, isDictionaryPath]);

  return (
    <>
      <div className="flex flex-col gap-y-8 md:gap-y-7 mb-8 md:mb-7">
        {isLoading ? (
          <>
            <WordsTableSkeleton page="recommend" />
            <div className="flex justify-center">
              <PaginationSkeleton />
            </div>
          </>
        ) : words.length ? (
          <>
            <WordsTable words={words} />
            {totalPages && totalPages > 1 && (
              <div className="flex justify-center">
                <WordsPagination totalPages={totalPages} />
              </div>
            )}
          </>
        ) : (
          <NoResult />
        )}
      </div>
    </>
  );
}
