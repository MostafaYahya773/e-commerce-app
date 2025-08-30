'use client';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import LoadingAnimation from '@/app/_components/LoadingAnimation/page';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createContext } from 'react';

export const authContext = createContext();
export default function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  //  use router to duriction
  const router = useRouter();
  // set token
  const [token, setToken] = useState(null);
  //set id
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      setToken(session?.token);
      setUserId(session?.user?.id);
    } else if (status === 'unauthenticated') {
      setToken(null);
      setUserId(null);
      router.push('/login');
    }
  }, [status, session, router]);
  const logOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push('/login');
  };
  if (status === 'loading') return <LoadingAnimation />;
  return (
    <authContext.Provider value={{ token, userId, logOut, status }}>
      {children}
    </authContext.Provider>
  );
}
