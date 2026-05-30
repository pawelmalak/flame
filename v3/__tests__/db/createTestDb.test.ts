import { afterEach, describe, expect, it } from 'vitest';

import { createTestDb, type TestDb } from '../helpers/createTestDb';

describe('createTestDb', () => {
  let handle: TestDb | null = null;

  afterEach(() => {
    handle?.close();
    handle = null;
  });

  it('enables foreign keys on a fresh in-memory connection', () => {
    handle = createTestDb();
    const row = handle.sqlite.prepare('PRAGMA foreign_keys').get() as { foreign_keys: number };

    expect(row.foreign_keys).toBe(1);
  });

  it('isolates state between calls', () => {
    const firstDb = createTestDb();
    const secondDb = createTestDb();

    try {
      firstDb.sqlite.exec('CREATE TABLE marker (id INTEGER PRIMARY KEY)');

      const tables = secondDb.sqlite
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='marker'")
        .all();

      expect(tables).toHaveLength(0);
    } finally {
      firstDb.close();
      secondDb.close();
    }
  });

  it('runs the seed callback against the returned drizzle client', () => {
    const seen: unknown[] = [];

    handle = createTestDb(db => {
      seen.push(db);
    });

    expect(seen).toHaveLength(1);
    expect(seen[0]).toBe(handle.db);
  });
});
