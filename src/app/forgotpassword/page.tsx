'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function forgotPasswordPage() {
    const[newPassword,setNewPassword]=useState("");
    const[token,setToken]=useState("");
    const router=useRouter();   
    const resetPassword=async()=>{
             
        try {
          const response=await axios.post("/api/users/resetpassword",{token,newPassword});
          router.push("/login")
          
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        let token=window.location.search?.split("=")[1];
        setToken(token)
    },[])
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="col-lg-2 ">
        <h1>Reset Password</h1>
        <label htmlFor="old password" className="fs-4">
          Old Password
        </label>
       
         <label htmlFor="new password" className="fs-4">
          New Password
        </label>
        <input
          type="text"
          id="new password"
          placeholder="new password"
          className="p-2 rounded-4 "
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
        />
        <button className="my-4 p-2 px-5 rounded-4 fs-5" onClick={()=>resetPassword()}>Reset Password</button>
      </div>


    </div>
  );
}

export default forgotPasswordPage;
