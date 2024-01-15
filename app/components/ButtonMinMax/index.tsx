import React from 'react';

import styles from './buttonminmax.module.css';
import { useAppContext } from '@/hooks/useAppContext';

type IButtonMinMaxProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
const ButtonMinMax = (props: IButtonMinMaxProps) => {
  const { isMobile } = useAppContext();

  return <button {...props} className={[styles[isMobile ? 'mobile' : 'pc'], styles.button].join(' ')} />;
};

export const minmaxError = (input?: string) => {
  if (!input) return '';
  const number = Number(input);
  if (number < 1 || number > 100) {
    return 'Limit Amount 1-100 ELF';
  }

  return '';
};

export default ButtonMinMax;
