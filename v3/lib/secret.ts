import { randomBytes } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import { SECRET_PATH } from '@/db/paths';
import { authLog } from './logger';

const SECRET_BYTE_LENGTH = 32;

type GlobalWithSecret = typeof globalThis & {
  __flameJwtSecret?: string;
};

const globalRef = globalThis as GlobalWithSecret;

const generateSecret = (): string => randomBytes(SECRET_BYTE_LENGTH).toString('hex');

const writeSecretFile = (filePath: string, secretValue: string): void => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, secretValue, { mode: 0o600 });
};

const loadSecretFromFile = (): string => {
  if (fs.existsSync(SECRET_PATH)) {
    const secretValue = fs.readFileSync(SECRET_PATH, 'utf8').trim();

    if (secretValue.length > 0) {
      return secretValue;
    }
  }

  const generatedSecret = generateSecret();

  writeSecretFile(SECRET_PATH, generatedSecret);
  authLog.info({ path: SECRET_PATH }, 'jwt secret auto-generated');

  return generatedSecret;
};

export const getJwtSecret = (): string => {
  if (process.env.SECRET) {
    return process.env.SECRET;
  }

  if (!globalRef.__flameJwtSecret) {
    globalRef.__flameJwtSecret = loadSecretFromFile();
  }

  return globalRef.__flameJwtSecret;
};

export const __resetSecretCache = (): void => {
  delete globalRef.__flameJwtSecret;
};
