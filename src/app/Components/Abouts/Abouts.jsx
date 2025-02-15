'use client'
import { MyContext } from '@/app/context/context'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Abouts = ({userName}) => {
  const {user}=useContext(MyContext)
  console.log(user?.displayName)
  const {
    register:registerAbout,
    handleSubmit:handleSubmitAbout,
    
    formState: { errorsAbout }

  }=useForm()
  const [aboutData,setaboutData]=useState([])
  const [showAboutUpdateForm, setShowAboutUpdateForm] = useState(false);
  useEffect(()=>{
    axios.get(`https://nfc-back-2.onrender.com/about?username=${userName}`)
    .then(res=>{
      setaboutData(res.data.result);
      console.log(aboutData)
    })
  },[])
  const onSubmitAboutUpdate=data=>{
    const updateField={};
    if(data.title) updateField.title=data.title
    if(data.shortTitle) updateField.shortTitle=data.shortTitle
    axios.put(`https://nfc-back-2.onrender.com/about?username=${user?.displayName}`,updateField)
    .then(res=>setaboutData(res.data.result))
  }
 
  console.log({userName})
  console.log(aboutData)
  return (
    <>
    <div className='mb-[150px] py-5' id="About">
        <button className="border text-[14px] rounded-3xl py-2  px-5">ABOUT</button>
        <div>
            <h1 className='lg:text-[50px] mt-[50px] mb-5 font-light'>{aboutData[0]?.title}</h1>
            <p className='mt-[50px] text-gray-400'>{aboutData[0]?.shortTitle}</p>
            {user?.email ?(
                <>
                     <button onClick={() => setShowAboutUpdateForm(!showAboutUpdateForm)} className="bg-blue-500 text-white px-4 my-4 py-2 rounded">
                       {showAboutUpdateForm ? "Hide Update Form" : "Update About"}
                     </button> 
                     {
                      showAboutUpdateForm && (
                        <form onSubmit={handleSubmitAbout(onSubmitAboutUpdate)} className="mt-4">
                        <h1 className='text-lg '>Update Your About</h1>
                        <input className='text-black p-2  mr-4' {...registerAbout("title")} placeholder="Enter About heading" />
                        <input className='text-black p-2  m-4' {...registerAbout("shortTitle")} placeholder="Enter Short Title" />
                       
          
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                          Submit Update
                        </button>
                      </form>
                      )
                     }
                </>
            ):(<></>) }
        </div>
    </div>
            
    </>
  )
}

export default Abouts