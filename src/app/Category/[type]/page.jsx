'use client';
import React, { useContext, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FilterByName from '../../_components/filterByName/page';
import { UserContext } from '@/context/useContext';
import Image from 'next/image';
import StarRating from '../../_components/starRating/page';
import LoadingAnimation from '../../_components/LoadingAnimation/page';
import useCart from '@/hooks/(cart)/useCart';
import toast from 'react-hot-toast';
import useWishlist from '@/hooks/(wishList)/useWishlist';

export default function Category() {
  // get data from context
  const { shareResult } = useContext(UserContext);
  //add products to cart
  const { mutate: addToCart } = useCart();
  //add ti wishlist
  const { mutate: addToWishlist } = useWishlist();
  //check if cart is add or not to wishlist
  const [isAddToWishlist, setIsAddToWishlist] = useState(null);
  //get all id to add to wishlist
  const [fullIdToWishlist, setFullIdToWishlist] = useState([]);
  // get search param
  const { type } = useParams();
  // chick if cart is add or not
  const [isAdd, setIsAdd] = useState(null);
  // get all id
  const [fullId, setFullId] = useState([]);
  // handle add to cart
  const handleAddToCart = (id) => {
    setIsAdd(id);
    addToCart(id, {
      onSuccess: (e) => {
        toast.success(e.data.message);
        setIsAdd(null);
      },
      onError: (e) => {
        toast.error(e.response.data.message);
      },
    });
  };
  //handle add to wishlist
  const handleAddToWishlist = (id) => {
    setIsAddToWishlist(id);
    addToWishlist(id, {
      onSuccess: (e) => {
        toast.success('product added to wishlist successfully');
        setIsAddToWishlist(null);
      },
      onError: (e) => {
        toast.error(e.response.data.message);
      },
    });
  };

  // handle add id to wishlist
  const handleFullIdToWishlist = (id) => {
    setFullIdToWishlist((prev) => [...prev, id]);
  };
  // handle add to cart
  const handleFullId = (id) => {
    setFullId((prev) => [...prev, id]);
  };
  return (
    <div className="flex flex-col mb-150 lg:mb-80 gap-y-40 px-10">
      <div className="info grid grid-cols-1 lg:grid-cols-[20%_80%] gap-x-15">
        <div className="filter p-20 border border-opacity-10 flex flex-col gap-y-22 border-black rounded-[20px]">
          <div className="title  flex font-roboto text-18 justify-between items-center pb-20 border-b border-opacity-10 border-black">
            <h1 className="font-bold">Filters</h1>
            <i className="fa-solid fa-list"></i>
          </div>
          <div className="pb-20 border-b border-opacity-10 border-black">
            <FilterByName type={type} />
          </div>
        </div>
        <div className="results flex flex-col gap-y-10 px-10">
          <div className="title flex justify-between items-center gap-2">
            <div className="name flex flex-col gap-y-10">
              <h1 className="font-roboto text-24 font-bold">{type}</h1>
            </div>
            <span className="text-16 opacity-60">
              Showing {shareResult?.length || 0} results
            </span>
          </div>
          <div className="grid gap-30 grid-cols-2  md:grid-cols-3 py-20 ">
            {!shareResult ? (
              <div className="flex justify-center items-center col-span-3">
                <LoadingAnimation />
              </div>
            ) : (
              shareResult?.map((item, index) => (
                <div
                  key={index}
                  className="info flex product-shadow rounded-md flex-col gap-y-5 shadow-lg p-10 relative"
                >
                  <Link href={`/productDetails/${item?._id}`}>
                    <div className="img mx-auto">
                      <Image
                        src={item?.imageCover}
                        width={300}
                        height={100}
                        alt="imgCover"
                        loading="lazy"
                        className="rounded-md"
                      />
                    </div>
                    <div className="name text-20 font-bold px-10  mb-10">
                      {item?.title.split(' ').slice(0, 4).join(' ')}
                    </div>
                    <div className="rate flex items-center gap-1 px-10 mb-10">
                      <StarRating rate={item?.ratingsAverage} />
                    </div>
                    <div className="price flex justify-between items-center">
                      <div className="priceDetails font-bold px-10 flex gap-10">
                        {item?.priceAfterDiscount ? (
                          <span>{`$${item.priceAfterDiscount}`}</span>
                        ) : (
                          ''
                        )}
                        {item?.priceAfterDiscount ? (
                          <del className="opacity-40">{`$${item?.price}`}</del>
                        ) : (
                          <span>{`$${item?.price}`}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className=" flex gap-5 absolute right-5 bottom-5 opacity-40">
                    <button
                      onClick={() => {
                        handleAddToWishlist(item?._id),
                          handleFullIdToWishlist(item?._id);
                      }}
                      className="text-18 md:text:20 px-2"
                    >
                      {isAddToWishlist === item?._id ? (
                        <span className="loaderCount"></span>
                      ) : (
                        <i
                          className={` ${
                            fullIdToWishlist.includes(item?._id)
                              ? 'text-descount-color'
                              : ''
                          } fa-solid fa-heart`}
                        ></i>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        handleAddToCart(item?._id), handleFullId(item?._id);
                      }}
                      className="text-18 md:text:20 px-2"
                    >
                      {isAdd === item?._id ? (
                        <span className="loaderCount"></span>
                      ) : (
                        <i
                          className={` ${
                            fullId.includes(item?._id)
                              ? 'text-verfied-color'
                              : ''
                          } fa-solid fa-cart-shopping`}
                        ></i>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
