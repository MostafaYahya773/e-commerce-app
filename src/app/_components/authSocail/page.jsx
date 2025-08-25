'use client';
import Image from 'next/image';
import React from 'react';
const SocialMediaAccount = [
  {
    name: 'Google',
    icon: '/google.png',
  },
  {
    name: 'apple',
    icon: '/apple.png',
  },
];

export default function AuthSocail() {
  return (
    <button className="flex flex-col gap-y-10 font-roboto w-full">
      {SocialMediaAccount.map((item, index) => (
        <div
          key={index}
          className="flex gap-7 items-center bg-white p-7 justify-center w-full"
        >
          <Image src={item.icon} alt={item.name} width={15} height={15} />
          <h2 className="font-medium text-14 opacity-70">{item.name}</h2>
        </div>
      ))}
    </button>
  );
}
