import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookieString = req.headers.get('cookie');
  if (cookieString && cookieString?.search('access_token') >= 0) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/((?!api|_next|assets|images|favicon.ico|login).*)'],
};
