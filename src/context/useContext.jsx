'use client';

import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
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
  //brands name
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
