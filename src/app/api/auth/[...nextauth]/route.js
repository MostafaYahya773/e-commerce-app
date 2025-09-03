import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post(
            'https://ecommerce.routemisr.com/api/v1/auth/signin',
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          const data = res?.data;
          if (!data || !data?.token) return null;

          const verify = await axios.get(
            'https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
            {
              headers: { token: data?.token },
            }
          );

          return {
            id: verify.data.decoded.id,
            accessToken: data.token,
            name: data.user?.name,
            email: data.user?.email,
            role: data.user?.role,
          };
        } catch (err) {
          throw new Error(
            err?.response?.data?.message || 'Something went wrong'
          );
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
