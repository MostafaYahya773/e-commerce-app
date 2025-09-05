'use client';

import { authContext } from '@/context/useAuth';
import Link from 'next/link';
import React, { useContext, useState } from 'react';

export default function NavList() {
  const [isOpen, setIsOpen] = useState(true);
  const { logOut } = useContext(authContext);
  const links = [
    {
      href: '/',
      icon: 'fa-shop',
      label: 'SHOP',
      className: 'md:hidden flex gap-x-2 items-center relative py-5',
    },

    {
      href: '/viewProduct/newArrivals',
      icon: 'fa-tag',
      label: 'NEW ARRIVALS',
      className: 'md:hidden flex gap-x-2 items-center relative py-5',
    },
    {
      href: '/viewProduct/onSale',
      icon: 'fa-money-check-dollar',
      label: 'SALE',
      className: 'md:hidden flex gap-x-2 items-center relative py-5',
    },
    {
      href: '/Address',
      icon: 'fa-solid fa-house',
      label: 'ADDRESS',
      className: 'flex gap-x-2 items-center relative py-5',
    },
    {
      href: '/allorders',
      icon: 'fa-money-check',
      label: 'ALL ORDERS',
      className: 'flex gap-x-2 items-center relative py-5',
    },

    {
      href: '/login',
      icon: 'fa-right-from-bracket',
      label: 'LOG OUT',
      className: 'flex gap-x-2 items-center relative py-5',
      onclick: () => logOut(),
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="account flex flex-col gap-y-15 absolute p-10 w-full top-[38.5px] sm:w-300 sm:top-50 right-0 bg-white rounded-t-none rounded-b-md shadow-md">
      {links.map((link, index) => (
        <Link
          key={index}
          onClick={() => {
            setIsOpen(false);
            if (link.onclick) link.onclick();
          }}
          href={link.href}
          className={link.className}
        >
          <i className={`fa-solid ${link.icon} text-[14px] me-5`}></i>
          <p className="text-[14px] font-medium">{link.label}</p>
          <i className="fa-solid fa-chevron-right absolute right-0 text-[14px]"></i>
        </Link>
      ))}
    </div>
  );
}
