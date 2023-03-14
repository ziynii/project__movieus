import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ActorCard from '../actorCard';
import TabList from '../tabList';
import Layout from './layout';
import useSWR from 'swr';
import Image from 'next/image';
import { makeImagePath } from '@/libs/client/utils';
import { ICast } from '@/pages/api/movies/[id]/credits';
import useMutation from '@/libs/client/useMutation';
import { IDetailMovie } from '@/pages/movies/[id]/detail';
import { MovieLike } from '@prisma/client';

interface IMovieLayoutProps {
  children: React.ReactNode;
  tabValue: string;
}

interface IDetail {
  ok: boolean;
  movie: IDetailMovie;
  isLike: MovieLike;
}

export interface ICastResponse {
  ok: boolean;
  director: ICast[];
  casts: ICast[];
}

const TABLIST = [
  { link: 'detail', value: '영화 정보' },
  { link: 'reviews', value: '리뷰' },
  { link: 'recommend', value: '영화 추천' },
];

export default function MovieLayout({ children, tabValue }: IMovieLayoutProps) {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<IDetail>(
    router.query.id ? `/api/movies/${router.query.id}/detail` : null
  );
  const { data: credits } = useSWR<ICastResponse>(
    id ? `/api/movies/${id}/credits` : null
  );

  const [fav, { loading }] = useMutation(`/api/movies/${router.query.id}/fav`);

  const handleMovieFav = () => {
    if (loading) return;
    fav({ title: data?.movie?.title, posterUrl: data?.movie?.poster_path });
    setIsLike((prev) => !prev);
  };

  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    if (data?.isLike) {
      setIsLike(true);
    }
  }, [data?.isLike]);

  return (
    <Layout seoTitle={data?.movie?.title!}>
      <div className="relative">
        <div className="relative h-80 w-full lg:h-96">
          <div className="absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-gray-900" />
          {data?.movie ? (
            <Image
              src={makeImagePath(data?.movie?.backdrop_path!)}
              alt={'영화 배경 화면'}
              fill={true}
              sizes="(max-width: 768px) 100vw,
						(max-width: 1200px) 50vw,
						33vw"
              className="object-cover object-center"
              priority={true}
            />
          ) : null}
        </div>

        <div className="lg:relative lg:-top-14 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:px-4">
          <div className="absolute top-44 left-1/2 z-20 flex w-4/5 -translate-x-1/2 items-center lg:relative lg:top-0 lg:left-0 lg:block lg:w-full lg:translate-x-0">
            <div className="relative h-40 w-28 lg:h-72 lg:w-full">
              {data?.movie ? (
                <Image
                  src={makeImagePath(data?.movie?.poster_path!)}
                  alt={'영화 포스터'}
                  fill={true}
                  sizes="(max-width: 768px) 100vw,
								(max-width: 1200px) 50vw,
								33vw"
                />
              ) : null}
            </div>
            <div className="ml-3 lg:ml-0 lg:mt-4">
              <h4 className="text-2xl font-bold lg:text-3xl">
                {data?.movie?.title}
              </h4>

              <button
                onClick={handleMovieFav}
                className="mt-3 flex rounded-full bg-indigo-700 px-4 py-1 text-center text-xs"
              >
                <svg
                  fill={isLike ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="mr-1 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  ></path>
                </svg>
                찜하기
              </button>
            </div>
          </div>

          <div className="mt-12 md:mt-20 md:px-20 lg:col-start-2 lg:col-end-5 lg:px-0 ">
            <div className="lg:w-3/5">
              <TabList
                list={TABLIST}
                item={tabValue}
                page="movies"
                id={Number(id)}
              />
            </div>
            <div className="px-4 py-8 md:py-12">{children}</div>
          </div>

          <div className="hidden lg:col-start-5 lg:mt-20 lg:block">
            <p className="text-lg font-bold md:text-lg">출연진</p>
            <ul className="mt-6 space-y-4">
              {credits?.casts?.map((cast) => (
                <ActorCard key={cast.id} cast={cast} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
