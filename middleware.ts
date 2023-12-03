import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const role = token?.role;
  const isAutenticated = !!token;
  const isProfilePage = req.nextUrl.pathname.startsWith('/User');
  const isAdminPage = req.nextUrl.pathname.startsWith('/Admin');

  if (isProfilePage && !isAutenticated) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  if ((isAdminPage && !isAutenticated) || (isAdminPage && role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}
