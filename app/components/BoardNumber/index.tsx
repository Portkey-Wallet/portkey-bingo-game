import React from 'react';

import styles from './boardnumber.module.css';
import { useAppContext } from '@/hooks/useAppContext';

function getClassnameFromNumber(num: number) {
  if (num >= 1 && num <= 6) return num;

  return 0;
}

interface IBoardNumberProps {
  number: number;
}
const BoardNumber = (props: IBoardNumberProps) => {
  const { isMobile } = useAppContext();
  const { number } = props;

  return (
    <div className={[styles.wrapper, styles[isMobile ? 'mobile' : 'pc']].join(' ')}>
      <div className={[styles.number, styles[`_${getClassnameFromNumber(number)}`]].join(' ')}></div>
    </div>
  );
};

export default BoardNumber;
