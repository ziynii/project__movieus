import MypageLayout from '@/components/layout/mypageLayout';
import UserCard from '@/components/userCard';
import React from 'react';

export default function Following() {
  return (
    <MypageLayout tabValue="팔로잉">
      <ul className="grid md:py-4 grid-cols-3 md:grid-cols-4 gap-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((card, i) => (
          <UserCard key={i} />
        ))}
      </ul>
    </MypageLayout>
  );
}
