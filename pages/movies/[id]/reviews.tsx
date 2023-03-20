import MovieLayout from '@/components/layout/movieLayout';
import ReviewCard from '@/components/reviewCard';
import ReviewModal from '@/components/reviewModal';
import { Review, User } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IDetailResponse } from './detail';

export interface ReviewWithUser extends Review {
  user: User;
  _count: {
    like: number;
  };
}

export interface IReviewResponse {
  ok: boolean;
  reviews: ReviewWithUser[];
}

export default function Reviews() {
  const router = useRouter();
  const { id } = router.query;
  const [openPostModal, setOpenPostModal] = useState(false);
  const [sendReview, setSendReview] = useState(false);
  const { data, mutate } = useSWR<IReviewResponse>(
    id ? `/api/movies/${id}/reviews` : null
  );
  const { data: movieData } = useSWR<IDetailResponse>(
    id ? `/api/movies/${id}/detail` : null
  );

  const getAverage = () => {
    if (data) {
      let arr: number[] = [];
      data?.reviews?.map((review) => arr.push(review.rate));

      const rateTotal = arr.reduce((sum, current) => sum + current, 0);
      const rateAverage = rateTotal / data?.reviews?.length;
      return rateAverage.toFixed(1);
    }
  };

  const average = getAverage();

  useEffect(() => {
    if (sendReview) {
      mutate();
      setSendReview(false);
    }
  }, [sendReview, mutate]);

  return (
    <MovieLayout tabValue="리뷰">
      <div className="flex items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500">
          <svg
            fill="white"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-10 w-10 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            ></path>
          </svg>
        </div>

        <div className="ml-4 flex items-end">
          <p className="text-5xl">{data?.reviews.length === 0 ? 0 : average}</p>
          <div className="ml-2 flex flex-col text-xs">
            <span>/5</span>
            <span>TOTAL RATING</span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <p className="text-base font-bold">리뷰 {data?.reviews.length}개</p>
        <button
          onClick={() => setOpenPostModal(true)}
          className="text-base font-bold text-indigo-500 "
        >
          리뷰쓰기
        </button>
      </div>

      {openPostModal ? (
        <ReviewModal
          setSendReview={setSendReview}
          setOpenPostModal={setOpenPostModal}
          poster={movieData?.movie?.poster_path!}
        />
      ) : null}

      <ul className="py-6">
        {data?.reviews?.map((review: ReviewWithUser) => (
          <ReviewCard key={review.id} review={review} type="likes" />
        ))}
        {data?.reviews?.length === 0 ? (
          <p className="py-32 text-center">아직 작성된 리뷰가 없어요</p>
        ) : null}
      </ul>
    </MovieLayout>
  );
}
