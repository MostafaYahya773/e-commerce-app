'use client';

import React from 'react';
import ProductDetailsInfo from '../ProductDetailsInfo/page';
import SwitchSliderSwiper from '../SwitchSliderSwiper/page';
import LoadingAnimation from '../LoadingAnimation/page';

export default function ProductDetailsHero({ product }) {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-[auto_1fr] gap-15 lg:gap-20  ">
      <div className="img max-w-[380px] md:max-w-[400px] lg:w-[450px] ">
        <SwitchSliderSwiper
          path="/productDetails"
          images={product?.images}
          spaceBetween={20}
          arrows={false}
          dots={true}
          breakpoints={{
            480: { slidesPerView: 1 },
          }}
        />
      </div>
      <div className="details">
        <ProductDetailsInfo product={product} />
      </div>
    </div>
  );
}
