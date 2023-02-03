import MypageLayout from '@/components/layout/mypageLayout';
import MovieCard from '@/components/movieCard';
import React from 'react';

export default function Like() {
  return (
    <MypageLayout tabValue="찜 한 영화">
      <ul className="grid grid-cols-3 justify-items-center gap-y-4 md:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((card, i) => (
          <MovieCard key={i} />
        ))}
      </ul>
    </MypageLayout>
  );
}
