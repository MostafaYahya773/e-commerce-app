import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    console.log('PATHNAME:', pathname);
    console.log('TOKEN:', token);

    if (!token && !pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (token && pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: [
    '/((?!auth|signup|ForgetPassword|verifyCode|resetPassword|_next|api|favicon.ico|public|images|uploads|assets).*)',
  ],
};
