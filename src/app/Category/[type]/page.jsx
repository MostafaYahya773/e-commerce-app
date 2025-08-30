'use client';
import React, { useContext, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import FilterByName from '../../_components/filterByName/page';
import { UserContext } from '@/context/useContext';
import StarRating from '../../_components/starRating/page';
import useCart from '@/hooks/(cart)/useCart';
import toast from 'react-hot-toast';
import useWishlist from '@/hooks/(wishList)/useWishlist';
import SwitchSliderSwiper from '@/app/_components/SwitchSliderSwiper/page';

export default function Category() {
  // get data from context
  const { shareResult } = useContext(UserContext);
  //add products to cart
  const { mutate: addToCart } = useCart();
  //add ti wishlist
  const { mutate: addToWishlist } = useWishlist();
  //hide filter mobile
  const [hideFilter, setHideFilter] = useState(true);
  //hide filter web
  const [hideFilterWeb, setHideFilterWeb] = useState(true);
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
  const handlePrevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  // hide filter
  const handleHideFilterMobile = () => {
    setHideFilter(!hideFilter);
  };
  const handleHideFilterweb = () => {
    setHideFilterWeb(!hideFilterWeb);
  };

  return (
    <div className="flex flex-col mt-50 md:mt-80 mb-150 lg:mb-80 gap-y-40 px-10">
      <div
        className={`info grid grid-cols-1 ${
          hideFilterWeb ? 'md:grid-cols-[20%_80%]' : 'md:grid-cols-[5%_95%]'
        } gap-x-15 relative`}
      >
        <div className="md:hidden filtermobile absolute z-10  bg-white w-full p-10 border border-opacity-10 border-black flex flex-col gap-y-22  rounded-md">
          <div className="title flex font-roboto text-18 justify-between items-center">
            <h2 className="font-bold">Filters</h2>
            <i
              onClick={handleHideFilterMobile}
              className="fa-solid fa-list"
            ></i>
          </div>
          <div
            className={`${
              hideFilter ? 'hidden' : 'block'
            } pb-20 border-b border-opacity-10 border-black `}
          >
            <FilterByName
              type={type}
              hideFilter={hideFilter}
              setHideFilter={setHideFilter}
            />
          </div>
        </div>

        <div
          className={`${
            hideFilterWeb
              ? 'border border-opacity-10 border-black p-20'
              : 'p-12'
          } hidden md:flex filterweb mb-20 w-full flex-col gap-y-22 rounded-2xl`}
        >
          <div
            className={`${
              hideFilterWeb ? 'border-b border-opacity-10 border-black' : ''
            } title pb-10 flex font-roboto text-18 justify-between items-center `}
          >
            <h2 className={`${hideFilterWeb ? 'block' : 'hidden'} font-bold`}>
              Filters
            </h2>
            <i
              onClick={handleHideFilterweb}
              className="fa-solid fa-list cursor-pointer"
            ></i>
          </div>
          <div
            className={`${
              hideFilterWeb ? 'block' : 'md:hidden'
            } hidden md:block pb-20 border-b border-opacity-10 border-black`}
          >
            <FilterByName
              type={type}
              hideFilter={hideFilter}
              setHideFilter={setHideFilter}
            />
          </div>
        </div>
        <div className="results flex flex-col gap-y-15 mt-60 md:mt-0">
          <div className="title flex justify-between items-center gap-2 pb-5 border-b border-opacity-10 border-black">
            <h3 className="font-roboto text-24 font-bold ">{type}</h3>
            <span className="text-14 md:text-16 opacity-60">
              Showing {shareResult?.length || 0} results
            </span>
          </div>

          <div className="info grid grid-cols-2 lg:grid-cols-3 gap-10 font-roboto ">
            {shareResult?.map((item, index) => (
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
                              fullId.includes(item?._id)
                                ? 'text-verfied-color'
                                : ''
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
      </div>
    </div>
  );
}
