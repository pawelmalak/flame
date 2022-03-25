import { ReactNode } from 'react';
import styles from './ActionIcons.module.css';

interface Props {
  children: ReactNode;
}

export const ActionIcons = ({ children }: Props): JSX.Element => {
  return <span className={styles.ActionIcons}>{children}</span>;
};
