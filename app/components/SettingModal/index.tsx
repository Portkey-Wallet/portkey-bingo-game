import React, { useState } from 'react';
import Modal from '@/components/Modal';
import { useTranslation } from 'react-i18next';
import BetsHistory from './BetsHistory';
import { MODAL_TYPE_ENUMS } from './constants';
import clsx from 'clsx';
import { SettingModalProps } from './types';

import styles from './SettingModal.module.scss';

const SettingModal = ({ showModal, setShowModal, type, isMobileBrowser, caAddress }: SettingModalProps) => {
  const { t } = useTranslation();
  const [winRatio, setWinRatio] = useState('');
  return (
    <Modal visibility={showModal} setVisibility={setShowModal}>
      {type === MODAL_TYPE_ENUMS?.gameRules && (
        <div className={isMobileBrowser ? styles.mobile : styles.pc}>
          <div className={styles.title}>{t('common.button.game.rules')}</div>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>{t('setting.game.rules.1')}</div>
            <div className={styles.content}>{t('setting.game.rules.2')}</div>
            <div className={styles.content}>{t('setting.game.rules.3')}</div>
          </div>
        </div>
      )}
      {type === MODAL_TYPE_ENUMS.howToPlay && (
        <div className={isMobileBrowser ? styles.mobile : styles.pc}>
          <div className={styles.title}>{t('common.button.how.to.play')}</div>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>{t('setting.how.to.play.step.1')}</div>
            <div className={styles.content}>{t('setting.how.to.play.step.1.content')}</div>
            <div className={clsx(styles.stepTitle, styles.content)}>{t('setting.how.to.play.step.2')}</div>
            <div className={styles.content}>{t('setting.how.to.play.step.2.content')}</div>
            <div className={clsx(styles.stepTitle, styles.content)}>{t('setting.how.to.play.step.3')}</div>
            <div className={styles.content}>{t('setting.how.to.play.step.3.content')}</div>
          </div>
        </div>
      )}
      {type === MODAL_TYPE_ENUMS.betHistory && (
        <div className={isMobileBrowser ? styles.mobile : styles.pc}>
          <div className={clsx(styles.title, styles.titleWrapper)}>
            <div className={styles.betTitle}>{t('common.button.bet.history')}</div>
            {winRatio && (
              <div className={styles.winLabel}>
                <span>{t('setting.bet.history.win')}</span>
                <span className={styles.winRatio}>{winRatio}</span>{' '}
              </div>
            )}
          </div>
          <div className={styles.contentWrapper}>
            <BetsHistory isMobile={isMobileBrowser} caAddress={caAddress} setWinRatio={setWinRatio} />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SettingModal;
