import { useAppContext } from '@/hooks/useAppContext';
import { LockIcon } from '../../Icon';
import { WalletType, useWebLogin, usePortkeyLock } from 'aelf-web-login';

import styles from './LockButton.module.scss';

const LockButton = () => {
  const { isMobile } = useAppContext();
  const { walletType } = useWebLogin();
  const { lock } = usePortkeyLock();

  if (walletType === WalletType.discover) return null;

  const onPortkeyLock = () => {
    lock();
  };

  return (
    <div className={isMobile ? styles.mobile : styles.pc} onClick={onPortkeyLock}>
      <LockIcon />
    </div>
  );
};

export default LockButton;
