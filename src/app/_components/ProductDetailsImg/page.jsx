import Image from 'next/image';
import React from 'react';

const ProductDetailsImg = React.memo(({ item, index }) => {
  return (
    <div className="rounded-2xl h-[250px]  md:h-[300px] lg:h-[350px] relative">
      <Image
        src={item}
        fill
        alt="img"
        className="rounded-2xl"
        loading={index === 0 ? 'eager' : 'lazy'}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
});

export default ProductDetailsImg;
