import MovieLayout, { ISWRCastData } from '@/components/layout/movieLayout';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

interface IGenre {
  id: number;
  name: String;
}

interface IVideo {
  key: string;
}

interface IDetailMovie {
  id: number;
  genres: IGenre[];
  overview: string;
  runtime: number;
  release_date: string;
}

interface ISWRDetailData {
  ok: boolean;
  movie: IDetailMovie;
}

interface ISWRVideoData {
  ok: boolean;
  foundVideo: IVideo[];
  error?: string;
}

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<ISWRDetailData>(
    id ? `/api/movies/${id}/detail` : null
  );
  const { data: video } = useSWR<ISWRVideoData>(
    id ? `/api/movies/${id}/video` : null
  );
  const videoId = video?.foundVideo[0]?.key;

  const { data: credits } = useSWR<ISWRCastData>(
    id ? `/api/movies/${id}/credits` : null
  );

  return (
    <MovieLayout tabValue="영화 정보">
      <div>
        <p className="text-lg font-bold md:text-lg ">줄거리</p>
        <pre className="mt-4 whitespace-pre-wrap text-sm md:h-48 md:text-base">
          {data?.movie?.overview}
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
          {video?.ok === false && <div>{video?.error}</div>}
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          ></iframe>
        </div>
      </div>
    </MovieLayout>
  );
}
