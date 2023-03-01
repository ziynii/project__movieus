import MypageLayout from '@/components/layout/mypageLayout';
import MovieCard from '@/components/movieCard';
import React from 'react';
import useSWR from 'swr';

interface IMovieLike {
  movieId: number;
  title: string;
  posterUrl: string;
}

interface IFavResponse {
  ok: boolean;
  myFavMovies: IMovieLike[];
}

export default function Like() {
  const { data } = useSWR<IFavResponse>(`/api/users/me/fav`);

  return (
    <MypageLayout tabValue="찜 한 영화">
      <ul className="grid grid-cols-3 justify-items-center gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-5">
        {data?.myFavMovies.map((movie: IMovieLike) => (
          <MovieCard
            key={movie.movieId}
            movie={{
              id: movie.movieId,
              title: movie.title,
              poster_path: movie.posterUrl,
            }}
          />
        ))}
      </ul>
    </MypageLayout>
  );
}
