import React from 'react';
import SocialMedia from '../SocailMedia/page';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  // company links
  const compantLinks = [
    {
      id: 1,
      name: 'About',
      href: '/',
    },
    {
      id: 2,
      name: 'Future',
      href: '/',
    },
    {
      id: 3,
      name: 'Works',
      href: '/',
    },
    {
      id: 4,
      name: 'Career',
      href: '/',
    },
  ];
  // company help
  const companyHelp = [
    {
      id: 1,
      name: 'Customer Support',
      href: '/',
    },

    {
      id: 2,
      name: 'Delivery Details',
      href: '/',
    },
    {
      id: 3,
      name: 'Terms & Conditions',
      href: '/',
    },
    {
      id: 4,
      name: 'Privacy Policy',
      href: '/',
    },
  ];

  //company Faq
  const companyFaq = [
    {
      id: 1,
      name: 'Account',
      href: '/',
    },
    {
      id: 2,
      name: 'Manage Deliveries',
      href: '/',
    },
    {
      id: 3,
      name: 'Orders',
      href: '/allOrders',
    },
    {
      id: 4,
      name: 'Payments',
      href: '/payment',
    },
  ];

  //resources
  const resources = [
    {
      id: 1,
      name: 'Free eBooks',
      href: '/',
    },
    {
      id: 2,
      name: 'Development Tutorial',
      href: '/',
    },
    {
      id: 3,
      name: 'How to - Blog',
      href: '/',
    },
    {
      id: 4,
      name: 'Youtube Playlist',
      href: '/',
    },
  ];

  //payment online method
  const paymentOnline = [
    {
      id: 1,
      name: 'Visa',
      src: '/visa.png',
    },
    {
      id: 2,
      name: 'Paypal',
      src: '/paypal.png',
    },
    {
      id: 3,
      name: 'apple pay',
      src: '/apple-pay.png',
    },
    {
      id: 4,
      name: 'google pay',
      src: '/google-pay.png',
    },
  ];

  return (
    <div className="footer bg-bg-secondry w-screen h-fit py-40 relative left-1/2  -translate-x-1/2 px-10">
      <div className="max-w-[1300px] relative  mx-auto flex flex-col gap-y-10 font-roboto ">
        <div className="contact grid grid-cols-1 md:grid-cols-2 gap-7 w-full h-fit bg-black absolute p-30 -top-1/4 md:-top-1/4 lg:-top-1/3 rounded-xl ">
          <h2 className="text-white font-bold text-18 md:text-32 leading-tight font-archivo  w-full">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <form className="mx-auto w-full">
            <div className="form flex flex-col gap-y-10">
              <div className="lg:w-1/2 w-full input relative mx-auto">
                <input
                  className="border-none outline-none w-full text-14  text-black py-6 ps-35 pe-15 rounded-2xl"
                  type="text"
                  name="email"
                  placeholder="Your email address"
                />
                <i className="absolute left-9 text-16 top-9 opacity-40 fa-solid fa-envelope"></i>
              </div>
              <button
                className="bg-white rounded-2xl lg:w-1/2 w-full text-14 mx-auto font-medium py-6 hover:bg-[#fff5f5e7] duration-300"
                type="submit"
              >
                Subscribe to Newsletter
              </button>
            </div>
          </form>
        </div>
        <div className="info grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20 border-b border-opacity-10 border-black pb-20 mt-50 md:mt-100 lg:mt-80">
          <div className="title flex flex-col gap-y-10 lg:mx-auto ms-0">
            <h2 className="font-bold text-18 md:text-32 leading-none font-archivo">
              SHOP.CO
            </h2>
            <p className="opacity-60 text-12">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
            <div>
              <SocialMedia />
            </div>
          </div>
          <div className="company flex flex-col gap-y-10 lg:mx-auto ms-0">
            <h2 className="tracking-widest text-medium">Company</h2>
            {compantLinks.map((item) => (
              <Link
                className="text-14 opacity-50 tracking-wide"
                href={item.href}
                key={item.id}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="help flex flex-col gap-y-10 lg:mx-auto ms-0">
            <h2 className="tracking-widest font-normal">Help</h2>
            {companyHelp.map((item) => (
              <Link
                className="text-14 opacity-50 tracking-wide "
                href={item.href}
                key={item.id}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="faq flex flex-col gap-y-10 lg:mx-auto ms-0">
            <h2 className="tracking-widest font-normal">FAQ</h2>
            {companyFaq.map((item) => (
              <Link
                className="text-14 opacity-50 tracking-wide"
                href={item.href}
                key={item.id}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="resources flex flex-col gap-y-10 lg:mx-auto ms-0">
            <h2 className="tracking-widest font-normal">Resources</h2>
            {resources.map((item) => (
              <Link
                className="text-14 opacity-50 tracking-wide"
                href={item.href}
                key={item.id}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="copyright flex flex-wrap gap-10 justify-center md:justify-between items-center">
          <h2 className="opacity-60 font-light ">
            Shop.co © 2000-2026, All Rights Reserved
          </h2>
          <div className="payment flex gap-10">
            {paymentOnline.map((item) => (
              <Image
                src={item.src}
                alt={item.name}
                key={item.id}
                width={50}
                height={50}
                loading="lazy"
                className="bg-white px-10 py-0 rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
