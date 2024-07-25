'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import cookie from 'js-cookie';
import debounce from 'lodash.debounce';

import { getCategories } from '@/app/api/words';
import { BiChevronDown, BiSearch } from 'react-icons/bi';
import { FiltersSkeleton } from '../skeletons';
import { showToast } from '@/app/lib/utils';

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [options, setOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isVerb, setIsVerb] = useState(searchParams.get('category') === 'verb');

  useEffect(() => {
    const access_token = cookie.get('access_token') ?? '';
    async function fetchCategories() {
      try {
        const categories = await getCategories(access_token);
        setOptions(categories);
      } catch (error) {
        if (error instanceof Error) {
          showToast('error', <p>{error.message}</p>);
        } else {
          showToast(
            'error',
            <p>An unknown error occured. Please try later.</p>
          );
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value.trim());
    } else {
      params.delete(name);
    }

    if (name === 'category' && value === 'verb') {
      setIsVerb(true);
    } else if (name === 'category' && value !== 'verb') {
      setIsVerb(false);
      params.delete('isIrregular');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      {/* {isLoading ? (
        <FiltersSkeleton />
      ) : (
        <div
          className={clsx('md:mb-7 lg:mb-0 md:flex md:items-center md:gap-2', {
            'mb-10': !isVerb,
            'mb-[14px]': isVerb,
          })}
        >
          <div className="relative max-md:mb-2 md:w-[274px]">
            <input
              className="block text-base font-medium placeholder:text-mainFont placeholder:font-medium px-6 py-3 outline-none border rounded-[15px] w-full border-gray-main focus:border-green-dark autofill:bg-transparent"
              type="text"
              name="keyword"
              placeholder="Find the word"
              defaultValue={searchParams.get('keyword')?.toString() ?? ''}
              onChange={debounce(handleChange, 300)}
            />
            <BiSearch className="absolute top-4 right-6 w-5 h-5" />
          </div>

          <div className="relative max-md:mb-2 md:w-[164px]">
            <select
              className="block text-base font-medium px-6 py-3 border rounded-[15px] w-full outline-none border-gray-main appearance-none focus:border-green-dark"
              name="category"
              id="category"
              defaultValue={searchParams.get('category')?.toString() ?? ''}
              onChange={handleChange}
            >
              <option value="">Categories</option>
              {options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <BiChevronDown className="absolute top-3 right-6 w-6 h-6" />
          </div>

          {isVerb && (
            <div className="flex gap-4">
              <div className="flex gap-2">
                <input
                  className="accent-pink-500"
                  type="radio"
                  value="false"
                  id="regular"
                  name="isIrregular"
                  checked={
                    searchParams.get('isIrregular')?.toString() === 'false'
                  }
                  onChange={handleChange}
                />
                <label htmlFor="regular">Regular</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  value="true"
                  id="irregular"
                  name="isIrregular"
                  checked={
                    searchParams.get('isIrregular')?.toString() === 'true'
                  }
                  onChange={handleChange}
                />
                <label htmlFor="irregular">Irregular</label>
              </div>
            </div>
          )}
        </div>
      )} */}
    </>
  );
}
