import React from 'react';
import clsx from 'clsx';
import { CopyIcon } from '../Icon';
import { dealWithAccountAddressDisplay } from '@/utils/common';
import useCopy from '@/hooks/useCopy';

import styles from './AccountNo.module.scss';

interface AccountNoProps {
  accountAddress: string;
  maxToShow: number;
  className?: string;
  accountTextCss?: string;
  accountCopyCss?: string;
}

const AccountNo = ({ accountAddress, className, accountTextCss, accountCopyCss, maxToShow }: AccountNoProps) => {
  const { onCopy } = useCopy({ accountAddress });

  return (
    <div className={clsx(styles.accountNo, className)}>
      <div className={clsx(styles.accountText, accountTextCss)}>
        {dealWithAccountAddressDisplay(accountAddress, maxToShow)}
      </div>
      <div className={clsx(styles.accountCopy, accountCopyCss)} onClick={onCopy}>
        <CopyIcon />
      </div>
    </div>
  );
};

export default AccountNo;
