import { UserContext } from '@/context/useContext';
import useCashOrder from '@/hooks/(Order)/useCashOrder';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

export default function Pay({ Total }) {
  const CardId = Total?.cartId;
  // pathname
  const path = usePathname();
  // Use context
  const { currentValue, currentAddress } = useContext(UserContext);
  //send data to api
  const { mutate: cashPayment } = useCashOrder(CardId);
  // set data to send it to api
  const data = {
    details: currentAddress?.details,
    phone: currentAddress?.phone,
    city: currentAddress?.city,
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (
      path === '/Payment' &&
      currentValue === 'cash' &&
      currentAddress != null
    ) {
      cashPayment(
        { data },
        {
          onSuccess: () => {
            toast.success('Order Placed Successfully');
          },
        },
        {
          onerror: () => {
            toast.error('Something went wrong');
          },
        }
      );
    } else {
      toast.error('Please Select Payment Method');
    }
  };

  // read promocode
  const [ReadpromoCode, setReadPromoCode] = useState('');
  // available promocodes
  const availablePromoCodes = ['PromoCode1', 'PromoCode2', 'PromoCode3'];
  // set value of promocode
  const [PromoCode, setPromoCode] = useState('');
  // distructure data
  const totalPrice = Total?.data?.totalCartPrice;
  // order summary
  const orderSummary = [
    { name: 'SubTotal', value: totalPrice },
    { name: 'Discount', value: 0 },
    { name: 'Delivery Fee', value: 0 },
  ];
  // handle promocode
  const handlePromoCode = () => {
    if (availablePromoCodes.includes(ReadpromoCode)) {
      setPromoCode('Promo Code Applied');
    } else {
      setPromoCode('Promo Code not valid');
    }
    setReadPromoCode('');
  };
  return (
    <div className="sticky top-55 z-[99]">
      <div className="p-10 flex flex-col gap-y-10 border border-opacity-20 border-black rounded-xl">
        <h1 className="font-bold h-fit text-20 md:text-24 font-roboto">
          Order Summary
        </h1>
        <div className="orderDetails flex flex-col gap-y-10 pb-20 border-b border-opacity-20 border-black">
          {orderSummary.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <h1 className="text-16 md:text-20 font-extralight opacity-60">
                {item.name}
              </h1>
              <span className="font-bold">${item.value || 0}</span>
            </div>
          ))}
        </div>
        <div className="total flex justify-between items-center pt-10 ">
          <h2 className="text-16 md:text-20 font-extralight">Total</h2>
          <span className="font-bold">${totalPrice}</span>
        </div>

        {PromoCode && (
          <span
            className={`mt-2 text-sm ${
              PromoCode.includes('Applied')
                ? 'text-verfied-color'
                : 'text-descount-color'
            }`}
          >
            {PromoCode}
          </span>
        )}
        <div className="promocode relative">
          <input
            type="text"
            value={ReadpromoCode}
            placeholder="Promo Code"
            className="w-full py-7 px-12  outline-none border border-opacity-20 border-black rounded-md"
            onChange={(e) => setReadPromoCode(e.target.value)}
            name="promocode"
          />
          <button
            onClick={handlePromoCode}
            className="absolute right-0 bg-black text-white px-20  rounded-md p-7"
          >
            Apply
          </button>
        </div>
        <Link className="w-full wishlist" href={`/Payment`}>
          <button
            onClick={path === '/Payment' ? (e) => handlePayment(e) : undefined}
            className="flex items-center justify-between text-15 md:text-16 py-7 px-10 w-full rounded-md bg-black text-white hover:bg-[#dddcdc] hover:text-black  hover:duration-300"
          >
            <div className="flex items-center justify-center gap-x-10 ">
              <p>{path === '/Cart' ? 'Checkout' : 'Place Order'}</p>
              <span className="w-22 h-22 rounded-md mt-1  bg-white text-black flex items-center justify-center">
                {Total?.numOfCartItems}
              </span>
            </div>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </Link>
      </div>
    </div>
  );
}
