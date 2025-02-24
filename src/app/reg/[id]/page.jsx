'use client'
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MyContext } from '@/app/context/context';
import debounce from 'lodash.debounce';

const Page = () => {
  const params = useParams()
  const  {id}  = params

  const { handleReg, updateName } = useContext(MyContext);
  const [error, setError] = useState('');
  const [uidExist, setUidExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  // Get the username as the user types
  let username = watch("userName");
  username = username ? username.trim().toLowerCase() : '';

  // Check UID Existence
  const checkUid = useCallback(
    debounce(async (uid) => {
      try {
        const res = await axios.get(`https://nfc-back-2.onrender.com/reginfo?uid=${id}`);
        if (res.data.result && res.data.result.length > 0) {
          setUidExist(true);
         
        } else {
          setUidExist(false);
        }
      } catch (err) {
        console.error("Error checking uid:", err);
        setError("Failed to check UID. Please try again.");
      }
    }, 300), [id]
  );

  useEffect(() => {
    setUidExist(false)
    if (id) {
      checkUid(id);
      
    }
  }, [id, checkUid]);
  useEffect(() => {
    if (uidExist) {
      router.push(`/${id}`);
    }
  }, [uidExist, id, router]);
  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    setLoading(true);
    const sanitizedUsername = data.userName.trim().toLowerCase();

    try {
      if (uidExist) {
        setError("UID already exists. Try another.");
        setLoading(false);
        return;
      }

      // Register with Firebase
      await handleReg(data?.email, data?.passwords);
      await updateName(sanitizedUsername);

      // Save user info in your database
      await axios.post('https://nfc-back-2.onrender.com/reginfo', {
        uid: id,
        userName: sanitizedUsername,
        emails: data?.email,
        passwords: data?.passwords,
      });

      setSuccess("Account created successfully! 🎉");
      setTimeout(() => {
        router.push(`/contents/${id}`);
      }, 2000);

    } catch (err) {
      console.error("Error:", err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Email is already in use. Please try another.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format. Please check and try again.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. It should be at least 6 characters.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection and try again.');
          break;
        default:
          setError('An unexpected error occurred. Please try again later.');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>

        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}
        {(error || uidExist) && <p className="text-red-500 text-sm text-center mb-4">{error|| 'Account is already registered'}</p>}
        
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
  className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition-all ${ (uidExist || error || loading) ? 'opacity-50 cursor-not-allowed' : '' }`}
  disabled={uidExist || error || loading}>
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
