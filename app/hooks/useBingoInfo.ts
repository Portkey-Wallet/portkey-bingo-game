import useSWRMutation from 'swr/mutation';
import { useAppContext } from './useAppContext';
import { bingoAddress } from '@/constants/network';
import { useContract } from './useContract';
import { SendMethods } from '@/type';

export const useBingoInfo = () => {
  const { txId, loadingService } = useAppContext();
  const { send } = loadingService;

  const { callSendMethod } = useContract();

  return useSWRMutation(txId ? [txId, 'bingoInfo'] : undefined, async ([txId]) => {
    try {
      await callSendMethod(
        {
          contractAddress: bingoAddress,
          methodName: SendMethods.Bingo,
          args: txId,
        },
        undefined,
      );

      return true;
    } catch (err) {
      console.error(err);
      send('IDLE');

      return false;
    }
  });
};
