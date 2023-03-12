import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useUser from '@/libs/client/useUser';
import { useRouter } from 'next/router';
import ProfileImage from './profileImage';
import useMutation from '@/libs/client/useMutation';

export default function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const [logout, { data, loading }] = useMutation(`/api/users/logout`);

  const handleLogout = () => {
    if (loading) return;
    logout({});
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push('/login');
    }
  }, [data, router]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gray-900 px-4">
      <div className="relative mx-auto flex h-20 items-center md:max-w-ta lg:max-w-dt">
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            className="h-auto w-auto"
            src="/logo.svg"
            alt="logo"
            width={168}
            height={72}
            priority={true}
          />
        </Link>

        <div className="relative ml-auto">
          <div className="flex items-center">
            <div
              onClick={() => setIsOpenMenu((prev) => !prev)}
              className="relative h-10 w-10 cursor-pointer rounded-full bg-gray-400"
            >
              {user?.avatar ? <ProfileImage avatarId={user.avatar!} /> : null}
            </div>
            <p className="ml-2 hidden md:block">{user?.name} 님</p>
          </div>
          {isOpenMenu === true && (
            <div className="absolute top-full right-0 mt-2 w-32 rounded border-2 border-indigo-500 bg-white text-indigo-500">
              <ul className="text-sm">
                <li className="w-full cursor-pointer border-b border-gray-200 hover:bg-indigo-100 hover:font-bold">
                  <Link
                    href={`/users/${user?.id}/reviews`}
                    className="inline-block h-full w-full px-4 py-2"
                  >
                    마이페이지
                  </Link>
                </li>
                <li className="w-full cursor-pointer border-b border-gray-200 hover:bg-indigo-100 hover:font-bold">
                  <Link
                    href="/users/edit"
                    className="inline-block h-full w-full px-4 py-2"
                  >
                    프로필 수정
                  </Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="w-full cursor-pointer px-4 py-2 hover:bg-indigo-100 hover:font-bold"
                >
                  로그아웃
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
