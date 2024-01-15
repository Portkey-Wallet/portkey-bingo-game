import { DIDWalletInfo } from '@portkey/did-ui-react';
import { LoadingMachine } from '../../machines/LoadingMachine';
import { InterpreterFrom } from 'xstate';
import { HeaderMachine } from '@/machines/headerMachine';

export enum EGameState {
  Playing,
  Countdown,
  Bingo,
}

export type AppContextType = {
  isMainChain: boolean;
  txId: string;
  isMobile: boolean;
  accountAddress: string;
  setTxId: (v: string) => void;
  loadingService: InterpreterFrom<typeof LoadingMachine>;
  headerService: InterpreterFrom<typeof HeaderMachine>;
  gameState: EGameState;
  setGameState: (e: EGameState) => void;
  isRegistered: boolean;
  setIsRegistered: (e: boolean) => void;
};

export type TWallet = DIDWalletInfo & {
  registered?: boolean;
  approved?: boolean;
};
