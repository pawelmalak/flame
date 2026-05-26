import type { ReactNode } from 'react';

import styles from './Container.module.css';

export const Container = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
