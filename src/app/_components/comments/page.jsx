import React, { useContext } from 'react';
import SwitchSliderSwiper from '../SwitchSliderSwiper/page';
import { UserContext } from '@/context/useContext';

export default function Comments() {
  const { comments } = useContext(UserContext);

  return (
    <div>
      <SwitchSliderSwiper
        path="/"
        comments={comments}
        spaceBetween={20}
        arrows={false}
        dots={true}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
      />
    </div>
  );
}
