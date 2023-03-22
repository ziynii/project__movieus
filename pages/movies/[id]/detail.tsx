import MovieLayout, { ICastResponse } from '@/components/layout/movieLayout';
import { ICast } from '@/pages/api/movies/[id]/credits';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR, { SWRConfig, unstable_serialize } from 'swr';

interface IGenre {
  id: number;
  name: String;
}

interface IVideo {
  key: string;
}

export interface IDetailMovie {
  id: number;
  title: string;
  genres: IGenre[];
  overview: string;
  runtime: number;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
}

export interface IDetailResponse {
  ok: boolean;
  movie: IDetailMovie;
}

interface IVideoResponse {
  ok: boolean;
  foundVideo: IVideo[];
  error?: string;
}

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<IDetailResponse>(
    id ? `/api/movies/${id}/detail` : null
  );
  const { data: video } = useSWR<IVideoResponse>(
    id ? `/api/movies/${id}/video` : null
  );
  const videoId = video?.ok ? video?.foundVideo[0]?.key : null;

  const { data: credits } = useSWR<ICastResponse>(
    id ? `/api/movies/${id}/credits` : null
  );

  return (
    <MovieLayout tabValue="영화 정보">
      <div>
        <p className="text-lg font-bold md:text-lg ">줄거리</p>
        <pre className="mt-4 whitespace-pre-wrap text-sm md:h-48 md:text-base">
          {data?.movie?.overview === ''
            ? '제공되는 줄거리가 없습니다.'
            : data?.movie?.overview}
        </pre>
      </div>

      <div className="mt-12">
        <p className="text-lg font-bold md:text-lg ">영화 정보</p>

        <dl className="mt-4">
          <div className="flex items-center border-b border-gray-400 py-4">
            <dt className="basis-1/5 text-sm font-bold md:text-base">감독</dt>
            <dd className="basis-4/5 text-xs md:text-sm">
              {credits?.director[0]?.name}
            </dd>
          </div>
          <div className="flex items-center border-b border-gray-400 py-4">
            <dt className="basis-1/5 text-sm font-bold md:text-base">주연</dt>
            <dd className="basis-4/5 text-xs md:text-sm">
              {credits?.casts.map((cast) => (
                <span className="mr-2" key={cast.id}>
                  {cast.name}
                </span>
              ))}
            </dd>
          </div>
          <div className="flex items-center border-b border-gray-400 py-4">
            <dt className="basis-1/5 text-sm font-bold md:text-base">장르</dt>
            <dd className="basis-4/5 text-xs md:text-sm">
              {data?.movie?.genres?.map((genre: IGenre, i: number) => (
                <span className="mr-2" key={i}>
                  {genre.name}
                </span>
              ))}
            </dd>
          </div>
          <div className="flex items-center border-b border-gray-400 py-4">
            <dt className="basis-1/5 text-sm font-bold md:text-base">개봉일</dt>
            <dd className="basis-4/5 text-xs md:text-sm">
              {data?.movie?.release_date}
            </dd>
          </div>

          <div className="flex items-center border-b border-gray-400 py-4">
            <dt className="basis-1/5 text-sm font-bold md:text-base">런타임</dt>
            <dd className="basis-4/5 text-xs md:text-sm">
              {data?.movie?.runtime}분
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-12">
        <p className="text-lg font-bold md:text-lg ">트레일러</p>
        <div className="mt-4 aspect-video w-full">
          {video?.ok ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            ></iframe>
          ) : (
            <div>{video?.error}</div>
          )}
        </div>
      </div>
    </MovieLayout>
  );
}

const Page: NextPage<{
  movie: IDetailMovie;
  id: string;
  director: ICast;
  casts: ICast[];
}> = ({ movie, id, director, casts }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize(['api', 'movies', id, 'detail'])]: {
            ok: true,
            movie,
          },
          [unstable_serialize(['api', 'movies', id, 'credits'])]: {
            ok: true,
            director,
            casts,
          },
        },
      }}
    >
      <Detail />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/${context?.params?.id}?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`
  ).then((res) => res.json());

  const allCredits = await fetch(
    `https://api.themoviedb.org/3/movie/${context?.params?.id}/credits?api_key=${process.env.TMDB_API_KEY}&language=ko-KR
		`
  ).then((res) => res.json());

  const director = allCredits?.crew
    .filter((cast: ICast) => cast.known_for_department === 'Directing')
    .slice(0, 1);

  const casts = allCredits?.cast.slice(0, 4);

  return {
    props: {
      movie,
      director,
      casts,
    },
  };
};

export default Page;
