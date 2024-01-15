'use client';

import AccountHeader from '@/components/AccountHeader';
import { LockButton, LogoutButton, SettingButton } from '../Buttons';
import { dealWithAccountAddressDisplay } from '@/utils/common';
import TokenCard from './TokenCard';
import { AccountCopyIcon } from '../Icon';
import useCopy from '@/hooks/useCopy';
import { useAppContext } from '@/hooks/useAppContext';
import { useWebLogin, WebLoginState } from 'aelf-web-login';

import styles from './Header.module.scss';

const Header = () => {
  const { loginState } = useWebLogin();

  const { isMobile, accountAddress } = useAppContext();
  const { onCopy } = useCopy({ accountAddress });

  if (loginState !== WebLoginState.logined) return null;

  return (
    <div className={isMobile ? styles.mobile : styles.pc}>
      <SettingButton />
      {isMobile ? (
        <>
          <div className={styles.accountWrapper}>
            <div className={styles.account}>{dealWithAccountAddressDisplay(accountAddress, 18)}</div>
            <div className={styles.copyIcon} onClick={onCopy}>
              <AccountCopyIcon id="header" />
            </div>
          </div>
          <TokenCard />
        </>
      ) : (
        <>
          <TokenCard />
          <div className={styles.dashboard_accountHeader}>
            <AccountHeader className={styles.accountHeader} />
          </div>
          <LogoutButton />
          <LockButton />
        </>
      )}
    </div>
  );
};

export default Header;
