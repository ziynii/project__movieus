import Layout from '@/components/layout/layout';
import MovieCard from '@/components/movieCard';
import SearchBox from '@/components/searchBox';
import React from 'react';
import useSWR from 'swr';

export interface ICardMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  adult: boolean;
  backdrop_path: string;
  relase_date: string;
  genre_ids: number[];
}

interface IPopular {
  ok: boolean;
  popular: ICardMovie[];
}

interface IRate {
  ok: boolean;
  rate: ICardMovie[];
}

export default function Home() {
  const { data: popularData } = useSWR<IPopular>('/api/movies/popular');
  const { data: rateData } = useSWR<IRate>('/api/movies/rate');

  return (
    <Layout>
      <div>
        <div className="h-96 w-full bg-gray-400" />
        <div className="px-4 py-12">
          <div className="relative mx-auto w-3/5">
            <SearchBox />
          </div>

          <div className="mt-12">
            <p className="text-2xl font-bold">실시간 인기 영화</p>
            <div className="overflow-x-auto scrollbar scrollbar-track-indigo-100 scrollbar-thumb-indigo-500 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-h-3">
              <ul className="mt-8 flex w-[1920px] space-x-2 pb-6  md:space-x-3">
                {popularData?.popular?.map((movie: ICardMovie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 lg:mt-20">
            <p className="text-2xl font-bold">평점이 높은 영화</p>
            <div className="overflow-x-auto scrollbar scrollbar-track-indigo-100 scrollbar-thumb-indigo-500 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-h-3">
              <ul className="mt-8 flex w-[1920px] space-x-2 pb-6  md:space-x-3">
                {rateData?.rate.map((movie: ICardMovie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
