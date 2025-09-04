'use client';
import React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useForgetPassword from '@/hooks/(auth)/useForgetPassword';
export default function ForgetPassword() {
  const router = useRouter();
  //send data to api
  const { handleSendEmail } = useForgetPassword();

  // use formic
  const emailFormik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      handleSendEmail.mutate(values, {
        onSuccess: (e) => {
          toast.success(e.data.message || 'check your email');
          setSubmitting(false);
          router.push('/verifyCode');
        },
        onError: (e) => {
          toast.error(e.response.data.message || 'Something went wrong');
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <div className="mb-150 lg:mb-80 flex justify-center items-center w-full h-screen mx-auto px-10 font-roboto">
      <div className="grid grid-rows-[auto_auto] gap-10 w-500  bg-bg-products rounded-md p-10">
        <div
          className="img bg-cover bg-no-repeat bg-center rounded-md h-300"
          style={{ backgroundImage: `url(images/loginImg.png)` }}
        ></div>
        <div className="form flex flex-col  gap-y-10  ">
          <div className="title flex flex-col gap-y-0">
            <h1 className="font-bold text-24 ">Forget password</h1>
            <p className="opacity-70 text-14">
              Enter your email to reset your password
            </p>
          </div>
          <div className="form">
            <form onSubmit={emailFormik.handleSubmit}>
              <div className="formInfo flex flex-col gap-y-10">
                <input
                  type="email"
                  name="email"
                  value={emailFormik.values.email}
                  onChange={emailFormik.handleChange}
                  onBlur={emailFormik.handleBlur}
                  placeholder="Enter your email"
                  className="p-10 border outline-none border-opacity-20 border-black focus:border-opacity-50 rounded-md"
                  required
                />

                <button
                  type="submit"
                  className="bg-black text-white py-7 rounded-md"
                >
                  {emailFormik.isSubmitting ? (
                    <span className="loaderWishlist"></span>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
