'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useUsedOrders(CardId) {
  // create the function to use fetch
  const queryClient = useQueryClient();

  const getData = () => {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/6500c8604bb5270034f2012b`
      )
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
    onSuccess: () => {
      queryClient.invalidateQueries(['UserOrder']);
    },
  });
  return data;
}
