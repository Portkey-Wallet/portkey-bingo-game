import useSWRMutation from 'swr/mutation';
import { ChainId } from '@portkey/types';
import { CHAIN_ID, bingoAddress } from '@/constants/network';
import { useContract } from './useContract';
import { SendMethods, ViewMethods } from '@/type';
import { DEFAULT_DECIMAL, TOKEN_UNIT } from '@/constants/global';
import { getTxResult } from '@/utils/getTxResult';
import { useChainInfo } from './useChainInfo';
import { message } from 'antd';
import { getItem } from '@/utils/cache';

export const useApprove = (chainId: ChainId = CHAIN_ID) => {
  const { callViewMethod, callSendMethod, multiTokenContractAddress, owner } = useContract(chainId);
  const chainInfo = useChainInfo(chainId);

  return useSWRMutation(
    multiTokenContractAddress && owner ? [multiTokenContractAddress, owner, 'approve'] : undefined,
    async () => {
      const { allowance }: { allowance: number } = await callViewMethod({
        methodName: ViewMethods.GetAllowance,
        contractAddress: multiTokenContractAddress,
        args: {
          symbol: TOKEN_UNIT,
          owner: owner,
          spender: bingoAddress,
        },
      });
      const betValue = getItem('betValue');
      const approveAmount = Number(betValue) * DEFAULT_DECIMAL;
      if (Number(allowance) < approveAmount) {
        const res = (await callSendMethod(
          {
            methodName: SendMethods.Approve,
            contractAddress: multiTokenContractAddress,
            args: {
              symbol: TOKEN_UNIT,
              spender: bingoAddress,
              amount: approveAmount,
            },
          },
          undefined,
        )) as any;

        try {
          await getTxResult({
            TransactionId: res?.transactionId || '',
            chainId: chainId,
            rpcUrl: chainInfo?.endPoint || '',
          });

          return true;
        } catch (error) {
          message.error(error);
          return false;
        }
      }
    },
  );
};
