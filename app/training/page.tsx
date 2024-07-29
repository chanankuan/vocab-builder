import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { getWordsTasks } from '../api';
import { ProgressProvider } from '@/context/progress-context';
import NoWords from '../ui/training/no-words';
import Progress from '../ui/training/progress';
import TrainingRoom from '../ui/training/training-room';

export const metadata: Metadata = {
  title: 'Training Page',
};

export default async function Training() {
  const access_token = cookies().get('access_token')?.value;
  const tasks = access_token && (await getWordsTasks(access_token));

  return (
    <ProgressProvider>
      <main>
        <div className="container">
          {tasks && tasks.length ? (
            <div className="pt-6 md:pt-[62px]">
              <Progress totalWords={tasks.length} />
              <TrainingRoom words={tasks} />
            </div>
          ) : (
            <NoWords />
          )}
        </div>
      </main>
    </ProgressProvider>
  );
}
