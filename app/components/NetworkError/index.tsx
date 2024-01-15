'use client';

import React, { useState } from 'react';
import Modal from '../Modal';
import { useWebLogin, WebLoginState, useWebLoginEvent, WebLoginEvents } from 'aelf-web-login';
import { useAppContext } from '../../hooks/useAppContext';
import { useTranslation } from 'react-i18next';
import { WarningIcon } from '../Icon';
import { Button, ButtonType } from '../Button';
import { NETWORK } from '../../providers';

import styles from './NetworkError.module.scss';

const NetworkError = () => {
  const [showModal, setShowModal] = useState(false);
  const { isMobile } = useAppContext();
  const { loginState, logout } = useWebLogin();
  const { t } = useTranslation();

  useWebLoginEvent(WebLoginEvents.NETWORK_MISMATCH, (e) => {
    if (e !== NETWORK && loginState === WebLoginState.logined) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  });

  if (loginState !== WebLoginState.logined) return null;

  return (
    <Modal hideCloseIcon visibility={showModal} setVisibility={() => setShowModal(true)}>
      <div className={isMobile ? styles.mobile : styles.pc}>
        <div className={styles.icon}>
          <div className={styles.warning}>{t('notice')}</div>
        </div>
        <div className={styles.warningText}>{t('network.error')}</div>
        <Button
          isMobile
          className={styles.defaultBtn}
          type={ButtonType.BLUE}
          onClick={() => {
            setShowModal(false);
            logout();
          }}>
          <p className={styles.artWord}>{t('login.again')}</p>
        </Button>
      </div>
    </Modal>
  );
};

export default NetworkError;
