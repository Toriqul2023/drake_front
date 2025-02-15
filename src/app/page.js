import Image from "next/image"
import React from "react"
import Introduce from "./Components/Introduce/Introduce"

import Services from "./Components/Services/Services"
import Portfolio from "./Components/Portfolio/Portfolio"
import Abouts from "./Components/Abouts/Abouts"
import Experience from "./Components/Experience/Experience"
import Languages from "./Components/Languages/Languages"

import {
 faFacebook,
  faUser,
  faFaceSadCry,
  faFile,
  faBarsStaggered,
  faBoxesStacked,
  faHome,
  faMessage,
  faLinkSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"


export default async function  Home() {
  const data = await fetch('http://localhost:1000/about')
  const posts = await data.json()
  console.log(posts)
 
  return (
    <>
       <video className="body-overlay" loop muted autoPlay >
        <source src="https://wpriverthemes.com/drake/wp-content/themes/drake/assets/images/video4.mp4" type="video/mp4"/>
</video>
 
       <div className="row grid lg:grid-cols-4 grid-cols-1  px-5 ">
            <div className="pt-[50px]">
              <div className="lg:fixed border w-[400px] rounded-3xl pt-[50px] pb-[50px] px-[40px] border-[#565656]">
              <div className="flex justify-between items-center py-5">
                  <h1 className="text-4xl">Toriqul</h1>
                  <p className=""> Developer</p>
                </div>
                <Image className="rounded-3xl mb-[30px]" src=
                {'https://scontent.fdac5-1.fna.fbcdn.net/v/t39.30808-6/448019126_1686558688839635_946738839175870248_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFZatGLMLZbqyFJOdLocO8I0-EFpejrE5rT4QWl6OsTmh169g_PwWmIGPS5f1bfbX1s0a1ZpivrdUT0aLnr4-Mk&_nc_ohc=U-4LPynXDsoQ7kNvgH1brrr&_nc_oc=Adid2cXEC4FXsi1BpJQmikInynMaFbL65Zv7yZdf6YBbBwRyPHF-TIywoQdWau3lOuE&_nc_zt=23&_nc_ht=scontent.fdac5-1.fna&_nc_gid=ABCuq-etpNWHd5JFQSLenfL&oh=00_AYADXvkhFmdMEcZGps8-8Qh2Uxj8W9iXL76bVMJdAv24PQ&oe=6769A3BD'} height={500} width={500}/>
                <div className="text-center w-[100%]">
                <h3 className="text-2xl ">hello@toriqul.design</h3>
                            <h3 className="text-2xl pb-[40px]">Based in Tejgaon, Dhaka</h3>  
                            <p className="text-gray-400 pb-[20px]">© 2024 Toriqul. All Rights Reserved</p>  
                          
                             <ul className="flex justify-center my-[20px]  gap-3">
                               <li className="border-2 border-[#565656] p-4 rounded-full"><Link href={'/'}>   <FontAwesomeIcon  id="homeicon" style={{fontSize:'28px',color:'#9CA3AF'}}  icon={faMessage}   /></Link></li>
                               <li className="border-2 border-[#565656] p-4 rounded-full"><Link href={'https://github.com/Toriqul2023'} className=""> <FontAwesomeIcon style={{fontSize:'28px',color:'#9CA3AF'}}  icon={faLinkSlash}   /></Link></li>

                             </ul>
                            <button className=" rounded-3xl bg-[#28E98C] px-[35%] py-3 text-black">HIRE ME!</button>
                </div>
                      
              </div>
              
                     
              </div>

        <div className="col-span-2 lg:pl-[200px]"> 
         
        <Introduce/> 
        <Abouts/>
        <Experience/>
        <Services/>
        
        
     
        </div>
        <div className=" absolute top-[21%]  right-[50px] p-5 pt-[100px] flex justify-end hidden lg:block">
          <div className="menu w-[50px] py-[20px] px-5 border-[#575757]  rounded-3xl fixed border items-center justify-center">
            

            <div className="mx-[auto] ">
            <Link href='#Home'><FontAwesomeIcon className="hover:fill-gray-800 -m"   style={{marginLeft:'-5px',marginBottom:'20px',color:'#9CA3AF'}}
        icon={faHome}
        
      /></Link>
            </div>
            <div className="mx-[auto] ">
            <Link href='#About'><FontAwesomeIcon style={{marginLeft:'-4px',marginBottom:'20px',color:'#9CA3AF'}}
        icon={faUser}
        
      /></Link>
            </div>
            <div className="mx-[auto] ">
            <Link href='#Resume'>
            <FontAwesomeIcon style={{marginLeft:'-4px',marginBottom:'20px',color:'#9CA3AF'}}
        icon={faFile}
        
      /></Link>
            </div>
            <div className="mx-[auto] ">
            <Link href='#Service'>
            <FontAwesomeIcon style={{marginLeft:'-4px',marginBottom:'20px',color:'#9CA3AF'}}
        icon={faBarsStaggered}
        
      /></Link>
            </div>
            <div className="mx-[auto] ">
            <Link href='#Portfolio'>
            <FontAwesomeIcon style={{marginLeft:'-4px',color:'#9CA3AF'}}
        icon={faBoxesStacked}
        
      /></Link>
            </div>
         
          
           
     
          
       
   
          </div>
        </div>
       </div>
     </>
  )
}
