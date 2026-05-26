import { NextResponse, type NextRequest } from 'next/server';

import { isAuthDisabled, SESSION_COOKIE } from '@/lib/auth';
import { verifySession } from '@/lib/jwt';

const PUBLIC_SETTINGS_PATHS = new Set(['/settings', '/settings/themes']);

export const proxy = async (request: NextRequest): Promise<NextResponse> => {
  if (isAuthDisabled()) {
    return NextResponse.next();
  }

  if (PUBLIC_SETTINGS_PATHS.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const payload = token ? await verifySession(token) : null;

  if (payload) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  url.pathname = '/login';
  url.searchParams.set('next', request.nextUrl.pathname);

  return NextResponse.redirect(url);
};

export const config = {
  matcher: ['/settings/:path*'],
};
