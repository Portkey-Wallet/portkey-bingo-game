import useSWR from 'swr';
import { ChainId } from '@portkey/types';
import BigNumber from 'bignumber.js';
import { useContract } from './useContract';
import { TOKEN_UNIT } from '@/constants/global';
import { ViewMethods } from '@/type';

const refreshInterval = 5000;

export const useBalance = (chainId: ChainId) => {
  const { callViewMethod, multiTokenContractAddress, owner } = useContract(chainId);

  return useSWR(
    multiTokenContractAddress && owner
      ? [multiTokenContractAddress, owner, chainId, ViewMethods.GetBalance]
      : undefined,
    async ([multiTokenContractAddress, owner]) => {
      const data: { balance?: number } = await callViewMethod({
        methodName: ViewMethods.GetBalance,
        contractAddress: multiTokenContractAddress,
        args: {
          symbol: TOKEN_UNIT,
          owner,
        },
      });

      const balance = new BigNumber(data?.balance).dividedBy(10 ** 8);
      return balance;
    },
    {
      refreshInterval,
    },
  );
};
