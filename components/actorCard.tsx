import { makeImagePath } from '@/libs/client/utils';
import { ICast } from '@/pages/api/movies/[id]/credits';
import Image from 'next/image';
import React from 'react';

interface IActorCardProps {
	cast:ICast
}

export default function ActorCard({cast}:IActorCardProps) {
  return (
    <li className='flex'>
      <div className="h-12 w-12 rounded-full overflow-hidden relative">
			<Image
            src={makeImagePath(cast?.profile_path)}
            alt={'배우 프로필 사진'}
            fill={true}
            sizes="(max-width: 768px) 100vw,
						(max-width: 1200px) 50vw,
						33vw"
            className="object-cover object-center"
            priority={true}
          />
			</div>
      <div className="ml-4">
        <p className="text-sm font-medium">{cast?.character}</p>
        <span className="text-xs text-gray-600">{cast?.name}</span>
      </div>
    </li>
  );
}
