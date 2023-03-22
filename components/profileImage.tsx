import Image from 'next/image';
import React from 'react';

interface IProfileImage {
  avatarId: string;
}

export default function ProfileImage({ avatarId }: IProfileImage) {
  return (
    <Image
      src={`https://imagedelivery.net/XdQEHVCtHrxdO7Tk-lWLsw/${avatarId}/public`}
      alt={'프로필 이미지'}
      fill
      sizes="(max-width: 768px) 100vw,
			(max-width: 1200px) 50vw,
			33vw"
      className="h-full w-full rounded-full object-cover"
    />
  );
}
