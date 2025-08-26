'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UserContext } from '@/context/useContext';
import { useContext } from 'react';
export default function useWishlist() {
  // create the function to use fetch
  const queryClient = useQueryClient();
  // get token from context
  const { token } = useContext(UserContext);

  const getData = (id) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
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
    mutationKey: ['wishlist'],
    mutationFn: getData,
    select: (data) => data?.data,
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']);
    },
  });
  return data;
}
