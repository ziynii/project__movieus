import React from 'react';
import Header from '../header';

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div>
			<Header />

      <div className="mx-auto md:max-w-ta lg:max-w-dt mt-20">{children}</div>
    </div>
  );
}
