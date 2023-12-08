"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState ,useEffect} from "react";
import axios from "axios";
export default function SignupPage() {
  const router=useRouter();
  const[buttonDisabled,setButtonDisabled]=useState(true);
  const[loading,setLoading]=useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  
  const onSignup = async () => {
    try {
      setLoading(true);
      const response=await axios.post("/api/users/signup",user);
      console.log('signup success',response.data);
      router.push("/login");
      
    } catch (error) {
      console.log("signup error");

       
    }finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(user.email.length>0&&user.password.length>0&&user.username.length>0)
    {
      setButtonDisabled(false);
    }
    else
    {
      setButtonDisabled(true)
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
      <h1 className="text-center">{loading?"Loading...":"Signup"}</h1>
      <hr />
      <label htmlFor="username" className="fs-4">username</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        className="p-2 rounded-4"
      />
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
      {
        !buttonDisabled&&<button className="m-4 p-2 px-5 rounded-4 fs-5" onClick={onSignup}>Signup</button>
      }
      
      <Link href="/login" className="text-decoration-none text-dark fs-5">Visit Login Page</Link>
    </div>
  );
}
