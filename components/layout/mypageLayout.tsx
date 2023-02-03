import React from 'react';
import TabList from '../tabList';
import Layout from './layout';

interface IMypageLayoutProps {
  children: React.ReactNode;
  tabValue: string;
}

const TABLIST = [
  { link: 'review', value: '내 리뷰' },
  { link: 'like', value: '찜 한 영화' },
  { link: 'follower', value: '팔로워' },
  { link: 'following', value: '팔로잉' },
];

export default function MypageLayout({
  children,
  tabValue,
}: IMypageLayoutProps) {
  return (
    <Layout>
      <div className="flex justify-between py-8 px-4">
        <div className="flex flex-col">
          <div className="h-20 w-20 rounded-full bg-gray-400" />
          <div className="mt-4">
            <p className="text-lg mb-2 font-bold">이름</p>
            <span className="text-xs">안녕하세요 저는 이름입니다.</span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <dl className="flex space-x-4 text-center text-base font-bold">
            <div>
              <dt>내 리뷰</dt>
              <dd>99</dd>
            </div>
            <div>
              <dt>팔로워</dt>
              <dd>46</dd>
            </div>
            <div>
              <dt>팔로잉</dt>
              <dd>159</dd>
            </div>
          </dl>
          <button className="rounded bg-indigo-500 px-4 py-2 text-xs hover:bg-indigo-700">
            프로필 수정
          </button>
        </div>
      </div>

      <TabList list={TABLIST} item={tabValue} page="mypage" />

      <div className="px-4 py-8">{children}</div>
    </Layout>
  );
}
