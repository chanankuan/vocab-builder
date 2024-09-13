import cookie from 'js-cookie';

import { addWord } from '@/app/api';
import { showToast } from '@/app/lib/utils';
import { useWordsContext } from '@/hooks';
import { HiMiniArrowLongRight } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';

export default function AddWordBtn({ wordId }: { wordId: string }) {
  const router = useRouter();
  const { updateWords } = useWordsContext();
  const access_token = cookie.get('access_token') ?? '';

  async function handleAddWord(wordId: string) {
    try {
      await addWord(wordId, access_token);
      updateWords();
      showToast('success', <p>The word added successfully.</p>);
    } catch (error) {
      if (error instanceof Error) {
        showToast('error', <p>{error.message}</p>);
      } else {
        showToast('error', <p>An unknown error occured. Please try later.</p>);
      }
    }
  }

  return (
    <button
      className="flex flex-col gap-y-[2px] text-start group lg:flex-row lg:gap-x-2"
      onClick={() => handleAddWord(wordId)}
    >
      <span className="max-md:hidden text-sm font-medium">
        Add to dictionary
      </span>
      <HiMiniArrowLongRight
        size={20}
        color="#85AA9F"
        className="transition-transform group-hover:translate-x-1"
      />
    </button>
  );
}
