import Head from 'next/head';
import React from 'react';
import Header from '../header';

interface ILayoutProps {
  children: React.ReactNode;
  seoTitle: string;
}

export default function Layout({ children, seoTitle }: ILayoutProps) {
  const title = `${seoTitle} | Movieus`;
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />

      <div className="mx-auto mt-20 md:max-w-ta lg:max-w-dt">{children}</div>
    </div>
  );
}
