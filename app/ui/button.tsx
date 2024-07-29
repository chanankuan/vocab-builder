import clsx from 'clsx';

export default function Button({
  action,
  children,
  type = 'button',
  className,
}: {
  action: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={action}
      className={clsx(
        'w-full text-base font-bold rounded-[30px] transition-colors duration-300',
        className
      )}
    >
      {children}
    </button>
  );
}
