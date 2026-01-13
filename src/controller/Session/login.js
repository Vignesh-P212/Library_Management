import users from "../../models/user.js";
import register from "../../models/register.js";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken";
import notify from "../notification/createnotification.js";
import recordlogin from "../sattendance/logintracker.js";

const login=async(req,res) =>{
try{
 const {email,password,data}=req.body;


if(!email || !password||!data){
    return res.status(400).json({sucess:false,message:"Email and Password are required"});
}

let user;
if(data=="student"){

    user=await register.findOne({email:email});

} else{

     user=await users.findOne({email:email});

    }

if(!user){
    return res.status(400).json({sucess:false,message:"Invalid Email ID"});
}

// if(user.password !== password){
//     return res.status(400).json({sucess:false,message:"Invalid password "});
// }

const ismatch=await bcrypt.compare(password,user.password)

if(!ismatch){
    return res.status(400).json({sucess:false,message:"Invalid password "});
}

recordlogin(user._id);
//encode
const refreshToken =jsonwebtoken.sign({userId:user.id},process.env.JWT_SECRET,{expiresIn:'1d'} );


res.cookie("token",refreshToken,{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"strict",
    maxAge:24*60*60*1000}).status(200).json({
      sucess:true,
      message:"Login successfully",
      user:user,
      RefreshToken:refreshToken,});


}
catch(error){
    console.log("Error",error);
    res.status(500).json({sucess:false,message:"Internal server error"})
}

};
export default login;