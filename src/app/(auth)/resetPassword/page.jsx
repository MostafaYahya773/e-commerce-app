'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useForgetPassword from '@/hooks/(auth)/useForgetPassword';

export default function ResetPassword() {
  const router = useRouter();
  const { handleResetPassword } = useForgetPassword();

  const fields = [
    { name: 'email', placeholder: 'Email', type: 'email' },
    { name: 'newPassword', placeholder: 'New Password', type: 'password' },
  ];

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one special character'
      ),
  });

  const resetPassword = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      handleResetPassword.mutate(values, {
        onSuccess: (res) => {
          console.log(res);

          toast.success(res.data.message || 'Password updated successfully');
          setSubmitting(false);
          router.push('/login');
        },
        onError: (err) => {
          console.log(err);

          toast.error(err.response?.data?.message || 'Something went wrong');
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <div className="mb-150 lg:mb-80 mt-60 md:mt-80  mg:mt-50 flex justify-center md:items-center lg:items-start w-full min-h-screen mx-auto px-10 font-roboto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-[1000px] min-h-500 bg-bg-products rounded-md p-10">
        <div
          className="img bg-cover bg-no-repeat bg-center rounded-md h-300 md:h-full"
          style={{ backgroundImage: `url(/loginImg.png)` }}
        ></div>
        <div className="flex flex-col my-auto gap-y-10 md:px-40">
          <h1 className="font-bold text-32 lg:text-40 ">Reset Password</h1>
          <div className="form">
            <form
              onSubmit={resetPassword.handleSubmit}
              className="flex flex-col gap-5 w-full"
            >
              {fields.map((field) => (
                <div key={field.name}>
                  {resetPassword.touched[field.name] &&
                    resetPassword.errors[field.name] && (
                      <p className="text-descount-color text-12">
                        {resetPassword.errors[field.name]}
                      </p>
                    )}
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={resetPassword.values[field.name] || ''}
                    onChange={resetPassword.handleChange}
                    onBlur={resetPassword.handleBlur}
                    className="p-10 w-full border outline-none border-opacity-20 border-black focus:border-opacity-50 rounded-md"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="bg-black text-white py-7 rounded-md"
              >
                {resetPassword.isSubmitting ? (
                  <span className="loaderWishlist"></span>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
