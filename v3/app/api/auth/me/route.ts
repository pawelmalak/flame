import { NextResponse } from 'next/server';

import { isAuthDisabled, isAuthenticated } from '@/lib/auth';

export const GET = async (): Promise<Response> => {
  if (isAuthDisabled()) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json({ authenticated: await isAuthenticated() });
};
