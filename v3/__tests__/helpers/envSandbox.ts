import { afterEach, beforeEach } from 'vitest';

export const setupEnvSandbox = <K extends string>(envKeys: readonly K[]) => {
  let savedEnv: Partial<Record<K, string | undefined>> = {};

  const setEnv = (key: K, value: string | undefined): void => {
    const env = process.env as Record<string, string | undefined>;

    if (value === undefined) {
      delete env[key];
    } else {
      env[key] = value;
    }
  };

  beforeEach(() => {
    savedEnv = {};

    for (const key of envKeys) {
      savedEnv[key] = process.env[key];
    }
  });

  afterEach(() => {
    for (const key of envKeys) {
      setEnv(key, savedEnv[key]);
    }
  });

  return { setEnv };
};
