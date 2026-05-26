import type { ReactNode } from 'react';

import styles from './Message.module.css';

type Props = {
  children: ReactNode;
  isPrimary?: boolean;
};

export const Message = ({ children, isPrimary = true }: Props) => {
  const className = isPrimary ? styles.message : styles.messageCenter;
  return <p className={className}>{children}</p>;
};
