import Image from 'next/image';
import clsx from 'clsx';

import avatar from '@/public/images/default_avatar.svg';
import avatar_reversed from '@/public/images/default_avatar_reversed.svg';
import type { UserCookie } from '@/app/lib/definitions';

export default function UserBar({
  user,
  isOpen,
}: {
  user: UserCookie | null;
  isOpen: boolean;
}) {
  return (
    <>
      <p
        className={clsx(
          'font-medium',
          isOpen ? 'text-secondaryFont' : 'text-mainFont'
        )}
      >
        {user?.name}
      </p>
      <div
        className={clsx(
          'w-9 h-9 md:w-12 md:h-12 rounded-full flex justify-center items-center',
          isOpen ? 'bg-secondaryFont' : 'bg-green-dark'
        )}
      >
        <Image
          className="w-5 h-5 md:w-6 md:h-6"
          src={isOpen ? avatar_reversed : avatar}
          alt="default avatar"
        />
      </div>
    </>
  );
}
