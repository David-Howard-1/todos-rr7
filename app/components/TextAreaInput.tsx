import type { LabelHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  labelClassName?: string;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  textareaClassName?: string;
};
export default function TextAreaInput({
  label,
  labelProps,
  labelClassName,
  textareaProps,
  textareaClassName,
}: Props) {
  return (
    <label
      className={twMerge(['flex flex-col', labelClassName])}
      {...labelProps}
    >
      {label}
      <textarea
        className={twMerge(
          [
            'px-2 py-1 resize-none border border-gray-400 rounded focus:outline-2 focus:outline-sky-400 focus:outline-offset-1',
          ],
          textareaClassName
        )}
        {...textareaProps}
      />
    </label>
  );
}
