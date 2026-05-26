import { NextResponse } from 'next/server';

import { ADMIN_USER, isAuthDisabled, SESSION_COOKIE } from '@/lib/auth';
import { getClientIp } from '@/lib/clientIp';
import { signSession } from '@/lib/jwt';
import { authLog } from '@/lib/logger';
import { comparePassword } from '@/lib/password';
import { loginLimiter } from '@/lib/rateLimit';

const SESSION_DAYS_DEFAULT = 30;

const getCookieMaxAgeSeconds = (): number => {
  const sessionDays = process.env.SESSION_DAYS;
  const parsedSessionDays = sessionDays ? Number(sessionDays) : SESSION_DAYS_DEFAULT;
  const days =
    Number.isFinite(parsedSessionDays) && parsedSessionDays > 0
      ? parsedSessionDays
      : SESSION_DAYS_DEFAULT;

  return days * 24 * 60 * 60;
};

export const POST = async (request: Request): Promise<Response> => {
  if (isAuthDisabled()) {
    return new NextResponse(null, { status: 404 });
  }

  const ip = getClientIp(request);

  if (!loginLimiter.allowRequest(ip)) {
    return NextResponse.json({ ok: false, error: 'rate-limited' }, { status: 429 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 });
  }

  const password =
    typeof body === 'object' && body !== null && 'password' in body
      ? (body as { password: unknown }).password
      : undefined;

  if (typeof password !== 'string' || password.length === 0) {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 });
  }

  const expectedPassword = process.env.PASSWORD ?? '';

  if (!comparePassword(password, expectedPassword)) {
    authLog.warn({ ip }, 'login failed');

    return NextResponse.json({ ok: false, error: 'invalid-credentials' }, { status: 401 });
  }

  const token = await signSession(ADMIN_USER.id);
  const response = NextResponse.json({ ok: true });

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: getCookieMaxAgeSeconds(),
  });

  authLog.info({ ip }, 'login succeeded');

  return response;
};
