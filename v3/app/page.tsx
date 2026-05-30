import { mdiCog } from '@mdi/js';
import Link from 'next/link';

import { Header } from '@/components/layout/Header';
import { Container } from '@/components/ui/Container';
import { Message } from '@/components/ui/Message';
import { getMergedConfig } from '@/lib/mergedConfig';
import styles from './page.module.css';

export default function HomePage() {
  const config = getMergedConfig();

  return (
    <Container>
      <Header config={config} />

      <Message>
        Welcome to Flame! Go to <Link href="/settings">/settings</Link>, login and start customizing
        your new homepage
      </Message>

      <Link href="/settings" className={styles.settingsCog} aria-label="Open settings">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={mdiCog} />
        </svg>
      </Link>
    </Container>
  );
}
