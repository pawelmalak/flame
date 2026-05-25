import path from 'node:path';

import { defineConfig } from 'drizzle-kit';

const dataDir = process.env.DATA_DIR ?? 'data';

const dbPath = path.isAbsolute(dataDir)
  ? path.join(dataDir, 'db.sqlite')
  : path.join(process.cwd(), dataDir, 'db.sqlite');

export default defineConfig({
  dialect: 'sqlite',
  schema: './db/schema',
  out: './db/migrations',
  dbCredentials: { url: dbPath },
  strict: true,
  verbose: true,
});
