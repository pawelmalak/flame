import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  GLOBAL_CONFIG_ID,
  readGlobalConfigJson,
  writeGlobalConfigJson,
} from '@/db/queries/globalConfig';
import { globalConfig } from '@/db/schema/globalConfig';
import { createTestDb, type TestDb } from '../helpers/createTestDb';

let testDb: TestDb;

beforeEach(() => {
  testDb = createTestDb();
});

afterEach(() => {
  testDb.close();
});

describe('globalConfig queries', () => {
  it('returns an empty object when no row exists', () => {
    expect(readGlobalConfigJson(testDb.db)).toEqual({});
  });

  it('creates the row on first write', () => {
    writeGlobalConfigJson({ theme: 'nord' }, testDb.db);

    const rows = testDb.db.select().from(globalConfig).all();

    expect(rows).toHaveLength(1);
    expect(rows[0].id).toBe(GLOBAL_CONFIG_ID);
  });

  it('returns the same config that was written', () => {
    writeGlobalConfigJson({ theme: 'paper', isHealthPingEnabled: true }, testDb.db);

    expect(readGlobalConfigJson(testDb.db)).toEqual({
      theme: 'paper',
      isHealthPingEnabled: true,
    });
  });

  it('overwrites existing config on subsequent writes', () => {
    writeGlobalConfigJson({ theme: 'paper' }, testDb.db);
    writeGlobalConfigJson({ theme: 'nord', healthPingInterval: 45 }, testDb.db);

    expect(readGlobalConfigJson(testDb.db)).toEqual({
      theme: 'nord',
      healthPingInterval: 45,
    });

    expect(testDb.db.select().from(globalConfig).all()).toHaveLength(1);
  });

  it('returns an empty object when the stored JSON is malformed', () => {
    testDb.sqlite
      .prepare(
        `INSERT INTO global_config (id, config_json, updated_at) VALUES (?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET config_json = excluded.config_json`,
      )
      .run(GLOBAL_CONFIG_ID, '{not-json', Date.now());

    expect(readGlobalConfigJson(testDb.db)).toEqual({});
  });
});
