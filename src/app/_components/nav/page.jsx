'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import useWishlistData from '@/hooks/(wishList)/useWishlistData';
import Image from 'next/image';
import NavList from '../NavList/page';
import useRequest from '@/hooks/useRequest';
import { authContext } from '@/context/useAuth';

export default function Navbar() {
  const { status } = useContext(authContext);

  // open and close setting
  const [isOpen, setIsOpem] = useState(false);
  // select path
  const path = usePathname();
  // cart and wishlist
  const cartProfile = [
    {
      name: '/wishlist.png',
      id: 3,
      path: '/WishList',
    },
    {
      name: '/cart.png',
      id: 1,
      path: '/Cart',
    },
  ];
  //cart links
  const links = [
    {
      name: 'SHOP',
      path: '/',
    },
    {
      name: 'NEW ARRIVALS',
      path: '/viewProduct/newArrivals',
    },
    {
      name: 'SALE',
      path: '/viewProduct/onSale',
    },
  ];
  //cart count
  const [CountOfCart, setCountOfCart] = useState(0);
  //Wishlist count
  const [CountOfWishlist, setCountOfWishlist] = useState(0);
  const { data: CartNumber } = useRequest('cart');
  const { data: wishlistCount } = useWishlistData();

  useEffect(() => {
    setCountOfCart(CartNumber?.numOfCartItems);
    setCountOfWishlist(wishlistCount?.count);
  });

  return (
    <div className=" fixed top-0 left-0 right-0 z-[101] w-full  bg-white  max-w-[2000px] shadow-md px-10 py-2 font-roboto mx-auto">
      <div className="flex relative justify-between items-center  md:grid md:gap-x-20  md:grid-cols-[auto_auto_1fr_auto] mx-auto max-w-[1300px]  ">
        <Link
          className="logo text-24 md:text-32 font-bold"
          aria-label="website logo"
          href="/"
        >
          Shop.co
        </Link>

        <div
          className={`${
            status === 'authenticated' ? 'hidden md:flex' : 'hidden md:hidden'
          }  links text-16`}
        >
          <ul className="flex items-center md:gap-x-10  font-medium ">
            {links.map((link, index) => (
              <li key={index} className="relative">
                <Link
                  aria-label="linsk name "
                  href={link.path}
                  className={`${
                    path === link.path ? 'active opacity-100' : 'opacity-70'
                  } text-14 `}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${
            status === 'authenticated' ? 'hidden md:block' : 'hidden md:hidden'
          } search w-full relative `}
        >
          <input
            aria-label="search for broducts"
            className="w-full bg-bg-secondry py-10 rounded-3xl text-16 px-35 border-none outline-none"
            type="search"
            placeholder="Search for products.."
            name="search"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-10 top-15"></i>
        </div>
        <div
          className={`${
            status === 'authenticated' ? '' : 'hidden md:hidden'
          } cart_profile mt-5 md:mt-0 text-[#585858] `}
        >
          <ul className="flex gap-15 items-center md:text-20">
            {cartProfile.map((cart, index) => (
              <li key={index} className="relative">
                <Link href={cart.path}>
                  <Image
                    src={cart.name}
                    width={21}
                    height={21}
                    alt={cart.name}
                  />
                </Link>
                <span
                  className={`${
                    cart.name === '/user.png' ? 'hidden' : 'flex'
                  } border border-white absolute -top-5 -left-4 w-[16px] h-[16px] text-12 bg-black text-white rounded-full flex justify-center items-center`}
                >
                  {cart.name === '/cart.png'
                    ? CountOfCart || 0
                    : CountOfWishlist || 0}
                </span>
              </li>
            ))}
            <li onClick={() => setIsOpem(!isOpen)} className="cursor-pointer">
              <Image src={'/user.png'} width={21} height={21} alt="user" />
              <div className={`${isOpen ? 'block' : 'hidden'}`}>
                {isOpen && <NavList />}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
