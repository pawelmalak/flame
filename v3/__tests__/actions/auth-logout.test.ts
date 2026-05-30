import { beforeEach, describe, expect, it } from 'vitest';

import { POST as logoutPOST } from '@/app/api/auth/logout/route';
import { setupEnvSandbox } from '../helpers/envSandbox';

const { setEnv } = setupEnvSandbox(['PASSWORD', 'AUTH_DISABLED'] as const);

const buildRequest = (): Request =>
  new Request('http://test.local/api/auth/logout', {
    method: 'POST',
    headers: { 'x-forwarded-for': '1.2.3.4' },
  });

beforeEach(() => {
  setEnv('PASSWORD', 'flame');
  setEnv('AUTH_DISABLED', undefined);
});

describe('POST /api/auth/logout', () => {
  it('returns 404 when AUTH_DISABLED=true', async () => {
    setEnv('AUTH_DISABLED', 'true');

    const response = await logoutPOST(buildRequest());

    expect(response.status).toBe(404);
  });

  it('returns 200 and sets a cookie that clears the session', async () => {
    const response = await logoutPOST(buildRequest());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });

    const setCookie = response.headers.get('set-cookie') ?? '';

    expect(setCookie).toMatch(/^flame_session=/);
    expect(setCookie).toMatch(/Max-Age=0|Expires=.*1970/i);
  });
});
