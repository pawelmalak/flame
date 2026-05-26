import path from 'node:path';

const resolveDataDir = (): string => {
  const raw = process.env.DATA_DIR ?? 'data';
  return path.isAbsolute(raw) ? raw : path.join(process.cwd(), raw);
};

export const DATA_DIR = resolveDataDir();
export const DB_PATH = path.join(DATA_DIR, 'db.sqlite');
export const BACKUPS_DIR = path.join(DATA_DIR, 'db_backups');
export const MIGRATIONS_DIR = path.join(process.cwd(), 'db', 'migrations');
export const SECRET_PATH = path.join(DATA_DIR, '.secret');
