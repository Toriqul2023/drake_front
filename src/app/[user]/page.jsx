"use client";


  import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
  } from 'next-share';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Introduce from "../Components/Introduce/Introduce";
import Abouts from "../Components/Abouts/Abouts";
import Experience from "../Components/Experience/Experience";
import Services from "../Components/Services/Services";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyContext } from "../context/context";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { SocialIcon } from 'react-social-icons'
import Education from '../Components/Education/Education';
import { Menu } from 'lucide-react';

const Page = () => {
  const { user,handleSignOut } = useContext(MyContext);
  const [profileForm, setProfileForm] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const uid = params?.user;
  const [profile, setProfile] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios
      .get(`https://nfc-back-2.onrender.com/profile?uid=${uid}`)
      .then((res) => {
        setProfile(res.data?.result);
      });
  }, []);
 

  const handleDownloadVCard = async () => {
    try {
      const response = await axios.post(
        "https://nfc-back-2.onrender.com/vcard",
        {
          name: profile[0]?.nickName || "N/A",
          phone: profile[0]?.phone || "N/A",
          email: profile[0]?.email || "N/A",
          address: profile[0]?.address || "N/A",
        },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "text/vcard" });
      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);
      
      link.download = `${profile[0]?.nickName}.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating vCard:", error);
      toast.error("Failed to download contact card.");
    }
  };
  const  logOut=async()=>{
    handleSignOut()
  }
  const onSubmit =async (data) => {
    try{
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append('image', imageFile);

    
      const imgBBresponse = await axios.post(`https://api.imgbb.com/1/upload?key=8ff2a9c0cd4072aa3589800869f231e0`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const imageUrl = imgBBresponse.data?.data?.url;
      const updateField={};
    updateField.uid=uid
    if(data?.nickName) updateField.nickName=data.nickName
    if(data?.designation) updateField.designation=data.designation
    if(data?.phone) updateField.phone=data.phone
    if(data?.image) updateField.image=imageUrl
    if(data?.address) updateField.address=data.address
    if(data?.fbLink) updateField.fbLink=data.fbLink
    if(data?.linkedin) updateField.linkedin=data.linkedin
    if(data?.insta)  updateField.insta=data.insta
    if(data?.twitter)  updateField.twitter=data.twitter


    await axios.put(`https://nfc-back-2.onrender.com/profile?uid=${uid}`,updateField)
    .then((res)=>setProfile(res.data?.result))
    
    setProfileForm(false);
    toast.success("Updated Succesfully")
    reset(); // Reset form after submission
    
    }
    catch(err){
      console.log(err)
    }
    

    

  };

  return (
    <>
    
    <div className="fixed top-0 left-0 w-full bg-gray-900 text-white px-6 py-4 shadow-lg flex justify-end items-center z-50">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none"
        >
          <Menu size={24} />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-md overflow-hidden">
           {user?.email ? (<Link href={`/contents/${uid}`}><button className="block w-full text-left px-4 py-2 hover:bg-gray-700">Add Contents</button></Link>):''} 
          {user?.email ? (<button onClick={handleSignOut} className="block w-full text-left px-4 py-2 hover:bg-gray-700">Log Out</button>):
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-700"><Link href={'/login'}>Log In</Link></button>}  
          </div>
        )}
      </div>
    </div>

     
   

      <video className="body-overlay" loop muted autoPlay>
        <source
          src="https://wpriverthemes.com/drake/wp-content/themes/drake/assets/images/video4.mp4"
          type="video/mp4"
        />
      </video>
      
      <div className={`row grid lg:grid-cols-4 grid-cols-1 py-5 px-5 relative lg:mt-[100px]`}>

     
