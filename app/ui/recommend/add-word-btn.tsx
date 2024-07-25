import { showToast } from '@/app/lib/utils';
import { HiMiniArrowLongRight } from 'react-icons/hi2';

export default function AddWordBtn({ wordId }: { wordId: string }) {
  async function handleAddWord(wordId: string) {
    showToast('info', <p>wordId: {wordId}</p>);
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
