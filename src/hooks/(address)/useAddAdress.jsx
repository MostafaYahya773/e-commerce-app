'use client';
import { UserContext } from '@/context/useContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

export default function useAddAdress() {
  // create the function to use fetch
  const queryClient = useQueryClient();
  // get token from context
  const { token } = useContext(UserContext);

  const getData = (values) => {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/addresses`, values, {
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
    mutationKey: ['Address'],
    mutationFn: getData,
    select: (data) => data?.data,
    onSuccess: () => {
      queryClient.invalidateQueries(['Address']);
    },
  });
  return data;
}
