import React from 'react';

export default function UserCard() {
  return (
    <li className="w-full px-4 py-2 text-center cursor-pointer">
      <div className="aspect-square w-full rounded-full bg-gray-400" />
      <div className="mt-4">
        <p className="text-base font-medium">name</p>
        <span className="text-xs">소개글</span>
      </div>
    </li>
  );
}
