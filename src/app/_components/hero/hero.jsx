'use client';
import React, { useState } from 'react';
import Button from '../button/page';
import Image from 'next/image';

export default function Hero() {
  const [count, setCount] = useState([
    {
      id: 1,
      count: 200,
      name: 'International Brands',
    },
    {
      id: 2,
      count: 2000,
      name: 'High-Quality Products',
    },
    {
      id: 3,
      count: 30000,
      name: 'Happy Customers',
    },
  ]);

  const [sponsor, setSponsor] = useState([
    {
      id: 1,
      img: '/versace.png',
    },
    {
      id: 2,
      img: '/zara.png',
    },
    {
      id: 3,
      img: '/gucci.png',
    },
    {
      id: 4,
      img: '/prada.png',
    },
    {
      id: 5,
      img: '/calvin.png',
    },
  ]);
  return (
    <div className="flex flex-col md:mt-80 mt-30">
      <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-x-20 px-5  ">
        <div className="text flex flex-col gap-y-35 justify-center py-40">
          <div className="title flex flex-col gap-y-20">
            <h2 className="text-36 md:text-48  xl:text-64 font-archivo leading-[1.1] ">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h2>
            <p className="opacity-60 md:text-16 text-14">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <Button
              classname="bg-black text-white w-full md:w-fit py-10 px-45 rounded-xl "
              name="Shop Now"
            />
          </div>
          <div className="count grid grid-cols-2 lg:grid-cols-3 flex-wrap md:flex-nowrap gap-10 my-10">
            {count.map((item) => (
              <div key={item.id}>
                <h1 className="md:text-40 text-24  font-roboto">
                  {item.count}+
                </h1>
                <p className="opacity-60  text-12 md:text-16 ">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="img mx-auto relative w-full h-auto bg-[url('/heroImg.png')] bg-[top_center] bg-cover bg-no-repeat">
          <Image
            src={'/heroStar.png'}
            alt="stars"
            className="absolute top-30 right-30  lg:block"
            width={100}
            height={100}
            priority
          />
          <Image
            src={'/heroStar.png'}
            alt="stars"
            className="absolute top-[50%] left-30 hidden lg:block "
            width={50}
            height={100}
            priority
          />
        </div>
      </div>
      <div>
        <div className="sponsor absolute left-0 right-0 p-20 bg-black max-w-[1700px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-10">
            {sponsor.map((item) => (
              <div key={item.id} className="mx-auto">
                <Image
                  src={item.img}
                  alt="sponsor"
                  className="p-10"
                  width={100}
                  height={200}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
