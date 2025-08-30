'use client';

import Link from 'next/link';
import StarRating from '../starRating/page';
import toast from 'react-hot-toast';
import { memo, useMemo, useState } from 'react';
import SwitchSliderSwiper from '../SwitchSliderSwiper/page';
import useCart from '@/hooks/(cart)/useCart';
import useWishlist from '@/hooks/(wishList)/useWishlist';
export default memo(function HomeSections({ title, data, type }) {
  // add to cart
  const { mutate: addToCart } = useCart();
  //add to wishlist
  const { mutate: addToWishlist } = useWishlist();
  // chick if cart is add or not to cart
  const [isAdd, setIsAdd] = useState(null);
  // get all id to add to cart
  const [fullId, setFullId] = useState([]);
  //check if cart is add or not to wishlist
  const [isAddToWishlist, setIsAddToWishlist] = useState(null);
  //get all id to add to wishlist
  const [fullIdToWishlist, setFullIdToWishlist] = useState([]);
  // select data to show in home page
  const dataToShow = useMemo(() => data?.slice(10, 18), [data]);
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
  // handle add id to cart
  const handleFullId = (id) => {
    setFullId((prev) => [...prev, id]);
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

  // disaple switching to product details
  const handlePrevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className="border-b pb-50 border-opacity-20 border-black">
      <h2 className="font-archivo text-32 lg:text-48 text-center">{title}</h2>
      <div className="info grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 px-10 py-20 md:py-40 font-roboto ">
        {dataToShow?.map((item, index) => (
          <Link
            key={index}
            href={`/productDetails/${item?._id}`}
            className="info md:p-10 p-7 product-shadow rounded-md
            flex flex-col gap-y-5 shadow-lg "
          >
            <div className="img">
              <SwitchSliderSwiper
                path="/home"
                images={item?.images}
                spaceBetween={20}
                arrows={false}
                dots={true}
                breakpoints={{
                  480: { slidesPerView: 1 },
                }}
              />
            </div>
            <div className="grid grid-rows-[auto_auto_auto] gap-y-5 h-full items-center">
              <h3 className="name text-16 md:text-18 lg:text-20 font-bold">
                {item?.title.split(' ').slice(0, 3).join(' ')}
              </h3>
              <div className="rate flex items-center gap-1">
                <StarRating rate={item?.ratingsAverage} />
              </div>
              <div className="flex items-center w-full justify-between relative">
                <h3 className="font-bold flex gap-10 text-14 md:text-16">
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
                </h3>
                <div className="flex md:gap-5 absolute right-0 opacity-40">
                  <button
                    aria-label="add to wishlist"
                    onClick={(e) => {
                      handlePrevent(e);
                      handleAddToWishlist(item?._id);
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
                    aria-label="add to cart"
                    onClick={(e) => {
                      handlePrevent(e);
                      handleAddToCart(item?._id);
                      handleFullId(item?._id);
                    }}
                    className="text-18 md:text:20 px-2"
                  >
                    {isAdd === item?._id ? (
                      <span className="loaderCount"></span>
                    ) : (
                      <i
                        className={` ${
                          fullId.includes(item?._id) ? 'text-verfied-color' : ''
                        } fa-solid fa-cart-shopping`}
                      ></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div
        className={` ${
          type === 'products' ? 'hidden' : ''
        } w-full flex justify-center items-center `}
      >
        <Link
          aria-label="view all products"
          href={`/viewProduct/${type}`}
          className=" w-fit px-45 py-5 border-opacity-20 border border-black rounded-full  font-roboto font-medium text-18"
        >
          View All
        </Link>
      </div>
    </div>
  );
});
