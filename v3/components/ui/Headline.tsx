import type { ReactNode } from 'react';

import styles from './Headline.module.css';

type Props = {
  title: string;
  subtitle?: ReactNode;
};

export const Headline = ({ title, subtitle }: Props) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </>
  );
};
