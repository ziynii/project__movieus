import MovieLayout from '@/components/layout/movieLayout';
import MovieCard from '@/components/movieCard';
import React from 'react';

export default function Recommend() {
  return (
    <MovieLayout tabValue="영화 추천">
      <ul className="grid grid-cols-3 md:grid-cols-4 gap-y-4 justify-items-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((card, i) => (
          <MovieCard key={i} />
        ))}
      </ul>
    </MovieLayout>
  );
}
