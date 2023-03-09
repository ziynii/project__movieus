import React from 'react';
import { useSetRecoilState } from 'recoil';
import { openUserModalState, userIdState } from '@/recoil/states';
import ProfileImage from './profileImage';

interface IUserCardProps {
  user: { id: number; avatar: string | null; name: string };
}

export default function UserCard({ user }: IUserCardProps) {
  const setIsOpenUserModal = useSetRecoilState(openUserModalState);
  const setUserId = useSetRecoilState(userIdState);

  const handleModal = () => {
    setIsOpenUserModal(true);
    setUserId(user?.id);
  };

  return (
    <li
      onClick={handleModal}
      className="w-full cursor-pointer px-4 py-2 text-center"
    >
      <div className="aspect-square relative w-full rounded-full bg-gray-400">
				{user?.avatar ? <ProfileImage avatarId={user.avatar}/> : null}
			</div>
      <p className="mt-4 text-base font-medium">{user?.name}</p>
    </li>
  );
}
