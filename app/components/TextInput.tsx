import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react';

type Props = {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};
export default function TextInput({ label, labelProps, inputProps }: Props) {
  return (
    <label className="flex flex-col" {...labelProps}>
      {label}
      <input
        className="px-2 py-1 border border-gray-400 rounded focus:outline-2 focus:outline-sky-400 focus:outline-offset-1"
        {...inputProps}
      />
    </label>
  );
}
