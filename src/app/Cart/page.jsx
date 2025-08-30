'use client';
import useRequest from '@/hooks/useRequest';
import ProductCartInfo from '../_components/ProductCartInfo/page';
import Pay from '../_components/Pay/page';
import Link from 'next/link';
import LoadingAnimation from '../_components/LoadingAnimation/page';
import EmptyProducts from '../_components/EmptyProducts/page';
import useDeleteCart from '@/hooks/(cart)/useDeleteCart';
import LoadingFetch from '../_components/LoadingFetch/page';
import { usePathname } from 'next/navigation';

export default function Cart() {
  //get pathname
  const path = usePathname();
  //get data of cart
  const { data, isLoading } = useRequest('cart');
  // delete all data from cart
  const { mutate: clearDataFromCart } = useDeleteCart();
  if (isLoading) return <LoadingAnimation />;
  // check if product exist
  if (data?.data?.products?.length === 0)
    return (
      <EmptyProducts src={'/cartEmpty.png'} message={'Your cart is empty'} />
    );

  const handleClearData = () => {
    clearDataFromCart();
  };
  return (
    <div
      className={`${
        path === '/Cart' ? 'mt-50 md:mt-80 mb-150 lg:mb-80' : ''
      } flex flex-col gap-y-10 px-10`}
    >
      <div className="title flex justify-between items-center">
        <h1 className="font-bold text-16 md:text-20">
          Your {path === '/Cart' ? 'Cart' : 'Order'}
        </h1>
        <div
          className={`${
            path === '/Cart' ? 'block' : 'hidden'
          } flex gap-x-10 items-center`}
        >
          <Link
            className="flex items-center justify-center sm:justify-start underline"
            href={'/'}
          >
            <button className="text-14 md:text-16 flex items-center justify-center py-4 px-10 ">
              <p>Contnue shopping </p>
            </button>
          </Link>
          <button
            onClick={() => handleClearData()}
            className="text-14 underline md:text-16 flex items-center justify-center py-4 px-10 "
          >
            <p>Delete All</p>
          </button>
        </div>
      </div>
      <div
        className={`${
          path === '/Cart'
            ? 'grid-cols-1 md:grid-cols-[2fr_1fr]'
            : 'grid-cols-1 '
        } grid gap-20 relative`}
      >
        <div className="mb-5">
          <ProductCartInfo data={data} />
        </div>
        <div className={`${path === '/Cart' ? 'block' : 'hidden'} pay`}>
          <Pay Total={data} />
        </div>
      </div>
    </div>
  );
}
