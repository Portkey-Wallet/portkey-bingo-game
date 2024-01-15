import React from 'react';
import { TOKEN_UNIT } from '@/constants/global';
import AccountNo from '@/components/AccountNo';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { TransactionDetailCardProps, ViewOnExploreProps } from '../types';
import { AELF_EXPLORER_BASEURL, bingoAddress, CHAIN_ID } from '@/constants/network';

import styles from './BetsHistory.module.scss';

const ViewOnExplore = ({ address, label }: ViewOnExploreProps) => {
  return (
    <a
      className={styles.link}
      href={`https://${AELF_EXPLORER_BASEURL}/tx/${address}`}
      target="_blank"
      rel="noopener noreferrer">
      {label}
    </a>
  );
};

const TransactionDetailCard = ({
  transactionDetail,
  isMobileBrowser,
  title,
  caAddress,
}: TransactionDetailCardProps) => {
  const accountAddress = `ELF_${caAddress}_${CHAIN_ID}`;
  const bingoContractAddress = `ELF_${bingoAddress}_${CHAIN_ID}`;
  const { t } = useTranslation();
  return (
    <div className={isMobileBrowser ? styles.transactionDetailMobile : styles.transactionDetailPc}>
      <div className={clsx(styles.transactionRow, styles.titleRow)}>
        <div className={styles.playLabel}>{title}</div>
        {!isMobileBrowser && (
          <ViewOnExplore address={transactionDetail.transactionId} label={t('setting.bet.history.view.on.explore')} />
        )}
      </div>
      <div className={styles.transactionRow}>
        <div className={styles.label}>{t('setting.bet.history.date')}</div>
        <div className={styles.value}>{transactionDetail.date}</div>
      </div>
      <div className={styles.transactionRow}>
        <div className={styles.label}>{t('setting.bet.history.status')}</div>
        <div className={styles.value}>{t('setting.bet.history.status.confirmed')}</div>
      </div>
      <div className={styles.transactionRow}>
        <div className={styles.label}>{t('setting.bet.history.from')}</div>
        <div className={styles.value}>
          <AccountNo accountAddress={accountAddress} maxToShow={18} />
        </div>
      </div>
      <div className={styles.transactionRow}>
        <div className={styles.label}>{t('setting.bet.history.to')}</div>
        <div className={styles.value}>
          <AccountNo accountAddress={bingoContractAddress} maxToShow={18} />
        </div>
      </div>
      <div className={styles.transactionRow}>
        <div className={styles.label}>{t('setting.bet.history.amount')}</div>
        <div className={styles.value}>{`${transactionDetail.amount} ${TOKEN_UNIT}`}</div>
      </div>
      <div className={styles.transactionRow}>
        <div className={styles.label}>{t('setting.bet.history.transactionFee')}</div>
        <div className={styles.value}>{transactionDetail.transactionFee}</div>
      </div>
      <div className={styles.transactionRow}>
        <div className={styles.label}>{t('setting.bet.history.transactionId')}</div>
        <div className={styles.value}>
          <AccountNo accountAddress={transactionDetail.transactionId} maxToShow={12} />
        </div>
      </div>
      {isMobileBrowser && (
        <div className={styles.transactionRow}>
          <div />
          {isMobileBrowser && (
            <ViewOnExplore address={transactionDetail.transactionId} label={t('setting.bet.history.view.on.explore')} />
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionDetailCard;
