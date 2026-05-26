import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { checkAuthEnv } from '@/lib/authEnv';

let saved: { PASSWORD: string | undefined; AUTH_DISABLED: string | undefined };

beforeEach(() => {
  saved = {
    PASSWORD: process.env.PASSWORD,
    AUTH_DISABLED: process.env.AUTH_DISABLED,
  };

  delete process.env.PASSWORD;
  delete process.env.AUTH_DISABLED;
});

afterEach(() => {
  for (const [key, value] of Object.entries(saved)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
});

describe('checkAuthEnv', () => {
  it('is ok when AUTH_DISABLED=true regardless of PASSWORD', () => {
    process.env.AUTH_DISABLED = 'true';

    expect(checkAuthEnv()).toEqual({ success: true });
  });

  it('is ok when PASSWORD is set and AUTH_DISABLED is unset', () => {
    process.env.PASSWORD = 'flame';

    expect(checkAuthEnv()).toEqual({ success: true });
  });

  it('fails with missing-password when PASSWORD is unset and AUTH_DISABLED is unset', () => {
    expect(checkAuthEnv()).toEqual({ success: false, reason: 'missing-password' });
  });

  it('fails when AUTH_DISABLED is set to any other value', () => {
    process.env.AUTH_DISABLED = 'false';

    expect(checkAuthEnv()).toEqual({ success: false, reason: 'missing-password' });
  });
});
