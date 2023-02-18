import MypageLayout from '@/components/layout/mypageLayout';
import ReviewCard from '@/components/reviewCard';
import React from 'react';
import useSWR from 'swr';
import { ReviewWithUser } from '../movies/[id]/reviews';

export default function Reviews() {
  const { data } = useSWR(`/api/users/reviews`);

  return (
    <MypageLayout tabValue="내 리뷰">
      <ul>
        {data?.reviews?.map((review: ReviewWithUser) => (
          <ReviewCard key={review.id} review={review} showPoster />
        ))}
      </ul>
    </MypageLayout>
  );
}
