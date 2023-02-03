import MypageLayout from '@/components/layout/mypageLayout';
import UserCard from '@/components/userCard';
import React from 'react';

export default function Follower() {
  return (
    <MypageLayout tabValue="팔로워">
      <ul className="grid grid-cols-3 gap-y-4 md:grid-cols-4 md:pt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((card, i) => (
          <UserCard key={i} />
        ))}
      </ul>
    </MypageLayout>
  );
}
