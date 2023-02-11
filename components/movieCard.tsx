import { makeImagePath } from '@/libs/client/utils';
import { ICardMovie } from '@/pages';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IMovieCardProps {
  movie: ICardMovie;
}

export default function MovieCard({ movie }: IMovieCardProps) {
  return (
    <li className="w-full cursor-pointer">
      <Link href={`/movies/${movie.id}/detail`}>
        <div className="relative w-full">
          <div className="w-full pb-[150%] relative">
            <Image
              src={makeImagePath(movie.poster_path)}
              alt={movie.title}
							fill
              sizes='100%'
              priority={true}
            />
          </div>
          <div className="absolute bottom-2 right-1 rounded-lg bg-transparent text-white hover:text-indigo-500">
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-bold">{movie?.title}</p>
          <span className="text-xs text-gray-500">genre</span>
        </div>
      </Link>
    </li>
  );
}
