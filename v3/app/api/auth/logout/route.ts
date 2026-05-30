import { NextResponse } from 'next/server';

import { isAuthDisabled, SESSION_COOKIE } from '@/lib/auth';
import { getClientIp } from '@/lib/clientIp';
import { authLog } from '@/lib/logger';

export const POST = async (request: Request): Promise<Response> => {
  if (isAuthDisabled()) {
    return new NextResponse(null, { status: 404 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.delete(SESSION_COOKIE);

  authLog.info({ ip: getClientIp(request) }, 'logout');

  return response;
};
