import useMutation from '@/libs/client/useMutation';
import React, { useEffect } from 'react';
import { KeyedMutator } from 'swr';

interface IRemoveModalProps {
  setOpenRemoveModal: (value: boolean) => void;
  reviewId: number;
  mutate: KeyedMutator<any>;
}

interface IRemoveResponse {
  ok: boolean;
}

export default function RemoveModal({
  setOpenRemoveModal,
  reviewId,
  mutate,
}: IRemoveModalProps) {
  const [remove, { data, loading }] = useMutation<IRemoveResponse>(
    `/api/users/reviews/remove`
  );

  const handleRemove = () => {
    if (loading) return;
    remove({ reviewId });
  };

  useEffect(() => {
    if (data && data.ok) {
      mutate();
      setOpenRemoveModal(false);
    }
  }, [data, mutate, setOpenRemoveModal]);

  return (
    <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-700 bg-opacity-40">
      <div className="w-3/5 max-w-modal rounded-md bg-white px-4 py-2 pt-6">
        <p className="text-center text-sm text-gray-900">
          정말로 삭제하시겠습니까?
        </p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleRemove}
            className="basis-[49%] rounded bg-indigo-500 px-4 py-2 text-xs hover:bg-indigo-700 md:px-8 md:py-4 md:text-base"
          >
            삭제
          </button>
          <button
            onClick={() => setOpenRemoveModal(false)}
            className="basis-[49%] rounded border border-indigo-500 bg-white px-4 py-2 text-xs text-indigo-500 hover:bg-indigo-100 md:px-8 md:py-4 md:text-base"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
