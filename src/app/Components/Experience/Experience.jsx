import React from 'react'
import './Experience.css'

const Experience = () => {
  return (
    <>
    <div className='mb-[200px] py-5' id="Resume">
           <button className="border border-[#565656] text-[14px] rounded-3xl mb-[20px] py-2  px-5">RESUME</button>
           <h1 className='text-6xl my-5 mb-[50px] font-light'>Work <span className='text-[#28E98C]'>Experience</span> </h1>
           <div className='pl-[80px] pb-5 border-l border-[#565656] relative'>
           
               
                <div className='framers  w-[100%]  mb-[50px]'>
               
                  <p id='p1' className='text-gray-400'>2023 - Present</p>
                  <div className='my-[30px] '>
                      <h3 className='text-2xl font-light'>Wordpress Designer & Developer</h3>
                      <span className='text-gray-400 text-[12px]'>Ahari Platform</span>
                  </div>
                  <div>
                       
                        <h3 className='text-2xl font-light'>Designer</h3>
                        <span className='text-gray-400 text-[12px]'>Astha Company</span>
                  </div>
                 
                  
                </div>
                <div className="box absolute top-[0px] left-[-6px] h-[12px] w-[12px] bg-gray-400 rounded-full"></div>
               
                <div className='framers w-[100%] '>
                
                  <p className='text-gray-400' id='p2'>2020 - 2021</p>
                  <div className='my-[30px] '>
                      <h3 className='text-2xl font-light'>Designer & Developer</h3>
                      <span className='text-gray-400 text-[12px]'>Jhonson It Institiute</span>
                  </div>
                  <div className='mb-[30px]'>
                       
                        <h3 className='text-2xl font-light'>Managing Director</h3>
                        <span className='text-gray-400 text-[12px]'>Graphics Shaper</span>
                  </div>
                
                 
                  
                </div>
                <div className="box absolute top-[250px] left-[-6px] h-[12px] w-[12px] bg-gray-400 rounded-full"></div>
                
              
           </div>
    </div>

    </>
  )
}

export default Experience