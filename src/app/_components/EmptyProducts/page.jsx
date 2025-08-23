import Image from 'next/image';
import React from 'react';

export default function EmptyProducts({ src, message }) {
  return (
    <div className=" flex flex-col gap-30 items-center justify-center h-screen mb-100  text-20 md:text-40 font-roboto opacity-50">
      <Image src={src} width={200} height={200} alt="empty" priority />
      <p className="font-bold text-16 md:text-18">{message}</p>
    </div>
  );
}
