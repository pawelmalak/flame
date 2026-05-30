import fs from 'node:fs';
import path from 'node:path';

import { createFsSafeTimestamp } from '@/lib/utils/createFsSafeTimestamp';
import { BACKUPS_DIR, DB_PATH } from './paths';

const MAX_BACKUP_FILES = 3;

const getSortedBackups = (dir: string): { name: string; mtimeMs: number }[] => {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter(name => name.endsWith('.sqlite'))
    .map(name => {
      const { mtimeMs } = fs.statSync(path.join(dir, name));
      return { name, mtimeMs };
    })
    .sort((firstBackup, secondBackup) => firstBackup.mtimeMs - secondBackup.mtimeMs);
};

const removeOldBackups = (dir: string, keepCount: number): number => {
  const backupFiles = getSortedBackups(dir);
  const expiredBackups = backupFiles.slice(keepCount);

  for (const { name } of expiredBackups) {
    fs.unlinkSync(path.join(dir, name));
  }

  return expiredBackups.length;
};

export const createInitBackup = (): string | null => {
  if (!fs.existsSync(DB_PATH)) {
    return null;
  }

  fs.mkdirSync(BACKUPS_DIR, { recursive: true });

  const destPath = path.join(BACKUPS_DIR, `${createFsSafeTimestamp()}.sqlite`);

  fs.copyFileSync(DB_PATH, destPath);
  removeOldBackups(BACKUPS_DIR, MAX_BACKUP_FILES);

  return destPath;
};

export const __internal = { removeOldBackups, getSortedBackups, MAX_BACKUP_FILES };
