import dayjs from 'dayjs';
import { BET_TYPE_ENUMS, BET_DETAIL_DATE_FORMAT } from './constants';
import { BetListType } from './types';
import { BingoGameInfoDto } from '@/services/graphql/types';
import { decodeAmount } from '@/utils/common';
import { TOKEN_UNIT } from '@/constants/global';
import BigNumber from 'bignumber.js';

export const groupBetsByDate = (newBetList: BingoGameInfoDto[], oldBetList: BetListType): BetListType => {
  const groups = newBetList.reduce((groups, bet) => {
    const date = dayjs.unix(bet.playTime).format('MMM DD YYYY');
    if (!groups[date] && !oldBetList[date]) {
      groups[date] = [];
    }
    const bingoTransactionFee = new BigNumber(bet.bingoTransactionFee?.[0]?.amount || 0);
    const playTransactionFee = new BigNumber(bet.playTransactionFee?.[0]?.amount || 0);
    const totalTransactionFee = `${decodeAmount(bingoTransactionFee.plus(playTransactionFee), 5)} ${
      bet.bingoTransactionFee?.[0]?.symbol || TOKEN_UNIT
    }`;

    groups[date].push({
      id: bet.playId,
      isWin: bet.award > 0,
      bingoType: BET_TYPE_ENUMS[bet.bingoType],
      totalReturn: decodeAmount(new BigNumber(bet.amount).plus(new BigNumber(bet.award)), 2).toFixed(2),
      betAmount: decodeAmount(new BigNumber(bet.amount), 2).toFixed(2),
      totalTransactionFee: totalTransactionFee,
      play: {
        date: dayjs.unix(bet.playTime).format(BET_DETAIL_DATE_FORMAT),
        amount: decodeAmount(new BigNumber(bet.amount), 2).toFixed(2),
        transactionFee: `${decodeAmount(playTransactionFee, 5)} ${bet.playTransactionFee?.[0]?.symbol || TOKEN_UNIT}`,
        transactionId: bet.playId,
        transactionHash: bet.playBlockHash,
      },
      bingo: {
        date: dayjs.unix(bet.bingoTime).format(BET_DETAIL_DATE_FORMAT),
        amount: decodeAmount(new BigNumber(bet.amount), 2).toFixed(2),
        transactionFee: `${decodeAmount(bingoTransactionFee, 5)} ${bet.bingoTransactionFee?.[0]?.symbol || TOKEN_UNIT}`,
        transactionId: bet.bingoId,
        transactionHash: bet.bingoBlockHash,
      },
    });
    return groups;
  }, oldBetList);

  return groups;
};
