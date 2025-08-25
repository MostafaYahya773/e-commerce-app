'use client';
import AuthSocail from '@/app/_components/authSocail/page';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Signup() {
  //switch to show and hide password
  const [type, setType] = useState('password');
  const formInfo = [
    { type: 'text', placeholder: 'Full Name', name: 'name' },
    { type: 'email', placeholder: 'Email', name: 'email' },
    { type: type, placeholder: 'Password', name: 'password' },
    {
      type: type,
      placeholder: 'Confirm Password',
      name: 'confirmPassword',
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
          style={{ backgroundImage: `url(/loginImg.png)` }}
        ></div>
        <div className="form flex flex-col justify-center gap-y-10 md:px-40 ">
          <div className="title flex flex-col gap-y-5">
            <h1 className="font-bold text-32 lg:text-40 ">Create an account</h1>
            <div className="signup flex text-14 opacity-70 font-light tracking-wide">
              <p>Already have an account?</p>
              <Link href={'/login'} className="text-center ms-4 underline">
                Login
              </Link>
            </div>
          </div>
          <div className="form">
            <form>
              <div className="formInfo flex flex-col gap-y-10">
                {formInfo.map((info) => (
                  <div className="input flex flex-col relative" key={info.name}>
                    <input
                      type={info.type}
                      placeholder={info.placeholder}
                      name={info.name}
                      className=" p-10 border outline-none border-opacity-20 border-black focus:border-opacity-50 rounded-md"
                    />
                    <span
                      onClick={handleSwitchPassType}
                      className={`${
                        info.name === 'password' ||
                        info.name === 'confirmPassword'
                          ? 'absolute text-12 right-10 top-15 cursor-pointer opacity-50'
                          : 'hidden'
                      }`}
                    >
                      <i className="fa-solid fa-eye-slash"></i>
                    </span>
                  </div>
                ))}
                <div className="btn flex flex-col gap-y-5">
                  <button className="bg-black text-white py-7 rounded-md">
                    Login
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
