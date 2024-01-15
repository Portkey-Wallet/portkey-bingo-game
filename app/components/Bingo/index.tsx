'use client';

import { useBingoInfo } from '@/hooks/useBingoInfo';
import { useBoutInformation } from '@/hooks/useBoutInformation';
import PC from './pc';
import Mobile from './mobile';
import BigNumber from 'bignumber.js';
import { useAppContext } from '@/hooks/useAppContext';
import { WebLoginState, useWebLogin } from 'aelf-web-login';
import { EGameState } from '@/hooks/useAppContext/type';

export interface BingoProps {
  isWin: boolean;
  hasFinishBet: boolean;
  dice1: number;
  dice2: number;
  dice3: number;
  difference: number;
  onBingo: () => void;
  onBet: () => void;
  totalReturn?: BigNumber;
}

const Bingo = () => {
  const { isMobile, setGameState, gameState, setTxId, loadingService } = useAppContext();
  const { trigger: bingo } = useBingoInfo();
  const { data, trigger: boutInfo, reset } = useBoutInformation();
  const { isWin, hasFinishBet, dices, difference, totalReturn } = data || {};
  const [dice1, dice2, dice3] = dices || [];

  const props: BingoProps = {
    isWin,
    hasFinishBet,
    dice1,
    dice2,
    dice3,
    difference,
    totalReturn,
    onBingo: async () => {
      loadingService.send('LOADING');
      setGameState(EGameState.Bingo);
      const success = await bingo();
      if (success) {
        setTimeout(async () => {
          await boutInfo();
        }, 1000);
      }
    },
    onBet: async () => {
      setGameState(EGameState.Playing);
      setTxId('');
      reset();
    },
  };

  const { loginState } = useWebLogin();

  if (loginState !== WebLoginState.logined || gameState !== EGameState.Bingo) return null;

  return isMobile ? <Mobile {...props} /> : <PC {...props} />;
};

export default Bingo;
