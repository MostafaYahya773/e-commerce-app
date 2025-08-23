'use client';
import CustomHero from '../_components/customHero/page';
import useRequest from '@/hooks/useRequest';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import StarRating from '../_components/starRating/page';
import useCart from '@/hooks/(cart)/useCart';
import useWishlist from '@/hooks/(wishList)/useWishlist';
import LoadingAnimation from '../_components/LoadingAnimation/page';

export default function Brands() {
  // get all prands
  const { data, isLoading } = useRequest('products');
  // add to cart
  const { mutate: addToCart } = useCart();
  //add ti wishlist
  const { mutate: addToWishlist } = useWishlist();
  //check if cart is add or not to wishlist
  const [isAddToWishlist, setIsAddToWishlist] = useState(null);
  //get all id to add to wishlist
  const [fullIdToWishlist, setFullIdToWishlist] = useState([]);
  // chick if cart is add or not
  const [isAdd, setIsAdd] = useState(null);
  // get all id
  const [fullId, setFullId] = useState([]);
  // save brands in state
  const [filterbrand, setFilterBrand] = useState([]);
  // set maxmum filter 33 products
  const results = data?.data?.slice(0, 33).filter((item) => item?.brand?.name);
  // no brands repeted
  const brands = results?.filter(
    (item, index, self) =>
      index === self.findIndex((el) => el.brand?.name === item.brand?.name)
  );
  // handle prand name
  const handleBrandName = (name) => {
    const filter = results?.filter((item) => item?.brand?.name.includes(name));
    setFilterBrand(filter);
  };
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
  if (isLoading) return <LoadingAnimation />;
  return (
    <div className="flex flex-col gap-y-10 mt-50 md:mt-80  mb-150 lg:mb-80 px-10">
      <CustomHero img={'/brands.png'} title={'Our Brands'} />
      <div className="brandsImg flex gap-10 overflow-x-auto">
        {brands?.map((item, index) => (
          <button
            onClick={() => handleBrandName(item?.brand?.name)}
            key={index}
            className="border min-w-200 grow shadow-md border-opacity-10 border-black hover:scale-105 duration-150"
          >
            <Image
              src={item?.brand?.image}
              width={150}
              height={150}
              alt="img"
              priority
              className="object-cover mx-auto flex"
            />
          </button>
        ))}
      </div>
      <div className="results grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {filterbrand?.map((item, index) => (
          <div
            key={index}
            className="info product-shadow rounded-md  shadow-lg p-10 relative"
          >
            <Link
              className="h-full gap-y-10 grid grid-rows-[auto_auto_auto_auto]"
              href={`/productDetails/${item?._id}`}
            >
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
              <div className="name">
                <h1 className="text-20 font-bold ">
                  {item?.title.split(' ').slice(0, 4).join(' ')}
                </h1>
              </div>
              <div className="rate flex items-center gap-1">
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
