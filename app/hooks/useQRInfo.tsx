import useSWR from 'swr';
import { useChainInfo } from './useChainInfo';
import { useTokenContractAddress } from './useTokenContractAddress';
import { CHAIN_ID, isTestNet } from '@/constants/network';
import { useAppContext } from './useAppContext';
import { shrinkSendQrData } from '@/utils/common';
import { ChainInfo } from '@portkey/services';

function getQrInfo(accountAddress: string, chainInfo: ChainInfo, tokenContractAddress: string) {
  const info = shrinkSendQrData({
    type: 'send',
    netWorkType: isTestNet ? 'TESTNET' : 'MAIN',
    chainType: 'aelf',
    toInfo: {
      address: accountAddress,
      name: '',
    },
    assetInfo: {
      symbol: 'ELF',
      chainId: chainInfo.chainId,
      tokenContractAddress,
      decimals: '8',
    },
    address: accountAddress,
  });
  return info;
}

export const useQRInfo = () => {
  const chainInfo = useChainInfo(CHAIN_ID);
  const { data: tokenContractAddress } = useTokenContractAddress();
  const { accountAddress } = useAppContext();

  return useSWR(
    !!accountAddress && !!chainInfo && !!tokenContractAddress
      ? [accountAddress, chainInfo, tokenContractAddress, 'qrInfo']
      : null,
    ([accountAddress, chainInfo, tokenContractAddress]) => {
      return getQrInfo(accountAddress, chainInfo, tokenContractAddress);
    },
  );
};
