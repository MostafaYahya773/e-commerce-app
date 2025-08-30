'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import StarRating from '../starRating/page';

export default function OrderDetails({ data, orderId, setIsOpen }) {
  // get Order by id
  const Order = useMemo(
    () => data?.find((order) => order.id === orderId),
    [data, orderId]
  );

  // handle Date
  const date = Order?.createdAt
    ? format(new Date(Order?.createdAt), 'dd MMMM yyyy, hh:mm a')
    : '';

  return (
    <div
      className={`fixed right-0 top-0 bottom-0 left-0 z-[101] bg-[#00000049] font-roboto w-full  flex items-top justify-end overflow-y-scroll`}
    >
      <div className="bg-white min-h-fit w-full sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col gap-y-20 p-10 ">
        <div className="orderHead flex flex-col gap-10 border-b border-opacity-10 border-black pb-10">
          <div className="orderId flex justify-between items-center">
            <h1 className="font-bold text-16">
              <span className="font-normal text-14">Order ID</span> #{orderId}
            </h1>
            <i
              onClick={() => setIsOpen(false)}
              className="fa-solid fa-xmark text-16 cursor-pointer"
            ></i>
          </div>
          <div className="payment_shapping flex gap-7 *:text-12 *:px-7 *:py-1 *:rounded-lg">
            <p className=" bg-[#01ab3135] text-verfied-color">
              {Order?.paymentMethodType}
            </p>
            <p className=" bg-[#ff333335] text-descount-color">
              {Order?.isDelivered === true ? 'delivered' : 'not delivered'}
            </p>
          </div>
          <span className="Date text-12 opacity-50">{date}</span>
        </div>
        <div className="orderItems flex flex-col gap-y-5">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Order items</h2>
            <span className="opacity-60 text-14">
              {Order?.cartItems?.length} items
            </span>
          </div>
          <div className="orderItemsList flex flex-col gap-y-20 border border-opacity-20 border-black rounded-lg min-h-100 max-h-300 overflow-y-scroll p-10">
            {Order?.cartItems?.map((item, index) => (
              <div key={index} className="flex items-start gap-10">
                <div className="img">
                  <Image
                    src={item?.product?.imageCover}
                    width={70}
                    height={70}
                    className="object-cover"
                    alt="img"
                    priority
                  />
                </div>
                <div className="flex justify-between w-full">
                  <div className="info flex flex-col  gap-y-5">
                    <p className="text-12 opacity-50">
                      {item?.product?.category?.name}
                    </p>
                    <p className="text-14 font-medium">
                      {item?.product?.title.slice(0, 20)}
                    </p>
                    <div className="flex items-center gap-5 text-12 md:text-14 opacity-50">
                      <span>{item?.product?.brand?.name}</span>
                      <span>${item?.price}</span>
                      <span>
                        <i className="fa-solid fa-star text-12 text-star-color me-2"></i>
                        {item?.product?.ratingsAverage}
                      </span>
                    </div>
                  </div>
                  <span className="quantity text-white text-12 bg-black px-7 rounded-lg h-fit">
                    {item?.count} {item?.count === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="orderSummary flex flex-col gap-y-15 ">
          <div className="title flex items-center gap-10 w-full">
            <h2 className="font-bold md:text-18 text-14">Order Summary</h2>
            <span className=" bg-[#01ab3135] text-verfied-color text-12 px-7 rounded-lg ">
              {Order?.paymentMethodType}
            </span>
          </div>
          <div className="orderSummaryDetails *:flex *:justify-between *:items-center *:border-b  *:border-opacity-20 *:border-black *:pb-10 opacity-50 last:pb-0  flex flex-col gap-y-10 text-14  border border-opacity-20 border-black rounded-lg p-10 ">
            <div className="shipping">
              <p>Shipping</p>
              <span className="font-bold">${Order?.shippingPrice}</span>
            </div>
            <div className="taxPrice">
              <p>Tax</p>
              <span className="font-bold">${Order?.taxPrice}</span>
            </div>
            <div className="taxPrice">
              <p>Descount</p>
              <span className="font-bold">$0</span>
            </div>
            <div className="taxPrice border-none">
              <p className="font-bold">Total</p>
              <span className="font-bold">${Order?.totalOrderPrice}</span>
            </div>
          </div>
        </div>
        <div className="customer flex flex-col gap-y-10 ">
          <h2 className="font-bold md:text-18 text-14">Customer Details</h2>
          <div className="flex justify-between gap-x-10 gap-y-20 flex-wrap  *:flex *:flex-col *:gap-10 *:text-12  *:font-medium">
            <div className="customer *:flex *:items-center *:gap-5 *:opacity-60">
              <h2 className="font-bold text-14">Customer</h2>
              <div className="name">
                <i className="fa-solid fa-user text-12"></i>
                <p className="mt-2">{Order?.user?.name}</p>
              </div>
              <div className="numOfOrders">
                <i className="fa-solid fa-bag-shopping text-12"></i>
                <p className="mt-2">
                  {Order?.cartItems?.length}{' '}
                  {Order?.cartItems?.length === 1 ? 'Order' : 'Orders'}
                </p>
              </div>
              <div className="verified">
                <i className="fa-solid fa-circle-check text-12"></i>
                <p>Customer is Verified</p>
              </div>
            </div>
            <div className="customerInfo *:flex *:items-center *:gap-5 *:opacity-60">
              <h2 className="font-bold text-14">Contact information</h2>

              <div className="phone">
                <i className="fa-solid fa-phone text-12"></i>
                <p className="mt-2">{Order?.user?.phone}</p>
              </div>
              <div className="email">
                <i className="fa-solid fa-envelope text-12"></i>
                <p className="mt-2">{Order?.user?.email}</p>
              </div>
              <div className="verified">
                <i className="fa-solid fa-circle-check text-12"></i>
                <p>You can contact via phone</p>
              </div>
            </div>
            <div className="shapping *:flex *:items-center *:gap-5 *:opacity-60">
              <h2 className="font-bold text-14">Shappind address</h2>

              <div className="address">
                <i className="fa-solid fa-house text-12"></i>
                <p className="mt-2">{Order?.shippingAddress?.city}</p>
              </div>
              <div className="location">
                <i className="fa-solid fa-location-dot text-12"></i>
                <p className="mt-2">{Order?.shippingAddress?.details}</p>
              </div>
              {/* <div className="verified">
                <i className="fa-solid fa-circle-check text-12"></i>
                <p>Customer is Verified</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
