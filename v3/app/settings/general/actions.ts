'use server';

import { revalidatePath } from 'next/cache';

import { readGlobalConfigJson, writeGlobalConfigJson } from '@/db/queries/globalConfig';
import { isAuthenticated } from '@/lib/auth';
import { globalOverridesSchema } from '@/lib/config';
import { validateConfigUpdate } from '@/lib/config-validateUpdate';
import { configLog } from '@/lib/logger';

export type UpdateGlobalConfigResult = { success: boolean; message: string };

export const updateGlobalConfig = async (
  updatedConfigKeys: unknown,
): Promise<UpdateGlobalConfigResult> => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    return { success: false, message: 'Not authenticated' };
  }

  const currentConfig = readGlobalConfigJson();
  const validationResult = validateConfigUpdate({
    updatedConfigKeys,
    currentConfig,
    schema: globalOverridesSchema,
  });

  if (!validationResult.success) {
    return { success: false, message: validationResult.message };
  }

  writeGlobalConfigJson(validationResult.newConfig);

  configLog.info({ keys: Object.keys(validationResult.validatedConfig) }, 'global config updated');

  revalidatePath('/', 'layout');

  return { success: true, message: validationResult.message };
};
