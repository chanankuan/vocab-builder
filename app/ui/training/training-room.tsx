'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import cookie from 'js-cookie';
import clsx from 'clsx';

import { useProgressContext } from '@/hooks';
import { postAnswers } from '@/app/api';
import { getAnswerObj, showToast } from '@/app/lib/utils';
import type { SavedWord, Answer, UaTask, EngTask } from '@/app/lib/definitions';

import en from '@/public/images/eng-lang.svg';
import ua from '@/public/images/uk-lang.svg';
import { HiMiniArrowLongRight } from 'react-icons/hi2';
import Button from '../button';
import WellDoneModal from './well-done-modal';

export default function TrainingRoom({
  words,
}: {
  words: (UaTask | EngTask)[];
}) {
  const { progress, setProgress } = useProgressContext();
  const router = useRouter();
  const [userInput, setUserInput] = useState('');
  const [savedWords, setSavedWords] = useState<SavedWord[]>([]);
  const [isModalShown, setIsModalShown] = useState(false);
  const [results, setResults] = useState<Answer[]>([]);

  const access_token = cookie.get('access_token') ?? '';
  const currentTask = words[progress];

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setUserInput(event.target.value);
  }

  function handleSaveWord() {
    if (!userInput) {
      setProgress(progress + 1);
      return;
    }

    const userAnswer = getAnswerObj(currentTask, userInput);

    setSavedWords(prevSavedWords => [...prevSavedWords, userAnswer]);
    setUserInput('');
    setProgress(progress + 1);
  }

  async function handleSubmit() {
    try {
      if (!userInput) {
        const asnwerData = await postAnswers(savedWords, access_token);
        setResults(asnwerData);
        setIsModalShown(true);
        return;
      }

      const userAnswer = getAnswerObj(currentTask, userInput);

      const asnwerData = await postAnswers(
        [...savedWords, userAnswer],
        access_token
      );
      setResults(asnwerData);
      setIsModalShown(true);
    } catch (error) {
      if (error instanceof Error) {
        showToast('error', <p>{error.message}</p>);
      } else {
        showToast(
          'error',
          <p>Unable to complete the operation. Your progress was not saved.</p>
        );
      }
    }
  }

  function handleCancel() {
    router.push('/dictionary');
  }

  return (
    <div>
      <div className="bg-secondaryFont rounded-lg mb-[120px] md:mb-[40px] md:p-[18px] lg:flex lg:mb-[80px]">
        <div className="flex flex-col p-[22px] h-[195px] max-lg:border-b border-border-main md:h-[280px] lg:h-[300px] lg:flex-1 lg:border-r">
          <div className="md:flex md:justify-between md:items-center">
            <p className="font-medium md:text-lg">
              {currentTask.task === 'ua' ? 'Введіть переклад' : currentTask.ua}
            </p>

            <div className="max-md:hidden flex items-center gap-2 flex-shrink-0">
              <Image src={ua} alt="National flag of Ukraine" priority />
              <span className="font-medium">Ukrainian</span>
            </div>
          </div>

          {currentTask.task === 'ua' && (
            <textarea
              value={userInput}
              onChange={handleChange}
              className="h-full w-full font-medium resize-none bg-transparent outline-none md:text-xl md:font-medium"
            />
          )}

          <div
            className={clsx(
              'flex justify-be mt-auto',
              currentTask.task === 'ua' ? 'justify-between' : 'justify-end'
            )}
          >
            {currentTask.task === 'ua' && progress < words.length - 1 && (
              <NextButton onSaveWord={handleSaveWord} />
            )}
            <div className="flex items-center gap-2 md:hidden">
              <Image src={ua} alt="National flag of Ukraine" priority />
              <span className="font-medium">Ukrainian</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-[22px] h-[195px] md:h-[280px] lg:h-[300px] lg:flex-1">
          <div className="md:flex md:justify-between">
            <p className="font-medium md:text-lg">
              {currentTask.task === 'en' ? 'Translate' : currentTask.en}
            </p>
            <div className="flex justify-end items-center gap-2 mt-auto max-md:hidden">
              <Image src={en} alt="National flag of GB" priority />
              <span className="font-medium">English</span>
            </div>
          </div>

          {currentTask.task === 'en' && (
            <textarea
              value={userInput}
              onChange={handleChange}
              className="h-full w-full font-medium resize-none bg-transparent outline-none md:text-xl md:font-medium"
            />
          )}

          <div
            className={clsx(
              'flex justify-be mt-auto',
              currentTask.task === 'en' ? 'justify-between' : 'justify-end'
            )}
          >
            {currentTask.task === 'en' && progress < words.length - 1 && (
              <NextButton onSaveWord={handleSaveWord} />
            )}
            <div className="flex justify-end items-center gap-2 mt-auto md:hidden">
              <Image src={en} alt="National flag of GB" priority />
              <span className="font-medium">English</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 max-md:flex-col md:gap-[10px]">
        <Button
          action={handleSubmit}
          className="h-[56px] text-secondaryFont bg-green-dark hover:bg-green-main md:w-[200px]"
        >
          Save
        </Button>
        <Button
          action={handleCancel}
          className="text-gray-darker max-md:hover:text-mainFont md:w-[200px] md:text-green-main md:border md:border-green-dark md:hover:text-secondaryFont md:hover:bg-green-dark"
        >
          Cancel
        </Button>
      </div>

      {isModalShown && (
        <WellDoneModal
          results={results}
          isOpen={isModalShown}
          onCloseModal={() => {
            setIsModalShown(false);
            router.push('/dictionary');
          }}
        />
      )}
    </div>
  );
}

function NextButton({
  onSaveWord: handleSaveWord,
}: {
  onSaveWord: () => void;
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 group"
      onClick={handleSaveWord}
    >
      <span className="font-medium">Next</span>
      <HiMiniArrowLongRight
        size={20}
        color="#85AA9F"
        className="transition-transform group-hover:translate-x-1"
      />
    </button>
  );
}
