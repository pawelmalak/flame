import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

export const register = async (): Promise<void> => {
  if (process.env.NEXT_RUNTIME !== 'nodejs') {
    return;
  }

  const { logBootBanner } = await import('./lib/logger');

  const pkgPath = fileURLToPath(new URL('./package.json', import.meta.url));
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as { version: string };

  logBootBanner({
    version: pkg.version,
    port: process.env.PORT ?? 5000,
    authMode: process.env.AUTH_DISABLED === 'true' ? 'disabled' : 'enabled',
    nodeEnv: process.env.NODE_ENV ?? 'development',
  });

  const { initDatabase } = await import('./db/init');

  await initDatabase();
};
