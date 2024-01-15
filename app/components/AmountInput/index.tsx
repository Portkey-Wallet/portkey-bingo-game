import React from 'react';

import styles from './amountinput.module.scss';
import { InputNumber } from 'antd';
import { useAppContext } from '@/hooks/useAppContext';

const MAX_LIMIT = '9'.repeat(13 - 3);

interface IBoardNumberProps {
  value: string;
  onChange: (value: string) => void;
}
const AmountInput = (props: IBoardNumberProps) => {
  const { isMobile } = useAppContext();
  const { value, onChange } = props;

  return (
    <div className={[styles.wrapper, styles[isMobile ? 'mobile' : 'pc']].join(' ')}>
      <InputNumber
        value={value}
        bordered={false}
        precision={2}
        max={MAX_LIMIT}
        className={styles.input}
        onChange={onChange}
        controls={false}
      />
      <span className={styles.text}>BET ELF</span>
    </div>
  );
};

export default AmountInput;
