import React from 'react';

export default function ActorCard() {
  return (
    <li className='flex'>
      <div className="h-12 w-12 rounded-full bg-gray-400" />
      <div className="ml-4">
        <p className="text-sm font-medium">캐릭터 이름</p>
        <span className="text-xs text-gray-600">배우 이름</span>
      </div>
    </li>
  );
}
