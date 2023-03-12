import useMutation from '@/libs/client/useMutation';
import { makeDate, makeImagePath } from '@/libs/client/utils';
import { ReviewWithUser } from '@/pages/movies/[id]/reviews';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Rate from './rate';
import { useEffect, useState } from 'react';
import { ReviewLike } from '@prisma/client';
import ProfileImage from './profileImage';

interface IReviewCardProps {
  showPoster?: boolean;
  review: ReviewWithUser;
  type: string;
  setOpenRemoveModal?: (value: boolean) => void;
  setReviewId?: (value: number) => void;
}

interface ILikeResponse {
  ok: boolean;
  alreadyFav: ReviewLike;
}

export default function ReviewCard({
  showPoster,
  review,
  type,
  setOpenRemoveModal,
  setReviewId,
}: IReviewCardProps) {
  const router = useRouter();
  const [like, { loading, data }] = useMutation<ILikeResponse>(
    `/api/movies/${router.query.id}/reviews/like`
  );
  const [likeCount, setLikeCount] = useState(review?._count?.like);

  const onLikeClick = () => {
    if (loading) return;
    like({ reviewId: review.id });
  };

  const handleRemove = () => {
    setOpenRemoveModal && setOpenRemoveModal(true);
    setReviewId && setReviewId(review.id);
  };

  const handleUser = () => {
    if (type == 'likes') {
      router.push(`/users/${review?.user?.id}/reviews`);
    }
  };

  useEffect(() => {
    if (data && data.ok && data.alreadyFav) {
      setLikeCount((prev) => prev - 1);
    } else if (data && data.ok && data.alreadyFav === null) {
      setLikeCount((prev) => prev + 1);
    }
  }, [data]);

  return (
    <li className="border-b border-gray-400 py-6 last:border-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={
              'relative h-14 w-14 rounded-full bg-gray-400' +
              (type === 'likes' ? ' cursor-pointer' : '')
            }
            onClick={handleUser}
          >
            {review?.user?.avatar ? (
              <ProfileImage avatarId={review.user.avatar!} />
            ) : null}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium">{review?.user?.name}</p>
            <span className="text-xs text-gray-300">
              {makeDate(review?.createdAt)}
            </span>
          </div>
        </div>
        {type === 'likes' ? (
          <button
            onClick={onLikeClick}
            className="flex items-center rounded-md border border-indigo-500 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-500 hover:bg-indigo-100 md:px-4 md:py-2 md:text-base"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="mr-1 h-4 w-4 md:mr-3 md:h-6 md:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              ></path>
            </svg>{' '}
            {likeCount}
          </button>
        ) : (
          <button
            onClick={handleRemove}
            className="flex items-center rounded-md border border-indigo-500 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-500 hover:bg-indigo-100 md:px-4 md:py-2 md:text-base"
          >
            삭제하기
          </button>
        )}
      </div>

      <Rate rate={review.rate} />

      <div className={'mt-4 md:mt-6' + (showPoster ? ' flex items-start' : '')}>
        {showPoster && (
          <div className="relative h-32 w-20 shrink-0 md:h-36 md:w-24">
            <Link href={`/movies/${review?.movieId}/detail`}>
              <Image
                src={makeImagePath(review?.posterUrl)}
                alt={'리뷰'}
                fill
                sizes="100%"
                priority={true}
              />
            </Link>
          </div>
        )}
        <pre
          className={
            'whitespace-pre-wrap text-sm md:text-base' +
            (showPoster ? ' ml-4 w-full' : '')
          }
        >
          {review.review}
        </pre>
      </div>
    </li>
  );
}
