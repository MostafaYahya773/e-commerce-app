'use client';
import { UserContext } from '@/context/useContext';
import React, { use, useContext, useState } from 'react';
import StarRating from '../starRating/page';
import Button from '../button/page';
export default function ProductsReview() {
  const { comments } = useContext(UserContext);
  if (!comments) return <span className="loader"></span>;
  const [visibleComments, setvisibleComments] = useState(comments.slice(0, 3));

  return (
    <div className="flex flex-col gap-y-20 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10 ">
        {visibleComments?.map((item, index) => (
          <div
            key={index}
            className=" comment-display   p-20 border border-opacity-10 border-black rounded-lg"
          >
            <div className="rate flex items-center gap-7 ">
              <StarRating rate={item?.rating} />
            </div>
            <div className="name flex items-center gap-5 ">
              <h1 className="font-bold text-20 font-roboto">{item?.name}.</h1>
              <i className={`${item?.mark} text-verfied-color`}></i>
            </div>
            <div className="comment">
              <p className="text-16 opacity-60">{item?.comment}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        classname={` ${
          visibleComments?.length === comments?.length ? 'hidden' : ''
        } w-full md:w-1/2 lg:w-1/4 py-7 rounded-2xl border border-opacity-55 mx-auto hover:bg-black hover:text-white hover:duration-300`}
        onclick={() => setvisibleComments(comments)}
        name="View All"
      />
    </div>
  );
}
