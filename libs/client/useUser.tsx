import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/users/me')
      .then((res) => res.json())
      .then((result) => {
        if (!result.ok) {
          return router.push('/login');
        }
        setUser(result.profile);
      });
  }, [router]);

  return user;
}
