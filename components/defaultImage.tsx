import Image from 'next/image';
import React from 'react';

export default function DefaultImage() {
  return (
    <Image
      src="/default-user.svg"
      alt={'프로필 기본 이미지'}
      fill
      className="h-full w-full rounded-full object-cover"
      priority={true}
    />
  );
}
