import React, { useState } from 'react';
import StarRating from '../starRating/page';
import Button from '../button/page';
import toast from 'react-hot-toast';
import useCart from '@/hooks/(cart)/useCart';
export default function ProductDetailsInfo({ product }) {
  const [isClicked, setIsClicked] = useState(false);
  //send data to api
  const { mutate } = useCart();
  // function to get id and send it to api
  const HandleAddToCart = (id) => {
    setIsClicked(true);
    mutate(id, {
      onSuccess: (e) => {
        toast.success(e.data.message);
        setIsClicked(false);
      },
      onError: (e) => {
        toast.error(e.response.data.message);
      },
    });
  };

  return (
    <div className="flex flex-col gap-15 lg:gap-15 ">
      <div className="productName">
        <h1 className="font-bold text-24 md:text-30 lg:text-36">
          {product?.title?.split(' ').slice(0, 4).join(' ')}
        </h1>
      </div>
      <div className="rate flex items-center gap-7">
        <StarRating rate={product?.ratingsAverage} />
      </div>
      <div className="price flex items-center gap-20 font-bold text-24 lg:text-32">
        <h2 className={`${product?.priceAfterDiscount ? 'block' : 'hidden'}`}>
          ${product?.priceAfterDiscount}
        </h2>
        <h2 className="opacity-30">
          <del>${product?.price}</del>
        </h2>
      </div>
      <div className="description">
        <p className="text-14 md:text-16  opacity-60">{product?.description}</p>
      </div>
      <div className="moreInfo flex gap-20 flex-wrap *:flex *:flex-col *:gap-5 *:items-center">
        <div className="brand">
          <h2 className="font-bold text-18 md:text-20 lg:text-24">Brand</h2>
          <p className="text-14 md:text-16 opacity-60">
            {product?.brand?.name}
          </p>
        </div>
        <div className="sold">
          <h2 className="font-bold text-18 md:text-20 lg:text-24">Sold </h2>
          <p className="text-14 md:text-16 opacity-60">{product?.sold}</p>
        </div>
        <div className="category">
          <h2 className="font-bold text-18 md:text-20 lg:text-24">Category</h2>
          <p className="text-14 md:text-16 opacity-60">
            {product?.category?.name}
          </p>
        </div>
        <div className="quintiy">
          <h2 className="font-bold text-18 md:text-20 lg:text-24">Quantity</h2>
          <p className="text-14 md:text-16 opacity-60">{product?.quantity}</p>
        </div>
      </div>
      <Button
        classname="w-full lg:w-1/2 py-10 rounded-2xl bg-black text-white"
        name={
          isClicked ? <span className="loaderWishlist"></span> : 'Add to cart'
        }
        onclick={() => {
          HandleAddToCart(product?._id);
        }}
      />
    </div>
  );
}
