import React from 'react';
import Rate from './rate';

interface IReviewCardProps {
  showPoster?: boolean;
}

export default function ReviewCard({ showPoster }: IReviewCardProps) {
  return (
    <li className="border-b border-gray-400 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full bg-gray-400" />
          <div className="ml-4">
            <p className="text-sm font-medium">이름</p>
            <span className="text-xs text-gray-300">날짜</span>
          </div>
        </div>
        <button className="rounded-md border border-indigo-500 bg-indigo-50 px-3 py-2 text-xs text-indigo-500 hover:bg-indigo-100">
          좋아요 17
        </button>
      </div>

     <Rate rate={3}/>

      <div className={'mt-4' + (showPoster ? ' flex items-start' : '')}>
				{showPoster && <div className='w-20 h-32 bg-gray-400 shrink-0'/>}
				<pre className={"whitespace-pre-wrap text-sm" + (showPoster ? ' w-full ml-4' : '') }>
					Tempor sed vulputate enim gravida. Condimentum cras at quisque duis
					tortor a. Venenatis neque blandit nunc proin arcu mi habitant. Platea mi
					posuere sociis sem egestas. Quam vitae feugiat egestas nec.
				</pre>
			</div>
    </li>
  );
}
