'use client';

import Link from 'next/link';
import StarRating from '../starRating/page';
import toast from 'react-hot-toast';
import { memo, useMemo, useState } from 'react';
import SwitchSliderSwiper from '../SwitchSliderSwiper/page';
import useCart from '@/hooks/(cart)/useCart';
import useWishlist from '@/hooks/(wishList)/useWishlist';
export default memo(function HomeSections({ title, data, loading, type }) {
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
  const dataToShow = useMemo(() => data?.slice(16, 20), [data]);
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
    setFullId((prev) => prev + id);
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
    setFullIdToWishlist((prev) => prev + id);
  };
  return (
    <div className="border-b pb-80 border-opacity-20  border-black">
      <div className="title">
        <h1 className="font-archivo text-24 md:text-32 lg:text-48 text-center">
          {title}
        </h1>
      </div>
      <div className="info  flex gap-20 px-10 py-40 overflow-scroll font-roboto ">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <span className="loader"></span>
          </div>
        ) : (
          dataToShow?.map((item, index) => (
            <div
              key={index}
              className="relative info flex p-10 product-shadow rounded-md flex-col gap-y-5 w-[250px] flex-shrink-0 grow shadow-lg"
            >
              <Link href={`/productDetails/${item?._id}`}>
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
                <div className="name text-20 font-bold px-10 mb-10">
                  {item?.title.slice(0, 20)}
                </div>
                <div className="rate flex items-center gap-1 px-10 mb-10">
                  <StarRating rate={item?.ratingsAverage} />
                </div>
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
                        fullId.includes(item?._id) ? 'text-verfied-color' : ''
                      } fa-solid fa-cart-shopping`}
                    ></i>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div
        className={` ${
          type === 'products' ? 'hidden' : ''
        } w-full flex justify-center items-center `}
      >
        <Link
          href={`/viewProduct/${type}`}
          className=" w-fit px-45 py-5 border-opacity-20 border border-black rounded-full  font-roboto font-medium text-18"
        >
          View All
        </Link>
      </div>
    </div>
  );
});
