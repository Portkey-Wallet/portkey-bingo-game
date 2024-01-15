import { useAppContext } from './useAppContext';
import { EGameState } from './useAppContext/type';

import { useSWRConfig } from 'swr';

export const useResetAccountState = () => {
  const { setIsRegistered, setGameState } = useAppContext();
  const { mutate } = useSWRConfig();

  return {
    resetAccountState: async () => {
      // docs: https://swr.vercel.app/docs/advanced/cache#modify-the-cache-data
      mutate(
        (key) => true, // which cache keys are updated
        undefined, // update cache data to `undefined`
        { revalidate: false }, // do not revalidate
      );

      setIsRegistered(false);
      setGameState(EGameState.Playing);
    },
  };
};
