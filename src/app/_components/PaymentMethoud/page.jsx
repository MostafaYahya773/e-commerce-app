'use client';
import { UserContext } from '@/context/useContext';
import Image from 'next/image';
import React, { useContext, useState } from 'react';

export default function PaymentMethoud() {
  // payment types
  const [payment, setPayment] = useState([
    {
      id: 1,
      name: 'Cash On Delivery',
      value: 'cash',
      url: 'fa-solid fa-hand-holding-dollar',
      text: 'Pay easily upon receiving your order',
    },
    {
      id: 2,
      name: 'Debit/Credit Card',
      value: 'card',
      url: 'fa-solid fa-credit-card',
      text: 'Secure and easy card payment upon delivery',
    },
  ]);
  // get payment types
  const { setCurrentValue } = useContext(UserContext);
  // function to handle payment types
  const handlePayment = (e) => {
    setCurrentValue(e.target.value);
  };
  return (
    <div className="flex flex-col gap-y-10 px-10">
      <div className="title">
        <h1 className="font-bold text-16 md:text-20 font-roboto">Payment</h1>
      </div>
      <div className="flex flex-col border border-opacity-20 border-black mb-10  rounded-xl">
        {payment.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center px-10 w-full"
          >
            <div className="flex w-full items-center gap-10  border-b last:border-none border-opacity-10 border-black ">
              <input
                type="radio"
                name="payment"
                id={item.id}
                value={item.value}
                onChange={handlePayment}
              />
              <label
                className="cursor-pointer w-full py-20 flex flex-col"
                htmlFor={item.id}
              >
                <span className="font-extralight text-16">{item.name}</span>
                <span className="text-14 opacity-70">{item.text}</span>
              </label>
            </div>
            <div className="icon text-20 md:text-24 lg:text-32 opacity-60">
              <i className={item.url}></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
