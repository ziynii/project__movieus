import React from 'react';
import TabList from '../tabList';
import Layout from './layout';

interface IMovieLayoutProps {
  children: React.ReactNode;
  tabValue: string;
}

const TABLIST = [
  { link: 'detail', value: '영화 정보' },
  { link: 'review', value: '리뷰' },
  { link: 'recommend', value: '영화 추천' },
];

export default function MovieLayout({ children, tabValue }: IMovieLayoutProps) {
  return (
    <Layout>
      <div className="relative">
        <div className="h-80 w-full bg-gray-200" />
        <div className="absolute -bottom-6 left-1/2 flex w-4/5 -translate-x-1/2 items-center">
          <div className="h-40 w-28 bg-gray-400" />
          <div className="ml-3">
            <h4 className="text-2xl font-bold">Title</h4>
            <span className="mt-3 inline-block w-14 rounded-full bg-indigo-500 py-1 text-center text-xs">
              9.2
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <TabList list={TABLIST} item={tabValue} page="movie" />
      </div>
      <div className="px-4 py-8">{children}</div>
    </Layout>
  );
}
