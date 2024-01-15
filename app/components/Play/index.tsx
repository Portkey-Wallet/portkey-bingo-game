'use client';

import PC from './pc';
import Mobile from './mobile';
import { useAppContext } from '@/hooks/useAppContext';
import { WebLoginState, useWebLogin } from 'aelf-web-login';
import { EGameState } from '@/hooks/useAppContext/type';

const Play = () => {
  const { loginState } = useWebLogin();
  const { isMobile, gameState } = useAppContext();

  if (loginState !== WebLoginState.logined || gameState === EGameState.Bingo) return null;

  return isMobile ? <Mobile /> : <PC />;
};

export default Play;
