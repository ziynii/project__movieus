import MypageLayout from '@/components/layout/mypageLayout';
import UserCard from '@/components/userCard';
import React from 'react';
import useSWR from 'swr';
import { useRecoilValue } from 'recoil';
import { openUserModalState } from '@/recoil/states';
import UserModal from '@/components/userModal';

interface IFollowUser {
  followBy: {
    id: number;
    avatar: string | null;
    name: string;
  };
}

interface ISWRFollowingData {
  ok: boolean;
  followers: IFollowUser[];
}

export default function Following() {
  const { data } = useSWR<ISWRFollowingData>(`/api/users/me/follower`);
  const isOpenUserModal = useRecoilValue(openUserModalState);

  return (
    <MypageLayout tabValue="팔로워">
      <ul className="grid grid-cols-3 gap-y-4 md:grid-cols-4 md:pt-4">
        {data?.followers?.map((user) => (
          <UserCard user={user?.followBy} key={user?.followBy?.id} />
        ))}
      </ul>

      {isOpenUserModal ? <UserModal /> : null}
    </MypageLayout>
  );
}
