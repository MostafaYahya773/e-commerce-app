'use client';

import { useMemo, createContext } from 'react';
import { useSession, signOut } from 'next-auth/react';
import LoadingAnimation from '@/app/_components/LoadingAnimation/page';

export const authContext = createContext();

export default function AuthProvider({ children }) {
  const { data: session, status } = useSession();

  const logOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  const value = useMemo(
    () => ({
      token: session?.user?.token || null,
      userId: session?.user?.id || null,
      logOut,
      status,
      session,
    }),
    [session, status]
  );

  if (status === 'loading')
    return (
      <div className="w-full h-screen flex justify-center items-center text-20">
        please wait...
      </div>
    );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
