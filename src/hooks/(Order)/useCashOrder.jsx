'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useCashOrder(CardId) {
  // create the function to use fetch
  const queryClient = useQueryClient();

  const getData = (data) => {
    let headers = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDBjODYwNGJiNTI3MDAzNGYyMDEyYiIsImlhdCI6MTc1NTMxNTkyMywiZXhwIjoxNzYzMDkxOTIzfQ.gag7WC7H6YPEI7BTqYoLncl4JRIr2R5LVaXvIzRA27o',
    };
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${CardId}`,
        {
          shippingAddress: data?.data,
        },
        {
          headers,
        }
      )
      .then((response) => {
        return response;
      })
      .catch((reject) => {
        throw reject;
      });
  };
  const data = useMutation({
    mutationKey: ['CashOrder'],
    mutationFn: getData,
    select: (data) => data?.data,
    onSuccess: () => {
      queryClient.invalidateQueries(['CashOrder']);
    },
  });
  return data;
}
