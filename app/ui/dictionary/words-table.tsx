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

export default function WordsTable({ words }: { words: Word[] }) {
  const columns: ColumnDef<Word>[] = [
    {
      accessorKey: 'en',
      header: 'Word',
    },
    {
      accessorKey: 'ua',
      header: 'Translate',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'progress',
      header: 'Progress',
      cell: ({ row }) => <ProgressBar progress={row.original.progress} />,
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
    <>
      <table className="border-collapse border-hidden">
        <thead className="bg-green-light">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={clsx(
                    'font-medium px-[14px] py-4 border border-gray-main',
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
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={clsx(
                    'text-sm font-medium px-[14px] py-4 border border-gray-main',
                    {
                      'max-md:hidden': cell.id.includes('category'),
                      'flex justify-center items-center':
                        cell.id.includes('progress'),
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
    </>
  );
}
