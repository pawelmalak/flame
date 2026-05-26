import { jwtVerify, SignJWT } from 'jose';

import { getJwtSecret } from './secret';

const ALGORITHM = 'HS256';
const DEFAULT_SESSION_DAYS = 30;

const getSessionDays = (): number => {
  const sessionDays = process.env.SESSION_DAYS;

  if (!sessionDays) {
    return DEFAULT_SESSION_DAYS;
  }

  const parsedDays = Number(sessionDays);

  return Number.isFinite(parsedDays) && parsedDays > 0 ? parsedDays : DEFAULT_SESSION_DAYS;
};

const secretKey = (): Uint8Array => new TextEncoder().encode(getJwtSecret());

export type SessionPayload = {
  sub: string;
  iat: number;
  exp: number;
};

export const signSession = async (userId: number): Promise<string> => {
  const ttlSeconds = getSessionDays() * 24 * 60 * 60;
  const issuedAt = Math.floor(Date.now() / 1000);

  return new SignJWT({})
    .setProtectedHeader({ alg: ALGORITHM })
    .setSubject(String(userId))
    .setIssuedAt(issuedAt)
    .setExpirationTime(issuedAt + ttlSeconds)
    .sign(secretKey());
};

export const verifySession = async (token: string): Promise<SessionPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: [ALGORITHM] });

    if (typeof payload.sub !== 'string' || typeof payload.exp !== 'number') {
      return null;
    }

    return {
      sub: payload.sub,
      iat: typeof payload.iat === 'number' ? payload.iat : 0,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
};
