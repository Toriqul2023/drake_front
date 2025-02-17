'use client'
import React, { useContext, useState } from 'react';
import { MyContext } from '../context/context';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './style.css';
import Private from '../Private';

const Page = () => {
  const { user } = useContext(MyContext);
  const [profileImage, setProfileImage] = useState();

  const formOptions = { mode: 'onBlur' };
  const {
    register: registerAbout,
    handleSubmit: handleSubmitAbout,
    formState: { errors: errorsAbout }
  } = useForm(formOptions);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile }
  } = useForm(formOptions);

  const {
    register: registerProject,
    handleSubmit: handleSubmitProject,
    formState: { errors: errorsProject }
  } = useForm(formOptions);

  const {
    register: registerIntro,
    handleSubmit: handleSubmitIntro,
    formState: { errors: errorsIntro }
  } = useForm(formOptions);

  const {
    register: registerWork,
    handleSubmit: handleSubmitWork,
    formState: { errors: errorsWork }
  } = useForm(formOptions);

  const onSubmitAbout = (data) => {
    axios.post('https://nfc-back-2.onrender.com/about', {
      title: data?.title,
      shortTitle: data?.shortTitle,
      userName: user?.displayName,
    }).then(res => {
        if((res.data?.count)>0){
        toast.error("You already submitted")
      }
      else{
        toast.success('Intro section submitted successfully!'); // Show success toast
        console.log(res.data);
      }
    });
  };

  const onSubmitIntro = (data) => {
    axios.post('https://nfc-back-2.onrender.com/intro', {
      userName: user?.displayName,
      heading: data?.heading,
      metaInfo:data?.metaInfo,
      experince: data?.experience,
      projects: data?.projects,
    }).then(res => {
      if((res.data?.count)>0){
        toast.error("You already submitted")
      }
      else{
        toast.success('Intro section submitted successfully!'); // Show success toast
        console.log(res.data);
      }
    
    });
  };

 

  const onSubmitProfile = async (data) => {
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const imgBBresponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=8ff2a9c0cd4072aa3589800869f231e0`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const imageUrl = imgBBresponse.data.data.url;
      data.image = imageUrl;
    } catch (error) {
      console.error('Image upload failed:', error);
      return;
    }

    await axios.post('https://nfc-back-2.onrender.com/profile', {
      userName: user?.displayName,
      ...data
    }).then(res => {
      console.log(res.data.count)
      if((res.data.count)>0){
          toast.error("User is already in")
      }
      else{
        toast.success('Profile submitted successfully!'); // Show success toast
        console.log(res);
      }
     
    });
  };

  const onSubmitWork = (data) => {
    axios.post('https://nfc-back-2.onrender.com/work', {
      sYear: data?.sYear,
      lYear: data?.lYear,
      designation: data?.designation,
      company: data?.company,
      userName: user?.displayName
    }).then(res => {
      toast.success('Work experience submitted successfully!'); // Show success toast
      console.log(res);
    });
  };

  const onSubmitProject = (data) => {
    axios.post('https://nfc-back-2.onrender.com/project', {
      userName: user?.displayName,
      title: data?.title,
      description: data?.description,
      link: data?.link
    }).then(res => {
      toast.success('Project submitted successfully!'); // Show success toast
      console.log(res);
    });
  };

  return (
    <Private>
        <div className='max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-semibold text-center mb-6'>Profile Settings</h1>

      {/* Profile Section */}
      <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
        <h2 className='text-lg font-medium mb-2'>Profile Details</h2>
        <input className='input-field' {...registerProfile('nickName', { required: true })} placeholder='Nickname' />
        <input className='input-field' {...registerProfile('designation', { required: true })} placeholder='Designation' />
        <input type='file' className='input-field' {...registerProfile('image', { required: true })} />
        <input className='input-field' {...registerProfile('address', { required: true })} placeholder='Enter Address' />
        <input className='input-field' {...registerProfile('fbLink')} placeholder='Facebook Link' />
        <input className='input-field' {...registerProfile('linkedin')} placeholder='LinkedIn Link' />
        <input className='input-field' {...registerProfile('insta')} placeholder='Instagram Link' />
        <input className='input-field' {...registerProfile('twitter')} placeholder='Twitter Link' />
        <button type='submit' className='btn-primary'>Submit Profile</button>
      </form>

      {/* intro */}
      <form onSubmit={handleSubmitIntro(onSubmitIntro)} className='mb-6'>
        <h2 className='text-lg font-medium mb-2'>Intro </h2>
        <input className='input-field' {...registerIntro('heading', { required: true })} placeholder='Enter Heading Title' />
        <input className='input-field' {...registerIntro('metaInfo', { required: true })} placeholder='Enter Short Title' />
        <input className='input-field' {...registerIntro('experience', { required: true })} placeholder='Enter Short Title' />
        <input className='input-field' {...registerIntro('projects', { required: true })} placeholder='Enter Short Title' />
        <div className='flex gap-2'>
          <button type='submit' className='btn-primary'>Submit</button>
          
        </div>
      </form>

      {/* About Section */}
      <form onSubmit={handleSubmitAbout(onSubmitAbout)} className='mb-6'>
        <h2 className='text-lg font-medium mb-2'>About You</h2>
        <input className='input-field' {...registerAbout('title', { required: true })} placeholder='Enter Heading Title' />
        <input className='input-field' {...registerAbout('shortTitle', { required: true })} placeholder='Enter Short Title' />
        <div className='flex gap-2'>
          <button type='submit' className='btn-primary'>Submit</button>
          
        </div>
      </form>

      {/* Work Section */}
      <form onSubmit={handleSubmitWork(onSubmitWork)} className='mb-6'>
        <h2 className='text-lg font-medium mb-2'>Work Experience</h2>
        <input className='input-field' {...registerWork('sYear', { required: true })} placeholder='Start Year' />
        <input className='input-field' {...registerWork('lYear', { required: true })} placeholder='End Year' />
        <input className='input-field' {...registerWork('designation', { required: true })} placeholder='Designation' />
        <input className='input-field' {...registerWork('company', { required: true })} placeholder='Company Name' />
        <button type='submit' className='btn-primary'>Submit Work</button>
      </form>

      {/* Project Section */}
      <form onSubmit={handleSubmitProject(onSubmitProject)} className='mb-6'>
        <h2 className='text-lg font-medium mb-2'>Project</h2>
        <input className='input-field' {...registerProject('title', { required: true })} placeholder='Title' />
        <input className='input-field' {...registerProject('description', { required: true })} placeholder='Description' />
        <input className='input-field' {...registerProject('link', { required: true })} placeholder='Project Link' />
        <button type='submit' className='btn-primary'>Submit Work</button>
      </form>

      {/* Toast container */}
      <ToastContainer />
    </div>
    </Private>
  
  );
};

export default Page;
