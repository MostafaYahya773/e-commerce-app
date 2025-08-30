'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '@/context/useAuth';
export default function useCart() {
  // create the function to use fetch
  const queryClient = useQueryClient();
  // get token from context
  const { token } = useContext(authContext);

  const getData = (id) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/Cart`,
        {
          productId: id,
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
    mutationKey: ['Cart'],
    mutationFn: getData,
    select: (data) => data?.data,
    onSuccess: () => {
      queryClient.invalidateQueries(['Cart']);
    },
  });
  return data;
}
