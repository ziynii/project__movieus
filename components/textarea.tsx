import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaProps {
  label?: string;
  name?: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

export default function TextArea({
  label,
  name,
  register,
  ...rest
}: TextAreaProps) {
  return (
    <div className='mt-4'>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        {...register}
        className="mt-1 w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 shadow-sm outline-none focus:border-indigo-500 focus:outline-none "
        rows={4}
        {...rest}
      />
    </div>
  );
}
