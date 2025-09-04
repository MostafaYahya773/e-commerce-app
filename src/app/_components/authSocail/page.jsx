'use client';
import Image from 'next/image';
import React from 'react';
const SocialMediaAccount = [
  {
    name: 'google',
    icon: '/images/google.png',
  },
  {
    name: 'apple',
    icon: '/images/apple.png',
  },
];

export default function AuthSocail() {
  return (
    <div className="flex flex-col gap-y-10 font-roboto w-full">
      {SocialMediaAccount.map((item, index) => (
        <button
          key={index}
          className="flex gap-7 items-center bg-white p-7 justify-center w-full"
        >
          <Image src={item.icon} alt={item.name} width={15} height={15} />
          <span className="font-medium text-14 opacity-70">{item.name}</span>
        </button>
      ))}
    </div>
  );
}
