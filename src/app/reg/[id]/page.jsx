'use client'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useForm } from "react-hook-form";

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import debounce from 'lodash.debounce';
import { MyContext } from '@/app/context/context';

const Page = () => {
    const params = useParams();
    const {id}=params
 
useEffect(()=>{
    console.log(id)
},[])
  const { user, handleReg, updateName } = useContext(MyContext);
  const [error, setError] = useState('');
  const [uidExist, setuidExist] = useState(false);
  const [loading, setLoading] = useState(false); 
  const router = useRouter();
  const [success, setSuccess] = useState(''); 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  // Get the username as the user types
  let username = watch("userName");
  username = username ? username.trim().toLowerCase() : '';

  // Function to check username availability
  const checkUsername = async (name) => {
    if (name.length < 3) {
      setuidExist(false);
      return;
    }
    try {
      const res = await axios.get(`https://nfc-back-2.onrender.com/reginfo?uid=${id}`);
      console.log(res.data);
      if (res.data.result && res.data.result.length > 0) {
        setuidExist(true);
      } else {
        setuidExist(false);
      }
    } catch (err) {
      console.error("Error checking username:", err);
    }
  };

  // Debounce the checkUsername function
  const debouncedCheck = useCallback(
    debounce((name) => checkUsername(name), 500), []
  );

  // Use useEffect to call the debounced check
  useEffect(() => {
    debouncedCheck(username);
  }, [username, debouncedCheck]);

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    setLoading(true);
    const sanitizedUsername = data.userName.trim().toLowerCase();

    try {
      if (uidExist) {
        setError("UId already exists. Try another.");
        setLoading(false);
        return;
      }
      
      // Register with Firebase
      await handleReg(data?.email, data?.passwords);
      await updateName(sanitizedUsername);

      // Save user info in your database
      await axios.post('https://nfc-back-2.onrender.com/reginfo', {
        uid:id,
        userName: sanitizedUsername,
        emails: data?.email,
        passwords: data?.passwords,
      });

      setSuccess("Account created successfully! 🎉");
      setTimeout(() => {
        router.push('/contents');
      }, 2000);

    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>

        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        
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
            {uidExist && <p className="text-red-500 text-sm mt-1">Username already taken</p>}
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
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition-all"
            disabled={uidExist || loading}>
            {loading ? 'Registering...' : 'Register'}
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
