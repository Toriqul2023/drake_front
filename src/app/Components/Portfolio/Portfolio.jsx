import Image from 'next/image'
import React from 'react'
import './Portfolio.css'

const Portfolio = () => {
  return (
    <>
    <div>
    <button className="border text-[14px] rounded-3xl mb-[20px] py-2  px-5">PORTFOLIO</button>
    <h1 className='text-6xl my-5 mb-[50px] font-light'>Featured <span className='text-[#28E98C]'>Projects</span> </h1>
            <div className='projects-img '>
                <div className='relative text-black'>
                <Image className='hovering  w-[850px] rounded-3xl' src={'https://wpriverthemes.com/drake/wp-content/uploads/2023/03/portfolio1.jpg'} height={500} width={500} />
                <button className='absolute bottom-[10px] left-[20px] px-5 py-2 border rounded-3xl  text-[14px] bg-white'>Preview</button>
                </div>
                 
                 <h3 className='text-2xl mt-[50px]'>Bureau - Architecture Studio Website</h3>
                 <div className='w-[800px] grid grid-cols-2 gap-4 mt-[50px]'>
                    <div className='h-[410px] relative text-black'>
                      <Image className='hovering w-[100%] h-[100%] rounded-3xl' src={'https://wpriverthemes.com/drake/wp-content/uploads/2023/03/portfolio2.jpg'} height={500} width={500}/>
                      <button className='absolute bottom-[10px] left-[20px] px-5 py-2 border rounded-3xl  text-[14px] bg-white'>Preview</button>
                    </div>
                    <div className='h-[410px] relative text-black'>
                      <Image className='hovering  w-[100%] h-[100%] rounded-3xl' src={'https://wpriverthemes.com/drake/wp-content/uploads/2023/03/portfolio3.jpg'} height={500} width={500}/>
                      <button className='absolute bottom-[10px] left-[20px] px-5 py-2 border rounded-3xl  text-[14px] bg-white'>Preview</button>
                    </div>
                 </div>
            </div>
    </div>
    </>
  )
}

export default Portfolio