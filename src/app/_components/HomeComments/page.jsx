import React from 'react';
import StarRating from '../starRating/page';

const HomeComments = React.memo(({ item }) => {
  return (
    <div className="comment-display p-20 border border-opacity-10 border-black rounded-lg">
      <div className="rate flex items-center gap-7">
        <StarRating rate={item?.rating} />
      </div>

      <div className="name flex items-center gap-5">
        <h2 className="font-bold text-20 font-roboto">{item?.name}.</h2>
        <i className={`${item?.mark} text-verfied-color`}></i>
      </div>

      <div className="comment">
        <p className="text-16 opacity-60">{item?.comment}</p>
      </div>
    </div>
  );
});

export default HomeComments;
