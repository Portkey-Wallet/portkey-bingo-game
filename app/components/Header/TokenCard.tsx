import { decorateBalanceText } from '@/utils/common';
import { useBalance } from '@/hooks/useBalance';
import { CHAIN_ID } from '@/constants/network';
import { TOKEN_UNIT } from '@/constants/global';
import { RefreshButton } from '../Buttons';
import { TokenIcon } from '../Icon';
import { useAppContext } from '@/hooks/useAppContext';
import { useEffect, useRef } from 'react';
import { useWebLogin, WebLoginState } from 'aelf-web-login';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.scss';

const ACCOUNT_SYNC_MSG_KEY = 'accountSync';
const TokenCard = () => {
  const { loginState, wallet } = useWebLogin();

  const isFetchingBalance = useRef(false);
  const { t } = useTranslation();
  const { isMobile, loadingService } = useAppContext();
  const { data, mutate } = useBalance(CHAIN_ID);

  const openAccountSyncMsg = () => {
    loadingService.send('LOADING');
    message.open({
      key: ACCOUNT_SYNC_MSG_KEY,
      content: t('account.sync.info'),
      duration: 0,
      className: isMobile ? styles.mobileAccountSyncInfo : styles.pcAccountSyncInfo,
    });
  };

  const closeAccountSyncMsg = () => {
    loadingService.send('IDLE');
    message.destroy(ACCOUNT_SYNC_MSG_KEY);
  };

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    if (wallet.discoverInfo) {
      if (data === undefined && loginState === WebLoginState.logined) {
        loadingService.send('LOADING');
        isFetchingBalance.current = true;
      } else if (isFetchingBalance.current) {
        loadingService.send('IDLE');
        isFetchingBalance.current = false;
      }
    } else if (wallet.portkeyInfo) {
      if (!wallet.accountInfoSync.syncCompleted) {
        openAccountSyncMsg();
        isFetchingBalance.current = true;
      } else if (isFetchingBalance.current) {
        closeAccountSyncMsg();
        isFetchingBalance.current = false;
      }
    }

    return () => {
      message.destroy(ACCOUNT_SYNC_MSG_KEY);
    };
  }, [data, loginState, wallet]);

  return (
    <div className={isMobile ? styles.mobileTokenCard : styles.pcTokenCard}>
      <div className={styles.tokenWrapper}>
        <TokenIcon />
        <div className={styles.token}>
          {decorateBalanceText(data?.toString())} {TOKEN_UNIT}
        </div>
      </div>
      {!isMobile && <RefreshButton onClick={() => mutate()} className={styles.refresh} />}
    </div>
  );
};

export default TokenCard;
