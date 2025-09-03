import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // صفحات auth اللي مش عايزها تبقى محمية
  const authPages = [
    '/login',
    '/signup',
    '/ForgetPassword',
    '/verifyCode',
    '/resetPassword',
  ];

  // لو مفيش token وحاول يفتح أي صفحة غير صفحات auth
  if (!token && !authPages.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // لو فيه token وهو داخل على صفحة auth
  if (token && authPages.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|public|images|uploads|assets).*)'],
};
