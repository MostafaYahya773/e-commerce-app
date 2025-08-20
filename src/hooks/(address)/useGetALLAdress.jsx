'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetALLAdress() {
  // create the function to use fetch
  const queryClient = useQueryClient();

  const getData = () => {
    let headers = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDBjODYwNGJiNTI3MDAzNGYyMDEyYiIsImlhdCI6MTc1NTMxNTkyMywiZXhwIjoxNzYzMDkxOTIzfQ.gag7WC7H6YPEI7BTqYoLncl4JRIr2R5LVaXvIzRA27o',
    };
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/addresses`, {
        headers,
      })
      .then((response) => {
        return response;
      })
      .catch((reject) => {
        throw reject;
      });
  };
  const data = useQuery({
    queryKey: ['AllAddress'],
    queryFn: getData,
    select: (data) => data?.data,
    onSuccess: () => {
      queryClient.invalidateQueries(['AllAddress']);
    },
  });
  return data;
}
