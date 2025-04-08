'use client'
import React, { useContext, useState } from 'react';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './style.css';

import jsPDF from 'jspdf';
import Link from 'next/link';
import { MyContext } from '@/app/context/context';
import Private from '@/app/Private';
import { useParams } from 'next/navigation';

const Page = () => {
    const params=useParams()
    const {id}=params
  const { user } = useContext(MyContext);
  const [isLoading,setIsLoading]=useState(false)
  const [profileImage, setProfileImage] = useState();
  const [profileData, setProfileData] = useState(false);
  
  const [introData, setIntroData] = useState(false);
  const [workData, setWorkData] = useState(false);
  const [educationData,setEducationData]=useState(false);
  const [completedSections, setCompletedSections] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const [profileLink, setProfileLink] = useState("");
  const [isPresent, setIsPresent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const username = user?.displayName?.toLowerCase().replace(/\s+/g, '');
  const formOptions = { mode: 'onBlur' };
  const stepTitles = [
    "Profile Details",
    "Introduce Yourself",
    "Education Experience",
    "Work Experience",
    "Projects"
  ];
  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => (prev > 0 ? prev - 1 : 0));

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
    register: registerEducation,
    handleSubmit: handleSubmitEducation,
    formState: { errors: errorsEducation },
    reset:resetEducation,
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
    setIsLoading(true)
    axios.post('https://nfc-back-2.onrender.com/intro', {
      uid:id,
     
      heading: data?.heading,
      metaInfo:data?.metaInfo,
      experience: data?.experience,
      projects: data?.projects,
    }).then(res => {
      if((res.data?.count)>0){
        toast.error("You already submitted")
        setIsLoading(false)
      }
      else{
        toast.success('Intro section submitted successfully!');
        setIsLoading(false) 
        console.log(res.data);
        setIntroData(true);
      }
    
    });
  };

 

  const onSubmitProfile = async (data) => {
    setIsLoading(true);
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append('image', imageFile);
  
    try {
      // Image upload
      const imgBBresponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=8ff2a9c0cd4072aa3589800869f231e0`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const imageUrl = imgBBresponse.data.data.url;
      data.image = imageUrl;
  
      // Profile submission
      const res = await axios.post('https://nfc-back-2.onrender.com/profile', {
        uid: id,
        ...data
      });
  
      if (res.data.count > 0) {
        toast.error("User is already in");
      } else {
        toast.success('Profile submitted successfully!');
        setProfileData(true);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);  // Always stop the loading state
    }
  };

  const onSubmitWork = async (data) => {
    setIsLoading(true); // Set loading state to true
    try {
      
      await axios.post('https://nfc-back-2.onrender.com/work', {
        uid: id,
        sYear: data?.sYear,
        lYear: isPresent ? 'Present' : data?.lYear,
        designation: data?.designation,
        company: data?.company,
      });
  
      toast.success('Work experience submitted successfully!');
      setProfileData(true);
      setWorkData(false);
      resetWork();
    } catch (error) {
      toast.error('Something went wrong, please try again.');
    } finally {
      setIsLoading(false); // Set loading state to false after the request is done
    }
  };
  
  const onSubmitEducation = (data) => {
    setIsLoading(true)
    console.log(data)
    axios.post('https://nfc-back-2.onrender.com/education', {
      uid:id,
      startDate: data?.startDate,
      endDate: isPresent ? 'Present' : data?.endDate,
      institution: data?.institution,
      degree: data?.degree,
      
    }).then(res => {
      toast.success('Education experience submitted successfully!');
      setIsLoading(false)
      setProfileData(true);
       // Show success toast
      setEducationData(true);
      resetEducation()
      
    });
  };
  

  const onSubmitProject = (data) => {
    setIsLoading(true)
    axios.post('https://nfc-back-2.onrender.com/project', {
        uid:id,
      
      title: data?.title,
      description: data?.description,
      link: data?.link
    }).then(res => {
      toast.success('Project submitted successfully!');
      setIsLoading(false)
      setProfileData(true); // Show success toast
      setProjectData(true);
     
    });
  };

  const checkCompletion = () => {
    if ((profileData  && introData && workData && projectData) || workData || projectData || educationData) {
      const generatedLink = `https://nfc-bangladesh.social/${id}`;
      setProfileLink(generatedLink);
      setIsModalOpen(true); 
    } else {
      toast.error("Complete either (Profile + About + Intro) or (Work/Project) to generate a link!");
    }
  };
 

  return (
    <Private>
        <div className=' mx-auto p-6  rounded-lg'>
        
      {/* Profile Section */}
   {
    currentStep ==0 &&(   <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
    <h2 className='text-lg font-medium mb-2'>Profile Details</h2>
    <label htmlFor="">Type your nickname</label>
    <input className='input-field' {...registerProfile('nickName', { required: true })} placeholder='Nickname' />
    <label htmlFor="">Type your Designation</label>
    <input className='input-field' {...registerProfile('designation', { required: true })} placeholder='Designation' />
    <label htmlFor="">Type your phone number</label>
    <input className='input-field' {...registerProfile('phone', { required: true })} placeholder='Enter your phone number(01718******)' />
    
    <label htmlFor="image">Add your Image</label>
    <input id= "image" type='file' className='input-field' {...registerProfile('image', { required: true })} />
    <label htmlFor="">Type your address</label>
    <input className='input-field' {...registerProfile('address', { required: true })} placeholder='Enter Address' />
    <label htmlFor="">Facebook link</label>
    <input className='input-field' {...registerProfile('fbLink')} placeholder='Facebook Link' />
    <label htmlFor="">Linkedin link</label>
    <input className='input-field' {...registerProfile('linkedin')} placeholder='LinkedIn Link' />
    <label htmlFor="">Instagram link</label>
    <input className='input-field' {...registerProfile('insta')} placeholder='Instagram Link' />
    <label htmlFor="">X link</label>
    <input className='input-field' {...registerProfile('twitter')} placeholder='X Link' />
    <button type='submit' disabled={isLoading} className='btn-primary'>Submit Profile</button>
  </form>)
   }  
   
      </div>
      

      {/* intro */}
      {
        currentStep == 1 &&(
          <form onSubmit={handleSubmitIntro(onSubmitIntro)} className=''>
          <h2 className='text-lg font-medium mb-2'>Introduce yourself </h2>
          <label htmlFor="">Nickname</label>
          <input className='input-field' {...registerIntro('heading', { required: true })} placeholder='Enter Your nickname' />
          <label htmlFor="">Short description</label>
          <textarea className='input-field h-32 w-[100%]' {...registerIntro('metaInfo', { required: true })} placeholder='Write a short introduction about yourself' />
         <label htmlFor="">Year's of experience-optional</label>
          <input className='input-field' {...registerIntro('experience', )} placeholder='Years of experience' />
          <label htmlFor="">Number of projects-optional</label>
          <input className='input-field' {...registerIntro('projects',)} placeholder='Enter how many projects you have completed' />
          <div className='flex gap-2'>
            <button type='submit' className='btn-primary'>Submit</button>
            
          </div>
        </form>
        )
      }
      
{/* edcation*/}
{
  currentStep==2 && (<form onSubmit={handleSubmitEducation(onSubmitEducation)} className=''>
      
  <h3 className='text-lg font-medium mb-2'>Education Experience</h3>
  <label className='text-white my-4'>You can add multiple eduaction's experience </label>
  <input className='input-field' {...registerEducation('startDate', { required: true })} placeholder='Starting Year' />
  <input 
  className="input-field" 
  {...registerEducation('endDate', { required: !isPresent })} 
  placeholder="Passing year" 
  disabled={isPresent}
/>
     <div className="flex items-center gap-2 my-4">

  <label htmlFor="present" className="text-white mt-[-3px]">If you currently in study select the box</label>
  <input 
    type="checkbox" 
    id="present" 
    checked={isPresent} 
    onChange={() => setIsPresent(!isPresent)} 
     className="h-5 w-5 text-blue-500"
  />
</div>
  <input className='input-field' {...registerEducation('institution',)} placeholder='Enter your institution name' />
  <input className='input-field' {...registerEducation('degree',)} placeholder='Enter your degree' />
  <button type='submit' className='btn-primary'>Add Education</button>
</form>)
}
      

      {/* Work Section */}
      {currentStep==3 &&(
 <form onSubmit={handleSubmitWork(onSubmitWork)} className=''>
 <label className='text-yellow-500' htmlFor="">* If you don't have any work experience. No need to fullfill the form*</label>
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
   <input className='input-field' {...registerWork('designation',)} placeholder='Designation' />
   <input className='input-field' {...registerWork('company',)} placeholder='Company Name' />
   <button type='submit' disabled={isLoading} className='btn-primary'>{isLoading ? 'Add Working...':'Add Work'}</button>
 </form>
      )}
     

      {/* Project Section */}
      {currentStep==4 && (<form onSubmit={handleSubmitProject(onSubmitProject)} className=''>
      
      <label className='text-yellow-500' htmlFor="">* If you don't have any projects. No need to fullfill the form</label>
      <h2 className='text-lg font-medium '>Project</h2>
      <label className='my-4 ' htmlFor="">You can add multiple projects</label>
      <input className='input-field' {...registerProject('title', )} placeholder='Enter a project title' />
      <label htmlFor=""></label>
      <textarea className='input-field' {...registerProject('description', )} placeholder='Describe your  project' />
      <input className='input-field' {...registerProject('link',)} placeholder='Project Link' />
      <button type='submit' className='btn-primary'>Add Project</button>
    </form>)}
      
      <div className='flex justify-center my-2'>
        {
          currentStep >0 ? (<button onClick={prevStep} disabled={currentStep === 0} className='btn-secondary mr-2'>Previous</button>):''
        }
          
          {
            currentStep <4           ? (<button onClick={nextStep} disabled={currentStep === stepTitles.length - 1} className='btn-primary'>Next</button>):''
          }
          
        </div>

      {/* Toast container */}
      <div className='flex justify-center'>
      <button onClick={checkCompletion} className={`btn-primary lg:w-[500px] mb-5 text-center ${
    (profileData  && introData) || workData|| projectData || educationData
      ? ''
      : 'opacity-50 cursor-not-allowed'
  }`}>Complete</button>
      </div>
      
     {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-black">Congratulation!!Your Profile is Ready</h2>
              <p className='text-black'>Provide this link to NFC Bangladsesh</p>
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
