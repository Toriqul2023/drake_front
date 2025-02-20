'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { MyContext } from '../context/context';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Page = () => {
  const { user, handleReg, updateName } = useContext(MyContext);
  const [error, setError] = useState('');
  const [usernameExists, setUsernameExists] = useState(false);
  const router = useRouter();
  
  const [success, setSuccess] = useState(''); // State for success message
   console.log(router)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
   
  } = useForm();
  let username = watch("userName");
  username=username ? username.trim().toLowerCase():'';
 console.log(username)
 useEffect(()=>{
      axios.get(`https://nfc-back-2.onrender.com/reginfo?username=${username}`)
      .then((res)=>{
        if(res.data>0){
          setUsernameExists(true)
        }
        else{
          setUsernameExists(false);
        }
      })
 },[username])
  const onSubmit = async (data) => {
    setError('');
    setSuccess(''); // Reset messages before request
    const sanitizedUsername = data.userName.trim().toLowerCase();

    if (usernameExists) {
      setError("Username already exists.");
      return; // Stop if the username exists
    }
    await handleReg(data?.email, data?.passwords)
      .then(() => {
        updateName(sanitizedUsername);
        axios.post('https://nfc-back-2.onrender.com/reginfo', {
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
         
          <Link className='text-blue-600 my-2' href={'/login'}> 
          
           Already have an account
           
           
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Page;
