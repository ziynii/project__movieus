import useUser from '@/libs/client/useUser';
import Link from 'next/link';
import React from 'react';
import ProfileImage from '../profileImage';
import TabList from '../tabList';
import Layout from './layout';

interface IMypageLayoutProps {
  children: React.ReactNode;
  tabValue: string;
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

  return (
    <Layout>
      <div className="flex justify-between py-8 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col">
          <div className="h-20 w-20 rounded-full relative bg-gray-400 md:h-36 md:w-36">
            {user?.avatar ? <ProfileImage avatarId={user.avatar!} /> : null}
          </div>
          <div className="mt-4">
            <p className="mb-2 text-lg font-bold md:text-xl">{user?.name}</p>
            <span className="text-xs md:text-base">{user?.about}</span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <dl className="flex space-x-4 text-center text-base font-bold md:space-x-6 md:text-xl">
            <div>
              <dt>내 리뷰</dt>
              <dd>{user?._count?.reviews}</dd>
            </div>
            <div>
              <dt>팔로워</dt>
              <dd>{user?._count?.following}</dd>
            </div>
            <div>
              <dt>팔로잉</dt>
              <dd>{user?._count?.follower}</dd>
            </div>
          </dl>
          <button className="rounded bg-indigo-500 px-4 py-2 text-xs hover:bg-indigo-700 md:px-8 md:py-4 md:text-base">
            <Link href="/mypage/edit" className="h-full w-full">
              프로필 수정
            </Link>
          </button>
        </div>
      </div>

      <div className="md:my-6 md:px-20 lg:my-8 lg:w-3/5">
        <TabList list={TABLIST} item={tabValue} page="mypage" />
      </div>

      <div className="px-4 py-8 md:px-20">{children}</div>
    </Layout>
  );
}
