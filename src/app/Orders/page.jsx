'use client';

import React, { useMemo, useState } from 'react';
import OrderTable from '../_components/OrderTable/page';
import useUsedOrders from '@/hooks/(Order)/useUsedOrders';
import LoadingAnimation from '../_components/LoadingAnimation/page';
import Image from 'next/image';
export default function Orders() {
  //get data from api
  const { data: UserData, isLoading } = useUsedOrders();
  // dashboard orders
  const dashboardOrders = [
    { name: 'Total Orders', value: UserData?.length, src: '/total.png' },
    {
      name: 'Completed Orders',
      value: UserData?.length,
      src: '/Completed.png',
    },
    { name: 'Pending Orders', value: UserData?.length, src: '/Pending.png' },
  ];

  //get search data
  const [searchValue, setSearchValue] = useState('');
  //handle data filter
  const UserDataFilter = useMemo(
    () => UserData?.filter((item) => item.id.toString().includes(searchValue)),
    [UserData, searchValue]
  );

  //check if data is loading
  if (isLoading) return <LoadingAnimation />;
  //handle search value
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-10 md:gap-y-30 px-20 md:px-10 mt-50 md:mt-80">
      <div className="titles flex justify-between items-center pb-10 border-b border-opacity-20 border-black">
        <h1 className="font-bold text-16 md:text-20">Orders</h1>
        <span className="text-12 md:text-16 opacity-70 font-semibold mt-4">
          {UserData?.length} Orders Founded
        </span>
      </div>
      <div className="dashboard flex gap-x-10 w-full *:min-w-300 *:grow overflow-x-auto">
        {dashboardOrders.map((item) => (
          <div
            key={item?.name}
            className="flex justify-between items-center gap-10 border border-opacity-20 border-black rounded-xl p-10"
          >
            <div className="flex flex-col gap-y-10">
              <span className="text-12 md:text-14 opacity-50 font-semibold mt-4">
                {item?.name}
              </span>
              <h2 className="font-bold text-16 md:text-20 ">{item?.value}</h2>
            </div>
            <div className="img opacity-25">
              <Image
                src={item?.src}
                alt={item?.name}
                width={50}
                height={50}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="tableDetails flex flex-col gap-y-10">
        <div className="searc">
          <input
            type="number"
            placeholder="Find By Id"
            className="w-full md:w-1/2 lg:w-1/4 py-7 px-10 border-opacity-20 border border-black rounded-md outline-none"
            onChange={handleSearch}
          />
        </div>
        <div className="table mb-20">
          <OrderTable data={UserDataFilter} />
        </div>
      </div>
    </div>
  );
}
