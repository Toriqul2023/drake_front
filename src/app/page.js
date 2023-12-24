import Image from "next/image"
import React from "react"
import Introduce from "./Components/Introduce/introduce"
import About from "./Components/About/About"
import Services from "./Components/Services/Services"
import Portfolio from "./Components/Portfolio/Portfolio"

export default function Home() {
  return (
    <>
       <video class="body-overlay"
         loop
         autoPlay
         muted
 >
        <source src={"https://wpriverthemes.com/drake/wp-content/themes/drake/assets/images/video5.mp4"} type="video/mp4"/>
</video>
       <div className="row grid grid-cols-4 py-[100px] px-5">
            <div>
              <div className="fixed  border w-[400px] rounded-3xl pt-[50px] pb-[50px] px-[40px] border-[#565656]">
              <div className="flex justify-between items-center py-5">
                  <h1 className="text-4xl">Toriqul</h1>
                  <p className=""> Developer</p>
                </div>
                <Image className="rounded-3xl mb-[30px]" src={'https://scontent.fdac80-1.fna.fbcdn.net/v/t39.30808-6/411074347_1575848396577332_4331380925465508173_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeFjliNsSVqEsxMCulUikP690igXI2MahrjSKBcjYxqGuEIqa0noBUffi6IGTbcnvtsXQZVG7mewRHjMzmsiLlrs&_nc_ohc=Xdr4NYTIJBwAX90CUlj&_nc_ht=scontent.fdac80-1.fna&oh=00_AfAiPrgaqa4-BsWj4yWdp9QLP8_LXsABLeNCvTZ81GTaEQ&oe=658BF29E'} height={500} width={500}/>
                <div className="text-center w-[100%]">
                <h3 className="text-2xl ">hello@toriqul.design</h3>
                            <h3 className="text-2xl pb-[40px]">Based in Tejgaon, Dhaka</h3>  
                            <p className="text-gray-400 pb-[30px]">© 2024 Toriqul. All Rights Reserved</p>  
                          
                      
                            <button className=" rounded-3xl bg-[#28E98C] px-[35%] py-3">HIRE ME!</button>
                </div>
                      
              </div>
              
                     
              </div>

        <div className="col-span-2 pl-[200px]"> 
         
        <Introduce/> 
        <About/>
        <Services/>
        <Portfolio/>
     
        </div>
        <div>
          
        </div>
       </div>
     </>
  )
}
