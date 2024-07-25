'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ModalLayout({
  isOpen,
  onCloseModal,
  children,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        onCloseModal();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    } else {
      window.removeEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onCloseModal]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed w-full h-full top-0 left-0 flex justify-center items-center z-50 bg-backdropBackground"
        onClick={onCloseModal}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="w-[343px] max-w-[92vw] bg-green-dark rounded-[15px] md:w-[628px]"
          onClick={e => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
