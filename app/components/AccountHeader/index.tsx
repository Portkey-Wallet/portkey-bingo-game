import React from 'react';
import { useTranslation } from 'react-i18next';
import { dealWithAccountAddressDisplay } from '@/utils/common';
import { AccountCopyIcon, RedirectIcon } from '../Icon';
import useCopy from '@/hooks/useCopy';
import { Popover } from 'antd';
import { QRCode } from 'react-qrcode-logo';
import { AELF_EXPLORER_BASEURL } from '@/constants/network';
import clsx from 'clsx';
import { useQRInfo } from '@/hooks/useQRInfo';
import { useAppContext } from '@/hooks/useAppContext';

import styles from './AccountHeader.module.scss';

interface AccountHeaderProps {
  className?: string;
}

const AccountHeader = ({ className }: AccountHeaderProps) => {
  const { isMobile, accountAddress } = useAppContext();
  const { data: qrCodeInfo } = useQRInfo();
  const { onCopy } = useCopy({ accountAddress });
  const { t } = useTranslation();

  const redirect = (address: string) => {
    window.open(`https://${AELF_EXPLORER_BASEURL}/address/${address}`);
  };

  return (
    <div className={clsx(isMobile ? styles.mobile : styles.pc, className)}>
      <div className={styles.accountWrapper}>
        {!isMobile && <div className={styles.accountText}>{t('account')}</div>}
        <div className={styles.accountNo}>{dealWithAccountAddressDisplay(accountAddress, 18)}</div>
      </div>
      <div className={styles.buttonsWrapper}>
        <div className={clsx(styles.accountCopyIcon, styles.btn)} onClick={onCopy}>
          <AccountCopyIcon id="accountHeader" />
        </div>
        <Popover
          content={() => (
            <QRCode
              value={JSON.stringify(qrCodeInfo)}
              size={200}
              quietZone={0}
              qrStyle={'squares'}
              eyeRadius={{ outer: 7, inner: 4 }}
              ecLevel={'L'}
            />
          )}>
          <div className={clsx(styles.accountQRIcon, styles.btn)} />
        </Popover>
        <div
          className={clsx(styles.accountRedirectIcon, styles.btn)}
          onClick={() => {
            redirect(accountAddress);
          }}>
          <RedirectIcon />
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
