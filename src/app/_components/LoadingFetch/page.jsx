import Image from 'next/image';
import React from 'react';

export default function LoadingFetch() {
  return (
    <div className="fixed w-full h-full flex justify-center items-center bg-[#00000042] z-[100] top-0 left-0 right-0 bottom-0">
      <Image
        src={'/animation.svg'}
        width={300}
        height={300}
        alt="loading"
        priority
      />
    </div>
  );
}
