import { NextResponse } from 'next/server';

import { getMe } from './app/api';

export async function middleware(req: Request) {
  const { pathname } = new URL(req.url);
  const cookies = req.headers.get('cookie');
  const access_token = cookies
    ?.split('; ')
    .find(c => c.startsWith('access_token='))
    ?.split('=')[1];

  // Check if the user is trying to access login or register pages
  const isAuthRoute =
    pathname.includes('/login') || pathname.includes('/register');

  if (!access_token) {
    // Redirect unauthenticated users trying to access protected routes
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next(); // Allow access to login/register if not authenticated
  }

  const user = await getMe(access_token);

  if (!user) {
    // If no user is found, delete cookies and redirect to login
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.set('access_token', '', { maxAge: -1, path: '/' });
    response.cookies.set('user', '', { maxAge: -1, path: '/' });
    return response;
  }

  // Redirect authenticated users away from login/register pages
  if (isAuthRoute) {
    return NextResponse.redirect(new URL('/', req.url)); // Change '/' to your preferred redirect route
  }

  const res = NextResponse.next();
  res.cookies.set(
    'user',
    JSON.stringify({ name: user.name, email: user.email }),
    {
      httpOnly: false,
      secure: true,
    }
  );

  return res;
}

export const config = {
  matcher: [
    '/dictionary/:path*',
    '/recommend/:path*',
    '/training/:path*',
    '/login',
    '/register',
  ],
};
