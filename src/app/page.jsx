'use client';
import { useEffect, useContext, useMemo } from 'react';
import useRequest from '@/hooks/useRequest';
import Hero from './_components/hero/hero';
import HomeSections from './_components/homeSections/page';
import Browse from './_components/Browse/page';
import Comments from './_components/comments/page';
import LoadingAnimation from './_components/LoadingAnimation/page';
import BrandsImg from './_components/brandsImg/page';
// import useCart from '@/hooks/(cart)/useCart';
// import useWishlist from '@/hooks/(wishList)/useWishlist';

export default function Home() {
  // get all products
  const { data, isLoading } = useRequest('products');
  // filter new arrivals
  const newArrivalsData = useMemo(() => {
    if (!data?.data) return [];
    return [...data.data]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 33);
  }, [data]);
  // filter top sellning
  const topSellingData = useMemo(
    () => data?.data?.slice(0, 33).filter((item) => item?.ratingsAverage >= 4),
    [data]
  );

  // check if data is loading
  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="flex flex-col gap-y-50">
      <div className="hero">
        <Hero />
      </div>
      <div className="brands">
        <BrandsImg />
      </div>
      <div className="new-arrivals-section ">
        <HomeSections
          title="New Arrivals"
          data={newArrivalsData}
          type={'new arrivals'}
        />
      </div>
      <div className="top-selling-section ">
        <HomeSections
          title="Top Selling"
          data={topSellingData}
          type={'top selling'}
        />
      </div>
      <div className="browse">
        <Browse />
      </div>
      <div className="mt-50 mb-150 lg:mb-80 pt-20">
        <Comments />
      </div>
    </div>
  );
}
