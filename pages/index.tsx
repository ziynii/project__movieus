import Layout from '@/components/layout/layout';
import MovieCard from '@/components/movieCard';
import SearchBox from '@/components/searchBox';
import { makeImagePath } from '@/libs/client/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

export interface ICardMovie {
  id: number;
  title: string;
  poster_path?: string;
  posterUrl?: string;
  backdrop_path?: string;
}

interface IPopular {
  ok: boolean;
  popular: ICardMovie[];
}

interface IRateResponse {
  ok: boolean;
  rate: ICardMovie[];
}

export default function Home() {
  const { data: popularData } = useSWR<IPopular>('/api/movies/popular');
  const { data: rateData } = useSWR<IRateResponse>('/api/movies/rate');

  return (
    <Layout>
      <div>
        <div className="relative h-96 w-full">
          <div className="absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-l from-transparent to-gray-900">
            <div className="absolute bottom-8 left-6">
              <p className="text-3xl font-bold">
                {popularData?.popular[0].title!}
              </p>
              <button className="mt-3 flex rounded-full bg-indigo-500 px-4 py-1 text-center text-xs hover:bg-indigo-700">
                <Link href={`/movies/${popularData?.popular[0].id!}/detail`}>
                  자세히 보기
                </Link>
              </button>
            </div>
          </div>
          <Image
            src={makeImagePath(popularData?.popular[0].backdrop_path!)}
            alt={popularData?.popular[0].title!}
            fill={true}
            sizes="(max-width: 768px) 100vw,
						(max-width: 1200px) 50vw,
						33vw"
            className="object-cover object-center"
            priority={true}
          />
        </div>
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
