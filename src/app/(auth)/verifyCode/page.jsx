'use client';
import React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useForgetPassword from '@/hooks/(auth)/useForgetPassword';
export default function VerifyCode() {
  const router = useRouter();
  //send data to api
  const { handleSendVerfiyCode } = useForgetPassword();
  // use formic
  const codeFormik = useFormik({
    initialValues: {
      resetCode: '',
    },

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      handleSendVerfiyCode.mutate(values, {
        onSuccess: () => {
          toast.success('Successfully');
          setSubmitting(false);
          router.push('/resetPassword');
        },
        onError: (e) => {
          setSubmitting(false);
          toast.error(e.response.data.message || 'Something went wrong');
        },
      });
    },
  });

  return (
    <div className="mb-150 lg:mb-80 md:mt-50 flex justify-center items-center w-full h-screen mx-auto px-10 font-roboto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-[1000px] min-h-500 bg-bg-products rounded-md p-10">
        <div
          className="img bg-cover bg-no-repeat bg-center rounded-md h-300 md:h-full"
          style={{ backgroundImage: `url(/loginImg.png)` }}
        ></div>
        <div className="form flex flex-col justify-center gap-y-10 md:px-40 ">
          <h1 className="font-bold text-24 ">Verify Code</h1>
          <div className="form">
            <form onSubmit={codeFormik.handleSubmit}>
              <div className="formInfo flex flex-col gap-y-10">
                <input
                  type="text"
                  name="resetCode"
                  value={codeFormik.values.resetCode}
                  onChange={codeFormik.handleChange}
                  onBlur={codeFormik.handleBlur}
                  placeholder="Enter your Code"
                  className="p-10 border outline-none border-opacity-20 border-black focus:border-opacity-50 rounded-md"
                  required
                />

                <button
                  type="submit"
                  className="bg-black text-white py-7 rounded-md"
                >
                  {codeFormik.isSubmitting ? (
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
