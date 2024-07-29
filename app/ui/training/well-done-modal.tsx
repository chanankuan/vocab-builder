import { HiXMark } from 'react-icons/hi2';
import ModalLayout from '../layouts/modal-layout';
import type { Answer } from '@/app/lib/definitions';

export default function WellDoneModal({
  results,
  isOpen,
  onCloseModal,
}: {
  results: Answer[];
  isOpen: boolean;
  onCloseModal: () => void;
}) {
  const correctAnswers = results.filter(result => result.isDone);
  const mistakes = results.filter(result => !result.isDone);

  return (
    <ModalLayout isOpen={isOpen} onCloseModal={onCloseModal}>
      <div className="relative px-4 md:px-16 py-12 bg-book-background bg-[length:152px] md:bg-[length:212px] bg-[right_12px_bottom_44px] md:bg-[right_6px_bottom_21px] bg-no-repeat">
        <h1 className="text-secondaryFont text-xl text-center mb-8 md:text-3xl md:mb-7">
          Well done
        </h1>
        <div className="flex gap-x-8 md:gap-x-16">
          <div>
            <h2 className="text-sm md:text-base text-[#FCFCFC50] mb-2">
              Correct answers:
            </h2>
            <ul className="flex flex-col gap-y-1">
              {correctAnswers.map(answer => (
                <li
                  key={answer._id}
                  className="text-secondaryFont font-medium md:text-lg"
                >
                  {answer.en}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm md:text-base text-[#FCFCFC50] mb-2">
              Mistakes:
            </h2>
            <ul className="flex flex-col gap-y-1">
              {mistakes.map(answer => (
                <li
                  key={answer._id}
                  className="text-secondaryFont font-medium md:text-lg"
                >
                  {answer.en}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          className="absolute top-4 right-4 md:top-5 md:right-5"
          onClick={onCloseModal}
        >
          <HiXMark className="w-6 h-6 fill-secondaryFont md:w-8 md:h-8" />
        </button>
      </div>
    </ModalLayout>
  );
}
