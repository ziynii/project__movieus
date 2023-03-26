import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextArea from './textarea';
import useMutation from '@/libs/client/useMutation';
import { useRouter } from 'next/router';
import { Review } from '@prisma/client';

interface IReviewModalProps {
  setOpenPostModal: (value: boolean) => void;
  setSendReview: (value: boolean) => void;
  poster: string;
}

interface IReviewResponse {
  ok: boolean;
  review: Review;
}

export default function ReviewModal({
  setSendReview,
  setOpenPostModal,
  poster,
}: IReviewModalProps) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [rate, setRate] = useState('1');
  const [sendReview, { data, loading }] = useMutation<IReviewResponse>(
    `/api/movies/${router.query.id}/reviews`
  );

  const onValid = (data: any) => {
    if (loading) return;
    const review = { rate, review: data.review, posterUrl: poster };
    sendReview(review);
  };

  const handleSetRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(event.currentTarget.value);
  };

  useEffect(() => {
    if (data && data.ok) {
      setSendReview(true);
      setOpenPostModal(false);
    }
  }, [data, setOpenPostModal, setSendReview]);

  return (
    <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-700 bg-opacity-40">
      <div className="w-5/6 md:w-3/5 max-w-modal overflow-hidden rounded-md bg-white">
        <p className="bg-indigo-700 py-2 text-center">리뷰 쓰기</p>
        <form className="p-4" onSubmit={handleSubmit(onValid)}>
          <div className="flex items-center justify-between">
            <span className="text-gray-900">별점</span>
            <div className="mr-4 flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <input
                    type="radio"
                    id={`${i}`}
                    {...register(`${i}`)}
                    onChange={handleSetRate}
                    name="rate"
                    value={i}
                    className="mr-2 h-4 w-4 "
                  />
                  <label
                    htmlFor={`${i}`}
                    className="text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {i}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <TextArea
            register={register('review', { required: true })}
            name="review"
            label="Review"
          />

          <div className="mt-4 flex justify-between">
            <button className="basis-[49%] rounded bg-indigo-500 px-4 py-2 text-xs hover:bg-indigo-700 md:px-8 md:py-4 md:text-base">
              리뷰 등록하기
            </button>
            <button
              onClick={() => setOpenPostModal(false)}
              className="basis-[49%] rounded border border-indigo-500 bg-white px-4 py-2 text-xs text-indigo-500 hover:bg-indigo-100 md:px-8 md:py-4 md:text-base"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
