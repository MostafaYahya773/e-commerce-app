'use client';
import HomeSections from '@/app/_components/homeSections/page';
import LoadingAnimation from '@/app/_components/LoadingAnimation/page';
import ProductDetailsHero from '@/app/_components/productDetailsHero/page';
import ProductsRecommended from '@/app/_components/ProductsRecommended/page';
import useRequest from '@/hooks/useRequest';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useRequest('products', id);
  const { data: suggestionProducts } = useRequest('products');
  const NewSuggestion = useMemo(
    () =>
      suggestionProducts?.data
        ?.slice(0, 33)
        .filter((item) => item?.ratingsAverage >= 4),
    [suggestionProducts]
  );

  if (!product) return <LoadingAnimation />;

  return (
    <div className="px-10 mt-50 md:mt-80 mb-10  0 lg:mb-80 flex flex-col gap-y-40">
      <div>
        <ProductDetailsHero product={product.data} />
      </div>
      <div>
        <ProductsRecommended />
      </div>
      <div>
        <HomeSections
          title="You might also like"
          data={NewSuggestion}
          loading={isLoading}
          type={'top selling'}
        />
      </div>
    </div>
  );
}
