import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
connect();
export async function POST(request:NextRequest){
       try {
        const reqBody=await request.json();
        const{token,newPassword}=reqBody;
        console.log(token,"token");
        const user=await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}})
        if(!user)
        {
            return NextResponse.json({error:"Invalid token"},{status:400});
        }
        console.log(user,"users");
        user.forgotPasswordToken=undefined;
        user.forgotPasswordTokenExpiry=undefined;
        let newHashedPassword=await bcrypt.hash(newPassword,10);
        console.log(user ,"user2");

        await user.save();
        const data=await User.findByIdAndUpdate(user._id,{password:newHashedPassword})
        return NextResponse.json({
            message:'Password chnage SuccessFully',
            success:true
        })
        
       } catch (error:any) {
        console.log(error,"error");
        
            return NextResponse.json({error:error.message},{status:500})
       }
        
    }