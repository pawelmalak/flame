import fs from 'node:fs';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const tmpPaths = await vi.hoisted(async () => {
  const nodePath = await import('node:path');
  const nodeOs = await import('node:os');
  const root = nodePath.join(nodeOs.tmpdir(), `flame-backup-test-${process.pid}-${Date.now()}`);

  return {
    DATA_DIR: root,
    DB_PATH: nodePath.join(root, 'db.sqlite'),
    BACKUPS_DIR: nodePath.join(root, 'db_backups'),
    MIGRATIONS_DIR: nodePath.join(root, 'migrations'),
  };
});

vi.mock('@/db/paths', () => tmpPaths);

const { createInitBackup, __internal } = await import('@/db/backup');

const ageFile = (file: string, ageSeconds: number): void => {
  const ts = (Date.now() - ageSeconds * 1000) / 1000;

  fs.utimesSync(file, ts, ts);
};

const seedBackups = (dir: string, count: number): string[] => {
  fs.mkdirSync(dir, { recursive: true });

  const names: string[] = [];

  for (let i = 0; i < count; i++) {
    const name = `seed-${String(i).padStart(2, '0')}.sqlite`;
    const filePath = path.join(dir, name);

    fs.writeFileSync(filePath, `seed-${i}`);
    ageFile(filePath, count - i);
    names.push(name);
  }

  return names;
};

const resetRoot = (): void => {
  fs.rmSync(tmpPaths.DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(tmpPaths.DATA_DIR, { recursive: true });
};

beforeEach(resetRoot);

afterEach(() => {
  fs.rmSync(tmpPaths.DATA_DIR, { recursive: true, force: true });
});

describe('createInitBackup', () => {
  it('returns null when the source database does not exist', () => {
    expect(createInitBackup()).toBe(null);
    expect(fs.existsSync(tmpPaths.BACKUPS_DIR)).toBe(false);
  });

  it('copies the source database into the backups dir', () => {
    fs.writeFileSync(tmpPaths.DB_PATH, 'fake-db-bytes');

    const destPath = createInitBackup();

    expect(destPath).not.toBe(null);
    expect(destPath!.startsWith(tmpPaths.BACKUPS_DIR)).toBe(true);
    expect(destPath!.endsWith('.sqlite')).toBe(true);
    expect(fs.readFileSync(destPath!, 'utf8')).toBe('fake-db-bytes');
  });

  it('creates the backups dir on first run', () => {
    fs.writeFileSync(tmpPaths.DB_PATH, 'fake');
    expect(fs.existsSync(tmpPaths.BACKUPS_DIR)).toBe(false);

    createInitBackup();

    expect(fs.existsSync(tmpPaths.BACKUPS_DIR)).toBe(true);
  });

  it('retains only the 3 most recent backups after a new one lands', () => {
    fs.writeFileSync(tmpPaths.DB_PATH, 'fresh');
    seedBackups(tmpPaths.BACKUPS_DIR, 4);

    createInitBackup();

    const remaining = fs.readdirSync(tmpPaths.BACKUPS_DIR).filter(name => name.endsWith('.sqlite'));

    expect(remaining).toHaveLength(__internal.MAX_BACKUP_FILES);
  });

  it('keeps existing backups when total count is still under the cap', () => {
    fs.writeFileSync(tmpPaths.DB_PATH, 'fresh');
    seedBackups(tmpPaths.BACKUPS_DIR, 1);

    createInitBackup();

    const remaining = fs.readdirSync(tmpPaths.BACKUPS_DIR).filter(name => name.endsWith('.sqlite'));

    expect(remaining).toHaveLength(2);
  });
});

describe('__internal.getSortedBackups', () => {
  it('returns an empty list when the dir does not exist', () => {
    expect(__internal.getSortedBackups(path.join(tmpPaths.DATA_DIR, 'never-created'))).toEqual([]);
  });

  it('returns backups sorted oldest first', () => {
    fs.mkdirSync(tmpPaths.BACKUPS_DIR, { recursive: true });
    const newer = path.join(tmpPaths.BACKUPS_DIR, 'newer.sqlite');
    const older = path.join(tmpPaths.BACKUPS_DIR, 'older.sqlite');

    fs.writeFileSync(newer, '');
    fs.writeFileSync(older, '');
    ageFile(newer, 1);
    ageFile(older, 10);

    const sorted = __internal.getSortedBackups(tmpPaths.BACKUPS_DIR);

    expect(sorted.map(backup => backup.name)).toEqual(['older.sqlite', 'newer.sqlite']);
  });

  it('ignores files that do not end with .sqlite', () => {
    fs.mkdirSync(tmpPaths.BACKUPS_DIR, { recursive: true });
    fs.writeFileSync(path.join(tmpPaths.BACKUPS_DIR, 'notes.txt'), '');
    fs.writeFileSync(path.join(tmpPaths.BACKUPS_DIR, 'a.sqlite'), '');

    const sorted = __internal.getSortedBackups(tmpPaths.BACKUPS_DIR);

    expect(sorted.map(backup => backup.name)).toEqual(['a.sqlite']);
  });
});

describe('__internal.removeOldBackups', () => {
  it('deletes everything older than the keepCount most recent', () => {
    seedBackups(tmpPaths.BACKUPS_DIR, 5);

    const removed = __internal.removeOldBackups(tmpPaths.BACKUPS_DIR, 2);

    expect(removed).toBe(3);
    expect(fs.readdirSync(tmpPaths.BACKUPS_DIR)).toHaveLength(2);
  });

  it('is a no-op when there are fewer files than keepCount', () => {
    seedBackups(tmpPaths.BACKUPS_DIR, 2);

    const removed = __internal.removeOldBackups(tmpPaths.BACKUPS_DIR, 5);

    expect(removed).toBe(0);
    expect(fs.readdirSync(tmpPaths.BACKUPS_DIR)).toHaveLength(2);
  });

  it('only counts .sqlite files toward the cap', () => {
    fs.mkdirSync(tmpPaths.BACKUPS_DIR, { recursive: true });
    fs.writeFileSync(path.join(tmpPaths.BACKUPS_DIR, 'README.md'), '');
    seedBackups(tmpPaths.BACKUPS_DIR, 3);

    __internal.removeOldBackups(tmpPaths.BACKUPS_DIR, 2);

    expect(fs.existsSync(path.join(tmpPaths.BACKUPS_DIR, 'README.md'))).toBe(true);
  });
});
