import { useCallback, useEffect, useState } from 'react';

export interface UseQueryProps<R> {
  action: () => Promise<R>;
}

export const useQuery = <Result>({ action }: UseQueryProps<Result>) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<Result>();

  const refresh = useCallback(() => {
    setLoading(true);
    action().then((items) => {
      setLoading(false);
      setResult(items);
    });
  }, [action]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { loading, result, refresh };
};
