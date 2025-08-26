'use client';

import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Virtual } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useInView } from 'react-intersection-observer';

const ProductDetailsImg = dynamic(() => import('../ProductDetailsImg/page'), {
  ssr: false,
});
const HomeComments = dynamic(() => import('../HomeComments/page'), {
  ssr: false,
});

export default function SwitchSliderSwiper({
  images,
  comments,
  path,
  spaceBetween,
  arrows,
  dots,
  breakpoints,
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const modules = [Virtual];
  if (arrows) modules.push(Navigation);
  if (dots) modules.push(Pagination);

  const isHome = path === '/';
  const slides = isHome ? comments : images;

  return (
    <div ref={ref} className="flex flex-col ">
      {inView && (
        <Swiper
          className="w-full"
          modules={modules}
          spaceBetween={spaceBetween}
          breakpoints={breakpoints}
          centeredSlides={false}
          navigation={arrows}
          pagination={dots ? { clickable: true } : false}
          virtual
        >
          {slides?.map((item, index) => (
            <SwiperSlide
              key={item?._id || index}
              virtualIndex={index}
              className="w-full h-auto"
            >
              {isHome ? (
                <HomeComments item={item} />
              ) : (
                <ProductDetailsImg item={item} index={index} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
