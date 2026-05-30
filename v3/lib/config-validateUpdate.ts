import type { z } from 'zod';

import {
  getKeysLockedByEnv,
  isGlobalConfigOnlyKey,
  type MutableConfig,
  type UnvalidatedConfig,
} from './config';
import { configLog } from './logger';

export type ValidateConfigResult<TAccepted> =
  | {
      success: true;
      message: string;
      newConfig: UnvalidatedConfig;
      validatedConfig: TAccepted;
    }
  | { success: false; message: string };

type ValidateConfigUpdateInput<TSchema extends z.ZodTypeAny> = {
  updatedConfigKeys: unknown;
  currentConfig: UnvalidatedConfig;
  schema: TSchema;
};

export const validateConfigUpdate = <TSchema extends z.ZodTypeAny>({
  updatedConfigKeys,
  currentConfig,
  schema,
}: ValidateConfigUpdateInput<TSchema>): ValidateConfigResult<z.infer<TSchema>> => {
  if (
    updatedConfigKeys === null ||
    typeof updatedConfigKeys !== 'object' ||
    Array.isArray(updatedConfigKeys)
  ) {
    return { success: false, message: 'Invalid input' };
  }

  const newConfigValidationResult = schema.safeParse(updatedConfigKeys);

  if (!newConfigValidationResult.success) {
    const validationIssues = newConfigValidationResult.error.issues.map(({ path, message }) => ({
      path: path.join('.'),
      message: message,
    }));

    configLog.warn({ validationIssues }, 'config update rejected');

    return {
      success: false,
      message: `Invalid values: ${validationIssues.map(({ path }) => path).join(', ')}`,
    };
  }

  const envLockedKeys = getKeysLockedByEnv();
  const validatedConfig = {
    ...(newConfigValidationResult.data as object),
  } as MutableConfig;

  for (const key of Object.keys(validatedConfig)) {
    if (isGlobalConfigOnlyKey(key) && envLockedKeys.has(key)) {
      delete validatedConfig[key];
    }
  }

  return {
    success: true,
    message: 'Settings saved',
    newConfig: { ...currentConfig, ...validatedConfig },
    validatedConfig: validatedConfig as z.infer<TSchema>,
  };
};
