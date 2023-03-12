import MypageLayout from '@/components/layout/mypageLayout';
import MovieCard from '@/components/movieCard';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<IFavResponse>(id ? `/api/users/${id}/fav` : null);

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

      {data?.myFavMovies?.length === 0 ? (
        <p className="py-32 text-center">아직 찜 한 영화가 없어요</p>
      ) : null}
    </MypageLayout>
  );
}
