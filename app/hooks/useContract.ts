import { ChainId } from '@portkey/types';
import { CallContractParams, WalletType, useCallContract, useWebLogin } from 'aelf-web-login';
import { useChainInfo } from './useChainInfo';
import { useAccountOwner } from './useAccountOwner';
import { CHAIN_ID } from '@/constants/network';
import { useCallback } from 'react';
export const useContract = (chainId: ChainId = CHAIN_ID) => {
  const chainInfo = useChainInfo(chainId);
  const { walletType, wallet } = useWebLogin();
  const { callViewMethod, callSendMethod: baseCallSendMethod } = useCallContract({
    chainId,
    rpcUrl: chainInfo?.endPoint || '',
    cache: false,
  });
  const { data: owner } = useAccountOwner(chainId);
  const multiTokenContractAddress = chainInfo?.defaultToken.address;
  const callSendMethod = useCallback<typeof baseCallSendMethod>(
    async (params: CallContractParams<any>) => {
      if (walletType === WalletType.discover && wallet.discoverInfo) {
        const chain = await wallet.discoverInfo.provider.getChain(chainId);
        const contract = chain.getContract(params.contractAddress);
        const accounts = wallet.discoverInfo.accounts;
        const accountsInChain = accounts[chainId];
        if (!accountsInChain || accountsInChain.length === 0) {
          throw new Error(`Account not found in chain: ${chainId}`);
        }

        try {
          return (await contract.callSendMethod(params.methodName, accountsInChain[0], params.args, {
            onMethod: 'receipt',
          })) as any;
        } catch (error) {
          return { error };
        }
      } else {
        return baseCallSendMethod(params, undefined);
      }
    },
    [baseCallSendMethod, chainId, wallet.discoverInfo, walletType],
  );
  return { callViewMethod, callSendMethod, chainInfo, multiTokenContractAddress, owner };
};
