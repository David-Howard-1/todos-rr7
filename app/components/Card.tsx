import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = PropsWithChildren & {
  className?: string;
};
export default function Card({ className, children }: Props) {
  return (
    <div
      className={twMerge([
        'bg-white text-black w-md rounded py-6 px-8',
        className,
      ])}
    >
      {children}
    </div>
  );
}
