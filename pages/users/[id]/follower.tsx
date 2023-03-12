import MypageLayout from '@/components/layout/mypageLayout';
import UserCard from '@/components/userCard';
import React from 'react';
import useSWR from 'swr';
import { useRecoilValue } from 'recoil';
import { openUserModalState } from '@/recoil/states';
import UserModal from '@/components/userModal';
import { useRouter } from 'next/router';

interface IFollowUser {
  followBy: {
    id: number;
    avatar: string | null;
    name: string;
  };
}

interface IFollowerResponse {
  ok: boolean;
  followers: IFollowUser[];
}

export default function Follower() {
	const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<IFollowerResponse>(id ? `/api/users/${id}/follower` : null);
  const isOpenUserModal = useRecoilValue(openUserModalState);

  return (
    <MypageLayout tabValue="팔로워">
      <ul className="grid grid-cols-3 gap-y-4 md:grid-cols-4 lg:grid-cols-5 md:pt-4">
        {data?.followers?.map((user) => (
          <UserCard user={user?.followBy} key={user?.followBy?.id} />
        ))}
      </ul>

			
			{data?.followers?.length === 0 ? (
        <p className="py-32 text-center">친구를 추가해보세요</p>
      ) : null}


      {isOpenUserModal ? <UserModal /> : null}
    </MypageLayout>
  );
}
