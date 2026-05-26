import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from './Headline.module.css';

type Props =
  | { title: string; subtitle?: ReactNode; linkToHome?: never }
  | { title: string; subtitle?: never; linkToHome: true };

export const Headline = ({ title, subtitle, linkToHome }: Props) => {
  const subtitleContent = linkToHome ? <Link href="/">Go back</Link> : subtitle;

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      {subtitleContent ? <p className={styles.subtitle}>{subtitleContent}</p> : null}
    </>
  );
};
