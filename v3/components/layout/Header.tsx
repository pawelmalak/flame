'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { HeaderConfig } from '@/lib/config';
import { formatDateTime, pickGreeting } from '@/lib/dateTime';
import styles from './Header.module.css';

export const Header = ({ config }: { config: HeaderConfig }) => {
  const [now, setNow] = useState(() => new Date());
  const { hideDate, hideTime, hideHeader } = config;

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);

    return () => clearInterval(interval);
  }, []);

  const dateTime = formatDateTime(now, config);
  const greeting = pickGreeting(now, config);
  const showDateTime = !hideDate || !hideTime;

  return (
    <header className={styles.header} data-flame="header">
      {showDateTime ? <p>{dateTime}</p> : null}

      <Link href="/settings" className={styles.settingsLink}>
        Go to Settings
      </Link>

      {!hideHeader ? (
        <span className={styles.headerMain}>
          <h1>{greeting}</h1>
        </span>
      ) : null}
    </header>
  );
};
