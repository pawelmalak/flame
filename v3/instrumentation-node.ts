import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { enforceAuthEnv } from './lib/authEnv';
import { logBootBanner } from './lib/logger';

export const registerNode = async (): Promise<void> => {
  const pkgPath = fileURLToPath(new URL('./package.json', import.meta.url));
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as { version: string };

  logBootBanner({
    version: pkg.version,
    port: process.env.PORT ?? 5000,
    authMode: process.env.AUTH_DISABLED === 'true' ? 'disabled' : 'enabled',
    nodeEnv: process.env.NODE_ENV ?? 'development',
  });

  enforceAuthEnv();

  const { initDatabase } = await import('./db/init');

  await initDatabase();
};
