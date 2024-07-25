'use client';

import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

import { HiOutlineArrowRight } from 'react-icons/hi';

import { signout } from '@/app/api';

export default function LogoutButton() {
  const router = useRouter();
  const access_token = cookie.get('access_token') || '';

  async function handleLogout() {
    try {
      await signout(access_token);
      router.push('/login');
    } catch (error) {}
  }

  return (
    <button
      className="flex items-center gap-[6px] group"
      onClick={handleLogout}
    >
      <span className="text-secondaryFont text-sm font-medium lg:text-mainFont lg:text-base">
        Log out
      </span>
      <HiOutlineArrowRight className="w-4 h-4 stroke-secondaryFont lg:stroke-mainFont transition-transform group-hover:translate-x-1" />
    </button>
  );
}
