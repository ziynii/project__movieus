import MovieLayout from '@/components/layout/movieLayout';
import React from 'react';

export default function Detail() {
  return (
    <MovieLayout tabValue="영화 정보">
      <div>
        <p className="text-lg font-bold md:text-lg ">줄거리</p>
        <pre className="mt-4 h-44 truncate whitespace-pre-wrap text-sm font-medium md:h-48 md:text-base">
          Ultricies nisl nascetur montes praesent. Justo scelerisque senectus
          sed nulla pharetra elementum. Porttitor senectus interdum consequat
          ultrices egestas eget non. Scelerisque amet tellus purus dolor nulla
          volutpat augue suspendisse praesent. Sit ullamcorper elementum orci
          elit magnis varius. Integer maecenas nullam aenean sed sed
          pellentesque.Ultricies nisl nascetur montes praesent. Justo
          scelerisque senectus sed nulla pharetra elementum. Porttitor senectus
          interdum consequat ultrices egestas eget non. Scelerisque amet tellus
          purus dolor nulla volutpat augue suspendisse praesent. Sit ullamcorper
          elementum orci elit magnis varius. Integer maecenas nullam aenean sed
          sed pellentesque
        </pre>
      </div>

      <div className="mt-12">
        <p className="text-lg font-bold md:text-lg ">영화 정보</p>
        <dl className="mt-4">
          <div className="flex items-center border-b border-gray-400 py-4">
            <dt className="basis-1/5 text-sm font-bold md:text-base">감독</dt>
            <dd className="basis-4/5 text-xs md:text-sm">이름</dd>
          </div>
          <div className="flex items-center border-b border-gray-400 py-4">
            <dt className="basis-1/5 text-sm font-bold md:text-base">주연</dt>
            <dd className="basis-4/5 text-xs md:text-sm">이름, 이름, 이름</dd>
          </div>
          <div className="flex items-center border-b border-gray-400 py-4">
            <dt className="basis-1/5 text-sm font-bold md:text-base">장르</dt>
            <dd className="basis-4/5 text-xs md:text-sm">장르, 장르, 장르</dd>
          </div>
          <div className="flex items-center border-b border-gray-400 py-4">
            <dt className="basis-1/5 text-sm font-bold md:text-base">개봉일</dt>
            <dd className="basis-4/5 text-xs md:text-sm">날짜</dd>
          </div>
          <div className="flex items-center border-b border-gray-400 py-4">
            <dt className="basis-1/5 text-sm font-bold md:text-base">런타임</dt>
            <dd className="basis-4/5 text-xs md:text-sm">190분</dd>
          </div>
        </dl>
      </div>

      <div className="mt-12">
        <p className="text-lg font-bold md:text-lg ">트레일러</p>
        <div className="mt-4 aspect-video w-full bg-gray-400" />
      </div>
    </MovieLayout>
  );
}
