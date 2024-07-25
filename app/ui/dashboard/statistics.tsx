'use client';

import { useEffect, useState } from 'react';
import cookie from 'js-cookie';

import { useWordsContext } from '@/context/words-context';
import { getStatistics } from '@/app/api/words';
import { showToast } from '@/app/lib/utils';

import { StatsSkeleton } from '../skeletons';

export default function Statistics() {
  const { shouldFetch } = useWordsContext();
  const [stats, setStats] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const access_token = cookie.get('access_token') ?? '';

  useEffect(() => {
    async function fetchStats() {
      try {
        const statistics = await getStatistics(access_token);
        setStats(statistics);
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

    fetchStats();
  }, [shouldFetch]);

  return (
    <>
      {isLoading ? (
        <StatsSkeleton />
      ) : (
        <p className="text-sm text-gray-dark font-medium flex items-center gap-2 max-md:mb-2">
          To study: <span className="text-lg text-mainFont">{stats}</span>
        </p>
      )}
    </>
  );
}
