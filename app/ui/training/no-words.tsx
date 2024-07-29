'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import noWordsImg from '@/public/images/results.png';
import Button from '../button';

export default function NoWords() {
  const router = useRouter();

  function addWord() {
    router.push('/dictionary?modal=true');
  }

  function handleCancel() {
    router.push('/dictionary');
  }

  return (
    <div className="py-[75px] md:py-[140px] lg:py-[193px] md:px-[62px] lg:px-[169px] lg:flex lg:flex-row-reverse lg:gap-8 lg:items-center">
      <div className="w-[166px] h-[166px] mx-auto mb-8 md:w-[230px] md:h-[230px] lg:flex-shrink-0">
        <Image
          src={noWordsImg}
          alt="Test report blank"
          className="rotate-[18deg]"
        />
      </div>

      <div className="lg:pl-[25px] lg:py-[18px]">
        <h1 className="text-base font-medium mb-4 md:text-lg">
          You don&apos;t have a single word to learn right now.
        </h1>
        <p className="text-sm md:text-base mb-[132px] md:mb-16">
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </p>
        <div className="flex gap-2 max-md:flex-col md:gap-[10px]">
          <Button
            action={addWord}
            className="h-[56px] text-secondaryFont bg-green-dark hover:bg-green-main md:w-[215px]"
          >
            Add word
          </Button>
          <Button
            action={handleCancel}
            className="text-gray-darker max-md:hover:text-mainFont md:w-[215px] md:text-green-main md:border md:border-green-dark md:hover:text-secondaryFont md:hover:bg-green-dark"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
