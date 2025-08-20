'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useRequest(endPonts, id = '') {
  // create the function to use fetch
  const getData = () => {
    let headers = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDBjODYwNGJiNTI3MDAzNGYyMDEyYiIsImlhdCI6MTc1NTMxNTkyMywiZXhwIjoxNzYzMDkxOTIzfQ.gag7WC7H6YPEI7BTqYoLncl4JRIr2R5LVaXvIzRA27o',
    };
    const url = id
      ? `https://ecommerce.routemisr.com/api/v1/${endPonts}/${id}`
      : `https://ecommerce.routemisr.com/api/v1/${endPonts}`;
    return axios
      .get(url, { headers })
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
    enabled: id !== undefined,
    select: (data) => data?.data,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });
  return data;
}
