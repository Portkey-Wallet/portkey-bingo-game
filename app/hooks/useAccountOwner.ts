import useSWRImmutable from 'swr/immutable';
import { ChainId } from '@portkey/types';
import { useGetAccount, useWebLogin } from 'aelf-web-login';

export const useAccountOwner = (chainId: ChainId) => {
  const { wallet } = useWebLogin();
  const getAccount = useGetAccount(chainId);

  return useSWRImmutable([chainId, wallet.address, 'accountOwner'], async () => {
    return await getAccount();
  });
};
