'use client'
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { MyContext } from '../context/context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const Login = () => {
  const { handleLogin,passReset } = useContext(MyContext);
  const [error, setError] = useState('');
  const [resetActive,setResetActive]=useState(false)
  const [showReset, setShowReset] = useState(false);
const [resetEmail, setResetEmail] = useState('');
const [resetMessage, setResetMessage] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const handlePassReset=()=>{
    passReset()
  }
  const onSubmit = async (data) => {
    setError('');

    try {
      // Wait for login to complete
      await handleLogin(data?.email, data?.passwords);

      // Send API request
      const res = await axios.post(`https://nfc-back-2.onrender.com/login`, { emails: data?.email });

      // Ensure response has data
      if (res.data?.result?.length === 0) {
        throw new Error("Invalid response from server");
      }

      // Get UID and redirect
      const link = res.data.result[0]?.uid;
      if (link) {
        router.push(`/${link}`);
      } else {
        throw new Error("UID not found");
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      setError("Login failed. Please check your credentials.");
    }
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
          Don't have an account?
        </Link>
    {/* Forgot Password Option */}
 <div className="mt-4 text-center">
  {!showReset ? (
    <button
      onClick={() => setShowReset(true)}
      className="text-blue-400 hover:underline"
    >
      Forgot password?
    </button>
  ) : (
    <div className="mt-4">
      <input
        type="email"
        value={resetEmail}
        onChange={(e) => setResetEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={async () => {
          if (!resetEmail) return setResetMessage("Please enter your email");
          try {
            await passReset(resetEmail);
            setResetMessage("Reset link sent to your email.");
          } catch (err) {
            setResetMessage("Failed to send reset link.");
          }
        }}
        className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md"
      >
        Send Reset Link
      </button>
      {resetMessage && <p className="text-sm text-center text-green-400 mt-2">{resetMessage}</p>}
    </div>
  )}
</div> 

      </div>
    </div>
  );
}

export default Login;
