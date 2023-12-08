"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function LoginPage() {
  const[buttonDisable,setButtonDisable]=useState(false);
  const[loading,setLoading]=useState(false);
  const router=useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response=await axios.post("/api/users/login",user);
      console.log("Logi succesfully",response.data);
      router.push("/profile");
      
    } catch (error) {
        console.log("Login Failed");
        
    }finally{
        setLoading(false);
    };
  };


  const resetPassword=async ()=>{
       
          const response=await axios.post("/api/users/forgotpassword",{email:user.email})
  }
  useEffect(()=>{
        if(user.email.length>0&&user.password.length>0)
        {
          setButtonDisable(false);
        }
        else
        {
          setButtonDisable(true);
        }
  },[user])
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column"
      }}
    >
      <h1 className="text-center">{loading?"Processing":"Login"}</h1>
      <hr />
     
        <label htmlFor="email" className="fs-4">email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="p-2 rounded-4"
      />
       <label htmlFor="password" className="fs-4">password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="p-2 rounded-4"
      />
     <div className="d-flex">
     <button className="m-4 p-1 px-2 rounded-4 fs-5" onClick={resetPassword} >Forgot Password</button>
      
      <button className="m-4 p-2 px-5 rounded-4 fs-5" onClick={onLogin}>Login</button>
     </div>
      <Link href="/signup" className="text-decoration-none text-dark fs-5">Visit signup Page</Link>
    </div>
  );
}
