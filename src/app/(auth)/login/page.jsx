'use client';
import AuthSocail from '@/app/_components/authSocail/page';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Login() {
  //switch to show and hide password
  const [type, setType] = useState('password');
  const formInfo = [
    { type: 'email', placeholder: 'Email', name: 'email' },
    { type: type, placeholder: 'Password', name: 'password' },
  ];
  //handle switch type
  const handleSwitchPassType = () => {
    setType(type === 'password' ? 'text' : 'password');
  };
  return (
    <div className="mb-150 lg:mb-80  md:mt-50 flex justify-center items-center w-full h-screen mx-auto px-10 font-roboto">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10 w-[1000px] min-h-500 bg-bg-products rounded-md p-10">
        <div
          className="img bg-cover bg-no-repeat bg-center rounded-md h-300 md:h-full"
          style={{ backgroundImage: `url(/loginImg.png)` }}
        ></div>
        <div className="form flex flex-col justify-center gap-y-10 md:px-40 ">
          <div className="title flex flex-col gap-y-5">
            <h1 className="font-bold text-40 ">Login</h1>
            <div className="signup flex text-14 opacity-70 font-light tracking-wide">
              <p>don't have an account?</p>
              <Link href={'/signup'} className="text-center ms-4 underline">
                Signup
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
                        info.name === 'password'
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
