import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Button({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={twMerge(
        [
          'cursor-pointer text-center flex items-center justify-center w-fit px-4 py-2 bg-sky-600 text-white font-bold rounded text-sm active:translate-y-[1px]',
        ],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
