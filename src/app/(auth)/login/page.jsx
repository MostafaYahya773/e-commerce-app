'use client';
import AuthSocail from '@/app/_components/authSocail/page';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
export default function Login() {
  const router = useRouter();
  const [type, setType] = useState('password');
  const schemaValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formInfo = [
    { type: 'email', placeholder: 'Email', name: 'email' },
    { type: type, placeholder: 'Password', name: 'password' },
  ];

  const handleSwitchPassType = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  const signInForm = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schemaValidation,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      try {
        const res = await signIn('credentials', {
          redirect: false,
          email: values.email,
          password: values.password,
        });
        if (res?.ok) {
          toast.success('Login successful');
        } else {
          setErrors({ general: res?.error || 'Login failed' });
          toast.error(res?.error || 'Login failed');
        }
      } catch (error) {
        setErrors({ general: error.message || 'Something went wrong' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="mb-150 lg:mb-80 md:mt-100 mt-70 lg:mt-0 flex justify-center items-center w-full lg:h-screen mx-auto px-10 font-roboto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full lg:w-[1000px] bg-bg-products rounded-md p-10">
        <div
          className="img bg-cover bg-no-repeat bg-center rounded-md h-300 md:h-full"
          style={{ backgroundImage: `url(/images/loginImg.png)` }}
        ></div>
        <div className="form flex flex-col justify-center gap-y-10 md:px-40 ">
          <div className="title flex flex-col gap-y-5">
            <h1 className="font-bold text-24 ">Login</h1>
            <div className="signup flex text-14 opacity-70 font-light tracking-wide">
              <p>don't have an account?</p>
              <Link href={'/signup'} className="text-center ms-4 underline">
                Signup
              </Link>
            </div>
          </div>
          <div className="form">
            <form onSubmit={signInForm.handleSubmit}>
              <div className="formInfo flex flex-col gap-y-10">
                {signInForm.errors.general && (
                  <span className="text-12 text-descount-color">
                    {signInForm.errors.general}
                  </span>
                )}
                {formInfo.map((info) => (
                  <div className="input flex flex-col relative" key={info.name}>
                    <input
                      name={info.name}
                      value={signInForm.values[info.name]}
                      onChange={signInForm.handleChange}
                      type={info.type}
                      placeholder={info.placeholder}
                      className="p-10 border outline-none border-opacity-20 border-black focus:border-opacity-50 rounded-md"
                    />
                    {info.name === 'password' && (
                      <span
                        onClick={handleSwitchPassType}
                        className="absolute text-12 right-10 top-15 cursor-pointer opacity-50"
                      >
                        <i className="fa-solid fa-eye-slash"></i>
                      </span>
                    )}
                  </div>
                ))}
                <span className="forget text-12 ms-auto opacity-50">
                  <Link href={'/ForgetPassword'}>Forget Password</Link>
                </span>
                <div className="btn flex flex-col gap-y-5">
                  <button
                    type="submit"
                    disabled={signInForm.isSubmitting}
                    className="bg-black text-white py-7 rounded-md"
                  >
                    {signInForm.isSubmitting ? (
                      <span className="loaderWishlist"></span>
                    ) : (
                      'Login'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex items-center w-full mb-4 opacity-50">
            <hr className="flex-grow border-opacity-50 border-black" />
            <span className="mx-10 font-medium">Or</span>
            <hr className="flex-grow border-opacity-50 border-black" />
          </div>
          <div className="socialmedia">
            <AuthSocail />
          </div>
        </div>
      </div>
    </div>
  );
}
