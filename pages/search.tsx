import Input from '@/components/input';
import Layout from '@/components/layout/layout';
import MovieCard from '@/components/movieCard';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Search() {
	const { register } = useForm();

  return (
    <Layout>
      <div className="py-8 px-4 md:px-10 lg:px-20">
        <form className="relative mx-auto w-4/5">
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

        <p className="py-8">&apos;검색어&apos;로 검색한 결과입니다</p>

        <ul className="grid grid-cols-3 justify-items-center gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((card, i) => (
            <MovieCard key={i} />
          ))}
        </ul>
      </div>
    </Layout>
  );
}
