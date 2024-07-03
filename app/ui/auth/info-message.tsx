import Image from 'next/image';

import dangerIcon from '@/public/images/input-error.svg';
import successIcon from '@/public/images/input-success.svg';

interface InfoMessageProps {
  type: 'danger' | 'success';
  message: string;
}

export default function InfoMessage({ type, message }: InfoMessageProps) {
  return (
    <p className={`text-${type} text-xs flex gap-1`}>
      <Image
        src={type === 'danger' ? dangerIcon : successIcon}
        alt={`${type} icon`}
      />
      {message}
    </p>
  );
}
