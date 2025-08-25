'use client';

import Pay from '../_components/Pay/page';
import Cart from '../Cart/page';
import useRequest from '@/hooks/useRequest';
import LoadingAnimation from '@/app/_components/LoadingAnimation/page';
import PaymentMethoud from '../_components/PaymentMethoud/page';
import AddressInPayment from '../_components/AddressInPayment/page';
import Image from 'next/image';

export default function Payment() {
  // get all data from cart
  const { data: CartDetails, isLoading } = useRequest('cart');
  // console.log();
  if (CartDetails?.numOfCartItems === 0) {
    return (
      <div className="w-full h-screen font-roboto flex flex-col gap-20 justify-center items-center px-10 text-center">
        <div className="relative w-200 h-200 md:w-300 md:h-300">
          <Image
            src="/noPayment.png"
            fill
            alt="img"
            priority
            className="opacity-30"
          />
        </div>
        <h2 className="text-14 sm:text-18 font-bold">No saved cards</h2>
        <p className="text-12 md:text-14">
          Cards saved during the checkout process will display here. We use
          encrypted methods to store your details securely
        </p>
      </div>
    );
  }
  if (isLoading) return <LoadingAnimation />;
  return (
    <div className="mt-50 md:mt-80 mb-150 lg:mb-80 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-20 ">
      <div className="paymentDetails flex flex-col gap-y-10">
        <div className="address">
          <AddressInPayment />
        </div>
        <div className="orderDetails">
          <Cart />
        </div>
        <div className="paymentMethods">
          <PaymentMethoud />
        </div>
      </div>
      <div className="pay md:mt-35">
        <Pay Total={CartDetails} />
      </div>
    </div>
  );
}
