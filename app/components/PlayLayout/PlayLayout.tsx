import React from 'react';

import styles from './playlayout.module.scss';
import { useAppContext } from '@/hooks/useAppContext';

interface IPlayLayoutProps {
  left: React.ReactNode;
  input: React.ReactNode;
  minmax: React.ReactNode;
  minmaxError?: string;
  bigsmall: React.ReactNode;
}
const PlayLayout = (props: IPlayLayoutProps) => {
  const { isMobile } = useAppContext();
  const { left, input, minmax, minmaxError, bigsmall } = props;

  return (
    <div className={[styles.wrapper, styles[isMobile ? 'mobile' : 'pc']].join(' ')}>
      <div className={styles.left}>{left}</div>
      <div className={styles.right}>
        <div className={styles.input}>{input}</div>
        <div className={styles.minmax}>{minmax}</div>
        <div className={styles.minmaxError}>{minmaxError}</div>
        <div className={styles.bigsmall}>{bigsmall}</div>
      </div>
    </div>
  );
};

export default PlayLayout;
