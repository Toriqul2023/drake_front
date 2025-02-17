'use client'
import React, { useContext } from 'react'
import { MyContext } from './context/context'

const Private = ({children}) => {
    const {user}=useContext(MyContext)

    if(!user){
         return <>Unauthorized</>
    }

  return (
    <div>{children}</div>
  )
}

export default Private