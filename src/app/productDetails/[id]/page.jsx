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

  const NewSuggestion = useMemo(() => {
    return suggestionProducts?.data
      ?.filter((item) =>
        item.category.name.includes(product?.data?.category.name)
      )
      .slice(0, 4);
  }, [product, suggestionProducts]);

  if (!product) return <LoadingAnimation />;

  return (
    <div className="flex flex-col gap-y-30 px-20 md:px-10 mt-50 md:mt-80">
      <div className="path">Product Details</div>
      <div className="product-details flex flex-col gap-y-80">
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
            type={'products'}
          />
        </div>
      </div>
    </div>
  );
}
