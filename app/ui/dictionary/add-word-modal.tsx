'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cookie from 'js-cookie';
import Image from 'next/image';
import clsx from 'clsx';

import { createWord, getCategories } from '@/app/api/words';
import { showToast, CreateWordSchema } from '@/app/lib/utils';
import type { createWordRequest } from '@/app/lib/definitions';
import { BiChevronDown } from 'react-icons/bi';
import { HiXMark } from 'react-icons/hi2';
import InfoMessage from '../auth/info-message';

import en from '@/public/images/eng-lang.svg';
import ua from '@/public/images/uk-lang.svg';

export default function AddWordModal({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  return (
    <div className="relative py-12 px-4 md:py-12 md:px-16">
      <h1 className="text-xl text-secondaryFont mb-4 md:text-3xl md:mb-5">
        Add word
      </h1>
      <p className="text-base text-secondaryFont mb-4 md:text-lg md:mb-8">
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </p>

      <AddWordForm onCloseModal={onCloseModal} />

      <button
        className="absolute top-4 right-4 md:top-5 md:right-5"
        onClick={onCloseModal}
      >
        <HiXMark className="w-6 h-6 fill-secondaryFont md:w-8 md:h-8" />
      </button>
    </div>
  );
}

function AddWordForm({ onCloseModal }: { onCloseModal: () => void }) {
  const [options, setOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    category: '',
    isIrregular: '',
    en: '',
    ua: '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CreateWordSchema),
  });

  const access_token = cookie.get('access_token') ?? '';

  useEffect(() => {
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
      }
    }

    fetchCategories();
  }, []);

  async function onSubmitHandler(formData: createWordRequest) {
    // Remove isIrregular property if category is not verb
    if (formData.category !== 'verb' && !formData.isIrregular) {
      delete formData.isIrregular;
    }

    try {
      await createWord(formData, access_token);
      reset();
      onCloseModal();
    } catch (error) {
      if (error instanceof Error) {
        showToast('error', <p>{error.message}</p>);
      } else {
        showToast('error', <p>An unknown error occured. Please try later.</p>);
      }
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormData(prevFormData => {
      if (value === 'verb') {
        return { ...prevFormData, [name]: value.trim(), isIrregular: 'false' };
      }
      return { ...prevFormData, [name]: value.trim() };
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div
        className={clsx(
          formData.isIrregular === 'true' ? 'mb-3 md:mb-4' : 'mb-8 md:mb-[38px]'
        )}
      >
        <div className="relative md:w-[204px]">
          <select
            {...register('category')}
            className={clsx(
              'block text-base font-medium text-secondaryFont px-6 py-3 border rounded-[15px] w-full outline-none bg-transparent appearance-none mb-2',
              errors.category ? 'border-danger' : 'border-gray-light'
            )}
            name="category"
            id="category"
            onChange={handleChange}
          >
            <option value="">Choose category</option>
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.category?.message && (
            <InfoMessage type="danger" message={errors.category.message} />
          )}

          <BiChevronDown className="absolute top-3 right-6 w-6 h-6 fill-secondaryFont" />
        </div>

        {formData.category === 'verb' && (
          <div
            className={clsx('flex items-center gap-4', {
              'mb-2': formData.isIrregular === 'true',
            })}
          >
            <div className="flex gap-2">
              <input
                {...register('isIrregular')}
                type="radio"
                value="false"
                id="regular"
                name="isIrregular"
                checked={formData.isIrregular === 'false'}
                onChange={handleChange}
              />
              <label
                className="text-xs text-secondaryFont md:text-base"
                htmlFor="regular"
              >
                Regular
              </label>
            </div>
            <div className="flex gap-2">
              <input
                {...register('isIrregular')}
                type="radio"
                value="true"
                id="irregular"
                name="isIrregular"
                checked={formData.isIrregular === 'true'}
                onChange={handleChange}
              />
              <label
                className="text-xs text-secondaryFont md:text-base"
                htmlFor="irregular"
              >
                Irregular
              </label>
            </div>
          </div>
        )}

        {formData.isIrregular === 'true' && (
          <p className="text-2xs text-secondaryFont md:text-xs">
            Such data must be entered in the format I form-II form-III form.
          </p>
        )}
      </div>

      <div className="mb-8">
        <div className="mb-4">
          <div
            className={clsx(
              'md:flex md:justify-end md:flex-row-reverse md:gap-x-8',
              errors.ua && 'mb-1'
            )}
          >
            <label className="flex items-center gap-2 max-md:mb-2" htmlFor="ua">
              <Image src={ua} alt="National flag of Ukraine" priority />
              <span className="text-sm font-medium text-secondaryFont md:text-base">
                Ukrainian
              </span>
            </label>
            <input
              {...register('ua')}
              type="text"
              name="ua"
              id="ua"
              value={formData.ua}
              placeholder="Українська"
              onChange={handleChange}
              className="w-full h-12 text-secondaryFont bg-transparent py-3 px-6 rounded-[15px] border outline-none border-gray-light placeholder:text-secondaryFont md:w-[354px] md:h-14 md:py-4 md:px-[18px]"
            />
          </div>

          {errors.ua?.message && (
            <InfoMessage type="danger" message={errors.ua.message} />
          )}
        </div>

        <div>
          <div
            className={clsx(
              'md:flex md:justify-end md:flex-row-reverse md:gap-x-8',
              errors.en && 'mb-1'
            )}
          >
            <label className="flex items-center gap-2 max-md:mb-2" htmlFor="en">
              <Image src={en} alt="National flag of GB" priority />
              <span className="text-sm font-medium text-secondaryFont md:text-base">
                English
              </span>
            </label>
            <input
              {...register('en')}
              type="text"
              name="en"
              id="en"
              value={formData.en}
              placeholder="English"
              onChange={handleChange}
              className="w-full h-12 text-secondaryFont bg-transparent py-3 px-6 rounded-[15px] border outline-none border-gray-light placeholder:text-secondaryFont md:w-[354px] md:h-14 md:py-4 md:px-[18px]"
            />
          </div>

          {errors.en?.message && (
            <InfoMessage type="danger" message={errors.en.message} />
          )}
        </div>
      </div>

      <div className="flex justify-between gap-x-2 md:gap-x-[10px]">
        <button
          type="submit"
          className="
            flex-1 text-base leading-[24px] font-bold h-[48px] bg-secondaryFont rounded-[30px]
            transition-colors hover:text-green-dark
          "
        >
          Add
        </button>
        <button
          type="button"
          className="
            flex-1 text-base text-secondaryFont leading-[24px] font-bold h-[48px] bg-transparent rounded-[30px] border border-[rgba(252, 252, 252, 0.40)]
            transition-colors hover:text-mainFont hover:bg-secondaryFont hover:border-secondaryFont
          "
          onClick={onCloseModal}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
