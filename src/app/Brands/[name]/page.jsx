'use client';
import useRequest from '@/hooks/useRequest';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import useCart from '@/hooks/(cart)/useCart';
import toast from 'react-hot-toast';
import useWishlist from '@/hooks/(wishList)/useWishlist';
import StarRating from '../../_components/starRating/page';
import LoadingAnimation from '../../_components/LoadingAnimation/page';
import SwitchSliderSwiper from '../../_components/SwitchSliderSwiper/page';
import CustomHero from '../../_components/customHero/page';
import { useParams } from 'next/navigation';

export default function Brands() {
  // select data to show in home page
  const { name } = useParams();
  console.log(name);

  // chick if cart is add or not
  const [isAdd, setIsAdd] = useState(null);
  // get all id
  const [fullId, setFullId] = useState([]);
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

  // handle data filter
  const dataOffer = useMemo(() => {
    return data?.data
      ?.slice(0, 33)
      .filter((item) => item?.brand.name.includes(decodeURIComponent(name)));
  }, [data]);
  // disaple switching to product details
  const handlePrevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  // check if data is loading
  if (isLoading) return <LoadingAnimation />;
  return (
    <div className="flex flex-col gap-y-20 mb-150 lg:mb-80 px-10">
      <div>
        <CustomHero
          img="/sale.png"
          title="Brands"
          subtitle="Explore our wide range of trusted brands, each carefully selected to bring you the perfect blend of quality, style, and innovation"
        />
      </div>
      <div className="flex justify-between items-center pb-10 border-b border-opacity-10 border-black">
        <h2 className="font-bold text-24 md:text-30">
          {decodeURIComponent(name)}
        </h2>
        <p className="text-12 md:text-14 font-bold opacity-50">
          {dataOffer?.length} products
        </p>
      </div>
      <div className="grid gap-10 md:gap-30 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-15 ">
        {dataOffer?.map((item, index) => (
          <Link
            aria-label="product details"
            key={index}
            href={`/productDetails/${item?._id}`}
            className="info md:p-10 p-7  product-shadow rounded-md
            flex flex-col gap-y-5 shadow-lg"
          >
            <div className="img">
              <SwitchSliderSwiper
                path="/viewProduct"
                images={item?.images}
                spaceBetween={20}
                arrows={false}
                dots={true}
              />
            </div>
            <div className="grid grid-rows-[auto_auto_auto] gap-y-5 h-full items-center">
              <h3 className="name text-16 md:text-18 lg:text-20 font-bold">
                {item?.title.split(' ').slice(0, 3).join(' ')}
              </h3>
              <div className="rate flex items-center gap-1">
                <StarRating rate={item?.ratingsAverage} />
              </div>
              <div className="relative flex justify-between items-center">
                <div className="priceDetails font-bold  flex gap-10">
                  {item?.priceAfterDiscount ? (
                    <span className="beforeOffer">{`${item.priceAfterDiscount}`}</span>
                  ) : (
                    ''
                  )}
                  {item?.priceAfterDiscount ? (
                    <del className="opacity-40 beforeOffer">{`$${item?.price}`}</del>
                  ) : (
                    <span>{`$${item?.price}`}</span>
                  )}
                </div>
                <div className="flex gap-3 absolute right-0 opacity-40">
                  <button
                    aria-label="add to wishlist"
                    onClick={(e) => {
                      handlePrevent(e);
                      handleAddToWishlist(item?._id);
                      handleFullIdToWishlist(item?._id);
                    }}
                    className="wissListbtn text-18 md:text:20 px-2"
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
                    className="cartbtn text-18 md:text:20 px-2"
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
    </div>
  );
}
