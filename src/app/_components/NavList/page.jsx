'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function NavList() {
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    {
      href: '/',
      icon: 'fa-shop',
      label: 'Shop',
      className: 'md:hidden flex gap-x-2 items-center relative py-5',
    },
    {
      href: '/OnSale',
      icon: 'fa-tag',
      label: 'OnSale',
      className: 'md:hidden flex gap-x-2 items-center relative py-5',
    },

    {
      href: '/viewProduct/new arrivals',
      icon: 'fa-tag',
      label: 'New Arrivals',
      className: 'md:hidden flex gap-x-2 items-center relative py-5',
    },
    {
      href: '/Brands',
      icon: 'fa-solid fa-copyright',
      label: 'Brands',
      className: 'md:hidden flex gap-x-2 items-center relative py-5',
    },
    {
      href: '/Address',
      icon: 'fa-solid fa-house',
      label: 'Address',
      className: 'flex gap-x-2 items-center relative py-5',
    },
    {
      href: '/allOrders',
      icon: 'fa-money-check',
      label: 'All orders',
      className: 'flex gap-x-2 items-center relative py-5',
    },
    {
      href: '/',
      icon: 'fa-user-large',
      label: 'My account',
      className: 'flex gap-x-2 items-center relative py-5',
    },
    {
      href: '/logout',
      icon: 'fa-right-from-bracket',
      label: 'Log out',
      className: 'flex gap-x-2 items-center relative py-5',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="account flex flex-col gap-y-15 absolute p-10 w-full top-[38.5px] sm:w-300 sm:top-50 right-0 bg-white rounded-t-none rounded-b-md shadow-md">
      {links.map((link, index) => (
        <Link
          key={index}
          onClick={() => setIsOpen(false)}
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
