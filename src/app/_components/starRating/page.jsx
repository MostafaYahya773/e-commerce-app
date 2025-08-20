'use client';

import { usePathname } from 'next/navigation';
export default function StarRating({ rate }) {
  const pathname = usePathname();

  const fullStars = Math.floor(rate);
  const halfStar = rate % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <i
          key={`full-${i}`}
          className="fa-solid fa-star text-star-color text-12"
        ></i>
      ))}
      {halfStar === 1 && (
        <i className="fa-solid fa-star-half-stroke text-star-color text-12"></i>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <i
          key={`empty-${i}`}
          className="fa-regular fa-star text-star-color text-12"
        ></i>
      ))}
      <span
        className={` ${
          pathname === '/WishList' && 'hidden'
        } text-14 font-roboto ms-5`}
      >
        <span className="text-black opacity-100">{rate}</span>/
        <span className="opacity-40">5</span>
      </span>
    </>
  );
}
