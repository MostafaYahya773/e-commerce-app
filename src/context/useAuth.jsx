'use client';
import { useEffect, useMemo, useState } from 'react';
import { signOut } from 'next-auth/react';
import LoadingAnimation from '@/app/_components/LoadingAnimation/page';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { createContext } from 'react';

export const authContext = createContext();
export default function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  //  use router to duriction
  const router = useRouter();
  // usepath
  const pathname = usePathname();
  // set token
  const [token, setToken] = useState(null);
  //set id
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      setToken(session?.token);
      setUserId(session?.user?.id);
      if (pathname === '/login') router.replace('/');
    } else if (status === 'unauthenticated') {
      setToken(null);
      setUserId(null);
      if (pathname !== '/login') router.replace('/login');
    }
  }, [status, session, router, pathname]);
  const logOut = async () => {
    await signOut({
      redirect: false,
    });
    router.replace('/login');
  };

  const value = useMemo(
    () => ({ token, userId, logOut, status }),
    [token, userId, status]
  );

  if (status === 'loading') return <LoadingAnimation />;

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