<div className="py-[50px] ">
  <div className="lg:fixed border lg:w-[400px]  rounded-3xl pt-[50px] pb-[50px] px-[40px] border-[#565656]">
    <div className="flex justify-between items-center py-5">
      <h1 className="text-4xl">{profile[0]?.nickName}</h1>
      <p>{profile[0]?.designation}</p>
    </div>

    <Image
      className="rounded-3xl mb-[30px] "
      src={profile[0]?.image}
      unoptimized
      height={500}
      width={500}
    />
    <div className="text-center ">
      <h3 className="text-2xl">{profile[0]?.nickName}</h3>
     
      <p className="text-gray-400 pb-[20px]">
        {profile[0]?.address}
      </p>

      <ul className="grid grid-cols-4 w-[100%]  place-content-center my-[20px] gap-3">
        {profile[0]?.fbLink && (
          <li className=" flex items-center justify-center">
            <a href={`${profile[0]?.fbLink}`}>
            <SocialIcon network="facebook"  size={20} />
            </a>
          </li>
        )}
        {profile[0]?.insta && (
          <li className=" flex items-center justify-center">
            <a href={`${profile[0]?.insta}`}>
                 <SocialIcon network="instagram"  />
            </a>
          </li>
        )}
        {profile[0]?.twitter && (
          <li className="l flex items-center justify-center">
            
            <a href={`${profile[0]?.twitter}`}>
            <SocialIcon network="twitter"/>
            </a>
            
          </li>
        )}
        {profile[0]?.linkedin && (
          <li className=" flex items-center justify-center">
           
            <a href={`${profile[0]?.linkedin}`}>
            <SocialIcon network="linkedin" />
            </a>
            
          </li>
        )}
      </ul>
      <div className='flex justify-center'>
      <button
        onClick={handleDownloadVCard}
        className="mt-3 mr-3 bg-[#16A34A] text-white px-4 py-2 rounded-lg"
      >
        Contact Me
      </button>

      {user?.email && (
        <>
          <button
            onClick={() => setProfileForm(!profileForm)}
            className="mt-3 bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            {profileForm ? "Hide" : "Edit Profile"}
          </button>
        </>
      )}
      </div>
   
    </div>
  </div>
</div>

<div className="col-span-2 lg:pl-[200px]">
  
  <Introduce uid={uid}/>
  <Education  uid={uid} />
  <Experience uid={uid}/>
  <Services  uid={uid}/>
</div>



{/* Blur Effect & Form Popup */}
{profileForm && (
<div className="fixed p-5 top-0 left-0 w-full h-full bg-black bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded-lg w-[400px] relative">
    <button
      onClick={() => setProfileForm(false)}
      className="absolute top-5 right-2 text-xl"
    >
      ❌
    </button>
    <h2 className="text-xl text-black font-semibold mb-4">Update Profile</h2>
    <form className="text-black" onSubmit={handleSubmit(onSubmit)}>
      <label className="block mb-2 text-black">Enter your nickname</label>
      <input
        {...register("nickName")}
        defaultValue={profile[0]?.nickName}
        className="w-full border text-black p-2 rounded mb-3"
        placeholder="Enter Your designation"
      />
      <label className="block mb-2">Designation</label>
      <input
        {...register("designation")}
        defaultValue={profile[0]?.designation}
        className="w-full border p-2 rounded mb-3"
      />
      <label className="block mb-2">Type your phone number</label>
      <input
        {...register("phone")}
        defaultValue={profile[0]?.phone}
        className="w-full border p-2 rounded mb-3"
      />
      <label className="block mb-2">Upload Your image</label>
      <input
      type="file"
        {...register("image")}
        
        className="w-full border p-2 rounded mb-3"
      />
      <label className="block mb-2">Enter your address</label>
      <input
        {...register("address")}
        defaultValue={profile[0]?.address}
        className="w-full border p-2 rounded mb-3"
      />
      <label className="block mb-2">Facebook Link</label>
      <input
        {...register("fbLink")}
        defaultValue={profile[0]?.fbLink}
        className="w-full border p-2 rounded mb-3"
      />
      <label className="block mb-2">Linkedin</label>
      <input
        {...register("linkedin")}
        defaultValue={profile[0]?.linkedin}
        className="w-full border p-2 rounded mb-3"
      />
      <label className="block mb-2">Instagram</label>
      <input
        {...register("insta")}
        defaultValue={profile[0]?.insta}
        className="w-full border p-2 rounded mb-3"
      />
      <label className="block mb-2">twitter</label>
      <input
        {...register("twitter")}
        defaultValue={profile[0]?.twitter}
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
     
    </>
  );
};

export default Page;
