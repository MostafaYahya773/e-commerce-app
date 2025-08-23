'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import useDeleteWishlist from '@/hooks/(wishList)/useDeleteWishlist';
import useWishlistData from '@/hooks/(wishList)/useWishlistData';
import StarRating from '../_components/starRating/page';
import Link from 'next/link';
import useCart from '@/hooks/(cart)/useCart';
import LoadingAnimation from '../_components/LoadingAnimation/page';
import EmptyProducts from '../_components/EmptyProducts/page';
import LoadingFetch from '../_components/LoadingFetch/page';

export default function WishList() {
  // use it to get id to select animation
  const [updatingIdToDel, setUpdatingIdToDel] = useState(null);
  // use it to add to cart
  const [updatingIdToCart, setUpdatingIdToCart] = useState(null);
  // get all products
  const { data: WishListProducts, isLoading, isFetching } = useWishlistData();
  // all products i add it to cart
  const [allAddToCart, setAllAddToCart] = useState([]);
  // add to cart
  const { mutate: addToCart } = useCart();
  // delete product
  const { mutate: deleteWishlist } = useDeleteWishlist();
  // first reload
  if (isLoading) return <LoadingAnimation />;
  if (isFetching) return <LoadingFetch />;

  // check if product exist
  if (WishListProducts.count === 0)
    return (
      <EmptyProducts
        src={'/shopping-cart-Empty.png'}
        message={'Your wishlist is empty'}
      />
    );

  // function to delete product by id
  const HandleDeleteWishlist = (id) => {
    setUpdatingIdToDel(id);
    deleteWishlist(id, {
      onSuccess: (e) => {
        toast.success('Product deleted successfully');
        setUpdatingIdToDel(null);
      },
      onError: (e) => {
        toast.error(e.data.status);
      },
    });
  };
  // function to update count
  const HandleAddToCart = (id) => {
    // set id in state
    setUpdatingIdToCart(id);
    addToCart(id, {
      onSuccess: (e) => {
        setUpdatingIdToCart(null);
        toast.success(e?.data?.message);
      },
      onError: (e) => {
        toast.error(e.response.data.message);
      },
    });
  };

  //function to set all id to state to know products i add it to cart
  const HandleSetAllIdToCart = (id) => {
    setAllAddToCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className="relative flex flex-col gap-y-10 font-roboto gap-20 md:gap-10 px-10 mt-50 md:mt-80 mb-150 lg:mb-80">
      <div className="header font-roboto flex justify-between items-center border-b border-black border-opacity-10 pb-5">
        <h1 className="font-bold text-16 md:text-20">WishList</h1>
        <p className="opacity-60 text-14 md:text-16">
          {WishListProducts?.count} items
        </p>
      </div>
      <div className="AllProducts grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 ">
        {WishListProducts?.data?.map((product) => (
          <div
            key={product?._id}
            className={`grid grid-rows-[1fr_auto] gap-y-7 border-black p-7 border rounded-md border-opacity-30`}
          >
            <Link
              className="flex w-full gap-x-20 border-b border-black border-opacity-30 pb-10"
              href={`/productDetails/${product?._id}`}
            >
              <div className="img">
                <Image
                  width={100}
                  height={100}
                  src={product?.imageCover || '/animation.svg'}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="img"
                />
              </div>
              <div className="productDetails flex flex-col gap-y-10 w-full">
                <div className="Productname flex gap-x-10 justify-between items-start md:items-center ">
                  <h1 className="font-bold text-14 md:text-18">
                    {product?.title.split(' ').slice(0, 2).join(' ') ||
                      'loading'}
                  </h1>
                </div>
                <div className="productInfo flex flex-col gap-2  gap-x-10">
                  <div className="brand">
                    <h2 className="text-12 md:text-14 font-semibold">
                      Brand:{' '}
                      <span className="opacity-70 font-light ms-2">
                        {product?.brand?.name}
                      </span>
                    </h2>
                  </div>
                  <div className="category">
                    <h2 className="text-12 md:text-14 font-semibold">
                      Category:{' '}
                      <span className="opacity-70 font-light ms-2">
                        {product?.category?.name}
                      </span>
                    </h2>
                  </div>
                </div>
                <div className="Productprice flex justify-between items-center ">
                  <h1 className="font-bold text-16 md:text-20">
                    ${product?.price}
                  </h1>
                  <div className="md:mt-4">
                    <StarRating rate={product?.ratingsAverage} />
                  </div>
                </div>
              </div>
            </Link>
            <div className="w-full grid grid-cols-[1fr_auto] gap-x-5">
              <button
                onClick={() => {
                  HandleAddToCart(product?._id),
                    HandleSetAllIdToCart(product?._id);
                }}
                className={`
                 text-white bg-black py-5 text-12 md:text-14 rounded-md`}
              >
                <span className="text-12 md:text-14  py-5  ">
                  {updatingIdToCart === product?._id ? (
                    <span className="loaderWishlist"></span>
                  ) : allAddToCart?.includes(product?._id) ? (
                    'product added to cart'
                  ) : (
                    'add to cart'
                  )}
                </span>
              </button>
              <div className="del__wishlist grid px-10 border border-black border-opacity-30 rounded-md">
                <button
                  onClick={() => HandleDeleteWishlist(product?._id)}
                  className="delItem"
                >
                  <span className="text-12 md:text-14  py-5  ">
                    {updatingIdToDel === product?._id ? (
                      <span className="loaderCount"></span>
                    ) : (
                      <i className="fa-solid fa-trash"></i>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//   <div className="del__wishlist grid ">
//     <button
//       onClick={() => HandleDeleteCart(product?._id)}
//       className="delItem"
//     >
//       <span className="text-12 md:text-14  py-5  ">
//         {updatingIdToDel === product?._id ? (
//           <span className="loaderWishlist"></span>
//         ) : (
//           <i className="fa-solid fa-trash"></i>
//         )}
//       </span>
//     </button>
//   </div>
