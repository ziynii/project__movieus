import MypageLayout from '@/components/layout/mypageLayout';
import RemoveModal from '@/components/removeModal';
import ReviewCard from '@/components/reviewCard';
import React, { useState } from 'react';
import useSWR from 'swr';
import { IReviewResponse, ReviewWithUser } from '../movies/[id]/reviews';

export default function Reviews() {
  const { data, mutate } = useSWR<IReviewResponse>(`/api/users/reviews`);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
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
            setOpenRemoveModal={setOpenRemoveModal}
            setReviewId={setReviewId}
          />
        ))}
      </ul>

      {openRemoveModal ? (
        <RemoveModal
          mutate={mutate}
          reviewId={reviewId}
          setOpenRemoveModal={setOpenRemoveModal}
        />
      ) : null}
    </MypageLayout>
  );
}
