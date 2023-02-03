import React from 'react';

export default function MovieCard() {
  return (
    <li className="w-full cursor-pointer">
      <div className="relative w-full">
        <div className="w-full bg-slate-200 pb-[150%]" />
        <span className="absolute bottom-2 right-1 rounded-lg bg-white px-2 text-xs text-gray-900">
          9.8
        </span>
      </div>
      <div className="mt-4">
        <p className="font-bold">title</p>
        <span className="text-xs text-gray-500">genre</span>
      </div>
    </li>
  );
}
