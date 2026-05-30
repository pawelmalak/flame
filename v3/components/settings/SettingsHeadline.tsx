import type { ReactNode } from 'react';

import styles from './SettingsHeadline.module.css';

export const SettingsHeadline = ({ children }: { children: ReactNode }) => {
  return <h2 className={styles.settingsHeadline}>{children}</h2>;
};
