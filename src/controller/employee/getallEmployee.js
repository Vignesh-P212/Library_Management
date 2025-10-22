import user from "../../models/user.js";
import notify from "../notification/createnotification.js";
const getallemployee=async(req,res) => {
    try{
        
        const {dept}=req.query;
      
        
        const users=await user.find();
        if(users.length===0){
              return  res.status(200).json({sucess:true,message:"No User Found "})
        }

        res.status(200).json({sucess:true,message:"USer retrieved sucessfully",data:users})

    }
    catch(error){
        console.log("Error",error);
        res.status(500).json({sucess:false,message:"Internal server error"})
    }

};
export default getallemployee;