'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import cookie from 'js-cookie';
import clsx from 'clsx';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { deleteWord } from '@/app/api/words';
import { showToast } from '@/app/lib/utils';
import { useWordsContext } from '@/hooks';
import type { Word } from '@/app/lib/definitions';

import ProgressBar from '../progress-bar';
import ActionsBtn from '../dictionary/actions-btn';
import AddWordBtn from '../recommend/add-word-btn';
import EditWordModal from '../dictionary/edit-word-modal';
import ModalLayout from '../layouts/modal-layout';

import { FaRegTrashAlt } from 'react-icons/fa';
import { HiMiniPencil } from 'react-icons/hi2';
import en from '@/public/images/eng-lang.svg';
import ua from '@/public/images/uk-lang.svg';

export default function WordsTable({ words }: { words: Word[] }) {
  const pathname = usePathname();

  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isActionModalShown, setIsActionModalShown] = useState(false);
  const [isEditModalShown, setIsEditModalShown] = useState(false);

  const columnVisibility = {
    en: true,
    ua: true,
    category: true,
    progress: pathname.includes('/dictionary'),
    action: true,
  };

  const columns: ColumnDef<Word>[] = useMemo(
    () => [
      {
        accessorKey: 'en',
        header: () => (
          <div className="flex justify-between items-center">
            <span className="font-medium">Word</span>
            <Image
              className="max-md:hidden"
              src={en}
              alt="National flag of GB"
              priority
            />
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
              priority
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
        cell: ({ row }) =>
          pathname.includes('/dictionary') && (
            <div
              className={clsx(
                'flex justify-center md:justify-between items-center'
              )}
            >
              <span className="max-md:hidden text-[18px] lg:text-[22px] leading-5 font-medium">
                {row.original.progress}%
              </span>
              <ProgressBar
                progress={row.original.progress}
                strokeWidth={15}
                className="w-6 h-6 md:w-[26px] md:h-[26px]"
              />
            </div>
          ),
      },
      {
        accessorKey: 'action',
        header: '',
        cell: ({ row }) => (
          <div className="flex justify-center items-center">
            {pathname.includes('/dictionary') ? (
              <ActionsBtn
                action={event => handleOpenActionModal(event, row.original)}
              />
            ) : (
              <AddWordBtn wordId={row.original._id} />
            )}
          </div>
        ),
      },
    ],
    [pathname]
  );

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
  });

  function handleOpenActionModal(
    event: React.MouseEvent<HTMLButtonElement>,
    word: Word
  ) {
    const x = event.clientX;
    const y = event.clientY;

    setIsActionModalShown(true);
    setCurrentWord(word);
    setModalPosition({ x, y });
  }

  function handleCloseActionModal() {
    setIsActionModalShown(false);
  }

  function handleOpenEditModal() {
    setIsEditModalShown(true);
    setIsActionModalShown(false);
  }

  function handleCloseEditModal() {
    setIsEditModalShown(false);
  }

  return (
    <div className="md:p-[18px] md:rounded-[15px]">
      <table className="border-collapse border-hidden">
        <colgroup>
          <col
            className={clsx('w-[82px]', {
              'md:w-[160px] lg:w-[280px]': pathname.includes('/dictionary'),
              'md:w-[180px] lg:w-[372px]': pathname.includes('/recommend'),
            })}
          />
          <col
            className={clsx('w-[116px]', {
              'md:w-[169px] lg:w-[274px]': pathname.includes('/dictionary'),
              'md:w-[180px] lg:w-[364px]': pathname.includes('/recommend'),
            })}
          />
          {pathname.includes('/dictionary') && (
            <col className="max-md:hidden md:w-[151px] lg:w-[260px]" />
          )}
          <col
            className={clsx('w-[95px]', {
              'md:w-[122px] lg:w-[254px]': pathname.includes('/dictionary'),
              'md:w-[160px] lg:w-[260px]': pathname.includes('/recommend'),
            })}
          />
          <col
            className={clsx('w-[50px]', {
              'md:w-[66px] lg:w-[136px]': pathname.includes('/dictionary'),
              'md:w-[148px] lg:w-[208px]': pathname.includes('/recommend'),
            })}
          />
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
                      'max-md:hidden':
                        header.id === 'category' &&
                        pathname.includes('/dictionary'),
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
            <tr key={row.id} className="">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={clsx(
                    'text-sm md:text-[18px] lg:text-[20px] font-medium px-[14px] py-4 lg:p-[22px] border border-gray-main max-md:break-all',
                    {
                      'max-md:hidden':
                        cell.id.includes('category') &&
                        pathname.includes('/dictionary'),
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

      {isActionModalShown && currentWord && (
        <Modal
          wordId={currentWord._id}
          position={modalPosition}
          onCloseActionModal={handleCloseActionModal}
          onOpenEditModal={handleOpenEditModal}
        />
      )}

      {isEditModalShown && currentWord && (
        <ModalLayout
          isOpen={isEditModalShown}
          onCloseModal={handleCloseEditModal}
        >
          <EditWordModal
            currentWord={currentWord}
            onCloseModal={handleCloseEditModal}
          />
        </ModalLayout>
      )}
    </div>
  );
}

function Modal({
  wordId,
  position,
  onCloseActionModal,
  onOpenEditModal,
}: {
  wordId: string;
  position: { x: number; y: number };
  onCloseActionModal: () => void;
  onOpenEditModal: () => void;
}) {
  const { updateWords } = useWordsContext();
  const access_token = cookie.get('access_token') ?? '';

  async function handleDelete() {
    try {
      await deleteWord(wordId, access_token);
      onCloseActionModal();
      updateWords();
      showToast('success', <p>Word deleted successfully.</p>);
      // revalidatePath('/training');
    } catch (error) {
      if (error instanceof Error) {
        showToast('error', <p>{error.message}</p>);
      } else {
        showToast('error', <p>An unknown error occured. Please try later.</p>);
      }
    }
  }

  return (
    <div
      className="fixed w-full h-full top-0 left-0 z-50 flex justify-center items-center bg-transparent"
      onClick={onCloseActionModal}
    >
      <AnimatePresence>
        <motion.div
          className="absolute w-[117px] flex flex-col gap-2 opacity-0 bg-[#fff] shadow-modal py-3 px-6 rounded-[15px]"
          style={{ top: position.y + 10, left: position.x - 100 }}
          initial={{ opacity: 0, display: 'none' }}
          animate={{ opacity: 1, display: 'flex' }}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="flex items-center gap-2 group"
            onClick={onOpenEditModal}
          >
            <HiMiniPencil className="fill-green-dark transition-colors group-hover:fill-green-main" />
            <span className="text-sm font-medium">Edit</span>
          </button>
          <button
            className="flex items-center gap-2 group"
            onClick={handleDelete}
          >
            <FaRegTrashAlt className="fill-green-dark transition-colors group-hover:fill-green-main" />
            <span className="text-sm font-medium">Delete</span>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
