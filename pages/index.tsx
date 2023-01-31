import Layout from '@/components/Layout';
import MovieCard from '@/components/movieCard';
import React from 'react';

export default function Home() {
  return (
    <Layout>
      <div>
        <div className="h-96 w-full bg-gray-400" />
        <div className="px-4 py-12">
          <form className="relative mx-auto w-3/5">
            <input
              placeholder="검색어를 입력해주세요"
              className="w-full rounded-full px-4 py-2"
            />
            <button className="absolute right-0 h-10 w-12 bg-transparent text-indigo-500">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
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
          <div className="mt-12">
            <p className="text-2xl font-bold">TOP10</p>
            <div className="overflow-x-auto">
              <ul className="mt-8 flex w-full space-x-2 pb-6 scrollbar scrollbar-track-indigo-100 scrollbar-thumb-indigo-500 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-h-3">
                {[1, 1, 1, 1, 1, 1].map((movie, i) => (
                  <MovieCard key={i} />
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12">
            <p className="text-2xl font-bold">장르별 추천 영화</p>
            <div className="overflow-x-auto">
              <ul className="mt-8 flex w-full space-x-2 pb-6 scrollbar scrollbar-track-indigo-100 scrollbar-thumb-indigo-500 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-h-3">
                {[1, 1, 1, 1, 1, 1].map((movie, i) => (
                  <MovieCard key={i} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
