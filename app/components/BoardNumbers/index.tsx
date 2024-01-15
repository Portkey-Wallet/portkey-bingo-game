import React from 'react';

import styles from './boardnumbers.module.scss';
import BoardNumber from '../BoardNumber';
import { useAppContext } from '@/hooks/useAppContext';

interface IBoardNumberProps {
  number1: number;
  number2: number;
  number3: number;
  isFinished?: boolean;
  isSmall?: boolean;
}
const BoardNumbers = (props: IBoardNumberProps) => {
  const { isMobile } = useAppContext();
  const { number1, number2, number3, isFinished, isSmall } = props;

  return (
    <div
      className={[
        styles.wrapper,
        styles[isMobile ? 'mobile' : 'pc'],
        styles[isFinished ? 'finished' : 'start'],
        styles[isSmall ? 'small' : 'large'],
      ].join(' ')}>
      <div className={styles.position}>
        <BoardNumber number={number1} />
        <BoardNumber number={number2} />
        <BoardNumber number={number3} />
      </div>
    </div>
  );
};

export default BoardNumbers;
