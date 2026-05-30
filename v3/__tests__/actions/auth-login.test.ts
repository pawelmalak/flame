import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { POST as loginPOST } from '@/app/api/auth/login/route';
import { DEFAULT_MAX_ATTEMPTS, loginLimiter } from '@/lib/rateLimit';

const TEST_PASSWORD = 'flame';
const TEST_SECRET = 'test-secret-very-long-string';

const buildRequest = (body: unknown, headers: HeadersInit = {}): Request =>
  new Request('http://test.local/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '1.2.3.4', ...headers },
    body: JSON.stringify(body),
  });

const ENV_KEYS = ['PASSWORD', 'SECRET', 'AUTH_DISABLED', 'RATE_LIMIT_DISABLED'] as const;

let savedEnv: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>>;

const setEnv = (key: string, value: string | undefined): void => {
  const env = process.env as Record<string, string | undefined>;

  if (value === undefined) {
    delete env[key];
  } else {
    env[key] = value;
  }
};

beforeEach(() => {
  savedEnv = {};

  for (const key of ENV_KEYS) {
    savedEnv[key] = process.env[key];
  }

  setEnv('PASSWORD', TEST_PASSWORD);
  setEnv('SECRET', TEST_SECRET);
  setEnv('AUTH_DISABLED', undefined);
  setEnv('RATE_LIMIT_DISABLED', 'true');

  loginLimiter.clearAttemptsByKey('1.2.3.4');
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    setEnv(key, savedEnv[key]);
  }

  loginLimiter.clearAttemptsByKey('1.2.3.4');
});

describe('POST /api/auth/login', () => {
  it('returns 404 when AUTH_DISABLED=true', async () => {
    setEnv('AUTH_DISABLED', 'true');

    const response = await loginPOST(buildRequest({ password: TEST_PASSWORD }));

    expect(response.status).toBe(404);
  });

  it('returns 200 and sets flame_session cookie on valid credentials', async () => {
    const response = await loginPOST(buildRequest({ password: TEST_PASSWORD }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });

    const setCookie = response.headers.get('set-cookie') ?? '';

    expect(setCookie).toMatch(/^flame_session=[^;]+/);
    expect(setCookie).toMatch(/HttpOnly/i);
    expect(setCookie).toMatch(/SameSite=lax/i);
    expect(setCookie).toMatch(/Path=\//i);
  });

  it('omits the Secure cookie flag outside production', async () => {
    setEnv('NODE_ENV', 'development');

    const response = await loginPOST(buildRequest({ password: TEST_PASSWORD }));
    const setCookie = response.headers.get('set-cookie') ?? '';

    expect(setCookie).not.toMatch(/Secure/i);
  });

  it('rejects invalid credentials with 401', async () => {
    const response = await loginPOST(buildRequest({ password: 'wrong-password' }));

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ success: false, error: 'invalid-credentials' });
    expect(response.headers.get('set-cookie')).toBe(null);
  });

  it('rejects a missing password field with 400', async () => {
    const response = await loginPOST(buildRequest({}));

    expect(response.status).toBe(400);
  });

  it('rejects an empty password with 400', async () => {
    const response = await loginPOST(buildRequest({ password: '' }));

    expect(response.status).toBe(400);
  });

  it('rejects malformed JSON with 400', async () => {
    const request = new Request('http://test.local/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{not-valid-json',
    });

    const response = await loginPOST(request);

    expect(response.status).toBe(400);
  });

  it('returns 429 after the rate limit is exceeded', async () => {
    setEnv('RATE_LIMIT_DISABLED', undefined);

    for (let i = 0; i < DEFAULT_MAX_ATTEMPTS; i++) {
      await loginPOST(buildRequest({ password: 'wrong-password' }));
    }

    const response = await loginPOST(buildRequest({ password: TEST_PASSWORD }));

    expect(response.status).toBe(429);
    expect(await response.json()).toEqual({ success: false, error: 'rate-limited' });
  });
});
