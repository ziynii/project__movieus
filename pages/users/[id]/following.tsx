import MypageLayout from '@/components/layout/mypageLayout';
import UserCard from '@/components/userCard';
import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<IFollowingResponse>(
    id ? `/api/users/${id}/following` : null
  );

  return (
    <MypageLayout tabValue="팔로잉">
      <ul className="grid grid-cols-3 gap-y-4 md:grid-cols-4 md:py-4 lg:grid-cols-5">
        {data?.followings.map((user) => (
          <UserCard key={user?.followFor?.id} user={user?.followFor} />
        ))}
      </ul>

      {data?.followings?.length === 0 ? (
        <p className="py-32 text-center">친구를 추가해보세요</p>
      ) : null}

    </MypageLayout>
  );
}
