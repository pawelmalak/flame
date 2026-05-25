import fs from 'node:fs';

import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import { db, type DbClient } from './index';
import { MIGRATIONS_DIR } from './paths';

const hasMigrationFiles = (folder: string): boolean => {
  if (!fs.existsSync(folder)) {
    return false;
  }

  return fs.readdirSync(folder).some(name => name.endsWith('.sql'));
};

export const runMigrations = (target: DbClient = db): void => {
  if (!hasMigrationFiles(MIGRATIONS_DIR)) {
    return;
  }

  migrate(target, { migrationsFolder: MIGRATIONS_DIR });
};
