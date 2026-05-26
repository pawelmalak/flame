'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { SettingsNavItem } from '@/app/settings/navItems';
import styles from './SettingsNav.module.css';

type Props = {
  items: SettingsNavItem[];
  isAuthenticated: boolean;
};

export const SettingsNav = ({ items, isAuthenticated }: Props) => {
  const pathname = usePathname();
  const visibleItems = isAuthenticated ? items : items.filter(item => !item.isAuthRequired);

  return (
    <nav className={styles.nav} data-flame="settings-nav">
      {visibleItems.map((item, idx) => {
        const isActive = pathname === item.href;
        const className = isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

        return (
          <Link key={idx} href={item.href} className={className}>
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};
