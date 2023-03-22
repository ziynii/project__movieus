import Layout from '@/components/layout/layout';
import MovieCard from '@/components/movieCard';
import SearchBox from '@/components/searchBox';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR, { SWRConfig, unstable_serialize } from 'swr';
import { GetServerSideProps, NextPage } from 'next';
import { ICardMovie } from '..';

interface ISearchResponse {
  ok: boolean;
  searchResult: ICardMovie[];
}

function Search() {
  const router = useRouter();
  const { keyword } = router.query;
  const { data } = useSWR<ISearchResponse>(
    keyword ? `/api/search/${keyword}` : null
  );

  return (
    <Layout seoTitle={`${keyword}의 검색결과`}>
      <div className="py-8 px-4 md:px-10 lg:px-20">
        <div className="relative mx-auto w-4/5">
          <SearchBox />
        </div>

        <p className="py-8">&apos;{keyword}&apos;의 검색 결과입니다 &#40;{data?.searchResult?.length}건&#41;</p>

        <ul className="grid grid-cols-3 justify-items-center gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-5">
          {data?.searchResult?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    </Layout>
  );
}

const Page: NextPage<{ search: ICardMovie[]; keyword: string }> = ({
  search,
  keyword,
}) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize(['api', 'search', keyword])]: {
            ok: true,
            search,
          },
        },
      }}
    >
      <Search />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=ko-KR&query=${context?.params?.keyword}&page=1&include_adult=true`
  )
    .then((res) => res.json())
    .then((data) => data.results);

  return {
    props: {
      search: JSON.parse(JSON.stringify(search)),
    },
  };
};

export default Page;
