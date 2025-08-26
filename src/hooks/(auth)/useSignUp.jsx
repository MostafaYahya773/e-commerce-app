'use client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function useSignUp() {
  const getData = (data) => {
    return axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
      .then((response) => {
        return response;
      })
      .catch((reject) => {
        throw reject;
      });
  };
  const data = useMutation({
    mutationKey: ['signup'],
    mutationFn: getData,
    select: (data) => data?.data,
  });
  return data;
}
