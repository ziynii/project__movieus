import MovieLayout from '@/components/layout/movieLayout';
import MovieCard from '@/components/movieCard';
import { ICardMovie } from '@/pages';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

interface ISWRRecommendData {
	ok:boolean;
	recommend:ICardMovie[]
}

export default function Recommend() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<ISWRRecommendData>(id ? `/api/movies/${id}/recommend` : null);

  return (
    <MovieLayout tabValue="영화 추천">
      <ul className="grid grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6 lg:grid-cols-3 justify-items-center">
        {data?.recommend.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </MovieLayout>
  );
}
