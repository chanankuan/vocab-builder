'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Word } from '@/app/lib/definitions';
import clsx from 'clsx';
import ProgressBar from './progress-bar';
import ActionsBtn from './actions-btn';
import Image from 'next/image';

import en from '@/public/images/eng-lang.svg';
import ua from '@/public/images/uk-lang.svg';

export default function WordsTable({ words }: { words: Word[] }) {
  const columns: ColumnDef<Word>[] = [
    {
      accessorKey: 'en',
      header: () => (
        <div className="flex justify-between items-center">
          <span className="font-medium">Word</span>
          <Image className="max-md:hidden" src={en} alt="National flag of GB" />
        </div>
      ),
    },
    {
      accessorKey: 'ua',
      header: () => (
        <div className="flex justify-between items-center">
          <span className="font-medium">Translate</span>
          <Image
            className="max-md:hidden"
            src={ua}
            alt="National flag of Ukraine"
          />
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'progress',
      header: 'Progress',
      cell: ({ row }) => (
        <div
          className={clsx(
            'flex justify-center md:justify-between items-center'
          )}
        >
          <span className="max-md:hidden text-[18px] lg:text-[22px] leading-5 font-medium">
            {row.original.progress}%
          </span>
          <ProgressBar progress={row.original.progress} />
        </div>
      ),
    },
    {
      accessorKey: 'action',
      header: '',
      cell: () => <ActionsBtn action={() => console.log('clicked')} />,
    },
  ];

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="md:p-[18px] md:rounded-[15px]">
      <table className="border-collapse border-hidden">
        <colgroup>
          <col className="w-[82px] h-[70px] md:w-[160px] lg:w-[280px]" />
          <col className="w-[116px] h-[70px] md:w-[169px] lg:w-[274px]" />
          <col className="max-md:hidden h-[70px] md:w-[151px] lg:w-[260px]" />
          <col className="w-[95px] h-[70px] md:w-[122px] lg:w-[254px]" />
          <col className="w-[50px] h-[70px] md:w-[66px] lg:w-[136px]" />
        </colgroup>
        <thead className="bg-green-light">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="lg:h-[72px]">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={clsx(
                    'text-left md:text-[18px] lg:text-[20px] font-medium px-[14px] py-4 lg:px-[22px] lg:py-5 border border-gray-main',
                    {
                      'max-md:hidden': header.id === 'category',
                    }
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-secondaryFont">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="h-[70px] lg:h-[72px]">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={clsx(
                    'text-sm md:text-[18px] lg:text-[20px] font-medium px-[14px] py-4 lg:p-[22px] border border-gray-main',
                    {
                      'max-md:hidden': cell.id.includes('category'),
                      'lg:pr-[144px]': cell.id.includes('progress'),
                    }
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
