'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function ProgressBar({
  progress,
  strokeWidth,
  total = 100,
  className,
}: {
  progress: number;
  strokeWidth: number;
  total?: number;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div className={clsx('relative', className)}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* strokeColor="radial-gradient(136.22% 136.22% at 142.5% 13.75%, #FFF 0%, #85AA9F 100%)" */}
        <defs>
          <radialGradient
            id="customGradient"
            cx="1.425"
            cy="0.1375"
            r="1.3622"
            fx="1.425"
            fy="0.1375"
          >
            <stop offset="0%" stopColor="#FFF" />
            <stop offset="100%" stopColor="#85AA9F" />
          </radialGradient>
        </defs>
        {/* Background */}
        <circle
          className={clsx('text-gray-200', {
            'stroke-[#D4F8D3]': pathname.includes('/dictionary'),
            'stroke-[#fff]': pathname.includes('/training'),
          })}
          strokeWidth={strokeWidth}
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        {/* <!-- Progress circle --> */}
        <circle
          className={clsx('text-indigo-500 progress-ring__circle', {
            'stroke-[#2BD627]': pathname.includes('/dictionary'),
            // 'stroke-green-dark': pathname.includes('/training'),
            'stroke-[url(#customGradient)]': pathname.includes('/training'),
          })}
          strokeWidth={strokeWidth}
          strokeLinecap={progress >= total ? 'butt' : 'round'}
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray="251.2"
          strokeDashoffset={`calc(251.2 - (251.2 * ${progress}) / ${total})`}
          transform="rotate(-90 50 50)"
        ></circle>
      </svg>
    </div>
  );
}
