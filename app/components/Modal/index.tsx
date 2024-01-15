import React from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';
import clsx from 'clsx';
import { useAppContext } from '@/hooks/useAppContext';

import styles from './Modal.module.scss';

interface ModalProps extends AntdModalProps {
  visibility: boolean;
  setVisibility: (v: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  hideCloseIcon?: boolean;
}

const Modal = ({ visibility, setVisibility, children, className, hideCloseIcon }: ModalProps) => {
  const { isMobile } = useAppContext();
  return (
    <AntdModal
      className={clsx(isMobile ? styles.mobile : styles.pc, className)}
      centered
      open={visibility}
      onOk={() => setVisibility(false)}
      onCancel={() => setVisibility(false)}
      width={1000}
      closeIcon={
        hideCloseIcon ? <></> : <img className={styles.closeIcon} src={require('@source/close.png').default.src} />
      }
      footer={null}>
      {children}
    </AntdModal>
  );
};

export default Modal;
