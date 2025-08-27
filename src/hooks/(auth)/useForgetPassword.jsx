'use client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function useForgetPassword() {
  // send email
  const sendEmail = (data) =>
    axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      data
    );

  const verifyEmail = (data) =>
    axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      data
    );

  const resetPassword = (data) =>
    axios.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      data
    );

  const handleSendEmail = useMutation({
    mutationKey: ['sendEmail'],
    mutationFn: sendEmail,
    select: (data) => data?.data,
  });

  const handleSendVerfiyCode = useMutation({
    mutationKey: ['verifyEmail'],
    mutationFn: verifyEmail,
    select: (data) => data?.data,
  });
  const handleResetPassword = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: resetPassword,
    select: (data) => data?.data,
  });

  return { handleSendEmail, handleSendVerfiyCode, handleResetPassword };
}
