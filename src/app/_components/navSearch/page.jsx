import useRequest from '@/hooks/useRequest';
import React, { useMemo } from 'react';
import LoadingAnimation from '../LoadingAnimation/page';
import Link from 'next/link';

export default function NavSearch({ inputValue }) {
  const { data, isLoading } = useRequest('products');

  const suggestionProducts = useMemo(() => {
    if (!data?.data) return [];

    return data?.data
      .slice(4, 33)
      .filter((item) =>
        inputValue === ''
          ? true
          : item?.title?.toLowerCase().includes(inputValue.toLowerCase())
      );
  }, [data, inputValue]);

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="absolute top-35 right-0 left-0 z-[101] w-full h-screen">
      <div className="bg-bg-secondry rounded-md h-200 shadow-md overflow-auto p-5">
        <ul className="flex flex-col gap-y-5">
          {suggestionProducts.map((item) => (
            <li className="py-2 opacity-90" key={item?._id}>
              <Link href={`/productDetails/${item?._id}`}>
                {item?.title.split(' ').slice(0, 4).join(' ')}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
