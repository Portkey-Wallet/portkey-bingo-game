import React, { useEffect, useState } from 'react';

import styles from './countdown.module.scss';
import { useAppContext } from '@/hooks/useAppContext';
import { COUNT } from '@/constants/global';
import { EGameState } from '@/hooks/useAppContext/type';

const CountDown = () => {
  const { isMobile, setGameState } = useAppContext();
  const [time, setTime] = useState(COUNT);

  useEffect(() => {
    if (time === 0) {
      setGameState(EGameState.Bingo);
      return;
    }

    const interval = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return (
    <div className={[styles.wrapper, styles[isMobile ? 'mobile' : 'pc']].join(' ')}>
      <div className={styles.countdown}>
        <div className={styles.number}>
          <span>{time >= 10 ? Math.floor(time / 10) : 0}</span>
        </div>
        <div className={styles.number}>
          <span>{time % 10}</span>
        </div>
      </div>
      <div className={styles.bar_bg}>
        <img
          className={styles.truck}
          style={{ animationDuration: `${COUNT}s` }}
          src={require('@source/truck.svg').default.src}
        />
        <div className={styles.bar} style={{ animationDuration: `${COUNT}s` }} />
      </div>
    </div>
  );
};

export default CountDown;
