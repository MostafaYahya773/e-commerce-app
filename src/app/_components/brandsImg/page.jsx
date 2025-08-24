import { UserContext } from '@/context/useContext';
import useRequest from '@/hooks/useRequest';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
export default function BrandsImg() {
  // get data from api
  const { data } = useRequest('products');
  // filter unique brands
  const uniqueBrands = data?.data
    .slice(0, 33)
    .filter(
      (item, index, self) =>
        index === self.findIndex((el) => el.brand.name === item.brand.name)
    );

  return (
    <div className="border-b  border-opacity-20  border-black px-10">
      <h2 className="font-archivo text-32  lg:text-48 text-center">Brands</h2>
      <div className="flex gap-20 py-20 overflow-x-auto">
        <div className="brandsImg flex gap-x-10 grow overflow-x-auto">
          {uniqueBrands?.map((item, index) => (
            <Link
              href={`/Brands/${item?.brand?.name}`}
              key={index}
              className="border min-w-200 rounded-full grow border-opacity-10 overflow-hidden border-black "
            >
              <Image
                src={item?.brand?.image}
                width={100}
                height={100}
                alt="img"
                priority
                className="object-cover hover:scale-105 hover:duration-300 mx-auto "
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
