import { IUserWithCount } from '@/components/userModal';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

interface IProfileResponse {
  ok: boolean;
  profile: IUserWithCount;
}

export default function useUser() {
  const { data, error } = useSWR<IProfileResponse>('/api/users/me');
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/login');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
