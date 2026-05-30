import { eq } from 'drizzle-orm';

import { db, type DbClient } from '@/db';
import { globalConfig } from '@/db/schema/globalConfig';
import type { UnvalidatedConfig } from '@/lib/config';
import { configLog } from '@/lib/logger';

export const GLOBAL_CONFIG_ID = 1;

const safeParseJson = (configString: string): UnvalidatedConfig => {
  try {
    const parsed = JSON.parse(configString) as unknown;

    if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as UnvalidatedConfig;
    }
  } catch (err) {
    configLog.warn({ err }, 'global_config row contained invalid JSON; treating as empty');
  }

  return {};
};

export const readGlobalConfigJson = (client: DbClient = db): UnvalidatedConfig => {
  const row = client
    .select({ configJson: globalConfig.configJson })
    .from(globalConfig)
    .where(eq(globalConfig.id, GLOBAL_CONFIG_ID))
    .get();

  if (row === undefined) {
    return {};
  }

  return safeParseJson(row.configJson);
};

export const writeGlobalConfigJson = (
  newConfig: UnvalidatedConfig,
  client: DbClient = db,
): void => {
  const configJson = JSON.stringify(newConfig);
  const updatedAt = Date.now();

  client
    .insert(globalConfig)
    .values({ id: GLOBAL_CONFIG_ID, configJson, updatedAt })
    .onConflictDoUpdate({
      target: globalConfig.id,
      set: { configJson, updatedAt },
    })
    .run();
};
