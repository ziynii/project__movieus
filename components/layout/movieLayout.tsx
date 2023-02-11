import { useRouter } from 'next/router';
import React from 'react';
import ActorCard from '../actorCard';
import TabList from '../tabList';
import Layout from './layout';
import useSWR from 'swr';
import { ICardMovie } from '@/pages';
import Image from 'next/image';
import { makeImagePath } from '@/libs/client/utils';
import { ICast } from '@/pages/api/movies/[id]/credits';

interface IMovieLayoutProps {
  children: React.ReactNode;
  tabValue: string;
}

interface IDetail {
  ok: boolean;
  movie: ICardMovie;
}

export interface ISWRCastData {
  ok: boolean;
  director: ICast[];
  casts: ICast[];
}

const TABLIST = [
  { link: 'detail', value: '영화 정보' },
  { link: 'review', value: '리뷰' },
  { link: 'recommend', value: '영화 추천' },
];

export default function MovieLayout({ children, tabValue }: IMovieLayoutProps) {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<IDetail>(
    router.query.id ? `/api/movies/${router.query.id}/detail` : null
  );
  const { data: credits } = useSWR<ISWRCastData>(
    id ? `/api/movies/${id}/credits` : null
  );

  return (
    <Layout>
      <div className="relative">
        <div className="relative h-80 w-full lg:h-96">
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
        </div>

        <div className="lg:relative lg:-top-14 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:px-4">
          <div className="absolute top-44 left-1/2 flex w-4/5 -translate-x-1/2 items-center lg:relative lg:top-0 lg:left-0 lg:block lg:w-full lg:translate-x-0">
            <div className="relative h-40 w-28 lg:h-72 lg:w-full">
              <Image
                src={makeImagePath(data?.movie?.poster_path!)}
                alt={'영화 포스터'}
                fill={true}
                sizes="(max-width: 768px) 100vw,
								(max-width: 1200px) 50vw,
								33vw"
              />
            </div>
            <div className="ml-3 lg:ml-0 lg:mt-4">
              <h4 className="text-2xl font-bold lg:text-5xl">
                {data?.movie?.title}
              </h4>
              <span className="mt-3 inline-block w-14 rounded-full bg-indigo-500 py-1 text-center text-xs">
                9.2
              </span>
            </div>
          </div>

          <div className="mt-12 md:mt-20 md:px-20 lg:col-start-2 lg:col-end-5 lg:px-0 ">
            <div className="lg:w-3/5">
              <TabList list={TABLIST} item={tabValue} page={`movies/${id}`} />
            </div>
            <div className="px-4 py-8 md:py-12">{children}</div>
          </div>

          <div className="hidden lg:col-start-5 lg:mt-20 lg:block">
            <p className="text-lg font-bold md:text-lg">출연진</p>
            <ul className="mt-6 space-y-4">
            {credits?.casts?.map((cast) =>   <ActorCard key={cast.id} cast={cast}/>)}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
