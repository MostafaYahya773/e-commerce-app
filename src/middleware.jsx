import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const authPages = [
  '/login',
  '/signup',
  '/ForgetPassword',
  '/verifyCode',
  '/resetPassword',
];

export default withAuth(
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (authPages.includes(pathname)) {
          if (token) {
            return NextResponse.redirect(new URL('/', req.url));
          }
          return true;
        }

        return !!token;
      },
    },
  },
  {
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|public|images|uploads|assets).*)'],
};
