import React, { useEffect, useState } from 'react';
import { CHAIN_ID } from '@/constants/network';
import { AppContext } from './AppContext';
import { isMobile } from '@/utils/common';
import { LoadingMachine } from '@/machines/LoadingMachine';
import { useInterpret } from '@xstate/react';
import { XSTATE_DEVTOOLS } from '@/constants/global';
import { HeaderMachine } from '@/machines/headerMachine';
import { useWebLogin } from 'aelf-web-login';
import { EGameState } from './type';

type Props = {
  children: React.ReactNode;
};

const interpretConfig = { devTools: XSTATE_DEVTOOLS };

export const AppContextProvider = ({ children }: Props) => {
  const { wallet } = useWebLogin();
  const loadingService = useInterpret(LoadingMachine, interpretConfig);
  const headerService = useInterpret(HeaderMachine, interpretConfig);
  const [gameState, setGameState] = useState<EGameState>(EGameState.Playing);

  const [isMainChain, setIsMainChain] = useState(false);
  const [txId, setTxId] = useState('');
  const [isMobileBrowser, setIsMobileBrowser] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');

  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (wallet) {
      setIsMainChain(wallet?.portkeyInfo?.chainId !== CHAIN_ID);
      setAccountAddress(`ELF_${wallet.address || ''}_${CHAIN_ID}`);
    }
    if (navigator) setIsMobileBrowser(isMobile(navigator.userAgent));
  }, [wallet]);

  return (
    <AppContext.Provider
      value={{
        isMainChain,
        txId,
        accountAddress,
        isMobile: isMobileBrowser,
        setTxId,
        loadingService,
        headerService,
        gameState,
        setGameState,
        isRegistered,
        setIsRegistered,
      }}>
      {children}
    </AppContext.Provider>
  );
};
