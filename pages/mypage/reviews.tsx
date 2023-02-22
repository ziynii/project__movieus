import MypageLayout from '@/components/layout/mypageLayout';
import RemoveModal from '@/components/removeModal';
import ReviewCard from '@/components/reviewCard';
import React, { useState } from 'react';
import useSWR from 'swr';
import { ReviewWithUser } from '../movies/[id]/reviews';

export default function Reviews() {
  const { data, mutate } = useSWR(`/api/users/reviews`);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [reviewId, setReviewId] = useState(0);

  return (
    <MypageLayout tabValue="내 리뷰">
      <ul>
        {data?.reviews?.map((review: ReviewWithUser) => (
          <ReviewCard
            key={review.id}
            review={review}
            showPoster
            type="remove"
            setIsOpenModal={setIsOpenModal}
            setReviewId={setReviewId}
          />
        ))}
      </ul>

      {isOpenModal ? (
        <RemoveModal mutate={mutate} reviewId={reviewId} setIsOpenModal={setIsOpenModal} />
      ) : null}
    </MypageLayout>
  );
}
