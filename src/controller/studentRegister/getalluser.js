import register from "../../models/register.js";
import notify from "../notification/createnotification.js";
const getalluser=async(req,res) => {
    try{
        
        const {dept}=req.query;
      
        
        const user=await register.find();
        if(user.length===0){
              return  res.status(200).json({sucess:true,message:"No User Found "})
        }

        res.status(200).json({sucess:true,message:"USer retrieved sucessfully",data:user})

    }
    catch(error){
        console.log("Error",error);
        res.status(500).json({sucess:false,message:"Internal server error"})
    }

};
export default getalluser;