import React from 'react';
import useMutation from '@/libs/client/useMutation';
import useSWR from 'swr';
import { User } from '@prisma/client';
import { openUserModalState, userIdState } from '@/recoil/states';
import { useSetRecoilState, useRecoilValue } from 'recoil';

interface IUserWithCount extends User {
  _count: {
    reviews: number;
    follower: number;
    following: number;
  };
}

interface ISWRUserData {
  ok: boolean;
  userInfo: IUserWithCount;
}

export default function UserModal() {
  const userId = useRecoilValue(userIdState);
  const { data } = useSWR<ISWRUserData>(`/api/users/${userId}`);
  const [follow, { loading }] = useMutation(`/api/users/follow`);
  const setIsOpenUserModal = useSetRecoilState(openUserModalState);

  const handleFollow = () => {
    if (loading) return;
    follow({ followFor: userId });
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-700 bg-opacity-40">
      <div className="w-3/5 max-w-modal overflow-hidden rounded-md bg-white">
        <p className="bg-indigo-700 py-2 text-center">{data?.userInfo?.name}</p>
        <div className="flex flex-col p-2">
          <div className="flex justify-between">
            <div className="h-14 w-14 rounded-full bg-gray-400" />
            <dl className="flex space-x-4 text-center text-base font-bold text-gray-900 md:space-x-6 md:text-xl">
              <div>
                <dt>리뷰</dt>
                <dd>{data?.userInfo?._count?.reviews}</dd>
              </div>
              <div>
                <dt>팔로워</dt>
                <dd>{data?.userInfo?._count?.following}</dd>
              </div>
              <div>
                <dt>팔로잉</dt>
                <dd>{data?.userInfo?._count?.follower}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-2 flex flex-col">
            <p className="font-bold text-gray-900"> {data?.userInfo?.name}</p>
            <p className="text-sm text-gray-900"> {data?.userInfo?.about}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between p-2">
          <button
            onClick={handleFollow}
            className="basis-[49%] rounded bg-indigo-500 px-4 py-2 text-xs hover:bg-indigo-700 md:px-8 md:py-4 md:text-base"
          >
            친구 추가
          </button>
          <button
            onClick={() => setIsOpenUserModal(false)}
            className="basis-[49%] rounded border border-indigo-500 bg-white px-4 py-2 text-xs text-indigo-500 hover:bg-indigo-100 md:px-8 md:py-4 md:text-base"
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
