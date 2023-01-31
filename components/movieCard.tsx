import React from 'react';

export default function MovieCard() {
  return (
    <li className="w-32 shrink-0">
      <div className="relative">
        <div className="h-48 w-full bg-slate-200" />
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
