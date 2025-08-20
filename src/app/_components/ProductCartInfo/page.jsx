'use client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import useDeleteProduct from '@/hooks/(cart)/useDeleteProduct';
import toast from 'react-hot-toast';
import useUpdateCount from '@/hooks/(cart)/useUpdateCount';
import { usePathname } from 'next/navigation';

export default function ProductCartInfo({ data }) {
  const path = usePathname();
  // animation while updating
  const { mutate: deleteProduct } = useDeleteProduct();
  // to update count
  const { mutate: updateCount } = useUpdateCount();
  //to stop rerender
  const products = useMemo(() => data?.data?.products || [], [data]);
  // get id to count
  const [id, setId] = useState(null);
  // get id to delete
  const [idToDelete, setIdToDelete] = useState(null);
  // function to delete product by id
  const HandleDeleteCart = (id) => {
    setIdToDelete(id);
    deleteProduct(id, {
      onSuccess: () => {
        setIdToDelete(null);
        toast.success(`Product deleted successfully`);
      },
      onError: (e) => {
        toast.error(e.data.status);
      },
    });
  };
  // function to update count
  const HandleUpdateCount = (id, count) => {
    // set id in state
    setId(id);
    updateCount(
      { id, count },
      {
        onSuccess: (e) => {
          // onsuccess to delete id from state
          setId(null);
        },
        onError: (e) => {
          toast.error(e.response.data.message);
        },
      }
    );
  };

  return (
    <div className={'font-roboto gap-20 md:gap-10 '}>
      <div className="AllProducts flex flex-col gap-y-10 border px-10 border-opacity-20 rounded-xl border-black">
        {products.map((product) => (
          <div
            key={product?.product?._id}
            className={`flex gap-x-20 border-b border-opacity-20 border-black py-20 last:border-0 `}
          >
            <div className="img">
              <Image
                width={100}
                height={100}
                src={product?.product?.imageCover || '/animation.svg'}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="img"
              />
            </div>
            <div className="productDetails flex flex-col gap-y-10 w-full">
              <div className="Productname flex gap-x-10 justify-between items-start md:items-center *:md:w-1/2">
                <h1 className="font-bold text-16 md:text-18 ">
                  {product?.product?.title.split(' ').slice(0, 3).join(' ') ||
                    'loading'}
                </h1>
                <div className="del__wishlist flex gap-7 justify-end">
                  <button
                    onClick={() => HandleDeleteCart(product?.product?._id)}
                    className={`${
                      path === '/Cart' ? 'block' : 'hidden'
                    } delItem`}
                  >
                    <span className="hidden sm:flex md:text-12 w-[130px] px-10 py-4 bg-black text-white rounded-2xl  items-center justify-center ">
                      {idToDelete === product?.product?._id ? (
                        <span className="loaderWishlist"></span>
                      ) : (
                        <span className="text-12">delete From Cart</span>
                      )}
                    </span>
                    <i
                      className="block sm:hidden fa-solid fa-trash cursor-pointer opacity-60 mt-7"
                      title="delete this product"
                    ></i>
                  </button>
                  <span
                    className={`${
                      path === '/Cart' ? 'hidden' : 'block'
                    } bg-black text-white px-10 py-1 rounded-md`}
                  >
                    {product?.count}
                  </span>
                </div>
              </div>
              <div className="productInfo flex flex-col gap-2  gap-x-10">
                <div className="brand">
                  <h2 className="text-14 font-semibold">
                    Brand:{' '}
                    <span className="opacity-70 font-light ms-2">
                      {product?.product?.brand?.name}
                    </span>
                  </h2>
                </div>
                <div className="category">
                  <h2 className="text-14 font-semibold">
                    Category:{' '}
                    <span className="opacity-70 font-light ms-2">
                      {product?.product?.category?.name}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="Productprice flex justify-between items-start md:items-center">
                <div className="price">
                  <h1 className="font-bold text-16 md:text-20">
                    ${product?.price}
                  </h1>
                </div>
                <div
                  className={`${
                    path === '/Cart' ? 'block' : 'hidden'
                  } counter flex `}
                >
                  <button
                    aria-label="count down"
                    onClick={() =>
                      HandleUpdateCount(
                        product?.product?._id,
                        product?.count - 1
                      )
                    }
                    className="px-12 py-2 font-bold bg-bg-products rounded-s-xl"
                  >
                    <i
                      className={`${
                        product?.count === 1
                          ? 'fa-solid fa-trash text-15 opacity-70'
                          : 'fa-solid fa-minus text-10'
                      } `}
                    ></i>
                  </button>
                  <span className="text-15 font-semibold py-5 px-10">
                    {id === product?.product?._id ? (
                      <span className="loaderCount"></span>
                    ) : (
                      product?.count
                    )}
                  </span>
                  <button
                    aria-label="count up"
                    onClick={() =>
                      HandleUpdateCount(
                        product?.product?._id,
                        product?.count + 1
                      )
                    }
                    className="px-15 py-2 text-25 font-bold bg-bg-products rounded-e-xl"
                  >
                    <i className="fa-solid fa-plus text-10"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
