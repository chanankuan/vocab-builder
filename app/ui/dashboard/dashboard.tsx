import Link from 'next/link';

import { HiMiniArrowLongRight } from 'react-icons/hi2';

import AddWordBtn from '../dictionary/add-word-btn';
import Filters from './filters';
import Statistics from './statistics';

export default function Dashboard() {
  return (
    <div className="lg:flex">
      <Filters />
      <div className="mb-8 md:mb-7 lg:mb-0 md:flex md:items-center md:gap-4 lg:ml-auto">
        <Statistics />
        <div className="flex gap-4 items-center">
          <AddWordBtn />

          <Link
            href="/training"
            className="flex gap-2 items-center text-base font-medium transition-[gap] group"
          >
            <span>Train oneself</span>
            <HiMiniArrowLongRight
              size={20}
              color="#85AA9F"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
