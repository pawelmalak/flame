import fs from 'node:fs';

import Database from 'better-sqlite3';
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import { MIGRATIONS_DIR } from '@/db/paths';
import * as schema from '@/db/schema';

export type TestDbClient = BetterSQLite3Database<typeof schema>;

export type TestDb = {
  db: TestDbClient;
  sqlite: Database.Database;
  close: () => void;
};

const hasMigrationFiles = (folder: string): boolean => {
  if (!fs.existsSync(folder)) {
    return false;
  }

  return fs.readdirSync(folder).some(name => name.endsWith('.sql'));
};

export const createTestDb = (seed?: (db: TestDbClient) => void): TestDb => {
  const sqlite = new Database(':memory:');

  sqlite.pragma('foreign_keys = ON');

  const db = drizzle(sqlite, { schema });

  if (hasMigrationFiles(MIGRATIONS_DIR)) {
    migrate(db, { migrationsFolder: MIGRATIONS_DIR });
  }

  seed?.(db);

  return {
    db,
    sqlite,
    close: () => sqlite.close(),
  };
};
