import Image from 'next/image';
import logo from '@/public/images/logo.svg';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="container py-4 md:py-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-x-4">
            <Image
              src={logo}
              alt="Company logo"
              height={36}
              width={36}
              priority
            />
            <span className="font-semibold text-lg leading-6">
              VocabBuilder
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
