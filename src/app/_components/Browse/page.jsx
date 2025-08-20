'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Browse() {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Mens',
      image: '/mens-fashion.png',
      fullWidth: false,
      href: { pathname: `/Category/Men's` },
    },
    {
      id: 2,
      title: 'Women',
      image: '/women-fashion.png',
      fullWidth: false,
      href: { pathname: `/Category/Women's` },
    },
  ]);
  return (
    <div className="bg-bg-secondry w-full min-h-300 px-45 py-30 rounded-[40px] mb-20">
      <div className="title mb-40">
        <h1 className="font-archivo text-32 lg:text-48 text-center">
          BROWSE BY STYLE
        </h1>
      </div>
      <div className="women__mens grid grid-cols-1 md:grid-cols-2 gap-20 p-5 rounded-lg">
        {cards.map((card) => (
          <Link
            href={card.href}
            key={card.id}
            className="bg-white h-300 overflow-hidden p-10 grid grid-cols-2 rounded-3xl"
          >
            <div className="title">
              <h1 className="text-24 lg:text-36 font-bold font-roboto">
                {card.title}
              </h1>
            </div>
            <div
              className="img w-full scale-150 h-auto bg-[100%_10%] bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${card.image})` }}
            ></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
