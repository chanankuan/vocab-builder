import Image from 'next/image';
import en from '@/public/images/eng-lang.svg';
import ua from '@/public/images/uk-lang.svg';
import clsx from 'clsx';

export function TableRowSkeleton({
  page,
  style = '',
}: {
  page: 'dictionary' | 'recommend';
  style?: string;
}) {
  return (
    <tr className="h-[70px] lg:h-[72px]">
      {/* Word */}
      <td
        className={clsx(
          'px-[14px] py-4 lg:p-[22px] border border-gray-main',
          style
        )}
      >
        <div className="flex justify-between items-center">
          <div className="bg-gray-300 h-4 w-full rounded skeleton-pulse"></div>
        </div>
      </td>
      {/* Translation */}
      <td className="px-[14px] py-4 lg:p-[22px] border border-gray-main">
        <div className="bg-gray-300 h-4 w-full rounded skeleton-pulse"></div>
      </td>
      {/* Category */}
      <td
        className={clsx('px-[14px] py-4 lg:p-[22px] border border-gray-main', {
          'max-md:hidden': page === 'dictionary',
        })}
      >
        <div className="bg-gray-300 h-4 w-full rounded skeleton-pulse"></div>
      </td>
      {/* Progress */}
      {page === 'dictionary' && (
        <td className="px-[14px] py-4 lg:p-[22px] border border-gray-main">
          <div className="bg-gray-300 h-4 w-full rounded skeleton-pulse"></div>
        </td>
      )}
      {/* Actions */}
      <td
        className={clsx(
          'px-[14px] py-4 lg:p-[22px] border border-gray-main',
          style
        )}
      >
        <div
          className={clsx('flex', {
            'justify-center items-center': page === 'dictionary',
            'flex-col gap-y-1 lg:flex-row lg:items-center lg:gap-x-2':
              page === 'recommend',
          })}
        >
          {page === 'recommend' && (
            <div className="max-md:hidden bg-gray-300 h-4 w-full lg:w-[120px] rounded skeleton-pulse"></div>
          )}
          <div className="bg-gray-300 h-6 w-6 rounded-full skeleton-pulse"></div>
        </div>
      </td>
    </tr>
  );
}

export function WordsTableSkeleton({
  page,
}: {
  page: 'dictionary' | 'recommend';
}) {
  return (
    <div className="bg-[#fff] md:p-[18px] rounded-lg md:rounded-[15px]">
      <table className="border-collapse border-hidden">
        <colgroup>
          <col
            className={clsx('w-[82px] h-[70px]', {
              'md:w-[160px] lg:w-[280px]': page === 'dictionary',
              'md:w-[180px] lg:w-[372px]': page === 'recommend',
            })}
          />
          <col
            className={clsx('w-[116px] h-[70px]', {
              'md:w-[169px] lg:w-[274px]': page === 'dictionary',
              'md:w-[180px] lg:w-[364px]': page === 'recommend',
            })}
          />
          {page === 'dictionary' && (
            <col className="max-md:hidden h-[70px] md:w-[151px] lg:w-[260px]" />
          )}
          <col
            className={clsx('w-[95px] h-[70px]', {
              'md:w-[122px] lg:w-[254px]': page === 'dictionary',
              'md:w-[160px] lg:w-[260px]': page === 'recommend',
            })}
          />
          <col
            className={clsx('w-[50px] h-[70px]', {
              'md:w-[66px] lg:w-[136px]': page === 'dictionary',
              'md:w-[148px] lg:w-[208px]': page === 'recommend',
            })}
          />
        </colgroup>
        <thead className="bg-green-light">
          <tr>
            <th
              scope="col"
              className="font-medium text-left md:text-[18px] lg:text-lg px-[14px] py-4 lg:px-[22px] lg:py-5 border border-gray-main rounded-tl-lg"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">Word</span>
                <Image
                  className="max-md:hidden"
                  src={en}
                  alt="National flag of GB"
                  priority
                />
              </div>
            </th>
            <th
              scope="col"
              className="font-medium text-left md:text-[18px] lg:text-lg px-[14px] py-4 lg:px-[22px] lg:py-5 border border-gray-main"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">Translate</span>
                <Image
                  className="max-md:hidden"
                  src={ua}
                  alt="National flag of Ukraine"
                  priority
                />
              </div>
            </th>
            <th
              scope="col"
              className={clsx(
                'font-medium text-left md:text-[18px] lg:text-lg px-[14px] py-4 lg:px-[22px] lg:py-5 border border-gray-main',
                { 'max-md:hidden': page === 'dictionary' }
              )}
            >
              Category
            </th>
            {page === 'dictionary' && (
              <th
                scope="col"
                className="font-medium text-left md:text-[18px] lg:text-lg px-[14px] py-4 lg:px-[22px] lg:py-5 border border-gray-main"
              >
                Progress
              </th>
            )}
            <th
              scope="col"
              className="font-medium text-left md:text-[18px] lg:text-lg px-[14px] py-4 lg:px-[22px] lg:py-5 border border-gray-main rounded-tr-lg"
            ></th>
          </tr>
        </thead>
        <tbody className="bg-secondaryFont">
          <TableRowSkeleton page={page} />
          <TableRowSkeleton page={page} />
          <TableRowSkeleton page={page} />
          <TableRowSkeleton page={page} />
          <TableRowSkeleton page={page} />
          <TableRowSkeleton page={page} />
          <TableRowSkeleton
            page={page}
            style="first-of-type:rounded-bl-lg last-of-type:rounded-br-lg"
          />
        </tbody>
      </table>
    </div>
  );
}

export function FiltersSkeleton() {
  return (
    <div className="mb-10 md:mb-7 lg:mb-0 md:flex md:items-center md:gap-2">
      <div className="relative max-md:mb-2 md:w-[274px]">
        <div className="bg-gray-300 h-[50px] w-full rounded skeleton-pulse"></div>
      </div>

      <div className="relative max-md:mb-2 md:w-[164px]">
        <div className="bg-gray-300 h-[50px] w-full rounded skeleton-pulse"></div>
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className={'bg-gray-500 h-8 w-[300px] rounded skeleton-pulse'}></div>
  );
}

export function StatsSkeleton() {
  return (
    <div
      className={'bg-gray-300 h-5 w-[88px] rounded skeleton-pulse max:md:mb-5'}
    ></div>
  );
}
