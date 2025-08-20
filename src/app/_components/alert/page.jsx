import Link from 'next/link';
import React from 'react';

export default function Alert() {
  return (
    <div className="bg-black z-50 py-7 text-14 font-roboto fixed left-0 top-0 right-0 max-w-[1700px] mx-auto">
      <div className="grid grid-cols-[1fr_auto]  text-white max-w-[1300px] mx-auto">
        <h1 className="font-extralight text-center">
          Sign up and get 20% off to your first order.{' '}
          <Link href={'/signup'} className="font-light underline">
            Sign Up Now
          </Link>
        </h1>
        <i className="fa-solid fa-xmark text-white cursor-pointer mt-4 ms-auto"></i>
      </div>
    </div>
  );
}
