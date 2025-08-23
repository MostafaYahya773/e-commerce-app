import { usePathname } from 'next/navigation';
import React, { memo } from 'react';

const CustomHero = memo(({ img, title }) => {
  const path = usePathname();

  return (
    <div className="bg-bg-secondry relative rounded-lg font-roboto">
      <div className="absolute rounded-lg p-10 w-full h-full bg-[#00000070] text-white backdrop-blur-[2px] flex items-center justify-center">
        <h1
          className={`${
            path.includes('viewProduct')
              ? 'text-20 md:text-25 lg:text-48'
              : 'text-32'
          } font-archivo text-center`}
        >
          {title}
        </h1>
      </div>
      <div
        className="img object-cover bg-cover bg-no-repeat bg-[center_45%] h-200 md:h-300 "
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    </div>
  );
});

export default CustomHero;
