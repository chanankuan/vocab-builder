'use client';

import { useState } from 'react';

import ModalLayout from '../layouts/modal-layout';
import AddWordModal from './add-word-modal';
import { HiMiniPlus } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';

export default function AddWordBtn() {
  const pathname = usePathname();
  const [isModalShown, setIsModalShown] = useState(false);

  function handleOpenModal() {
    setIsModalShown(true);
  }

  function handleCloseModal() {
    setIsModalShown(false);
  }

  return (
    <>
      {pathname.includes('/dictionary') && (
        <>
          <button
            className="flex gap-2 items-center text-base font-medium group"
            onClick={handleOpenModal}
          >
            <span>Add word</span>
            <HiMiniPlus
              size={22}
              color="#85AA9F"
              className="transition-transform group-hover:rotate-[360deg]"
            />
          </button>
          {isModalShown && (
            <ModalLayout isOpen={isModalShown} onCloseModal={handleCloseModal}>
              <AddWordModal onCloseModal={handleCloseModal} />
            </ModalLayout>
          )}
        </>
      )}
    </>
  );
}
