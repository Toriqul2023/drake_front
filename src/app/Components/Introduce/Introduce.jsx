'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import './Introduce.css'
import {
  faHouse,
 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { MyContext } from '@/app/context/context';
import { useForm } from 'react-hook-form';

const Introduce = ({userName}) => {
  const {user}=useContext(MyContext)
  const [intros,setIntros]=useState([])
  const [form,setForm]=useState(false);
  const {register,handleSubmit}=useForm()
  useEffect(()=>{
    axios.get(`https://nfc-back-2.onrender.com/intro?username=${userName}`)
    .then(res=>setIntros(res.data.result))
    
  })
  const onSubmit=async(data)=>{
    const updateField={}
    if(data.heading) updateField.heading=data.heading
    if(data.metaInfo) updateField.netaInfo=data.metaInfo
    if(data.experience) updateField.experience=data.experience
    if(data.projects)  updateField.projects=data.projects
   const response=await axios.patch(`https://nfc-back-2.onrender.com/intro?username=${user?.displayName}`,updateField)
   setIntros(response.data?.result)
    
  }

  return (
    <>
      <div className='mb-[135px] pt-[50px]' id="Home">
      <button className="border text-[14px] rounded-3xl py-2  px-5 "><FontAwesomeIcon style={{marginRight:'5px'}} icon={faHouse} /> 
     INTRODUCE</button>
         <div className=''>
            <h1 className='lg:text-[70px] text-[30px] mb-5 font-light'>Say Hi from <span className='text-green-600'>{intros[0]?.heading}</span></h1>
            
            <p className='max-w-[488px] text-gray-400 my-5 mb-[50px]'>{intros[0]?.metaInfo}</p>
            
            <div className="border ml-[auto] mr-[20px] mb-[20px] rounded-full relative w-[175px] h-[175px] flex items-center  relative">
             <Image id='img'  src={'https://wpriverthemes.com/drake/wp-content/uploads/2023/03/round-text.png'} height={500} width={500} />
            </div>
           
           
            <div className='flex lg:w-[500px] justify-between'>
              <div>
                 <h3 className='text-5xl  text-[#28E98C]'>3+</h3>
                 <p className='text-gray-400 text-[14px] mt-3'>
                 YEARS OF
                 EXPERIENCE         
                 </p>
              </div>
              <div>
                 <h3 className='text-5xl text-[#28E98C]'>5+</h3>
                 <p className='text-gray-400 text-[14px] mt-3'>
                 PROJECTS COMPLETED ON LOCALS
                 </p>
              </div>
          
            
               
            </div>
         </div>
         <div>
         {user?.email && (
                <>
                  <button
                    onClick={() => setForm(!form)}
                    className="mt-3 bg-gray-700 text-white px-4 py-2 rounded-lg position-absolutue"
                  >
                    {form ? "Hide" : "Update"}
                  </button>
                </>
              )}
               {form && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] relative">
            <button
              onClick={() => setForm(false)}
              className="absolute top-2 right-2 text-xl"
            >
              ❌
            </button>
            <h2 className="text-xl text-black font-semibold mb-4">Update Profile</h2>
            <form className="text-black" onSubmit={handleSubmit(onSubmit)}>
              <label className="block mb-2 text-black">Enter your nickname</label>
              <input
                {...register("heading")}
               
                className="w-full border text-black p-2 rounded mb-3"
                placeholder="Enter Your designation"
              />
              <label className="block mb-2">Designation</label>
              <input
                {...register("metainfo")}
              
                className="w-full border p-2 rounded mb-3"
              />
           
              <label className="block mb-2">Enter your address</label>
              <input
                {...register("experience")}
                
                className="w-full border p-2 rounded mb-3"
              />
              <label className="block mb-2">Facebook Link</label>
              <input
                {...register("projects")}
               
                className="w-full border p-2 rounded mb-3"
              />
          
            
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded mt-3"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
              </div>
      </div>
         
    </>
  )
}

export default Introduce