import fs from 'node:fs';

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { DATA_DIR, DB_PATH } from './paths';
import * as schema from './schema';

const createDbConnection = (): Database.Database => {
  fs.mkdirSync(DATA_DIR, { recursive: true });

  const connection = new Database(DB_PATH);

  connection.pragma('journal_mode = WAL');
  connection.pragma('foreign_keys = ON');

  return connection;
};

type GlobalWithDb = typeof globalThis & {
  __flameSqlite?: Database.Database;
};

const globalRef = globalThis as GlobalWithDb;

export const sqlite: Database.Database =
  globalRef.__flameSqlite ?? (globalRef.__flameSqlite = createDbConnection());

export const db = drizzle(sqlite, { schema });

export type DbClient = typeof db;
