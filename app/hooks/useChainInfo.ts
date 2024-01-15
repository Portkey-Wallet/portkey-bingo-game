import { ChainId } from '@portkey/types';
import { useChainsInfo } from './useChainsInfo';
import { useMemo } from 'react';
import { CHAIN_ID } from '@/constants/network';

export const useChainInfo = (chainId: ChainId = CHAIN_ID) => {
  const { data } = useChainsInfo();

  const chainInfo = useMemo(() => {
    try {
      return data?.find((i) => i.chainId === chainId);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }, [data]);

  return chainInfo;
};
