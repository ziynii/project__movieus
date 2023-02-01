import MovieLayout from '@/components/layout/movieLayout';
import ReviewCard from '@/components/reviewCard';
import React from 'react';

export default function Review() {
  return (
    <MovieLayout tabValue="리뷰">
      <div className="mt-8 flex items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500">
          <svg
            fill="white"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-10 w-10 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            ></path>
          </svg>
        </div>

        <div className="ml-4 flex items-end">
          <p className="text-5xl">4</p>
          <div className="ml-2 flex flex-col text-xs">
            <span>/5</span>
            <span>TOTAL RATING</span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <p className="text-base font-bold">리뷰 99개</p>
        <button className="text-base font-bold text-indigo-500 ">
          리뷰쓰기
        </button>
      </div>

      <ul className="py-6">
        {[1, 1, 1, 1, 1].map((review, i) => (
          <ReviewCard key={i} />
        ))}
      </ul>
    </MovieLayout>
  );
}
