'use client'

import { createContext, useEffect, useState } from "react"
import { app } from "../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";

export const MyContext=createContext()
export const auth = getAuth(app);
const AuthProvider=({children})=>{
    const [user,setUser]=useState()
    const [loading,setLoading]=useState()
    useEffect(()=>{
        

        onAuthStateChanged(auth,user=>{
          if(user){
           setUser(user)
          
          }else{
            setUser(null)
          }
          setLoading(false);
        
            
           }
        )  
     
    
       
  }  
  ,[])

  const updateName=(name)=>
    {
      updateProfile(auth.currentUser, {
        displayName: name,
      }).then(() => {
       
        
      }).catch((error) => {
        // An error occurred
        // ...
      });
    }
    const handleReg=(email,password)=>{
           return createUserWithEmailAndPassword(auth,email,password);
    }
    const handleLogin=(email,pawword)=>{
      return signInWithEmailAndPassword(auth,email,pawword)
    }
    const handleSignOut=()=>{
        return signOut(auth);
      }
     

    const info={
        handleReg,user,handleSignOut,updateName,handleLogin
    }
    return<MyContext.Provider value={info}>{children}</MyContext.Provider>
}
export default AuthProvider;
