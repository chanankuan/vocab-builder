'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination } from '@/app/lib/utils';

import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from 'react-icons/bi';

export default function WordsPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="start"
          href={createPageURL(1)}
          isDisabled={currentPage <= 1}
        />

        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex gap-[10px]">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />

        <PaginationArrow
          direction="end"
          href={createPageURL(totalPages)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-8 w-8 items-center justify-center text-[13px] font-semibold rounded-lg border border-gray-main transition-colors duration-150',
    {
      'z-10 bg-green-dark border-green-dark text-[#fff]': isActive,
      'hover:bg-green-dark hover:border-green-dark hover:text-[#fff]':
        !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    }
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right' | 'start' | 'end';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-8 w-8 items-center justify-center rounded-lg border border-gray-main transition-colors duration-150',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-green-dark hover:border-green-dark [&>svg]:hover:fill-[#fff]':
        !isDisabled,
      'mr-[10px]': direction === 'left' || direction === 'start',
      'ml-[10px]': direction === 'right' || direction === 'end',
    }
  );

  let icon: React.ReactNode;

  switch (direction) {
    case 'left':
      icon = <BiChevronLeft />;
      break;
    case 'right':
      icon = <BiChevronRight />;
      break;
    case 'start':
      icon = <BiChevronsLeft />;
      break;
    case 'end':
      icon = <BiChevronsRight />;
      break;
  }

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
