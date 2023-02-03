import MypageLayout from '@/components/layout/mypageLayout';
import ReviewCard from '@/components/reviewCard';
import React from 'react';

export default function Review() {
	return (
		<MypageLayout tabValue='내 리뷰'>
			 <ul>
        {[1, 1, 1, 1, 1].map((review, i) => (
          <ReviewCard key={i} showPoster/>
        ))}
      </ul>
		</MypageLayout>
	);
}

