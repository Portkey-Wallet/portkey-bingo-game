'use client';

import React from 'react';
import { CHAIN_ID } from '../../constants/network';
import { useAppContext } from '@/hooks/useAppContext';
import { useSelector } from '@xstate/react';
import { idleSelector, extraNodeSelector } from '@/machines/LoadingMachine';

import styles from './index.module.css';

const InitLoading = (props: { isInit?: boolean }) => {
  const { isMobile: isMobileMode, loadingService } = useAppContext();
  const { isInit } = props;
  const isIdle = useSelector(loadingService, idleSelector);
  const isLoadingExtraNode = useSelector(loadingService, extraNodeSelector);

  if (isIdle) {
    return null;
  }

  return (
    <div className={isInit ? styles.body_init : styles.body}>
      {isMobileMode ? (
        <img className={styles.bingo_mobile} src={require('../../../public/bingo_white.png').default.src} />
      ) : (
        <img className={styles.bingo_pc} src={require('../../../public/bingo_white_pc.png').default.src} />
      )}

      <div className={isMobileMode ? styles.wrapper_mobile : styles.wrapper}>
        <div className={[styles.circle, styles.circle_1].join(' ')}></div>
        <div className={[styles.circle, styles.circle_2].join(' ')}></div>
        <div className={[styles.circle, styles.circle_3].join(' ')}></div>
      </div>
      {isLoadingExtraNode && (
        <div className={isMobileMode ? styles.extra__data__wrapper__mobile : styles.extra__data__wrapper__pc}>
          <div className={isMobileMode ? styles.sync__maintitle__mobile : styles.sync__maintitle__pc}>
            Synchronizing on-chain account information...
          </div>
          <div className={isMobileMode ? styles.sync__subtitle__mobile : styles.sync__subtitle__pc}>
            While waiting, you can pre-deposit funds in the Portkey wallet for use in the game on the {'sidechain'}{' '}
            {CHAIN_ID}.
          </div>
        </div>
      )}
    </div>
  );
};

export default InitLoading;
