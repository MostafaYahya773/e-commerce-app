'use client';
import { UserContext } from '@/context/useContext';
import useAddAdress from '@/hooks/(address)/useAddAdress';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

export default function AddNewAddress() {
  // usecontext
  const { isOpenToAdd, setIsOpenToAdd } = useContext(UserContext);
  // form data
  const [formData, setFormData] = useState([
    {
      name: 'name',
      placeholder: 'Full Name',
      type: 'text',
    },
    {
      name: 'details',
      placeholder: 'Address',
      type: 'text',
    },
    {
      name: 'phone',
      placeholder: 'Phone Number',
      type: 'tel',
    },
    {
      name: 'city',
      placeholder: 'City',
      type: 'text',
    },
  ]);
  // loading in send data
  const [isLoading, setIsLoading] = useState(false);
  // use yup
  const fieldValidations = {
    name: Yup.string()
      .min(7, 'Name must be at least 7 characters')
      .max(30, 'Name must be at most 20 characters')
      .required('Name is required'),

    details: Yup.string()
      .min(5, 'Address must be at least 5 characters')
      .max(50, 'Address must be at most 50 characters')
      .required('Address is required'),

    phone: Yup.string()
      .matches(
        /^(01)(0|1|2|5)[0-9]{8}$/,
        'Phone must be a valid Egyptian number'
      )
      .required('Phone is required'),

    city: Yup.string()
      .min(2, 'City must be at least 2 characters')
      .max(20, 'City must be at most 20 characters')
      .required('City is required'),
  };
  // use formik
  const formik = useFormik({
    initialValues: {
      name: '',
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: (values) => {
      handleAddAddress(values);
    },
    validationSchema: Yup.object(fieldValidations),
  });
  // send data to api
  const { mutate: AddAdress } = useAddAdress();
  const handleAddAddress = (values) => {
    setIsLoading(true);
    AddAdress(values, {
      onSuccess: (e) => {
        toast.success(e.data.message || 'Address added successfully');
        formik.resetForm();
        setIsOpenToAdd(!isOpenToAdd);
        setIsLoading(false);
      },
      onError: (e) => {
        toast.error(e.response.data.message || 'Failed to add address');
        setIsLoading(false);
      },
    });
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center max-w-[2000px] mx-auto bg-[#00000042] z-[101]">
      <div className="w-[95%] md:w-3/4 lg:w-1/2 h-fit bg-white flex flex-col gap-y-10 px-10 py-20 rounded-lg">
        <div className="title flex justify-between items-center gap-x-5">
          <h1 className="font-bold text-16 md:text-18">Add New Address</h1>
          <i
            onClick={() => setIsOpenToAdd(!isOpenToAdd)}
            className="fa-solid fa-xmark cursor-pointer"
          ></i>
        </div>
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <div className="w-full flex flex-col gap-y-10">
            {formData.map((item, index) => (
              <div key={index} className="form flex flex-col gap-10">
                <div className="name flex flex-col gap-y-4">
                  <p className="error text-descount-color text-12 md:text-14">
                    {formik.touched[item.name] && formik.errors[item.name] && (
                      <span>{formik.errors[item.name]}</span>
                    )}
                  </p>
                  <input
                    name={item.name}
                    value={formik.values[item.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={item.placeholder}
                    type={item.type}
                    className="input w-full border border-opacity-25 border-black py-10 px-7 rounded-lg outline-none focus:border-opacity-65"
                  />
                </div>
              </div>
            ))}

            <button
              className="w-full bg-black text-white py-10 rounded-lg"
              type="submit"
            >
              {isLoading ? <span className="loaderWishlist"></span> : 'add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
