'use client';
import { UserContext } from '@/context/useContext';
import useGetALLAdress from '@/hooks/(address)/useGetALLAdress';
import Link from 'next/link';
import React, { useContext, useEffect, useMemo } from 'react';
import LoadingAnimation from '../LoadingAnimation/page';

export default function AddressInPayment() {
  const { AddressId, setCurrentAddress } = useContext(UserContext);
  const { data, isLoading } = useGetALLAdress();
  const AllAdress = data?.data || [];

  const address = useMemo(() => {
    return AllAdress.find((item) => item?._id === AddressId);
  }, [AllAdress, AddressId]);

  useEffect(() => {
    setCurrentAddress(address || AllAdress[0]);
  });

  if (isLoading) return <LoadingAnimation />;
  return (
    <div className="flex flex-col gap-y-10 font-roboto px-10">
      <div className="title">
        <h1 className="font-bold text-16 md:text-20">Shipping Address</h1>
      </div>
      <div className="details flex flex-col gap-y-10 p-10 border border-opacity-20 border-black rounded-xl">
        <div className="flex items-center gap-5 justify-between border-b border-opacity-10 border-black pb-7">
          <h1 className="font-bold text-14 md:text-16 ">
            Address <span className="opacity-60">(Home)</span>
          </h1>
          <div className="flex items-center gap-7">
            <Link href="/Address">
              <span className="text-12 md:text-14 font-bold mt-1">
                Change Address
              </span>
            </Link>
            <i className="fa-solid fa-chevron-right text-12 mt-4"></i>
          </div>
        </div>
        {AllAdress.length === 0 ? (
          <div className="flex items-center justify-center bg-bg-products p-7 rounded-md">
            <Link href="/Address">Add New Address</Link>
          </div>
        ) : (
          <div className="details flex flex-col gap-y-5 bg-bg-products p-7 rounded-md">
            <h2>{address?.name || AllAdress[0]?.name}</h2>
            <h2>{address?.details || AllAdress[0]?.details}</h2>
            <h2>{address?.phone || AllAdress[0]?.phone}</h2>
            <h2>{address?.city || AllAdress[0]?.city}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
