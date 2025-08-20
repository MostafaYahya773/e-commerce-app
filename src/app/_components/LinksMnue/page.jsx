import useRequest from '@/hooks/useRequest';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
export default function LinksMnue() {
  const { data, isLoading } = useRequest('categories');
  if (!data || data === undefined) return;

  return (
    <div className="absolute z-50 grid grid-cols-3 rounded-lg gap-10 bg-white  product-shadow w-300 p-10">
      {isLoading ? (
        <div>
          <span className="loader"></span>
        </div>
      ) : (
        data?.data?.map((item, index) => (
          <Link
            href=""
            className="flex flex-col items-center justify-center gap-10 hover:bg-[#0000001f] p-5 rounded-lg"
            key={index}
          >
            <div className="w-40 h-40 rounded-full relative">
              <Image
                src={item?.image}
                fill
                className="rounded-full"
                alt="imgCover"
                loading="lazy"
              />
            </div>
            <h1 className=" font-roboto font-bold text-12 text-center">
              {item?.name}
            </h1>
          </Link>
        ))
      )}
    </div>
  );
}
