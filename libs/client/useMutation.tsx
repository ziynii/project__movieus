import React, { useState } from 'react';

type UseMutationResult<T> = [
  (data: any) => void,
  { loading: boolean; data: T; error: undefined | any }
];

export default function useMutation<T = any>(
  url: string,
  method: 'POST' | 'PUT' = 'POST'
): UseMutationResult<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  function mutation(data: any) {
    setLoading(true);
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  return [mutation, { loading, data, error }];
}
