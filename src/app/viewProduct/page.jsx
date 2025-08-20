'use client';
import useRequest from '@/hooks/useRequest';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import StarRating from '../_components/starRating/page';
import LoadingAnimation from '../_components/LoadingAnimation/page';
import useCart from '@/hooks/(cart)/useCart';
import toast from 'react-hot-toast';
import SwitchSliderSwiper from '../_components/SwitchSliderSwiper/page';
import useWishlist from '@/hooks/(wishList)/useWishlist';
export default function viewProduct() {
  // get type
  const { type } = useParams();
  // chick if cart is add or not
  const [isAdd, setIsAdd] = useState(null);
  // get all id
  const [fullId, setFullId] = useState([]);
  // check if data is loading
  //check if cart is add or not to wishlist
  const [isAddToWishlist, setIsAddToWishlist] = useState(null);
  //get all id to add to wishlist
  const [fullIdToWishlist, setFullIdToWishlist] = useState([]);
  // get data from api
  const { data, isLoading } = useRequest('products');
  //add to wishlist
  const { mutate: addToWishlist } = useWishlist();
  //add products to cart
  const { mutate: addToCart } = useCart();
  // filter data
  let newArriesval = data?.data.filter((item) =>
    item?.category.name.includes(type)
  );
  let [x, setX] = useState([]);
  if (isLoading) return <LoadingAnimation />;
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
  // handle add to cart
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
    setFullIdToWishlist((prev) => [...prev, id]);
  };

  return (
    <div className="flex flex-col gap-y-10 md:mt-80 mt-50">
      <div className="title px-15">
        <h1 className="font-archivo text-20 md:text-32 lg:text-48 text-start">
          {type === 'Men' ? 'New Arrivals' : 'Top Selling'}
        </h1>
        <p className="opacity-50 font-roboto text-14 md:text-20 lg:text-25">
          {type === 'Men'
            ? 'Fresh styles just landed  check them out!'
            : 'Most Wanted by Our Customers , Dont Miss Out'}
        </p>
      </div>
      <div className="grid gap-10 md:gap-30  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-20 px-20">
        {newArriesval?.map((item, index) => (
          <div
            key={index}
            className="relative flex product-shadow rounded-md flex-col gap-y-5 shadow-lg p-5 md:p-10"
          >
            <Link
              aria-label="product details"
              href={`/productDetails/${item?._id}`}
            >
              <div className="img ">
                <SwitchSliderSwiper
                  path="/viewProduct"
                  images={item?.images}
                  spaceBetween={20}
                  arrows={false}
                  dots={true}
                />
              </div>
              <div className="name text-16 md:text-20 font-bold   mb-10">
                {item?.title.split(' ').slice(0, 3).join(' ')}
              </div>
              <div className="rate flex items-center gap-1  mb-10">
                <StarRating rate={item?.ratingsAverage} />
              </div>
              <div className="price flex justify-between items-center">
                <div className="priceDetails font-bold  flex gap-10">
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
                      fullId.includes(item?._id) ? 'text-verfied-color' : ''
                    } fa-solid fa-cart-shopping`}
                  ></i>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
