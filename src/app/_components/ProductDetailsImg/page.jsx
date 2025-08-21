import Image from 'next/image';
import React from 'react';

const ProductDetailsImg = React.memo(({ item, index }) => {
  return (
    <div className="rounded-2xl relative">
      <Image
        src={item}
        width={300}
        height={300}
        alt="img"
        className="rounded-2xl mx-auto"
        loading={index === 0 ? 'eager' : 'lazy'}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
});

export default ProductDetailsImg;
