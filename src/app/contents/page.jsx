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
  const [profileData, setProfileData] = useState(false);
  
  const [introData, setIntroData] = useState(false);
  const [workData, setWorkData] = useState(false);
  const [completedSections, setCompletedSections] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const [profileLink, setProfileLink] = useState("");
  const [isPresent, setIsPresent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = user?.displayName?.toLowerCase().replace(/\s+/g, '');
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

  
  const onSubmitIntro = (data) => {
    axios.post('https://nfc-back-2.onrender.com/intro', {
      userName: username,
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
        setIntroData(true);
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
      userName: username,
      ...data
    }).then(res => {
      console.log(res.data.count)
      if((res.data.count)>0){
          toast.error("User is already in")
      }
      else{
        toast.success('Profile submitted successfully!'); // Show success toast
        setProfileData(true);
      }
     
    });
  };

  const onSubmitWork = (data) => {
    axios.post('https://nfc-back-2.onrender.com/work', {
      sYear: data?.sYear,
      lYear: isPresent ? 'Present' : data?.lYear,
      designation: data?.designation,
      company: data?.company,
      userName: username,
    }).then(res => {
      toast.success('Work experience submitted successfully!'); // Show success toast
      setWorkData(true);
      resetWork()
      
    });
  };
  

  const onSubmitProject = (data) => {
    axios.post('https://nfc-back-2.onrender.com/project', {
      userName: username,
      title: data?.title,
      description: data?.description,
      link: data?.link
    }).then(res => {
      toast.success('Project submitted successfully!'); // Show success toast
      setProjectData(true);
     
    });
  };

  const checkCompletion = () => {
    if ((profileData  && introData && workData && projectData) || workData || projectData) {
      const generatedLink = `https://nfc-rho-one.vercel.app/${username}`;
      setProfileLink(generatedLink);
      setIsModalOpen(true); 
    } else {
      toast.error("Complete either (Profile + About + Intro) or (Work/Project) to generate a link!");
    }
  };

  return (
    <Private>
        <div className=' mx-auto p-6  shadow-lg rounded-lg'>
      <h1 className='text-2xl font-semibold text-center mb-6'>At first time you have to complete every form.After then you can add more work and projects</h1>

      {/* Profile Section */}
     
      <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
        <h2 className='text-lg font-medium mb-2'>Profile Details</h2>
        <input className='input-field' {...registerProfile('nickName', { required: true })} placeholder='Nickname' />
        <input className='input-field' {...registerProfile('designation', { required: true })} placeholder='Designation' />
        <input className='input-field' {...registerProfile('Phone', { required: true })} placeholder='Enter your phone number(01718******)' />
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
        <textarea className='input-field h-32 w-[100%]' {...registerIntro('metaInfo', { required: true })} placeholder='Write a short introduction about yourself' />
       <label htmlFor="">optional</label>
        <input className='input-field' {...registerIntro('experience', )} placeholder='Years of experience' />
        <label htmlFor="">optional</label>
        <input className='input-field' {...registerIntro('projects',)} placeholder='Enter how many projects you have completed' />
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
        <h2 className='text-lg font-medium '>Project</h2>
        <label className='my-4 ' htmlFor="">You can add multiple projects</label>
        <input className='input-field' {...registerProject('title', { required: true })} placeholder='Enter a project title' />
        <label htmlFor=""></label>
        <textarea className='input-field' {...registerProject('description', { required: true })} placeholder='Describe your  project' />
        <input className='input-field' {...registerProject('link', { required: true })} placeholder='Project Link' />
        <button type='submit' className='btn-primary'>Add experience</button>
      </form>

      {/* Toast container */}
      <button onClick={checkCompletion} className={`btn-primary ${
    (profileData  && introData && workData && projectData) || workData|| projectData
      ? ''
      : 'opacity-50 cursor-not-allowed'
  }`}>Complete</button>
     {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-black">Your Profile is Ready</h2>
              <p className='text-black'>Provide this link to us</p>
              <p className="mt-2">
                <a
                  href={profileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {profileLink}
                </a>
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn-primary mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
      <ToastContainer />
    
    </Private>
  
  );
};

export default Page;
