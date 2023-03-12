import useUser from '@/libs/client/useUser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ProfileImage from '../profileImage';
import TabList from '../tabList';
import Layout from './layout';
import useSWR from 'swr';
import { Follow, User } from '@prisma/client';
import useMutation from '@/libs/client/useMutation';

interface IMypageLayoutProps {
  children: React.ReactNode;
  tabValue: string;
}

export interface IUserWithCount extends User {
  _count: {
    reviews: number;
    follower: number;
    following: number;
  };
}

interface IUserResponse {
  ok: boolean;
  userInfo: IUserWithCount;
  isCurrentUser: boolean;
  isAlreadyFollow?: Follow[];
}

interface IFollowResponse {
  ok: boolean;
}

const TABLIST = [
  { link: 'reviews', value: '내 리뷰' },
  { link: 'like', value: '찜 한 영화' },
  { link: 'follower', value: '팔로워' },
  { link: 'following', value: '팔로잉' },
];

export default function MypageLayout({
  children,
  tabValue,
}: IMypageLayoutProps) {
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR<IUserResponse>(
    id ? `/api/users/${id}` : null
  );
  const [follow, { loading, data: followData }] =
    useMutation<IFollowResponse>(`/api/users/follow`);

  const handleFollow = () => {
    if (loading) return;
    follow({ followFor: Number(id) });
  };

  useEffect(() => {
    if (followData && followData.ok) {
      mutate();
    }
  }, [followData, mutate]);

  return (
    <Layout>
      <div className="flex justify-between py-8 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col">
          <div className="relative h-20 w-20 rounded-full bg-gray-400 md:h-36 md:w-36">
            {data?.userInfo?.avatar ? (
              <ProfileImage avatarId={data.userInfo.avatar!} />
            ) : null}
          </div>
          <div className="mt-4">
            <p className="mb-2 text-lg font-bold md:text-xl">
              {data?.userInfo?.name}
            </p>
            <span className="text-xs md:text-base">
              {data?.userInfo?.about}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <dl className="flex space-x-4 text-center text-base font-bold md:space-x-6 md:text-xl">
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
          {data?.isCurrentUser ? (
            <button className="rounded bg-indigo-500 px-4 py-2 text-xs hover:bg-indigo-700 md:px-8 md:py-4 md:text-base">
              <Link href="/mypage/edit" className="h-full w-full">
                프로필 수정
              </Link>
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="rounded bg-indigo-500 px-4 py-2 text-xs hover:bg-indigo-700 md:px-8 md:py-4 md:text-base"
            >
              {data?.isAlreadyFollow ? '친구 끊기' : '친구 추가'}
            </button>
          )}
        </div>
      </div>

      <div className="md:my-6 md:px-20 lg:my-8 lg:w-3/5">
        <TabList
          list={TABLIST}
          item={tabValue}
          page="users"
          id={data?.userInfo?.id!}
        />
      </div>

      <div className="px-4 py-8 md:px-20">{children}</div>
    </Layout>
  );
}
