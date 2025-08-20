'use client';
import React, { useState } from 'react';
import Button from '../button/page';
import ProductsReview from '../ProductsReview/page';
import ProductFAQ from '../ProductFAQ/page';
export default function ProductsRecommended() {
  const [isclicked, setIsClicked] = useState('Rating & Reviews');
  const [isSelected, setIsSelected] = useState('Rating & Reviews');
  const titleName = ['Rating & Reviews', 'FAQs'];
  return (
    <div className="flex flex-col gap-20">
      <div className="titls grid grid-cols-2 place-items-center border-b border-opacity-50 border-black *:text-16 *:md:text-20">
        {titleName.map((item, index) => (
          <Button
            key={index}
            classname={`${
              isSelected === item
                ? ' opacity-100 text-black border-b-2  pb-20 border-black'
                : 'opacity-50'
            }
             text-16  w-full md:text-20`}
            onclick={() => {
              setIsClicked(item);
              setIsSelected(item);
            }}
            name={item}
          />
        ))}
      </div>
      <div className="results">
        <div
          className={`${isclicked === 'Rating & Reviews' ? 'block' : 'hidden'}`}
        >
          <ProductsReview />
        </div>
        <div className={`${isclicked === 'FAQs' ? 'block' : 'hidden'}`}>
          <ProductFAQ />
        </div>
      </div>
    </div>
  );
}
