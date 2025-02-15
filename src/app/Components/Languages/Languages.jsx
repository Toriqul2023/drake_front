import Image from 'next/image'
import React from 'react'

const Languages = () => {
  return (
    <>
      <div>
      <button className="border border-[#565656] text-[14px] rounded-3xl mb-[20px] py-2  px-5">My Skill</button>
      <h1 className='lg:text-6xl my-5 mb-[50px] font-light'>My <span className='text-[#28E98C]'>Advantages</span> </h1>

      <div className='advantages flex justify-between items-center'>
         <div className='border-2 px-[50px] py-[48px] rounded-full'>
          <Image className='w-[60px] h-[60px]' src={'https://wpriverthemes.com/drake/wp-content/uploads/2023/03/figma.png' } height={500} width={500} />
          <h3 className='text-3xl font-light mt-3'>92%</h3>
         </div>
         <div className='border-2 px-[50px] py-[48px] rounded-full'>
          <Image className='w-[60px] h-[60px]' src={'https://wpriverthemes.com/drake/wp-content/uploads/2023/03/react.png' } height={500} width={500} />
          <h3 className='text-3xl font-light mt-3'>92%</h3>
         </div>
         <div className='border-2 px-[50px] py-[48px] rounded-full'>
          <Image className='w-[60px] h-[60px]' src={'https://wpriverthemes.com/drake/wp-content/uploads/2023/03/figma.png' } height={500} width={500} />
          <h3 className='text-3xl font-light mt-3'>92%</h3>
         </div>
         <div className='border-2 px-[50px] py-[48px] rounded-full'>
          <Image className='w-[60px] h-[60px]' src={'https://wpriverthemes.com/drake/wp-content/uploads/2023/03/figma.png' } height={500} width={500} />
          <h3 className='text-3xl font-light mt-3'>92%</h3>
         </div>
         
      </div>
      </div>
    </>
  )
}

export default Languages