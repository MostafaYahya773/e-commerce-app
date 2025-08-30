'use client';
import AuthSocail from '@/app/_components/authSocail/page';
import useSignUp from '@/hooks/(auth)/useSignUp';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
export default function Signup() {
  //send data to api
  const { mutate: signUp } = useSignUp();
  //use router
  const router = useRouter();
  //use yup to validate data
  const schemaValidation = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .max(30, 'Must be at most 30 characters')
      .required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    rePassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    phone: Yup.string()
      .required('Phone Number is required')
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, 'Must be egyptian number'),
  });
  //use formic to sign up
  const formicData = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: (data) => {
      signUp(data, {
        onSuccess: (e) => {
          console.log(e.data.message);
          toast.success(e?.data?.message);
          router.push('/login');
        },
        onError: (e) => {
          console.log(e?.response);
          toast.error(e?.response?.data?.message);
        },
      });
    },
    validationSchema: schemaValidation,
  });
  //switch to show and hide password
  const [type, setType] = useState('password');
  const formInfo = [
    { type: 'text', placeholder: 'Full Name', name: 'name' },
    { type: 'email', placeholder: 'Email', name: 'email' },
    {
      type: type,
      placeholder: 'Password',
      name: 'password',
      newName: 'password',
    },
    {
      type: type,
      placeholder: 'Confirm Password',
      name: 'rePassword',
      newName: 'Password',
    },
    { type: 'tel', placeholder: 'Phone Number', name: 'phone' },
  ];
  //handle switch type
  const handleSwitchPassType = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <div className="mb-150 lg:mb-80 mt-60 md:mt-80  mg:mt-50 flex justify-center md:items-center lg:items-start w-full min-h-screen mx-auto px-10 font-roboto">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10 w-[1000px] h-fit bg-bg-products rounded-md p-10">
        <div
          className="img bg-cover bg-no-repeat bg-center rounded-md h-300 md:h-full"
          style={{ backgroundImage: `url(/images/loginImg.png)` }}
        ></div>
        <div className="form flex flex-col justify-center gap-y-10 md:px-40 ">
          <div className="title flex flex-col gap-y-5">
            <h1 className="font-bold text-24">Create an account</h1>
            <div className="signup flex text-14 opacity-70 font-light tracking-wide">
              <p>Already have an account?</p>
              <Link href={'/login'} className="text-center ms-4 underline">
                login
              </Link>
            </div>
          </div>
          <div className="form">
            <form onSubmit={formicData.handleSubmit}>
              <div className="formInfo flex flex-col gap-y-10">
                {formInfo.map((info) => (
                  <div className="input flex flex-col relative" key={info.name}>
                    {formicData.touched[info.name] &&
                      formicData.errors[info.name] && (
                        <span className="text-descount-color text-12">
                          {formicData.errors[info.name]}
                        </span>
                      )}
                    <input
                      name={info.name}
                      value={formicData.values[info.name]}
                      onChange={formicData.handleChange}
                      onBlur={formicData.handleBlur}
                      type={info.type}
                      placeholder={info.placeholder}
                      className=" p-10 border outline-none border-opacity-20 border-black focus:border-opacity-50 rounded-md"
                    />
                    <span
                      onClick={handleSwitchPassType}
                      className={`${
                        info.newName === 'password' ||
                        info.newName === 'Password'
                          ? 'absolute text-12 right-10 top-15 cursor-pointer opacity-50'
                          : 'hidden'
                      }`}
                    >
                      <i className="fa-solid fa-eye-slash"></i>
                    </span>
                  </div>
                ))}
                <div className="btn flex flex-col gap-y-5">
                  <button
                    type="submit"
                    className="bg-black text-white py-7 rounded-md"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex items-center w-full mb-4 opacity-50 ">
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
