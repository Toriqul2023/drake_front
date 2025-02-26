'use client'
import React, { useContext, useEffect, useState } from 'react'
import './Experience.css'
import axios from 'axios'
import { MyContext } from '@/app/context/context'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Experience = ({ uid }) => {
  const { user } = useContext(MyContext)
  const [works, setWorks] = useState([])
  const [updatedForm, setUpdatedForm] = useState({})
  const [showNewExperienceForm, setShowNewExperienceForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { register, handleSubmit, reset } = useForm()

  // Fetch existing experiences
  useEffect(() => {
    setLoading(true)
    axios.get(`https://nfc-back-2.onrender.com/work?uid=${uid}`)
      .then(res => {
        setWorks(res.data?.result)
        setError(null)
      })
      .catch(err => {
        console.error("Error fetching data:", err)
        setError("Failed to fetch experiences.")
      })
      .finally(() => setLoading(false))
  },[uid]) 

  // Toggle the update form for a specific experience
  const toggleUpdateForm = (id, workData) => {
    setUpdatedForm(prev => ({
      ...prev,
      [id]: !prev[id]
    }));

    // Pre-fill form with existing values when opening
    if (!updatedForm[id]) {
      reset({
        sYear: workData?.sYear || '',
        lYear: workData?.lYear || '',
        designation: workData?.designation || '',
        company: workData?.company || '',
      });
    }
  };

  // Handle updating an existing experience
  const onSubmitUpdate = (data, id) => {
    const updateField = {}
    if (data?.sYear?.trim()) updateField.sYear = data.sYear
    if (data?.lYear?.trim()) updateField.lYear = data.lYear
    if (data?.designation?.trim()) updateField.designation = data.designation
    if (data?.company?.trim()) updateField.company = data.company
    
    axios.patch(`https://nfc-back-2.onrender.com/work/${id}`, updateField)
      .then(() => {
        setWorks(prev => prev.map(work => work._id === id ? { ...work, ...updateField } : work));
        setUpdatedForm(prev => ({ ...prev, [id]: false }));
        toast.success("Experience updated successfully");
      })
      .catch(err => {
        console.error("Error updating:", err)
        toast.error("Failed to update experience");
      })
  }

  


  

  return (
    <>
      <ToastContainer />
      {loading ? (
        <p>Loading experiences...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        works.length > 0 && (
          <div className='py-[50px]' id="Resume">
            <button className="border border-[#565656] text-[14px] rounded-3xl mb-[20px] py-2 px-5">RESUME</button>
            <h1 className='lg:text-6xl my-5 mb-[50px] font-light'>Work <span className='text-[#28E98C]'>Experience</span></h1>
            
          
            <div className='pl-[80px] pb-5 border-l border-[#565656] relative'>
              {works.map(work => (
                <div key={work?._id} className='framers w-[100%] mb-[50px] relative'>
                  <p id='p1' className='text-gray-400'>{work?.sYear} - {work?.lYear || 'present'}</p>
                  <div className='my-[30px]'>
                    <h3 className='text-2xl font-light'>{work?.designation}</h3>
                    <span className='text-gray-400 text-[12px]'>{work?.company}</span>
                    <div>
                      {user?.email && (
                        <>
                          <button 
                            onClick={() => toggleUpdateForm(work._id, work)} 
                            className="bg-[#16A34A] text-white px-4 my-4 py-2 rounded"
                          >
                            {updatedForm[work?._id] ? "Hide Update Form" : "Edit your job experience"}
                          </button>
                          {updatedForm[work?._id] && (
                            <form onSubmit={handleSubmit(data => onSubmitUpdate(data, work._id))} className="mt-4">
                              <h1 className='text-lg'>Update Your Experience</h1>
                              <input 
                                className='text-black p-2 mr-4' 
                                {...register("sYear")} 
                                defaultValue={work.sYear} 
                                placeholder="Starting date of work" 
                              />
                              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">
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
        )
      )}
    </>
  )
}

export default Experience
