'use client';

import React, { useState } from 'react';
import OrderDetails from '../OrderDetails/page';

export default function OrderTable({ data }) {
  //get item id from data
  const [orderId, setorderId] = useState(null);
  //is open order details
  const [isOpen, setIsOpen] = useState(false);
  // send data id to order details
  const handleItemId = (id) => {
    setorderId(id);
    setIsOpen(true);
  };

  return (
    <div className="overflow-x-auto rounded-lg font-roboto">
      <table className="min-w-full ">
        <thead className="bg-[#00000024]">
          <tr className=" text-14 md:text-16">
            <th className="py-10 font-medium rounded-tl-lg">#</th>
            <th className="py-10 font-medium ">ID</th>
            <th className="py-10 font-medium hidden md:table-cell">Date</th>
            <th className="py-10 font-medium hidden md:table-cell">Items</th>
            <th className="py-10 font-medium">Price</th>
            <th className="py-10 font-medium hidden md:table-cell">Paid</th>
            <th className="py-10 font-medium">Method</th>
            <th className="py-10 font-medium rounded-tr-lg">Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((row, index) => (
            <tr
              key={row.id}
              className="text-center text-12 md:text-14 lg:text-16 opacity-50"
            >
              <td className="py-10 border-b border-black border-opacity-10 ">
                {index + 1}
              </td>
              <td className="py-10 border-b border-black border-opacity-10 font-medium">
                {row.id}
              </td>
              <td className="py-10 border-b border-black border-opacity-10 hidden md:table-cell">
                {row.createdAt.slice(0, 10)}
              </td>
              <td className="py-10 border-b border-black border-opacity-10 font-medium hidden md:table-cell">
                {row.cartItems.length}
              </td>
              <td className="py-10 border-b border-black border-opacity-10">
                ${row.totalOrderPrice}
              </td>
              <td className="py-10 border-b  border-black border-opacity-10 hidden md:table-cell">
                <span
                  className={`px-15 text-12 py-2 rounded-2xl ${
                    row?.isPaid
                      ? 'bg-[#33ff3340] text-[#008000]'
                      : 'bg-[#ff333330] text-[#ff0000]'
                  }`}
                >
                  {row?.isPaid ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="py-10 border-b border-black border-opacity-10 font-medium">
                {row.paymentMethodType}
              </td>
              <td>
                <button
                  onClick={() => handleItemId(row?.id)}
                  className="bg-[#00000024]  w-full py-7 rounded-md hover:bg-black hover:text-white hover:opacity-100 duration-75"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={`${isOpen ? 'block' : 'hidden'}`}>
        <OrderDetails
          data={data}
          orderId={orderId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
}
