'use client';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profilepage(){
    const router=useRouter();

    const[data,setData]=useState("nothing");
    const logout=async()=>{
            try {
                await axios("/api/users/logout");
                console.log("Logout Successfully");
                router.push("/login")
            } catch (error) {
                console.log(error,"Logout unsuccess");
                 
            }
    }

    const getUserDetails=async()=>{
          try {
            const res=await axios.get('/api/users/me');
            console.log(res.data);
            setData(res.data.data._id);
          } catch (error) {
                console.log(error);
                
          }
        
            
    }
    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
                <h1>Profile Page</h1>
                <h2>{data==="nothing"?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
                <hr />

                <button className="bg-info rounded-4 col-lg-1" onClick={logout}>Logout</button>
                <button className="bg-success rounded-4 col-lg-2 mt-2" onClick={getUserDetails}>Get User Data</button>

        </div>
    )
}