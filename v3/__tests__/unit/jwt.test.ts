import { SignJWT } from 'jose';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { signSession, verifySession } from '@/lib/jwt';

const TEST_SECRET = 'test-secret-very-long-string-for-hs256';

let savedSecret: string | undefined;

beforeAll(() => {
  savedSecret = process.env.SECRET;
  process.env.SECRET = TEST_SECRET;
});

afterAll(() => {
  if (savedSecret === undefined) {
    delete process.env.SECRET;
  } else {
    process.env.SECRET = savedSecret;
  }
});

const signToken = (secret: string, claims: { sub: string; iat?: number; exp?: number }) =>
  new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(claims.sub)
    .setIssuedAt(claims.iat ?? Math.floor(Date.now() / 1000))
    .setExpirationTime(claims.exp ?? Math.floor(Date.now() / 1000) + 60)
    .sign(new TextEncoder().encode(secret));

describe('signSession + verifySession', () => {
  it('signs session for userId', async () => {
    const token = await signSession(42);
    const payload = await verifySession(token);

    expect(payload?.sub).toBe('42');
    expect(payload?.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it('rejects an expired token', async () => {
    const now = Math.floor(Date.now() / 1000);
    const expiredToken = await signToken(TEST_SECRET, {
      sub: '1',
      iat: now - 3600,
      exp: now - 60,
    });

    const payload = await verifySession(expiredToken);

    expect(payload).toBe(null);
  });

  it('rejects a malformed token', async () => {
    expect(await verifySession('not-a-token')).toBe(null);
    expect(await verifySession('')).toBe(null);
    expect(await verifySession('a.b.c')).toBe(null);
  });

  it('rejects a token signed with a different secret', async () => {
    const token = await signToken('completely-different-secret', { sub: '1' });

    expect(await verifySession(token)).toBe(null);
  });

  it('uses HS256 algorithm', async () => {
    const token = await signSession(1);
    const headerB64 = token.split('.')[0];
    const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString('utf8'));

    expect(header.alg).toBe('HS256');
  });
});
