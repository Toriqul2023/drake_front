"use client";

import {
  
  faUser,
  faFile,
  faBarsStaggered,
  faBoxesStacked,
  faHome,
  faMessage,
  faSoccerBall,
} from "@fortawesome/free-solid-svg-icons";
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

const Page = () => {
  const { user } = useContext(MyContext);
  const [profileForm, setProfileForm] = useState(false);
  const params = useParams();
  const userName = params?.user;
  const [profile, setProfile] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios
      .get(`http://localhost:1000/profile?username=${userName}`)
      .then((res) => {
        setProfile(res.data?.result);
      });
  }, []);
 


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
    updateField.userName=user?.displayName
    if(data?.nickName) updateField.nickName=data.nickName
    if(data?.designation) updateField.designation=data.designation
    if(data?.image) updateField.image=imageUrl
    if(data?.address) updateField.address=data.address
    if(data?.fbLink) updateField.fbLink=data.fbLink
    if(data?.linkedin) updateField.linkedin=data.linkedin
    if(data?.insta)  updateField.insta=data.insta
    if(data?.twitter)  updateField.twitter=data.twitter


    await axios.put(`http://localhost:1000/profile?username=${user?.displayName}`,updateField)
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
      <video className="body-overlay" loop muted autoPlay>
        <source
          src="https://wpriverthemes.com/drake/wp-content/themes/drake/assets/images/video4.mp4"
          type="video/mp4"
        />
      </video>

      <div className="row grid lg:grid-cols-4 grid-cols-1 px-5">
        <div className="pt-[50px]">
          <div className="lg:fixed border w-[400px] rounded-3xl pt-[50px] pb-[50px] px-[40px] border-[#565656]">
            <div className="flex justify-between items-center py-5">
              <h1 className="text-4xl">{userName}</h1>
              <p>{profile[0]?.designation}</p>
            </div>
            <Image
              className="rounded-3xl mb-[30px]"
              src={profile[0]?.image}
             unoptimized
              height={500}
              width={500}
            />
            <div className="text-center w-[100%]">
              <h3 className="text-2xl">{profile[0]?.nickName}</h3>
             
              <p className="text-gray-400 pb-[20px]">
                {profile[0]?.address}
              </p>

              <ul className="flex justify-center my-[20px] gap-3">
                {profile[0]?.fbLink && (
                  <li className="border-2 border-[#565656] p-4 rounded-full">
                    <a href={`${profile[0]?.fbLink}`}>
                      <FontAwesomeIcon
                        id="homeicon"
                        style={{ fontSize: "28px", color: "#9CA3AF" }}
                        icon={faUser}
                      />
                    </a>
                  </li>
                )}
              </ul>

              <button className="rounded-3xl bg-[#28E98C] px-[35%] py-3 text-black">
                Contact Me
              </button>

              {user?.email && (
                <>
                  <button
                    onClick={() => setProfileForm(!profileForm)}
                    className="mt-3 bg-gray-700 text-white px-4 py-2 rounded-lg position-absolutue"
                  >
                    {profileForm ? "Hide" : "Update"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:pl-[200px]">
          <Introduce userName={userName} />
          <Abouts userName={userName} />
          <Experience userName={userName} />
          <Services userName={userName} />
        </div>
      </div>

      {/* Blur Effect & Form Popup */}
      {profileForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] relative">
            <button
              onClick={() => setProfileForm(false)}
              className="absolute top-2 right-2 text-xl"
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
    </>
  );
};

export default Page;
