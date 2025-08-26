'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UserContext } from '@/context/useContext';
import { useContext } from 'react';
export default function useRequest(endPonts, id = '') {
  // get token from context
  const { token } = useContext(UserContext);
  const getData = () => {
    const url = id
      ? `https://ecommerce.routemisr.com/api/v1/${endPonts}/${id}`
      : `https://ecommerce.routemisr.com/api/v1/${endPonts}`;
    return axios
      .get(url, { headers: { token } })
      .then((response) => {
        return response;
      })
      .catch((reject) => {
        throw reject;
      });
  };
  const data = useQuery({
    queryKey: [endPonts, id],
    queryFn: getData,
    enabled: !!token,
    // enabled: id !== undefined,
    select: (data) => data?.data,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });
  return data;
}
