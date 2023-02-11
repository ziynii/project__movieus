import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/input';
import useSWR from 'swr';
import { useRouter } from 'next/router';

interface ISearchForm {
  search: string;
}


export default function SearchBox() {
  const { register, handleSubmit } = useForm<ISearchForm>();
  const router = useRouter()
	const onValid = (data: ISearchForm) => {
		router.push(`/search/${data.search}`)
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Input
        register={register('search', {
          required: true,
        })}
        name="search"
        type="text"
        kind="text"
        placeholder="검색어를 입력해주세요"
        required
      />
      <button className="absolute right-0 bottom-0 h-12 w-12 bg-transparent text-indigo-500">
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="mx-auto h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          ></path>
        </svg>
      </button>
    </form>
  );
}
