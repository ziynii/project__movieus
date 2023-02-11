import Layout from '@/components/layout/layout';
import MovieCard from '@/components/movieCard';
import SearchBox from '@/components/searchBox';
import { useRouter } from 'next/router';
import React from 'react';
import { IMovie } from '..';
import useSWR from 'swr';

interface ISearchResponse {
  ok: boolean;
  searchResult: IMovie[];
}

export default function Search() {
  const router = useRouter();
  const { keyword } = router.query;
  const { data } = useSWR<ISearchResponse>(`/api/search/${keyword}`);

  return (
    <Layout>
      <div className="py-8 px-4 md:px-10 lg:px-20">
        <div className="relative mx-auto w-4/5">
          <SearchBox />
        </div>

        <p className="py-8">&apos;{keyword}&apos; 의 검색 결과입니다</p>

        <ul className="grid grid-cols-3 justify-items-center gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-5">
          {data?.searchResult?.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
