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
			className="h-full w-full object-cover rounded-full"
    />
  );
}
