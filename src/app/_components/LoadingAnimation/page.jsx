import Image from 'next/image';
import React from 'react';
export default function LoadingAnimation() {
  return (
    <div>
      <div className="flex justify-center items-center mb-100 w-full h-screen">
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
