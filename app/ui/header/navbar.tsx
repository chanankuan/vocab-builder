'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({
  onCloseSidebar,
}: {
  onCloseSidebar?: () => void;
}) {
  const pathname = usePathname();

  const links = [
    { href: '/dictionary', name: 'Dictionary' },
    { href: '/recommend', name: 'Recommend' },
    { href: '/training', name: 'Training' },
  ];

  return (
    <nav>
      <ul className="lg:flex lg:items-center lg:gap-[28px]">
        {links.map(({ href, name }) => {
          const isActive = href === pathname;
          return (
            <li key={href} className="max-lg:mb-7">
              <Link
                className={clsx(
                  'transition-link duration-150 text-sm font-medium rounded-[15px] hover:py-3 hover:px-5 lg:py-3 lg:px-5',
                  {
                    'text-secondaryFont hover:text-mainFont hover:bg-secondaryFont lg:text-mainFont lg:hover:bg-green-dark lg:hover:text-secondaryFont':
                      !isActive,
                    'text-mainFont bg-secondaryFont rounded-[15px] py-3 px-5 lg:text-secondaryFont lg:bg-green-dark':
                      isActive,
                  }
                )}
                href={href}
                onClick={onCloseSidebar}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
