import Image from 'next/image';
import React from 'react';
export default function LoadingAnimation() {
  return (
    <div>
      <div className="flex justify-center items-center w-full h-full">
        <Image
          src={'/animation.svg'}
          width={300}
          height={300}
          alt="loading"
          loading="lazy"
        />
      </div>
    </div>
  );
}
