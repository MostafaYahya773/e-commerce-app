'use client';
import { UserContext } from '@/context/useContext';
import useRequest from '@/hooks/useRequest';
import React, { useContext, useEffect, useState } from 'react';

export default function FilterByName({ type }) {
  //share my data
  const { setShareResult } = useContext(UserContext);
  // choise product
  const [choiseProduct, setChoiseProduct] = useState('');
  //get data from api
  const { data, isLoading } = useRequest('products');

  // firest filter i use it to filter by type [women or men]
  const dataType = data?.data.filter((item) =>
    item.category.name.includes(type)
  );

  // filter by filterByName
  const filterByName = [
    {
      name: 'T-Shirt',
      nameFilter: 'T-Shirt',
      id: '1',
      productType: "Men's",
    },

    {
      name: 'pullover',
      nameFilter: 'Sleeve Cardigan Sweater',
      id: '2',
      productType: "Men's & Women's",
    },
    {
      name: 'pants',
      nameFilter: 'Joggers Lilac Pants',
      id: '3',
      productType: "Men's & Women's",
    },
    {
      name: 'Socks',
      nameFilter: 'Socks',
      id: '4',
      productType: "Men's & Women's",
    },
    {
      name: 'Shawl ',
      nameFilter: 'Shawl',
      id: '5',
      productType: "Women's",
    },
    {
      name: 'Shoes',
      nameFilter: 'Shoes Boots React Live',
      id: '6',
      productType: "Men's",
    },
    {
      name: 'Hoodie & Tracks',
      nameFilter: 'Hoodie Track Softride EnzoSlim Fit Stand Colla',
      id: '7',
      productType: "Men's",
    },
    {
      name: 'Shirt',
      nameFilter: 'Shirt',
      id: '8',
      productType: "Men's",
    },
    {
      name: 'Pajamas',
      nameFilter: 'Pajamas',
      id: '9',
      productType: "Men's",
    },
  ];
  // filter by gender
  const filterbyProductType = filterByName.filter(
    (item) =>
      item.productType === type || item.productType === "Men's & Women's"
  );
  useEffect(() => {
    if (dataType?.length > 0) {
      setShareResult(dataType);
    }
  }, [data]);
  // get name of product
  const handleproduct = (item) => {
    // to set effect in click
    setChoiseProduct(item.name);
    // to change  arraystring to array to search
    let world = item.nameFilter.split(' ');
    // to filter by word
    const filterData = dataType?.filter((item) =>
      world?.some((word) =>
        item.title.toLowerCase().includes(word.toLowerCase().trim())
      )
    );
    // send result to context
    setShareResult(filterData);
  };
  return (
    <div className="listName flex flex-col gap-y-10">
      <ul className="flex flex-col gap-y-10">
        {filterbyProductType?.map((item) => (
          <li
            onClick={() => handleproduct(item)}
            className={`${
              choiseProduct === item.name
                ? 'bg-black text-white p-4 rounded-md'
                : 'cursor-pointer opacity-60'
            }  `}
            key={item.id}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
