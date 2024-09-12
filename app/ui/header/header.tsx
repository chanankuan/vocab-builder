'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import cookie from 'js-cookie';

import Sidebar from './sidebar';
import Navbar from './navbar';
import LogoutButton from './logout-button';
import UserBar from './user-bar';

import logo from '@/public/images/logo.svg';
import burger from '@/public/images/burger.svg';

import type { UserCookie } from '@/app/lib/definitions';

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserCookie | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isAuthPage =
    pathname.includes('/login') || pathname.includes('/register');

  useEffect(() => {
    const cookieData = cookie.get('user');

    if (cookieData) {
      try {
        const userData = JSON.parse(decodeURIComponent(cookieData));
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user cookie:', error);
      }
    }
  }, [pathname]);

  function handleCloseSidebar() {
    setIsSidebarOpen(false);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setIsSidebarOpen(false);
      }
    };

    // Check on initial render
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsSidebarOpen]);

  return (
    <header>
      <div className="container py-4 md:py-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-x-4">
              <Image
                className="w-9 h-9 md:w-10 md:h-10"
                src={logo}
                alt="Company logo"
                priority
              />
              <span className="font-semibold text-[18px] leading-[24px] md:text-[22px] md:leading-[32px]">
                VocabBuilder
              </span>
            </Link>
          </div>

          {!isAuthPage && (
            <>
              <div className="max-lg:hidden">
                <Navbar />
              </div>
              <div
                className={clsx(
                  'flex items-center gap-2 md:gap-4',
                  isSidebarOpen && 'opacity-0'
                )}
              >
                <UserBar isOpen={isSidebarOpen} user={user} />

                <div className="max-lg:hidden lg:ml-2">
                  <LogoutButton />
                </div>
                <div className="flex items-center md:ml-3 lg:hidden">
                  <button onClick={() => setIsSidebarOpen(true)}>
                    <Image src={burger} alt="burger menu icon" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {!isAuthPage && (
        <Sidebar
          user={user}
          isOpen={isSidebarOpen}
          onCloseSidebar={handleCloseSidebar}
        />
      )}
    </header>
  );
}
