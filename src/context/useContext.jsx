'use client';

import { set } from 'date-fns';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //  use router to duriction
  const router = useRouter();
  //get session
  const { data: session, status } = useSession();
  // set token
  const [token, setToken] = useState(null);
  //set id
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (status === 'authenticated' && session) {
      setToken(session?.token);
      setUserId(session?.user?.id);
    } else {
      router.push('/login');
      setToken(null);
      setUserId(null);
    }
  }, [status, session]);
  const logOut = () => {
    signOut({
      redirect: true,
      callbackUrl: '/login',
    });
    console.log(token);
  };

  //share result of filter
  const [shareResult, setShareResult] = useState(null);
  //   all comments
  const comments = [
    {
      rating: 5,
      id: 1,
      name: 'Mostafa Y',
      mark: 'fa-solid fa-circle-check',
      comment:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
      rating: 5,
      id: 2,
      name: 'Omer M',
      mark: 'fa-solid fa-circle-check',
      comment:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
      rating: 4,
      id: 3,
      name: 'Eslam Z',
      mark: 'fa-solid fa-circle-check',
      comment:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
      rating: 4,
      id: 4,
      name: 'Rana M',
      mark: 'fa-solid fa-circle-check',
      comment:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
      rating: 4,
      id: 5,
      name: 'Fatma Y',
      mark: 'fa-solid fa-circle-check',
      comment:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
      rating: 5,
      id: 6,
      name: 'Mohamed S',
      mark: 'fa-solid fa-circle-check',
      comment:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
  ];
  // get payment types
  const [currentValue, setCurrentValue] = useState(null);
  // add adress state
  const [isOpenToAdd, setIsOpenToAdd] = useState(false);
  // share address id to payment
  const [AddressId, setAddressId] = useState(null);
  // get current address
  const [currentAddress, setCurrentAddress] = useState(null);

  return (
    <UserContext.Provider
      value={{
        shareResult,
        setShareResult,
        comments,
        currentValue,
        setCurrentValue,
        isOpenToAdd,
        setIsOpenToAdd,
        AddressId,
        setAddressId,
        currentAddress,
        setCurrentAddress,
        token,
        userId,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
