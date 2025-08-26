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
        return await axios
          .post('https://ecommerce.routemisr.com/api/v1/auth/signin', {
            email: credentials.email,
            password: credentials.password,
          })
          .then((res) => {
            const data = res?.data;
            if (data && data?.token) {
              return {
                token: data?.token,
                name: data?.user?.name,
                email: data?.user?.email,
                role: data?.user?.role,
              };
            }
            return null;
          })
          .catch((err) => {
            throw new Error(err?.response?.data?.message || 'Login failed');
          });
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      const res = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
        {
          headers: {
            token: token.token,
          },
        }
      );

      session.user = {
        id: res.data.decoded.id,
        name: token.name,
        email: token.email,
        role: token.role,
      };
      session.token = token.token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
