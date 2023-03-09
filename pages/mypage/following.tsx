import MypageLayout from '@/components/layout/mypageLayout';
import UserCard from '@/components/userCard';
import React from 'react';
import useSWR from 'swr';
import { useRecoilValue } from 'recoil';
import { openUserModalState } from '@/recoil/states';
import UserModal from '@/components/userModal';

interface IFollowUser {
  followFor: {
    id: number;
    avatar: string | null;
    name: string;
  };
}

interface IFollowingResponse {
  ok: boolean;
  followings: IFollowUser[];
}

export default function Following() {
  const { data } = useSWR<IFollowingResponse>(`/api/users/me/following`);
  const isOpenUserModal = useRecoilValue(openUserModalState);

  return (
    <MypageLayout tabValue="팔로잉">
      <ul className="grid grid-cols-3 gap-y-4 md:grid-cols-4 md:py-4 lg:grid-cols-5">
        {data?.followings.map((user) => (
          <UserCard key={user?.followFor?.id} user={user?.followFor} />
        ))}
      </ul>

      {isOpenUserModal ? <UserModal /> : null}
    </MypageLayout>
  );
}
