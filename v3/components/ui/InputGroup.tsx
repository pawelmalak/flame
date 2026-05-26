import type { ReactNode } from 'react';

import styles from './InputGroup.module.css';

export const InputGroup = ({ children }: { children: ReactNode }) => {
  return <div className={styles.inputGroup}>{children}</div>;
};
