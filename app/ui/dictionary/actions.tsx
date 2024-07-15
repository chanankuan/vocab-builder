import Link from 'next/link';
import { HiMiniPlus } from 'react-icons/hi2';
import { HiMiniArrowLongRight } from 'react-icons/hi2';

export default function Actions() {
  return (
    <div className="mb-8 md:mb-7 flex gap-4 items-center">
      <Link href="/" className="flex gap-2 items-center text-base font-medium">
        <span>Add word</span>
        <HiMiniPlus size={22} color="#85AA9F" />
      </Link>
      <Link href="/" className="flex gap-2 items-center text-base font-medium">
        <span>Train oneself</span>
        <HiMiniArrowLongRight size={20} color="#85AA9F" />
      </Link>
    </div>
  );
}
