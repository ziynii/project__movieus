import React from 'react';
import ProfileImage from './profileImage';
import { useRouter } from 'next/router';
import DefaultImage from './defaultImage';

interface IUserCardProps {
  user: { id: number; avatar: string | null; name: string };
}

export default function UserCard({ user }: IUserCardProps) {
  const router = useRouter();

  return (
    <li
      onClick={() => router.push(`/users/${user?.id}/reviews`)}
      className="w-full cursor-pointer px-4 py-2 text-center"
    >
      <div className="relative aspect-square w-full rounded-full">
        {user?.avatar ? <ProfileImage avatarId={user.avatar} /> : <DefaultImage />}
      </div>
      <p className="mt-4 text-base font-medium">{user?.name}</p>
    </li>
  );
}
