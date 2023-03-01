import React from 'react';
import { useSetRecoilState } from 'recoil';
import { openUserModalState, userIdState } from '@/recoil/states';

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
      <div className="aspect-square w-full rounded-full bg-gray-400" />
      <p className="mt-4 text-base font-medium">{user?.name}</p>
    </li>
  );
}
