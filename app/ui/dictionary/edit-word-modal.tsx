'use client';

import { useState } from 'react';
import Image from 'next/image';
import cookie from 'js-cookie';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import type { updateWordRequest, Word } from '@/app/lib/definitions';
import { updateWord } from '@/app/api/words';
import { EditWordSchema, showToast } from '@/app/lib/utils';
import { useWordsContext } from '@/context/words-context';

import InfoMessage from '../auth/info-message';
import { HiXMark } from 'react-icons/hi2';
import en from '@/public/images/eng-lang.svg';
import ua from '@/public/images/uk-lang.svg';

export default function EditWordModal({
  currentWord,
  onCloseModal,
}: {
  currentWord: Word;
  onCloseModal: () => void;
}) {
  return (
    <div className="relative py-12 px-4 md:py-12 md:px-16">
      <EditWordForm currentWord={currentWord} onCloseModal={onCloseModal} />

      <button
        className="absolute top-4 right-4 md:top-5 md:right-5"
        onClick={onCloseModal}
      >
        <HiXMark className="w-6 h-6 fill-secondaryFont md:w-8 md:h-8" />
      </button>
    </div>
  );
}

function EditWordForm({
  currentWord,
  onCloseModal,
}: {
  currentWord: Word;
  onCloseModal: () => void;
}) {
  const { updateWords } = useWordsContext();
  const [canSave, setCanSave] = useState(false);
  const [formData, setFormData] = useState({
    category: currentWord.category,
    isIrregular: currentWord.isIrregular ?? '',
    en: currentWord.en,
    ua: currentWord.ua,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(EditWordSchema),
  });

  const access_token = cookie.get('access_token') ?? '';

  async function onSubmitHandler(formData: updateWordRequest) {
    // Remove isIrregular property if category is not verb
    if (formData.category !== 'verb' && !formData.isIrregular) {
      delete formData.isIrregular;
    }

    try {
      await updateWord(formData, currentWord._id, access_token);
      reset();
      onCloseModal();
      updateWords();
      showToast('success', <p>The word was updated.</p>);
    } catch (error) {
      if (error instanceof Error) {
        showToast('error', <p>{error.message}</p>);
      }
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setCanSave(true);
    const { name, value } = e.target;

    setFormData(prevFormData => {
      if (value === 'verb') {
        return {
          ...prevFormData,
          [name]: value.trim(),
          isIrregular: 'false',
        };
      }
      return { ...prevFormData, [name]: value.trim() };
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <div className="mb-4">
          <div
            className={clsx(
              'md:flex md:justify-end md:flex-row-reverse md:gap-x-8',
              errors.ua && 'mb-1'
            )}
          >
            <label className="flex items-center gap-2 mb-2" htmlFor="ua">
              <Image
                className=""
                src={ua}
                alt="National flag of Ukraine"
                priority
              />
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
              onChange={handleChange}
              className={clsx(
                'w-full h-12 text-secondaryFont bg-transparent py-3 px-6 rounded-[15px] border outline-none placeholder:text-secondaryFont md:w-[354px] md:h-14 md:py-4 md:px-[18px]',
                errors.ua ? 'border-danger' : 'border-gray-light'
              )}
            />
          </div>

          {errors.ua?.message && (
            <InfoMessage type="danger" message={errors.ua.message} />
          )}
        </div>
        <div className="mb-8">
          <div
            className={clsx(
              'md:flex md:justify-end md:flex-row-reverse md:gap-x-8',
              errors.en && 'mb-1'
            )}
          >
            <label className="flex items-center gap-2 mb-2" htmlFor="en">
              <Image className="" src={en} alt="National flag of GB" priority />
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
              onChange={handleChange}
              className={clsx(
                'w-full h-12 text-secondaryFont bg-transparent py-3 px-6 rounded-[15px] border outline-none placeholder:text-secondaryFont md:w-[354px] md:h-14 md:py-4 md:px-[18px]',
                errors.en ? 'border-danger' : 'border-gray-light'
              )}
            />
          </div>
          {errors.en?.message && (
            <InfoMessage type="danger" message={errors.en.message} />
          )}
        </div>

        <input
          {...register('category')}
          type="text"
          name="category"
          value={formData.category}
          className="hidden"
          aria-hidden
        />
        <input
          {...register('isIrregular')}
          type="radio"
          value="false"
          id="regular"
          name="isIrregular"
          checked={formData.isIrregular === false}
          className="hidden"
          aria-hidden
        />
        <input
          {...register('isIrregular')}
          type="radio"
          value="true"
          id="irregular"
          name="isIrregular"
          checked={formData.isIrregular === true}
          className="hidden"
          aria-hidden
        />
      </div>

      <div className="flex justify-between gap-x-2 md:gap-x-[10px]">
        <button
          type="submit"
          disabled={!canSave}
          className="
            flex-1 text-base leading-[24px] font-bold h-[48px] bg-secondaryFont rounded-[30px]
            transition-colors hover:enabled:text-green-dark disabled:bg-gray-light
          "
        >
          Save
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
