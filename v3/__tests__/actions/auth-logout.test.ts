import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { POST as logoutPOST } from '@/app/api/auth/logout/route';

const ENV_KEYS = ['PASSWORD', 'AUTH_DISABLED'] as const;

let savedEnv: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>>;

const setEnv = (key: string, value: string | undefined): void => {
  const env = process.env as Record<string, string | undefined>;

  if (value === undefined) {
    delete env[key];
  } else {
    env[key] = value;
  }
};

const buildRequest = (): Request =>
  new Request('http://test.local/api/auth/logout', {
    method: 'POST',
    headers: { 'x-forwarded-for': '1.2.3.4' },
  });

beforeEach(() => {
  savedEnv = {};

  for (const key of ENV_KEYS) {
    savedEnv[key] = process.env[key];
  }

  setEnv('PASSWORD', 'flame');
  setEnv('AUTH_DISABLED', undefined);
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    setEnv(key, savedEnv[key]);
  }
});

describe('POST /api/auth/logout', () => {
  it('returns 404 when AUTH_DISABLED=true', async () => {
    setEnv('AUTH_DISABLED', 'true');

    const response = await logoutPOST(buildRequest());

    expect(response.status).toBe(404);
  });

  it('returns 200 and emits a Set-Cookie clearing flame_session', async () => {
    const response = await logoutPOST(buildRequest());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });

    const setCookie = response.headers.get('set-cookie') ?? '';

    expect(setCookie).toMatch(/^flame_session=/);
    expect(setCookie).toMatch(/Max-Age=0|Expires=.*1970/i);
  });
});
