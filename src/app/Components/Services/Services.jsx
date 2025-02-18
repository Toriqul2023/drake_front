'use client'
import { MyContext } from '@/app/context/context'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Services = ({userName}) => {
  const {user}=useContext(MyContext)
  const [services,setServices]=useState([]);
  const [updatedForm, setUpdatedForm] = useState({})
  const { register, handleSubmit, reset } = useForm()
 useEffect(()=>{
  axios.get(`https://nfc-back-2.onrender.com/project?username=${userName}`)
  .then((res)=>{
    setServices(res.data?.result);
  })
 },[services])
 const toggleUpdateForm = (id, serviceData) => {
  setUpdatedForm(prev => ({
    ...prev,
    [id]: !prev[id]
  }));

  // ✅ Pre-fill form with existing values when opening
  if (!updatedForm[id]) {
    reset({
      title: serviceData?.title || '',
      description: serviceData.description || '',
      link:serviceData.link || '',
      
    });
  }
};

const onSubmitUpdate = (data, id) => {
  const updateField={}
  if(data?.title?.trim()) updateField.title=data.title
  if(data?.description?.trim()) updateField.description=data.description
  if(data?.link?.trim()) updateField.link=data.link
 
  console.log(updateField)
  axios.patch(`https://nfc-back-2.onrender.com/project/${id}`, updateField)
    .then(() => {
      setServices(prev => prev.map(service => service._id === id ? { ...service, ...updateField } : service));
      reset()
      setUpdatedForm(prev => ({ ...prev, [id]: false }));
      
       // ✅ Close form after update
    })
    .catch(err => console.error("Error updating:", err))
}
 
  return (
    <>
    <div className='mb-[150px] py-5' id="Service">
    <button className="border text-[14px] rounded-3xl mb-[20px] py-2  px-5">Projects</button>
    <h1 className='lg:text-6xl my-3 mb-[50px] font-light'>My <span className='text-[#28E98C]'> projects</span> </h1>
    <div>
      {
             services.map(service=>( <div key={service?._id}  className='border border-[#565656] rounded-3xl my-4 pl-[30px] pt-[40px] pb-[30px]   hover:border-[#28E98C]'>
              <h3 className='text-3xl font-light mb-5'>{service?.title}</h3>
              <p className='text-gray-400 mb-[50px]'>{service.description}</p>
              <div>
                
              
              {user?.email && (
                <>
                  <button 
                    onClick={() => toggleUpdateForm(service._id, service)} 
                    className="bg-blue-500 text-white px-4 my-4 py-2 rounded"
                  >
                    {updatedForm[service._id] ? "Hide Update Form" : "Update Projects"}
                  </button>

                  {updatedForm[service._id] && (
                    <form onSubmit={handleSubmit(data => onSubmitUpdate(data, service._id))} className="mt-4">
                      <h1 className='text-lg'>Update Your Project</h1>
                      <input 
                        className='text-black p-2 mr-4' 
                        {...register("title")} 
                        placeholder='Enter your project title'
                      
                         
                      />
                      <div>
                      <textarea
                        className='text-black p-2 m-4 ml-0' 
                        {...register("description")} 
                       placeholder='Enter a short decription of project'
                        
                      />
                      </div>
                     
                      <input 
                        className='text-black p-2 m-4 ml-0' 
                        {...register("link")} 
                        
                        placeholder="Enter Your project link" 
                      />
                    
                      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                        Submit Update
                      </button>
                    </form>
                  )}
                </>
              )}
              </div>
            </div>))
      }
   
    </div>
    
 
    </div>
    
    </>
  )
}

export default Services