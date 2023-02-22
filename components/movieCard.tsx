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
        <div className="relative w-full pb-[150%] hover:opacity-70">
          <Image
            src={makeImagePath(movie.poster_path! || movie.posterUrl!)}
            alt={movie.title}
            fill
            sizes="100%"
            priority={true}
          />
        </div>
        <div className="mt-4">
          <p className="font-bold">{movie?.title}</p>
        </div>
      </Link>
    </li>
  );
}
