import { useAppContext } from '../../../hooks/useAppContext';
import { useTranslation } from 'react-i18next';
import { useWebLogin } from 'aelf-web-login';

import styles from './LogoutButton.module.scss';

const LogoutButton = () => {
  const { logout } = useWebLogin();
  const { isMobile, headerService } = useAppContext();
  const { t } = useTranslation();

  const bingoLogout = async () => {
    if (isMobile) {
      headerService.send('TOGGLE');
    }
    await logout();
  };
  return (
    <button className={isMobile ? styles.mobile : styles.pc} onClick={bingoLogout}>
      {t('common.button.logout')}
    </button>
  );
};

export default LogoutButton;
