import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import close from '@/public/images/close.svg';

import LogoutButton from './logout-button';
import Navbar from './navbar';
import UserBar from './user-bar';
import type { User } from '@/app/lib/definitions';

const backdropVariants = {
  open: { opacity: 1, display: 'block' },
  closed: { opacity: 0, display: 'none' },
};

const sidebarVariants = {
  open: { right: 0, display: 'block' },
  closed: { right: '-100%', display: 'none' },
};

export default function Sidebar({
  user,
  isOpen,
  onCloseSidebar,
}: {
  user: User | null;
  isOpen: boolean;
  onCloseSidebar: () => void;
}) {
  const handleSidebarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent click from propagating to the backdrop
  };

  return (
    <div className="lg:hidden">
      <AnimatePresence>
        <motion.div
          key="sidebar-backdrop"
          className="fixed w-full h-full top-0 left-0 opacity-0 bg-backdropBackground z-40 lg:hidden"
          animate={isOpen ? 'open' : 'closed'}
          variants={backdropVariants}
          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          onClick={onCloseSidebar}
        >
          <motion.div
            key="sidebar"
            className="fixed h-full w-[185px] md:w-[300px] top-0 -right-full bg-green-dark py-4 px-4 md:py-5 md:px-8 bg-sidebar-background bg-bottom bg-no-repeat"
            animate={isOpen ? 'open' : 'closed'}
            variants={sidebarVariants}
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.3,
              staggerDirection: isOpen ? 1 : -1,
            }}
            onClick={handleSidebarClick}
          >
            <div className="flex items-center gap-2 mb-[170px]">
              <UserBar user={user} isOpen={isOpen} />
              <button className="ml-auto" onClick={onCloseSidebar}>
                <Image
                  className="w-8 h-8 md:w-10 md:h-10"
                  src={close}
                  alt="close icon"
                />
              </button>
            </div>

            <div>
              <Navbar onCloseSidebar={onCloseSidebar} />
              <LogoutButton />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
