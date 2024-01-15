import { useAppContext } from '@/hooks/useAppContext';
import { useBingoTxFee } from '@/hooks/useBingoTxFee';
import styles from './fee.module.scss';

export const Fee = () => {
  const { isMobile } = useAppContext();
  const { data: fee } = useBingoTxFee();

  if (!fee) return null;

  return <div className={isMobile ? styles.mobile : styles.pc}>Transaction Fee: {fee.toString()} ELF</div>;
};
