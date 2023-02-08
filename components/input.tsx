import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface IInputProps {
  label?: string;
  name: string;
  type: string;
  register: UseFormRegisterReturn;
  required: boolean;
  kind?: 'text' | 'email' | 'search';
  placeholder: string;
}

export default function Input({
  label,
  name,
  type,
  kind,
  register,
  required,
  placeholder,
}: IInputProps) {
  return (
    <div className="flex flex-col">
      {label ? <label className='mb-2' htmlFor={name}>{label}</label> : null}

      {kind === 'text' ? (
        <input
          id={name}
          type={type}
          {...register}
          required={required}
          placeholder={placeholder}
          className={"flex-grow px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900" + (name === 'search' ? ' rounded-full' : 'rounded')}
        />
      ) : null}

      {kind === 'email' ? (
        <input
          id={name}
          type={type}
          {...register}
          required={required}
          placeholder={placeholder}
          className=" flex-grow rounded  px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        />
      ) : null}
    </div>
  );
}
