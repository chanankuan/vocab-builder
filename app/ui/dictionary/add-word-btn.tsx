'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import ModalLayout from '../layouts/modal-layout';
import AddWordModal from './add-word-modal';
import { HiMiniPlus } from 'react-icons/hi2';

export default function AddWordBtn() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [isModalShown, setIsModalShown] = useState(false);

  useEffect(() => {
    const query = searchParams.get('modal');

    if (query) {
      setIsModalShown(true);
    }
  }, [searchParams]);

  function handleOpenModal() {
    setIsModalShown(true);
  }

  function handleCloseModal() {
    setIsModalShown(false);
    replace(pathname);
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
