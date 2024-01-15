import useSWR from 'swr';
import { useAppContext } from './useAppContext';
import { decodeAmount } from '@/utils/common';
import BigNumber from 'bignumber.js';
import { useBingoGameInfoQuery } from '@/services/graphql/hooks/bingoGameInfo';
import { useWebLogin } from 'aelf-web-login';

export const useBingoTxFee = () => {
  const { txId } = useAppContext();
  const { wallet } = useWebLogin();
  const { refetch } = useBingoGameInfoQuery({
    variables: {
      dto: {
        skipCount: 0,
        maxResultCount: 1,
        caAddresses: [wallet.address],
        playId: txId,
      },
    },
    skip: true,
  });

  return useSWR(
    !!wallet.address && !!txId ? [txId, 'bingoTxFee'] : undefined,
    async () => {
      let txFee: BigNumber = undefined;
      const { data } = await refetch();
      const tx = data?.bingoGameInfo?.data?.[0];

      if (tx) {
        const playAmount: number = tx?.playTransactionFee?.[0]?.amount;
        const bingoAmount: number = tx?.bingoTransactionFee?.[0]?.amount;

        if (typeof playAmount === 'number' && typeof bingoAmount === 'number') {
          txFee = decodeAmount(new BigNumber(playAmount).plus(new BigNumber(bingoAmount)), 5);
        }
      } else {
        throw new Error('tx fee not found');
      }

      return txFee;
    },
    {
      onErrorRetry(_error, _key, _config, revalidate, { retryCount }) {
        // Retry after 1 second.
        setTimeout(() => revalidate({ retryCount }), 1000);
      },
    },
  );
};
