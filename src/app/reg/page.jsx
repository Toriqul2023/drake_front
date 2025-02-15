'use client'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { MyContext } from '../context/context';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Page = () => {
  const { user, handleReg, updateName } = useContext(MyContext);
  const [error, setError] = useState('');
  const router = useRouter();
  const [success, setSuccess] = useState(''); // State for success message
   console.log(router)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setError('');
    setSuccess(''); // Reset messages before request

    await handleReg(data?.email, data?.passwords)
      .then(() => {
        updateName(data.userName);
        axios.post('http://localhost:1000/reginfo', {
          userName: data?.userName,
          emails: data?.email,
          passwords: data?.passwords,
        }).then(() => {
          setSuccess("Account created successfully! 🎉"); 
          setTimeout(() => {
            router.push('/contents'); // Redirect after 2 seconds
          }, 2000);// Show success message
        }).catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log("Registration failed");
        setError(err.code);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
        
        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>} {/* Success Message */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>} {/* Error Message */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-gray-400">Username</label>
            <input 
              type="text"
              {...register("userName", { required: true })}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your username"
            />
            {errors.userName && <p className="text-red-500 text-sm mt-1">Username is required</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-400">Email</label>
            <input 
              type="email"
              {...register("email", { required: true })}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-400">Password</label>
            <input 
              type="password"
              {...register("passwords", { required: true })}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
            {errors.passwords && <p className="text-red-500 text-sm mt-1">Password is required</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition-all">
            Register
          </button>
          <Link href={'/login'}> <button 
            type="submit" 
            className="w-full mt-5 bg-blue-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition-all">
            Log In
          </button></Link>
        </form>
      </div>
    </div>
  );
}

export default Page;
