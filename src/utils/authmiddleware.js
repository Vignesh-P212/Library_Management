import jsonwebtoken from "jsonwebtoken";
import users from "../models/user.js";
import register from "../models/register.js";
const protect= async(req,res,next) =>{
try {

    const token= req.cookies.token;
    if(!token){
        return res.status(401).json({sucess:false,message:"Not authorized ,no token"})
    }
//decode
    const verifyer=jsonwebtoken.verify(token,process.env.JWT_SECRET);
    
    const user=await register.findById(verifyer.userId);
    
    if(user){
        req.user=user;
     }else{
        req.user=await users.findById(verifyer.userId);
     }

    next();
} catch (error) {
    console.log(error)
    res.status(500).json({sucess:false,message:"Internal server error"})

}

};
export default protect;