import React from 'react';
import { useAppContext } from '@/hooks/useAppContext';

import styles from './SettingButton.module.scss';

const SettingButton = () => {
  const { isMobile, headerService } = useAppContext();

  return (
    <div className={isMobile ? styles.mobile : styles.pc}>
      <img
        alt="setting"
        className={styles.setting}
        src={require('@source/menu_pc.png').default.src}
        onClick={() => {
          headerService.send('TOGGLE');
        }}
      />
    </div>
  );
};

export default SettingButton;
