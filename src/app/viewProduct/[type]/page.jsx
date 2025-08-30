'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

import useRequest from '@/hooks/useRequest';
import useCart from '@/hooks/(cart)/useCart';
import useWishlist from '@/hooks/(wishList)/useWishlist';

import CustomHero from '@/app/_components/customHero/page';
import SwitchSliderSwiper from '../../_components/SwitchSliderSwiper/page';
import StarRating from '../../_components/starRating/page';
import LoadingAnimation from '../../_components/LoadingAnimation/page';

export default function ViewProduct() {
  const { type } = useParams();
  console.log(type);

  // states
  const [filterType, setFilterType] = useState('all');
  const [isAdd, setIsAdd] = useState(null);
  const [isAddToWishlist, setIsAddToWishlist] = useState(null);
  const [fullId, setFullId] = useState([]);
  const [fullIdToWishlist, setFullIdToWishlist] = useState([]);

  const productsType = [
    { name: 'All', value: 'all' },
    { name: "Men's", value: "Men's" },
    { name: "Women's", value: "Women's" },
  ];

  // API requests
  const { data, isLoading } = useRequest('products');
  const { mutate: addToCart } = useCart();
  const { mutate: addToWishlist } = useWishlist();

  // filtered products by category type
  const filteredProducts = useMemo(() => {
    if (!data?.data) return [];
    if (filterType === 'all') return data.data.slice(0, 33);
    return data.data.filter((item) => item.category.name.includes(filterType));
  }, [data?.data, filterType]);

  // products to display based on 'type' param
  const productsToShow = useMemo(() => {
    if (type === 'newArrivals') {
      return [...filteredProducts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 33);
    } else if (type === 'onSale') {
      return filteredProducts?.filter((item) => item?.priceAfterDiscount);
    }
  }, [filteredProducts, type]);

  // handlers
  const handleFilter = (value) => setFilterType(value);

  const handleAddToCart = (id) => {
    setIsAdd(id);
    addToCart(id, {
      onSuccess: (e) => {
        toast.success(e.data.message);
        setIsAdd(null);
        setFullId((prev) => [...prev, id]);
      },
      onError: (e) => toast.error(e.response.data.message),
    });
  };

  const handleAddToWishlist = (id) => {
    setIsAddToWishlist(id);
    addToWishlist(id, {
      onSuccess: () => {
        toast.success('Product added to wishlist successfully');
        setIsAddToWishlist(null);
        setFullIdToWishlist((prev) => [...prev, id]);
      },
      onError: (e) => toast.error(e.response.data.message),
    });
  };
  // disaple switching to product details
  const handlePrevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="flex flex-col gap-y-30 mb-150 lg:mb-80 px-10 font-roboto">
      <CustomHero
        img={
          decodeURIComponent(type) === 'newArrivals'
            ? '/arrives.png'
            : `/sale.png`
        }
        title={
          decodeURIComponent(type) === 'newArrivals'
            ? 'New Arrivals Products'
            : 'OnSale Products'
        }
        subtitle={
          decodeURIComponent(type) === 'newArrivals'
            ? "Check out our latest arrivals, fresh from the designers, and be the first to own the season's hottest styles"
            : 'Discover unbeatable deals with our exclusive On Sale collection, where top-quality products meet exceptional discounts'
        }
      />

      <div className="type flex gap-40 justify-center items-center">
        {productsType.map((item, index) => (
          <button
            key={index}
            onClick={() => handleFilter(item.value)}
            className={`px-10 py-5 cursor-pointer ${
              filterType === item.value
                ? 'border-b border-black border-opacity-70 opacity-100'
                : 'opacity-70'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="grid gap-10 md:gap-30 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productsToShow?.map((item, index) => (
          <Link
            key={index}
            aria-label="to product details"
            href={`/productDetails/${item?._id}`}
            className="info md:p-10 p-7 product-shadow rounded-md
            flex flex-col gap-y-5 shadow-lg "
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
            <div className="grid grid-rows-[auto_auto_auto] items-center h-full gap-y-7">
              <h2 className="name text-16 md:text-20 font-bold">
                {item?.title.split(' ').slice(0, 3).join(' ')}
              </h2>
              <div className="rate flex items-center gap-1">
                <StarRating rate={item?.ratingsAverage} />
              </div>
              <div className="flex items-center w-full justify-between relative">
                <h3 className="priceDetails font-bold flex gap-10">
                  {item?.priceAfterDiscount ? (
                    <div className="flex gap-5 items-center">
                      <span>{`$${item.priceAfterDiscount}`}</span>
                      <del className="opacity-40">{`$${item?.price}`}</del>
                    </div>
                  ) : (
                    <span>{`$${item?.price}`}</span>
                  )}
                </h3>
                <div className="flex gap-5 absolute right-0 opacity-40">
                  <button
                    aria-label="add to wishlist"
                    onClick={(e) => {
                      handlePrevent(e);
                      handleAddToWishlist(item?._id);
                    }}
                    className="text-18 md:text-20 px-2"
                  >
                    {isAddToWishlist === item?._id ? (
                      <span className="loaderCount"></span>
                    ) : (
                      <i
                        className={`${
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
                    }}
                    className="text-18 md:text-20 px-2"
                  >
                    {isAdd === item?._id ? (
                      <span className="loaderCount"></span>
                    ) : (
                      <i
                        className={`${
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
