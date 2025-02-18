'use client'
import React, { useContext, useState } from 'react';
import { MyContext } from '../context/context';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './style.css';
import Private from '../Private';
import jsPDF from 'jspdf';

const Page = () => {
  const { user } = useContext(MyContext);
  const [profileImage, setProfileImage] = useState();
  const [profileData, setProfileData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [introData, setIntroData] = useState(null);
  const [workData, setWorkData] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [isPresent, setIsPresent] = useState(false);

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
    formState: { errors: errorsWork },
    reset:resetWork,
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
        toast.success('About section submitted successfully!'); // Show success toast
        console.log(res.data);
        setAboutData(data);
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
        setIntroData(data);
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
        setProfileData(data);
      }
     
    });
  };

  const onSubmitWork = (data) => {
    axios.post('https://nfc-back-2.onrender.com/work', {
      sYear: data?.sYear,
      lYear: isPresent ? 'Present' : data?.lYear,
      designation: data?.designation,
      company: data?.company,
      userName: user?.displayName
    }).then(res => {
      toast.success('Work experience submitted successfully!'); // Show success toast
      setWorkData(data);
      resetWork()
      
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
      setProjectData(data);
     
    });
  };
  const handleFocus = (formName) => {
    setActiveForm(formName);
  };
  const handleBlur = () => {
    setActiveForm(null);
  };
  

  return (
    <Private>
        <div className=' mx-auto p-6  shadow-lg rounded-lg'>
      <h1 className='text-2xl font-semibold text-center mb-6'>Profile Settings</h1>

      {/* Profile Section */}
      <div className={`transition-all duration-300 ${activeForm !== 'profile' && activeForm ? 'blur-sm' : ''}`}>
      <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
        <h2 className='text-lg font-medium mb-2'>Profile Details</h2>
        <input className='input-field' {...registerProfile('nickName', { required: true })} placeholder='Nickname' />
        <input className='input-field' {...registerProfile('designation', { required: true })} placeholder='Designation' />
        <label htmlFor="image">Add your Image</label>
        <input id= "image" type='file' className='input-field' {...registerProfile('image', { required: true })} />

        <input className='input-field' {...registerProfile('address', { required: true })} placeholder='Enter Address' />
        <input className='input-field' {...registerProfile('fbLink')} placeholder='Facebook Link' />
        <input className='input-field' {...registerProfile('linkedin')} placeholder='LinkedIn Link' />
        <input className='input-field' {...registerProfile('insta')} placeholder='Instagram Link' />
        <input className='input-field' {...registerProfile('twitter')} placeholder='Twitter Link' />
        <button type='submit' className='btn-primary'>Submit Profile</button>
      </form>
      </div>
      

      {/* intro */}
      <form onSubmit={handleSubmitIntro(onSubmitIntro)} className='mb-6'>
        <h2 className='text-lg font-medium mb-2'>Intro </h2>
        <input className='input-field' {...registerIntro('heading', { required: true })} placeholder='Enter Your nickname' />
        <input className='input-field' {...registerIntro('metaInfo', { required: true })} placeholder='Write a short introduction about yourself' />
        <input className='input-field' {...registerIntro('experience', { required: true })} placeholder='Enter your work experience' />
        <input className='input-field' {...registerIntro('projects', { required: true })} placeholder='Enter how many projects you have completed' />
        <div className='flex gap-2'>
          <button type='submit' className='btn-primary'>Submit</button>
          
        </div>
      </form>

      {/* About Section */}
      <form onSubmit={handleSubmitAbout(onSubmitAbout)} className='mb-6'>
        <h2 className='text-lg font-medium mb-2'>About You</h2>
        <input className='input-field' {...registerAbout('title', { required: true })} placeholder='Enter Heading Title' />
        <input className='input-field' {...registerAbout('shortTitle', { required: true })} placeholder='Tell me about your self' />
        <div className='flex gap-2'>
          <button type='submit' className='btn-primary'>Submit</button>
          
        </div>
      </form>

      {/* Work Section */}
      <form onSubmit={handleSubmitWork(onSubmitWork)} className='mb-6'>
        <h3 className='text-lg font-medium mb-2'>Work Experience</h3>
        <label className='text-white my-4'>You can add multiple work experience </label>
        <input className='input-field' {...registerWork('sYear', { required: true })} placeholder='Start Year' />
        <input 
        className="input-field" 
        {...registerWork('lYear', { required: !isPresent })} 
        placeholder="End Year" 
        disabled={isPresent}
      />
           <div className="flex items-center gap-2 my-4">
     
        <label htmlFor="present" className="text-white mt-[-3px]">If you currently in work select the box</label>
        <input 
          type="checkbox" 
          id="present" 
          checked={isPresent} 
          onChange={() => setIsPresent(!isPresent)} 
           className="h-5 w-5 text-blue-500"
        />
      </div>
        <input className='input-field' {...registerWork('designation', { required: true })} placeholder='Designation' />
        <input className='input-field' {...registerWork('company', { required: true })} placeholder='Company Name' />
        <button type='submit' className='btn-primary'>Add Work</button>
      </form>

      {/* Project Section */}
      <form onSubmit={handleSubmitProject(onSubmitProject)} className='mb-6'>
        <h2 className='text-lg font-medium mb-2'>Project</h2>
        <label className='my-4' htmlFor="">You can add multiple projects</label>
        <input className='input-field' {...registerProject('title', { required: true })} placeholder='Title' />
        <input className='input-field' {...registerProject('description', { required: true })} placeholder='Describe your key projects' />
        <input className='input-field' {...registerProject('link', { required: true })} placeholder='Project Link' />
        <button type='submit' className='btn-primary'>Add experience</button>
      </form>

      {/* Toast container */}
      <ToastContainer />
    </div>
    </Private>
  
  );
};

export default Page;
