'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '@/context/useAuth';
export default function useWishlistData() {
  // create the function to use fetch
  const queryClient = useQueryClient();
  // get token from context
  const { token } = useContext(authContext);
  const getData = () => {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((reject) => {
        throw reject;
      });
  };
  const data = useQuery({
    queryKey: ['wishlistData'],
    queryFn: getData,
    select: (data) => data?.data,
    enabled: !!token,
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']);
    },
  });
  return data;
}
