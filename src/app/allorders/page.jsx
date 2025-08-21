'use client';
import React, { useMemo, useState } from 'react';
import OrderTable from '../_components/OrderTable/page';
import useUserOrders from '@/hooks/(Order)/useUserOrders';
import LoadingAnimation from '../_components/LoadingAnimation/page';
import Image from 'next/image';
export default function allorders() {
  // filterd data state
  const [filterType, setFilterType] = useState();
  //get search data
  const [searchValue, setSearchValue] = useState('');
  // filter values
  const filterValues = [
    { name: 'all', value: '' },
    { name: 'card', value: 'card' },
    { name: 'cash', value: 'cash' },
  ];
  //get data from api
  const { data: UserData, isLoading } = useUserOrders();
  // filter online orders
  const OnlineOrders = useMemo(
    () => UserData?.filter((item) => item.paymentMethodType === 'card'),
    [UserData]
  );
  // filter cash orders
  const cashOrders = useMemo(
    () => UserData?.filter((item) => item.paymentMethodType === 'cash'),
    [UserData]
  );
  // dashboard orders
  const dashboardOrders = [
    { name: 'Total Orders', value: UserData?.length, src: '/total.png' },
    {
      name: 'Completed Orders',
      value: OnlineOrders?.length,
      src: '/Completed.png',
    },
    { name: 'Pending Orders', value: cashOrders?.length, src: '/Pending.png' },
  ];
  //handle data filter
  const UserDataFilter = useMemo(() => {
    let filterd = UserData || [];
    if (filterType === 'card') {
      filterd = OnlineOrders;
    } else if (filterType === 'cash') {
      filterd = cashOrders;
    }
    if (searchValue)
      filterd = UserData?.filter((item) =>
        item.id.toString().includes(searchValue)
      );
    return filterd;
  }, [UserData, searchValue, filterType, cashOrders, OnlineOrders]);
  //handle search value
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  //handle filte cash order
  const handleFilter = (e) => {
    setFilterType(e.target.value);
  };
  //check if data is loading
  if (isLoading) return <LoadingAnimation />;

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
      <div className="tableDetails flex flex-col gap-y-10 ">
        <div className="search_filter flex items-center flex-wrap justify-between gap-10 *w-1/2">
          <div className="search sm:w-200 md:w-300 w-full">
            <input
              type="number"
              placeholder="Find By Id"
              className="w-full py-7 px-10 border-opacity-20 border border-black rounded-md outline-none"
              onChange={handleSearch}
            />
          </div>
          <div className="filter sm:w-200 md:w-300 w-full">
            <select
              className="w-full py-7 border-opacity-20 border border-black rounded-md"
              onChange={handleFilter}
              defaultValue=""
            >
              <option value="" disabled>
                Filter
              </option>
              {filterValues?.map((item, index) => (
                <option key={index} value={item?.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table mb-20">
          <OrderTable data={UserDataFilter} />
        </div>
      </div>
    </div>
  );
}
