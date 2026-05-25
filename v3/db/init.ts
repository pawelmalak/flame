import { createInitBackup } from './backup';

type GlobalWithInitFlag = typeof globalThis & {
  __flameDbInitialized?: boolean;
};

const globalRef = globalThis as GlobalWithInitFlag;

export type InitOptions = {
  skipBackup?: boolean;
  skipMigrate?: boolean;
};

export const initDatabase = async (options: InitOptions = {}): Promise<void> => {
  if (globalRef.__flameDbInitialized) {
    return;
  }

  globalRef.__flameDbInitialized = true;

  if (!options.skipBackup) {
    createInitBackup();
  }

  if (!options.skipMigrate) {
    const { runMigrations } = await import('./migrate');

    runMigrations();
  }
};
