import { IUserWithCount } from '@/components/layout/mypageLayout';
import useSWR from 'swr';

interface IProfileResponse {
  ok: boolean;
  profile: IUserWithCount;
}

export default function useUser() {
  const { data, error } = useSWR<IProfileResponse>('/api/users/me');

  return { user: data?.profile, isLoading: !data && !error };
}
