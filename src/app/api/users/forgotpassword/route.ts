import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
    const{email}=reqBody;
    console.log(email,"token from forgotpassword");
    const user = await User.findOne({email});
   
    await sendEmail({email,emailType:"RESET",userId:user._id})
    
    return NextResponse.json({message:"ok"})
    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}