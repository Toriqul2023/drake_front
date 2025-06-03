import { MyContext } from '@/app/context/context'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const Education = ({uid}) => {
    const { user } = useContext(MyContext)
    const [educations, seteducations] = useState([])
    const [updatedForm, setUpdatedForm] = useState({})
    const { register, handleSubmit, reset } = useForm()
  
    useEffect(() => {
      axios.get(`https://nfc-back-2.onrender.com/education?uid=${uid}`)
        .then(res => seteducations(res.data?.result))
    }, [uid]) 
  
    const toggleUpdateForm = (id, educationData) => {
      setUpdatedForm(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
  
      // ✅ Pre-fill form with existing values when opening
      if (!updatedForm[id]) {
        reset({
          ininstitution: educationData?.institution || '',
          degree: educationData?.degree || '',
          startDate:educationData?.startDate || '',
          endDate:educationData?.endDate ||'',
        });
      }
    };
  
    const onSubmitUpdate = (data, id) => {
      const updateField={}
      if(data?.ininstitution?.trim()) updateField.ininstitution=data.ininstitution
      if(data?.degree?.trim()) updateField.degree=data.degree
      if(data?.startDate?.trim()) updateField.startDate=data.startDate
      if(data?.endDate?.trim()) updateField.endDate=data.endDate
      console.log(updateField)
      axios.patch(`https://nfc-back-2.onrender.com/education/${id}`, updateField)
        .then(() => {
          seteducations(prev => prev.map(education => education._id === id ? { ...education, ...updateField } : education));
          setUpdatedForm(prev => ({ ...prev, [id]: false })); // ✅ Close form after update
        })
        .catch(err => console.error("Error updating:", err))
    }
  return (
    <div>
    <div className=' py-[50px]' id="Resume">
        <button className="border border-[#565656] text-[14px] rounded-3xl mb-[20px] py-2 px-5">EDUCATION</button>
      
        <div className='pl-[80px] pb-5 border-l border-[#565656] relative'>
          {educations.map(education => (
            <div key={education._id} className='framers w-[100%] mb-[50px] relative'>
              <p id='p1' className='text-gray-400'>{education?.startDate} - {education?.endDate || 'present'}</p>
             <div className='my-[30px]'>
                <h3 className='text-2xl font-light'>{education?.institution}</h3>
                <span className='text-gray-400 text-[12px]'>{education?.degree}</span>
            <div>
                  
                
                {user?.email && (
                  <>
                    <button 
                      onClick={() => toggleUpdateForm(education._id, education)} 
                      className="bg-[#16A34A] text-white px-4 my-4 py-2 rounded"
                    >
                      {updatedForm[education._id] ? "Hide Update Form" : "Edit your education"}
                    </button>
  
                    {updatedForm[education._id] && (
                      // <form onSubmit={handleSubmit(data => onSubmitUpdate(data, education._id))} className="mt-4">
                      //   <h1 className='text-lg'>Update Your Experience</h1>
                      //   <input 
                      //     className='text-black p-2 mr-4' 
                      //     {...register("ininstitution")} 
                      //     defaultValue={education.ininstitution} 
                      //     placeholder="Starting date of education" 
                      //   />
                      //   <input 
                      //     className='text-black p-2 m-4' 
                      //     {...register("degree")} 
                      //     defaultValue={education.degree} 
                      //     placeholder="Enter last date of Job" 
                      //   />
                      //   <input 
                      //     className='text-black p-2 m-4' 
                      //     {...register("startDate")} 
                      //     defaultValue={education.startDate} 
                      //     placeholder="Enter Your startDate" 
                      //   />
                      //   <input 
                      //     className='text-black p-2 m-4' 
                      //     {...register("endDate")} 
                      //     defaultValue={education.endDate} 
                      //     placeholder="Enter endDate Name" 
                      //   />
                      //   <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                      //     Submit Update
                      //   </button>
                      // </form>
                      <form 
                      onSubmit={handleSubmit(data => onSubmitUpdate(data, education._id))} 
                      className="mt-4 bg-white p-6 rounded-lg shadow-lg"
                    >
                      <div className="mb-4">
                        <label className="block text-gray-700">Starting year</label>
                        <input 
                          className='w-full border rounded-lg p-2 mt-1 text-gray-700' 
                          {...register("startDate")}
                          placeholder="Enter your project Title" 
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">Passing year</label>
                        <input
                        
                          className='w-full border rounded-lg p-2 mt-1 text-gray-700' 
                          {...register("endDate")} 
                          placeholder="Enter passing year" 
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block ">Inistitution name</label>
                        <input 
                          className='w-full border rounded-lg p-2 mt-1 text-gray-700' 
                          {...register("inistitution")} 
                          placeholder="Enter your inistituition" 
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">Degree name</label>
                        <input 
                          className='w-full border rounded-lg p-2 mt-1 text-gray-700' 
                          {...register("degree")} 
                          placeholder="Enter your degree" 
                        />
                      </div>
                     
                      <button 
                        type="submit" 
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                      >
                        Submit Update
                      </button>
                    </form>

                    )}
                  </>
                )}
                </div>
              </div>
              <div className="box absolute top-[0px] left-[-87px] h-[12px] w-[12px] bg-gray-400 rounded-full"></div>
            </div>
          ))}
        </div>
      </div> 
    </div>
  )
}

export default Education