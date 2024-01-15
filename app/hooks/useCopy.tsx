import copy from 'copy-to-clipboard';
import { useCallback } from 'react';
import { displayMessageOnce } from '@/utils/displayMessageOnce';

const useCopy = (props: { accountAddress: string }) => {
  const { accountAddress } = props || {};

  const onCopy = useCallback(() => {
    copy(accountAddress);
    displayMessageOnce('Copied!', 'success');
  }, [accountAddress]);

  return { onCopy };
};

export default useCopy;
