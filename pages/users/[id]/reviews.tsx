import MypageLayout from '@/components/layout/mypageLayout';
import RemoveModal from '@/components/removeModal';
import ReviewCard from '@/components/reviewCard';
import useUser from '@/libs/client/useUser';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import { IReviewResponse, ReviewWithUser } from '../../movies/[id]/reviews';

export default function Reviews() {
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR<IReviewResponse>(
    id ? `/api/users/${id}/reviews` : null
  );
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
            type={id == user?.id ? 'remove' : 'likes'}
            setOpenRemoveModal={setOpenRemoveModal}
            setReviewId={setReviewId}
          />
        ))}

        {data?.reviews?.length === 0 ? (
          <p className="py-32 text-center">아직 작성된 리뷰가 없어요</p>
        ) : null}
      </ul>

      {openRemoveModal ? (
        <RemoveModal
          mutate={mutate}
          reviewId={reviewId}
          id={id + ''}
          setOpenRemoveModal={setOpenRemoveModal}
        />
      ) : null}
    </MypageLayout>
  );
}
