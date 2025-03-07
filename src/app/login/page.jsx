'use client'
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { MyContext } from '../context/context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const Login = () => {
  const { handleLogin } = useContext(MyContext);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setError('');

    await handleLogin(data?.email, data?.passwords)
    const res=await axios.get(`https://nfc-back-ngjs.onrender.com/login?emails=${data?.email}`)
      
        setTimeout(()=>{
            router.push(`/${res.data}`);
        },1000)
         // Redirect immediately on success
     
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-400">Email</label>
            <input 
              type="email"
              {...register("email", { required: true })}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.passwords && <p className="text-red-500 text-sm mt-1">Password is required</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-all">
            Login
          </button>
        
        </form>
        <Link className='text-blue-600 my-2 block' href={'/reg'}> 
          
          Don't have any account?
          
          
         </Link>
        
      </div>
    </div>
  );
}

export default Login;
