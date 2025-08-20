'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useUpdateCount() {
  // create the function to use fetch
  const queryClient = useQueryClient();

  const getData = ({ id, count }) => {
    let headers = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDBjODYwNGJiNTI3MDAzNGYyMDEyYiIsImlhdCI6MTc1NTMxNTkyMywiZXhwIjoxNzYzMDkxOTIzfQ.gag7WC7H6YPEI7BTqYoLncl4JRIr2R5LVaXvIzRA27o',
    };
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/Cart/${id}`,
        {
          count,
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
    mutationKey: ['updataCount'],
    mutationFn: getData,
    select: (data) => data?.data,
    onSuccess: () => {
      queryClient.invalidateQueries(['Cart']);
    },
  });
  return data;
}
