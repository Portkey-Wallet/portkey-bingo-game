import React from 'react';

import styles from './background.module.scss';

const Background = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <div className={styles.background}>
        <div className={styles.bodyWrapper}>{children}</div>
      </div>
    </div>
  );
};

export default Background;
