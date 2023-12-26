import Image from "next/image"
import React from "react"
import Introduce from "./Components/Introduce/Introduce"

import Services from "./Components/Services/Services"
import Portfolio from "./Components/Portfolio/Portfolio"
import Abouts from "./Components/Abouts/Abouts"
import Experience from "./Components/Experience/Experience"

import {
 faFacebook,
  faUser,
  faFaceSadCry,
  faFile,
  faBarsStaggered,
  faBoxesStacked,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export default function Home() {
  return (
    <>
       <video className="body-overlay" loop muted autoPlay >
        <source src="https://wpriverthemes.com/drake/wp-content/themes/drake/assets/images/video4.mp4" type="video/mp4"/>
</video>
  {/* <div className="h-[100px]"></div> */}
       <div className="row grid grid-cols-4  px-5 ">
            <div className="pt-[50px]">
              <div className="fixed border w-[400px] rounded-3xl pt-[50px] pb-[50px] px-[40px] border-[#565656]">
              <div className="flex justify-between items-center py-5">
                  <h1 className="text-4xl">Toriqul</h1>
                  <p className=""> Developer</p>
                </div>
                <Image className="rounded-3xl mb-[30px]" src={'https://scontent.fdac80-1.fna.fbcdn.net/v/t39.30808-6/411074347_1575848396577332_4331380925465508173_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeFjliNsSVqEsxMCulUikP690igXI2MahrjSKBcjYxqGuEIqa0noBUffi6IGTbcnvtsXQZVG7mewRHjMzmsiLlrs&_nc_ohc=Xdr4NYTIJBwAX90CUlj&_nc_ht=scontent.fdac80-1.fna&oh=00_AfAiPrgaqa4-BsWj4yWdp9QLP8_LXsABLeNCvTZ81GTaEQ&oe=658BF29E'} height={500} width={500}/>
                <div className="text-center w-[100%]">
                <h3 className="text-2xl ">hello@toriqul.design</h3>
                            <h3 className="text-2xl pb-[40px]">Based in Tejgaon, Dhaka</h3>  
                            <p className="text-gray-400 pb-[20px]">© 2024 Toriqul. All Rights Reserved</p>  
                          
                             <ul className="flex justify-evenly my-[20px]  gap-3">
                               <li className="border-2 border-[#565656] p-4 rounded-full"><Link href={'/'} className="">   <FontAwesomeIcon  id="homeicon" style={{fontSize:'28px',color:'#9CA3AF'}}  icon={faFaceSadCry}   /></Link></li>
                               <li className="border-2 border-[#565656] p-4 rounded-full"><Link href={'/'} className=""> <FontAwesomeIcon style={{fontSize:'28px',color:'#9CA3AF'}}  icon={faFaceSadCry}   /></Link></li>
                               <li className="border-2 border-[#565656] p-4 rounded-full"><Link href={'/'} className=""> <FontAwesomeIcon style={{fontSize:'28px',color:'#9CA3AF'}}  icon={faFaceSadCry}   /></Link></li>
                               <li className="border-2 border-[#565656] p-4 rounded-full"><Link href={'/'} className=""> <FontAwesomeIcon style={{fontSize:'28px',color:'#9CA3AF'}}  icon={faFaceSadCry}   /></Link></li>
                               <li className="border-2 border-[#565656] p-4 rounded-full"><Link href={'/'} className=""> <FontAwesomeIcon style={{fontSize:'28px',color:'#9CA3AF'}}  icon={faFaceSadCry}   /></Link></li>
                             </ul>
                            <button className=" rounded-3xl bg-[#28E98C] px-[35%] py-3 text-black">HIRE ME!</button>
                </div>
                      
              </div>
              
                     
              </div>

        <div className="col-span-2 pl-[200px]"> 
         
        <Introduce/> 
        <Abouts/>
        <Experience/>
        <Services/>
        <Portfolio/>
        
     
        </div>
        <div className=" absolute top-[20%]  right-[10px] p-5 pt-[100px] flex justify-end">
          <div className="menu w-[50px] py-[20px] px-5 border-[#575757]  rounded-3xl fixed border items-center justify-center">
            

            <div className="mx-[auto] ">
            <Link href='#Home'><FontAwesomeIcon style={{marginLeft:'-5px',marginBottom:'20px',color:'#9CA3AF'}}
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
            <FontAwesomeIcon style={{marginLeft:'-4px',marginBottom:'20px',color:'#9CA3AF'}}
        icon={faBoxesStacked}
        
      /></Link>
            </div>
         
          
           
     
          
       
   
          </div>
        </div>
       </div>
     </>
  )
}
