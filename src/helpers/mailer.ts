 import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
 export const sendEmail=async({email,emailType,userId}:any)=>{
    try {
        const hashedToken=await bcrypt.hash(userId.toString(),10);
        if(emailType=="VERIFY")
        {
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+360000,
            });   
        }
        else if(emailType=="RESET")
        {
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+360000
            })
        }

        var transport = nodemailer.createTransport({
            // host: "sandbox.smtp.mailtrap.io",
            // port: 2525,
            // auth: {
            //   user: "1d1f846c4f3ad9",
            //   pass: "1974203afcdaed"
            // }
            service:"gmail",
            auth:{
              user:"harshitabambharoliya1@gmail.com",
              pass:"rrop cfxs dsrt cgsc"
            }
          });

          const mailOptions={
            from:'harshitabambharoliya1@gmail.com',
            to:email,
            subject:emailType==="VERIFY"?"verify your email":"reset your password",
            html:`<p>Click <a href="${process.env.DOMAIN}/${emailType=="VERIFY"?"verifyemail":"forgotpassword"}?token=${hashedToken}">here</a> to ${emailType==="VERIFY"?"verify your email":"reset your password"}</p>`
          }

          const mailResponse=await transport.sendMail(mailOptions);
          return mailResponse;

    } catch (error:any) {
            throw new Error(error.message)
    }
 }