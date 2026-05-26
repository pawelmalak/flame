import Link from 'next/link';
import type { ReactNode } from 'react';

import { SettingsNav } from '@/components/settings/SettingsNav';
import { Container } from '@/components/ui/Container';
import { Headline } from '@/components/ui/Headline';
import { settingsNavItems } from './navItems';
import styles from './settings.module.css';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Headline title="Settings" subtitle={<Link href="/">Go back</Link>} />

      <div className={styles.settings}>
        <SettingsNav items={settingsNavItems} />
        <section className={styles.content}>{children}</section>
      </div>
    </Container>
  );
}
