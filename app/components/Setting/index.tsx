'use client';

import React, { useState } from 'react';
import Modal from '@/components/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ButtonType } from '@/components/Button';
import AElfAssets from '@/components/AElfAssets';
import SettingModal from '../SettingModal';
import { MODAL_TYPE_ENUMS } from '@/components/SettingModal/constants';
import AccountHeader from '@/components/AccountHeader';
import { useAppContext } from '@/hooks/useAppContext';
import { LockButton, LogoutButton } from '../Buttons';
import { useIsHeaderOpen } from '@/hooks/headerHooks';
import { useWebLogin, WebLoginState } from 'aelf-web-login';

import styles from './Setting.module.scss';

const Setting = () => {
  const { loginState, wallet } = useWebLogin();
  const { isMobile, headerService } = useAppContext();
  const [showSettingModal, setShowSettingModal] = useState(false);
  const { t } = useTranslation();
  const showMenuPop = useIsHeaderOpen();
  const [modalType, setModalType] = useState('');

  const onButtonClick = (step: string) => {
    setModalType(step);
    setShowSettingModal(true);
  };

  if (loginState !== WebLoginState.logined) return null;

  return (
    <>
      {showMenuPop && (
        <Modal visibility={showMenuPop} setVisibility={() => headerService.send('TOGGLE')}>
          <div className={isMobile ? styles.mobile : styles.pc}>
            <div className={styles.contentWrapper}>
              <AccountHeader className={styles.accountHeader} />
              <AElfAssets />
              <div className={styles.buttonsWrapper}>
                <Button
                  isMobile={isMobile}
                  className={styles.button}
                  type={ButtonType.ORANGE}
                  onClick={() => {
                    onButtonClick(MODAL_TYPE_ENUMS.betHistory);
                  }}>
                  {t('common.button.bet.history')}
                </Button>
                <Button
                  isMobile={isMobile}
                  className={styles.button}
                  type={ButtonType.ORANGE}
                  onClick={() => {
                    onButtonClick(MODAL_TYPE_ENUMS.gameRules);
                  }}>
                  {t('common.button.game.rules')}
                </Button>
                <Button
                  isMobile={isMobile}
                  className={styles.button}
                  type={ButtonType.ORANGE}
                  onClick={() => {
                    onButtonClick(MODAL_TYPE_ENUMS.howToPlay);
                  }}>
                  {t('common.button.how.to.play')}
                </Button>
              </div>
              {isMobile && (
                <div className={styles.footerButtonsWrapper}>
                  <LogoutButton />
                  <LockButton />
                </div>
              )}
            </div>
          </div>
          {showSettingModal && (
            <SettingModal
              isMobileBrowser={isMobile}
              showModal={showSettingModal}
              setShowModal={setShowSettingModal}
              caAddress={wallet.address || ''}
              type={modalType}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default Setting;
