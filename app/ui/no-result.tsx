import Image from 'next/image';

import resultImg from '@/public/images/results.png';

export default function NoResult() {
  return (
    <div className="text-center">
      <Image
        src={resultImg}
        alt="Results paper"
        width={200}
        className="mx-auto"
      />
      <h1 className="text-lg">No Results Found</h1>
    </div>
  );
}
