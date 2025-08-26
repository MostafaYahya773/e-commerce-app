'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UserContext } from '@/context/useContext';
import { useContext } from 'react';
export default function useDeleteProduct() {
  // create the function to use fetch
  const queryClient = useQueryClient();
  // get token from context
  const { token } = useContext(UserContext);

  const getData = (id) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/Cart/${id}`, {
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
  const data = useMutation({
    mutationKey: ['DeleteProduct'],
    mutationFn: getData,
    select: (data) => data?.data,
    onSuccess: () => {
      queryClient.invalidateQueries(['Cart']);
    },
  });
  return data;
}
