import useSWRMutation from 'swr/mutation';
import { useAppContext } from './useAppContext';
import { CHAIN_ID, bingoAddress } from '@/constants/network';
import { BetType, SendMethods } from '@/type';
import { message } from 'antd';
import { MAX_BET_VALUE, MIN_BET_VALUE } from '@/constants/global';
import { useBalance } from './useBalance';
import { useContract } from './useContract';
import { EGameState } from './useAppContext/type';
import { useRegister } from './useRegister';
import { displayMessageOnce } from '../utils/displayMessageOnce';
import BigNumber from 'bignumber.js';
import { useApprove } from './useApprove';
import { setItem } from '@/utils/cache';

export const usePlay = (input: string) => {
  const { setTxId, loadingService, setGameState } = useAppContext();
  const { data: balanceValue } = useBalance(CHAIN_ID);
  const { send } = loadingService;
  const { callSendMethod } = useContract();
  const { trigger: register } = useRegister();
  const { trigger: approve } = useApprove();

  return useSWRMutation('play', async (_, { arg: betResult }: { arg: BetType }) => {
    if (!balanceValue) return;

    const value = Number(input);
    setItem('betValue', input);

    if (value <= 0) {
      return;
    }

    if (value < MIN_BET_VALUE) {
      displayMessageOnce(`A minimum bet of ${MIN_BET_VALUE} ELF!`);
      return;
    }

    if (value > balanceValue.toNumber()) {
      displayMessageOnce('Insufficient funds');
      return;
    }

    if (value > MAX_BET_VALUE) {
      displayMessageOnce(`Please enter a number less than ${MAX_BET_VALUE} ELF!`);
      return;
    }

    try {
      send('LOADING');
      await register();
      await approve();

      const playResult = await callSendMethod<any, { error?: Error; transactionId?: string }>(
        {
          contractAddress: bingoAddress,
          methodName: SendMethods.Play,
          args: {
            amount: new BigNumber(value).multipliedBy(10 ** 8).toString(),
            type: betResult,
          },
        },
        undefined,
      );

      if (playResult?.error) {
        send('IDLE');

        if (playResult.error.message.includes('Insufficient')) {
          message.error('Insufficient funds for transaction fee');
        }

        return;
      }

      if (playResult?.transactionId) {
        setTxId(playResult?.transactionId || '');

        setGameState(EGameState.Countdown);
        send('IDLE');
      } else {
        console.log(playResult);
      }
    } catch (err) {
      console.error(err);
      send('IDLE');
    }
  });
};
