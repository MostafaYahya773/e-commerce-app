import { usePathname } from 'next/navigation';
import React, { memo } from 'react';

const CustomHero = memo(({ img, title, subtitle }) => {
  const path = usePathname();

  return (
    <div className="bg-bg-secondry rounded-2xl font-roboto relative w-screen left-1/2 -translate-x-1/2">
      <div className="absolute  p-10 w-full h-full bg-[#00000058] text-white backdrop-blur-[1px] flex flex-col items-center justify-center">
        <h1 className="text-18 md:text-32 lg:text-48 font-archivo text-center tracking-wide md:tracking-widest">
          {title}
        </h1>
        <p className="opacity-90 trac tracking-wide md:tracking-wider font-light text-center text-10 sm:text-14 md:text-16">
          {subtitle}
        </p>
      </div>
      <div
        className="img object-cover bg-cover bg-no-repeat bg-[center_45%] h-300 md:h-500 "
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    </div>
  );
});

export default CustomHero;
