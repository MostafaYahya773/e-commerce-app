'use client';
import useGetALLAdress from '@/hooks/(address)/useGetALLAdress';
import React, { useContext, useState } from 'react';
import LoadingAnimation from '../_components/LoadingAnimation/page';
import useDeleteAddress from '@/hooks/(address)/useDeleteAddress';
import toast from 'react-hot-toast';
import LoadingFetch from '../_components/LoadingFetch/page';
import AddNewAddress from '../_components/AddNewAddress/page';
import { UserContext } from '@/context/useContext';
import Link from 'next/link';

export default function Address() {
  // use context
  const { isOpenToAdd, setIsOpenToAdd, setAddressId } = useContext(UserContext);
  // save id in state
  const [idAddress, setIdAddress] = useState(null);
  //get all address
  const { data, isLoading, isFetching } = useGetALLAdress();
  // destruct data
  const AllAdress = data?.data;
  // delete address
  const { mutate: deleteAddress } = useDeleteAddress();
  //function to delete address
  const handleDelete = (id) => {
    setIdAddress(id);
    deleteAddress(id, {
      onSuccess: (e) => {
        toast.success(e.data.message);
        setIdAddress(null);
      },
      onError: (e) => {
        toast.error(e.response.data.message);
      },
    });
  };
  // handle share address
  const handleShareAddress = (id) => {
    setAddressId(id);
  };
  // check if data is loading
  if (isLoading) return <LoadingAnimation />;
  if (isFetching) return <LoadingFetch />;

  return (
    <div className="flex flex-col gap-y-10 mt-50 md:mt-80 mb-150 lg:mb-80 px-10 font-roboto">
      <div className="title border-b pb-10 border-opacity-20 border-black">
        <h1 className="font-bold text-18 md:text-20">Your Address</h1>
        <p className="text-14 md:text-16 opacity-60">
          Manage your saved addresses for fast and easy checkout across our
          marketplaces
        </p>
      </div>
      {AllAdress?.map((address) => (
        <div
          key={address?._id}
          className="flex flex-col gap-y-7 p-10 bg-bg-secondry rounded-md"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-16 md:text-18">Details</h2>
            <div className="flex gap-10 items-center text-12 sm:text-14  ">
              <Link
                onClick={() => handleShareAddress(address?._id)}
                href="/Payment"
              >
                <button className="cursor-pointer  bg-star-color px-10 py-2 rounded-md sm:rounded-xl">
                  Use this address
                </button>
              </Link>
              <button
                onClick={() => handleDelete(address?._id)}
                className={
                  ' sm:bg-black sm:text-white sm:w-100 w-auto sm:py-2 rounded-md sm:rounded-xl'
                }
              >
                {idAddress === address?._id ? (
                  <span className="loaderWishlist"></span>
                ) : (
                  <span className="hidden sm:block">Delete</span>
                )}
                <i className="fa-solid fa-trash mx-auto block sm:hidden opacity-60 cursor-pointer"></i>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr]  gap-x-7">
            <div className="titels flex flex-col gap-y-7 text-14 md:text-16 opacity-60 font-bold">
              <h2>Name</h2>
              <h2>Details</h2>
              <h2>Phone</h2>
              <h2>City</h2>
            </div>
            <div className="flex flex-col gap-y-7 text-14 md:text-16">
              <h2>{address?.name}</h2>
              <h2>{address?.details}</h2>
              <h2>{address?.phone}</h2>
              <h2>{address?.city}</h2>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() => setIsOpenToAdd(true)}
        className="addAddress font-bold bg-bg-products rounded-md flex flex-col gap-y-10 justify-center items-center min-h-100"
      >
        <i className="fa-solid fa-plus text-18 md:text-24 opacity-70"></i>
        <p className="text-14 md:text-16 opacity-70">Add New Address</p>
      </button>
      <div className={`${isOpenToAdd ? 'block' : 'hidden'}`}>
        <AddNewAddress />
      </div>
    </div>
  );
}
