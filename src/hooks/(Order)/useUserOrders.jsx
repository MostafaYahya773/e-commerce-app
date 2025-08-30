'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '@/context/useAuth';
export default function useUsedOrders() {
  // create the function to use fetch
  const queryClient = useQueryClient();
  // get token from context
  const { userId } = useContext(authContext);

  const getData = () => {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((response) => {
        return response;
      })
      .catch((reject) => {
        throw reject;
      });
  };
  const data = useQuery({
    queryKey: ['UserOrder'],
    queryFn: getData,
    select: (data) => data?.data,
    enabled: !!userId,
    onSuccess: () => {
      queryClient.invalidateQueries(['UserOrder']);
    },
  });
  return data;
}
