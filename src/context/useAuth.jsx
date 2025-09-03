'use client';

import { useMemo, createContext } from 'react';
import { useSession, signOut } from 'next-auth/react';
export const authContext = createContext();

export default function AuthProvider({ children }) {
  const { data: session, status } = useSession();

  const logOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  const value = useMemo(
    () => ({
      token: session?.user?.accessToken || null,
      userId: session?.user?.id || null,
      logOut,
      status,
      session,
    }),
    [session, status]
  );

  if (status === 'loading') return null;

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
