import React, { MouseEventHandler } from 'react';

import styles from './button.module.css';

export enum ButtonType {
  BLUE,
  ORANGE,
}

export const Button = (props: {
  children: any;
  isMobile: boolean;
  enable?: boolean;
  type: ButtonType;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const { children, isMobile, type, className, onClick, enable = true } = props;
  let styleClass = type === ButtonType.BLUE ? 'blueBtn' : 'orangeBtn';
  if (!isMobile) {
    styleClass = `${styleClass}__pc`;
  }
  return (
    <button disabled={!enable} onClick={onClick} className={[styles[styleClass], styles.btn, className].join(' ')}>
      {children}
    </button>
  );
};
