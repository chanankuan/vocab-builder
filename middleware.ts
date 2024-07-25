import { NextResponse } from 'next/server';

import { getMe } from './app/api';

export async function middleware(req: Request) {
  const cookies = req.headers.get('cookie');
  const access_token = cookies
    ?.split('; ')
    .find(c => c.startsWith('access_token='))
    ?.split('=')[1];
  const userCookie = cookies
    ?.split('; ')
    .find(c => c.startsWith('user='))
    ?.split('=')[1];

  if (!access_token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const user = await getMe(access_token);

  const res = NextResponse.next();

  if (!user) {
    // If no user is found, delete cookies and redirect to login
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.set('access_token', '', { maxAge: -1, path: '/' });
    response.cookies.set('user', '', { maxAge: -1, path: '/' });
    return response;
  }

  res.cookies.set(
    'user',
    JSON.stringify({ name: user.name, email: user.email }),
    {
      httpOnly: false, // not secure
      secure: true,
    }
  );

  return res;
}

export const config = {
  matcher: ['/dictionary/:path*', '/recommend/:path*', '/training/:path*'],
};
