'use client';
import { useEffect, useContext, useMemo } from 'react';
import useRequest from '@/hooks/useRequest';
import Hero from './_components/hero/hero';
import HomeSections from './_components/homeSections/page';
import Browse from './_components/Browse/page';
import Comments from './_components/comments/page';
import LoadingAnimation from './_components/LoadingAnimation/page';
import useCart from '@/hooks/(cart)/useCart';
import useWishlist from '@/hooks/(wishList)/useWishlist';

export default function Home() {
  // get all products
  const { data, isLoading } = useRequest('products');
  // add to cart
  const { mutate: addToCart } = useCart();
  //add to wishlist
  const { mutate: addToWishlist } = useWishlist();
  // filter data
  const newArrivalsData = useMemo(() => data?.data.slice(18, 22), [data]);
  const topSellingData = useMemo(() => data?.data.slice(4, 8), [data]);
  // check if data is loading
  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="flex flex-col gap-y-100">
      <div className="hero mb-50 sm:pb-50 md:pb-0">
        <Hero />
      </div>
      <div>
        <div className="new-arrivals-section mt-50 pt-50 md:pt-20">
          <HomeSections
            title="New Arrivals"
            data={newArrivalsData}
            type={"Men's"}
            loading={isLoading}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
          />
        </div>
        <div className="top-selling-section mt-50 pt-20">
          <HomeSections
            title="Top Selling"
            data={topSellingData}
            type={"Women's"}
            loading={isLoading}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
          />
        </div>
        <div className="mt-50 pt-20">
          <Browse />
        </div>
        <div className="mt-50 pt-20">
          <Comments />
        </div>
        <div className="mt-50 pt-20"></div>
      </div>
    </div>
  );
}
