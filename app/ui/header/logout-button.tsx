'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import chevron_white from '@/public/images/arrow-right-white.svg';
import chevron_black from '@/public/images/arrow-right-main.svg';

import { signout } from '@/app/api';

export default function LogoutButton() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('user') || '';
    if (data) {
      const { token } = JSON.parse(data);
      setToken(token);
    }
  }, []);

  async function handleLogout() {
    try {
      await signout(token);
      localStorage.removeItem('user');
    } catch (error) {}
  }

  return (
    <button className="flex items-center gap-[6px]" onClick={handleLogout}>
      <span className="text-secondaryFont text-sm font-medium lg:text-mainFont lg:text-base">
        Log out
      </span>
      <Image className="lg:hidden" src={chevron_white} alt="chevron right" />
      <Image
        className="max-lg:hidden"
        src={chevron_black}
        alt="chevron right"
      />
    </button>
  );
}
