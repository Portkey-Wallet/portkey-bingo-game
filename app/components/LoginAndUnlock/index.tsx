'use client';

import { useWebLogin, WebLoginState } from 'aelf-web-login';
import { useAppContext } from '../../hooks/useAppContext';
import { Button, ButtonType } from '../Button';
import { isTestNet } from '../../constants/network';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';

import styles from './LoginAndUnlock.module.scss';
import { getItem } from '@/utils/cache';

const LoginAndUnlock = () => {
  const { loginState, login } = useWebLogin();
  const { t } = useTranslation();
  const { isMobile } = useAppContext();

  const bingoLogin = async () => {
    if (loginState !== WebLoginState.logining) {
      await login();
    }
  };

  if (loginState === WebLoginState.logined) {
    return null;
  }

  return (
    <div className={isMobile ? styles.mobile : styles.pc}>
      <div className={styles.defaultWrapper}>
        <div className={styles.title__img__wrapper}>
          {isTestNet && (
            <div className={styles.test__tag__wrapper}>
              <div className={styles.test__tag__wrapper__content}>TEST</div>
            </div>
          )}
          <img className={styles.logo} src={require('@source/bingo.png').default.src} />
        </div>
        {(loginState === WebLoginState.initial || loginState === WebLoginState.logining) && (
          <Button isMobile className={styles.defaultBtn} type={ButtonType.ORANGE} onClick={bingoLogin}>
            <img src={require('@source/button_playnow.png').default.src} className={styles.buttonPlayImg} />
            {loginState === WebLoginState.logining && <Spin spinning />}
          </Button>
        )}
        {loginState === WebLoginState.lock && (
          <Button isMobile className={styles.defaultBtn} type={ButtonType.BLUE} onClick={bingoLogin}>
            <img src={require('@source/button_unlock.png').default.src} className={styles.buttonUnlockImg} />
          </Button>
        )}

        {isTestNet && (
          <div className={styles.initTip}>
            <img src={require('@source/warn.svg').default.src} />
            <span>{t('demo.desc')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginAndUnlock;
