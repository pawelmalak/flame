'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { SettingsNavItem } from '@/app/settings/navItems';
import styles from './SettingsNav.module.css';

export const SettingsNav = ({ items }: { items: SettingsNavItem[] }) => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} data-flame="settings-nav">
      {items.map(item => {
        const isActive = pathname === item.href;
        const className = isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

        return (
          <Link key={item.href} href={item.href} className={className}>
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};
