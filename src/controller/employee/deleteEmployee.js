import user from "../../models/user.js";

const deleteemployee= async(req,res)=>{
    try{

        const {id} = req.params;
        const deleteduser= await user.findByIdAndDelete(id);
       
        
      
        if(!deleteduser){
            return res.status(404).json({success:false,message:"User not found"});
        }

        res.status(200).json({success:true,message:"User deleted successfully",data:deleteduser});

    }
    catch(error){
        console.log("Error",error);
        res.status(500).json({success:false,message:"Internal server error"});
    }

};
export default deleteemployee;