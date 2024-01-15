import React, { useEffect } from 'react';
import { decorateBalanceText } from '@/utils/common';
import { currentNetworkType, anotherNetworkType, CHAIN_ID, MAIN_CHAIN_ID } from '@/constants/network';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useAppContext } from '@/hooks/useAppContext';
import { TOKEN_UNIT } from '@/constants/global';

import styles from './AElfAssets.module.scss';
import { TokenIcon } from '../Icon';
import { useBalance } from '@/hooks/useBalance';

interface AElfAssetsProps {
  className?: string;
}

const AElfAssets = ({ className }: AElfAssetsProps) => {
  const { isMobile } = useAppContext();
  const { t } = useTranslation();
  const { data: balanceValue, mutate: fetchBalance } = useBalance(CHAIN_ID);
  const { data: anotherBalanceValue, mutate: fetchMainChainBalance } = useBalance(MAIN_CHAIN_ID);

  useEffect(() => {
    fetchBalance();
    fetchMainChainBalance();
  }, []);

  return (
    <div className={clsx(isMobile ? styles.mobile : styles.pc, className)}>
      <div className={styles.assetWrapper}>
        <div className={styles.assetTokenIcon}>
          <TokenIcon />
        </div>
        <div className={styles.textContentFlex}>
          <div className={styles.textContentLeft}>
            <span>{TOKEN_UNIT}</span>
            <span>{decorateBalanceText(balanceValue?.toString() || '0')}</span>
          </div>
          <span className={styles.networkType}>{currentNetworkType}</span>
        </div>
        <div className={styles.currentLabel}>{t('current')}</div>
      </div>
      <div className={styles.assetWrapper}>
        <div className={styles.assetTokenIcon}>
          <TokenIcon />
        </div>
        <div className={styles.textContentFlex}>
          <div className={styles.textContentLeft}>
            <span>{TOKEN_UNIT}</span>
            <span>{decorateBalanceText(anotherBalanceValue?.toString() || '0')}</span>
          </div>
          <span className={styles.networkType}>{anotherNetworkType}</span>
        </div>
      </div>
    </div>
  );
};

export default AElfAssets;
