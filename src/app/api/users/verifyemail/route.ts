import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request:NextRequest){
       try {
        const reqBody=await request.json();
        const{token}=reqBody;
        console.log(token,"token");
        const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
        if(!user)
        {
            return NextResponse.json({error:"Invalid token"},{status:400});
        }
        console.log(user,"users");
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        console.log(user ,"user2");

        await user.save();
        
        return NextResponse.json({
            message:'Email Veryfied Succesfully',
            success:true
        })
        
       } catch (error:any) {
        console.log(error);
        
            return NextResponse.json({error:error.message},{status:500})
       }
        
    }