'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '@/context/useAuth';
export default function useOnlineOrder(CardId) {
  // create the function to use fetch
  const queryClient = useQueryClient();
  // get token from context
  const { token } = useContext(authContext);

  const getData = (data) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CardId}?url=http://localhost:3000`,
        {
          shippingAddress: data?.data,
        },
        {
          headers: {
            token,
          },
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
    mutationKey: ['OnlineOrder'],
    mutationFn: getData,
    select: (data) => data?.data,
    onSuccess: () => {
      queryClient.invalidateQueries(['OnlineOrder']);
    },
  });
  return data;
}
