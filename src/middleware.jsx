import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },

  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    '/((?!auth|signup|ForgetPassword|verifyCode|resetPassword|_next|api|favicon.ico|public|images|uploads|assets).*)',
  ],
};
