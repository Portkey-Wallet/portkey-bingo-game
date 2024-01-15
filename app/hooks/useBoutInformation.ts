import useSWRMutation from 'swr/mutation';
import { useAppContext } from './useAppContext';
import { message } from 'antd';
import { decodeAmount } from '@/utils/common';
import BigNumber from 'bignumber.js';
import { useContract } from './useContract';
import { ViewMethods } from '@/type';
import { bingoAddress } from '@/constants/network';

interface IBoutInfoResponse {
  isComplete?: boolean;
  award?: number;
  amount?: number;
  dices?: { dices: [number, number, number] };
}

export const useBoutInformation = () => {
  const { txId, loadingService } = useAppContext();
  const { send } = loadingService;
  const { callViewMethod, owner } = useContract();

  return useSWRMutation(
    txId ? [txId, 'boutInformation'] : undefined,
    async () => {
      try {
        const data: IBoutInfoResponse = await callViewMethod({
          methodName: ViewMethods.GetBoutInformation,
          contractAddress: bingoAddress,
          args: {
            address: owner,
            playId: txId,
          },
        });

        send('IDLE');

        if (!data || !data?.isComplete) {
          message.error('Draw failed, please click bingo again');
          return;
        }

        let totalReturn = new BigNumber(0);
        const { award, amount, dices } = data;

        if (!!amount && !!award) {
          totalReturn = decodeAmount(new BigNumber(amount).plus(new BigNumber(award)), 2);
        }

        const isWin = Number(award) > 0;

        return {
          isWin,
          dices: dices.dices,
          hasFinishBet: true,
          difference: decodeAmount(new BigNumber(amount), 2).toNumber(),
          totalReturn,
        };
      } catch (err) {
        console.error(err);
        send('IDLE');
      }
    },
    {
      rollbackOnError: false,
      optimisticData: {
        isWin: false,
        dices: [0, 0, 0],
        hasFinishBet: false,
        difference: 0,
        totalReturn: new BigNumber(0),
      },
    },
  );
};
