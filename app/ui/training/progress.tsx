'use client';

import { useProgressContext } from '@/hooks';
import ProgressBar from '../progress-bar';

export default function Progress({ totalWords }: { totalWords: number }) {
  const { progress } = useProgressContext();

  return (
    <div className="relative w-[44px] h-[44px] ml-auto mb-2 md:w-[58px] md:h-[58px]">
      <ProgressBar
        progress={progress}
        total={totalWords}
        className="w-[44px] h-[44px] md:w-[58px] md:h-[58px]"
        strokeWidth={6}
      />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-medium">
        {progress}
      </span>
    </div>
  );
}
